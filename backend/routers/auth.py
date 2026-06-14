from email_validator import validate_email
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from typing import Optional
from jose import JWTError, jwt
from passlib.context import CryptContext
import secrets
from database import get_db
import models, schemas
from email_config import send_reset_email
import os
from google.oauth2 import id_token
from google.auth.transport import requests

GOOGLE_CLIENT_ID = os.getenv("client_id") or "276277061558-qind0vp4m2v2bejg68upnfoggo0oaka8.apps.googleusercontent.com"

# Secret key for JWT
SECRET_KEY = os.getenv("private_key_id") or "super-secret-jwt-key-for-careerpath-gh"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24 * 7
RESET_TOKEN_EXPIRE_MINUTES = 60  # 1 hour

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

router = APIRouter(
    prefix="/auth",
    tags=["authentication"]
)

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def generate_reset_token():
    return secrets.token_urlsafe(32)

@router.post("/register", response_model=schemas.UserResponse)
def register(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_password = get_password_hash(user.password)
    new_user = models.User(
        email=user.email,
        hashed_password=hashed_password,
        full_name=user.full_name
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@router.post("/login", response_model=schemas.Token)
def login(user_credentials: schemas.UserLogin, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == user_credentials.email).first()
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    if not verify_password(user_credentials.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    
    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/google", response_model=schemas.Token)
def google_auth(request: schemas.GoogleTokenRequest, db: Session = Depends(get_db)):
    try:
        # Verify the access token by fetching user info from Google
        import httpx
        resp = httpx.get(
            "https://www.googleapis.com/oauth2/v3/userinfo",
            headers={"Authorization": f"Bearer {request.token}"},
            timeout=10,
        )
        if resp.status_code != 200:
            raise ValueError(f"Google userinfo returned {resp.status_code}")
        
        idinfo = resp.json()
        email = idinfo.get("email")
        name = idinfo.get("name", "")
        
        if not email:
            raise ValueError("No email in Google response")
        
        # Check if user exists, create if not
        user = db.query(models.User).filter(models.User.email == email).first()
        if not user:
            dummy_password = get_password_hash(secrets.token_urlsafe(12))
            user = models.User(
                email=email,
                hashed_password=dummy_password,
                full_name=name,
                auth_provider="google"
            )
            db.add(user)
            db.commit()
            db.refresh(user)
            
        # Generate standard access token
        access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_access_token(
            data={"sub": user.email}, expires_delta=access_token_expires
        )
        
        return {"access_token": access_token, "token_type": "bearer"}
        
    except ValueError as e:
        print(f"Google auth error: {e}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid Google token",
            headers={"WWW-Authenticate": "Bearer"},
        )

@router.post("/forgot-password")
async def forgot_password(request: schemas.ForgotPasswordRequest, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == request.email).first()
    
    # For security, always return success even if user doesn't exist
    # This prevents email enumeration attacks
    if not user:
        return {"message": "If that email exists, a password reset link has been sent"}
    
    # Generate reset token
    reset_token = generate_reset_token()
    reset_token_expires = datetime.utcnow() + timedelta(minutes=RESET_TOKEN_EXPIRE_MINUTES)
    
    # Save token to database
    user.reset_token = reset_token
    user.reset_token_expires = reset_token_expires
    db.commit()
    
    # Send email
    try:
        await send_reset_email(user.email, reset_token)
    except Exception as e:
        print(f"Error sending email: {e}")
        raise HTTPException(status_code=500, detail="Error sending reset email")
    
    return {"message": "If that email exists, a password reset link has been sent"}

@router.post("/reset-password")
def reset_password(request: schemas.ResetPasswordRequest, db: Session = Depends(get_db)):
    # Find user with this token
    user = db.query(models.User).filter(models.User.reset_token == request.token).first()
    
    if not user:
        raise HTTPException(status_code=400, detail="Invalid or expired reset token")
    
    # Check if token is expired
    if user.reset_token_expires < datetime.utcnow():
        raise HTTPException(status_code=400, detail="Reset token has expired")
    
    # Update password
    user.hashed_password = get_password_hash(request.new_password)
    
    # Clear reset token
    user.reset_token = None
    user.reset_token_expires = None
    
    db.commit()
    
    return {"message": "Password has been reset successfully"}
    