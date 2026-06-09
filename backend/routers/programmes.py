from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional

import models, schemas
from database import get_db

router = APIRouter(
    prefix="/programmes",
    tags=["programmes"]
)

@router.get("/", response_model=List[schemas.ProgrammeResponse])
def read_programmes(
    skip: int = 0, 
    limit: int = 100, 
    field_category: Optional[str] = None,
    db: Session = Depends(get_db)
):
    query = db.query(models.Programme)
    if field_category:
        query = query.filter(models.Programme.field_category == field_category)
        
    programmes = query.offset(skip).limit(limit).all()
    return programmes

@router.get("/{programme_id}", response_model=schemas.ProgrammeResponse)
def read_programme(programme_id: int, db: Session = Depends(get_db)):
    programme = db.query(models.Programme).filter(models.Programme.id == programme_id).first()
    if programme is None:
        raise HTTPException(status_code=404, detail="Programme not found")
    return programme

@router.get("/{programme_id}/universities", response_model=List[schemas.UniversityProgrammeResponse])
def read_universities_for_programme(programme_id: int, db: Session = Depends(get_db)):
    uni_progs = db.query(models.UniversityProgramme).filter(models.UniversityProgramme.programme_id == programme_id).all()
    return uni_progs
