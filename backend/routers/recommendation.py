from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import Any

import schemas
from database import get_db
from services.recommender import get_recommendations

router = APIRouter(
    prefix="/recommendations",
    tags=["recommendations"]
)

@router.post("/calculate")
def calculate_recommendations(request: schemas.RecommendationRequest, db: Session = Depends(get_db)):
    recommendations = get_recommendations(
        db=db,
        riasec_scores=request.riasec_scores,
        core_grades=request.core_grades,
        elective_grades=request.elective_grades
    )
    return {
        "status": "success",
        "recommendations": recommendations
    }
