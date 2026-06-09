from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

import models, schemas
from database import get_db

router = APIRouter(
    prefix="/assessments",
    tags=["assessments"]
)

@router.get("/questions", response_model=List[schemas.RIASECQuestionResponse])
def read_questions(db: Session = Depends(get_db)):
    questions = db.query(models.RIASECQuestion).all()
    return questions
