from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import models
from database import engine
from routers import universities, programmes, assessment, recommendation, news, auth

# Create database tables if they don't exist
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="CareerPath GH API", description="Backend for CareerPath GH")

# Configure CORS for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://192.168.0.124:3000", "https://career-path-gh.vercel.app"], # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["Content-Type", "Authorization"],
)

# Include routers
app.include_router(auth.router)
app.include_router(universities.router)
app.include_router(programmes.router)
app.include_router(assessment.router)
app.include_router(recommendation.router)
app.include_router(news.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to CareerPath GH API"}
