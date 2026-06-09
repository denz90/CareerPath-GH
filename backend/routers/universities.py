from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional

import models, schemas
from database import get_db

router = APIRouter(
    prefix="/universities",
    tags=["universities"]
)

@router.get("/", response_model=List[schemas.UniversityResponse])
def read_universities(
    skip: int = 0, 
    limit: int = 100, 
    type: Optional[str] = None,
    db: Session = Depends(get_db)
):
    query = db.query(models.University)
    if type:
        query = query.filter(models.University.type == type)
    universities = query.offset(skip).limit(limit).all()
    return universities

@router.get("/{university_id}", response_model=schemas.UniversityResponse)
def read_university(university_id: int, db: Session = Depends(get_db)):
    university = db.query(models.University).filter(models.University.id == university_id).first()
    if university is None:
        raise HTTPException(status_code=404, detail="University not found")
    return university
