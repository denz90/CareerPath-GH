from pydantic import BaseModel, EmailStr
from typing import List, Optional


class ForgotPasswordRequest(BaseModel):
    email: EmailStr

class ResetPasswordRequest(BaseModel):
    token: str
    new_password: str

class FacultyBase(BaseModel):
    name: str
    code: Optional[str] = None

class FacultyResponse(FacultyBase):
    id: int
    university_id: int
    class Config:
        from_attributes = True

class UniversityBase(BaseModel):
    code: str
    name: str
    short_name: str
    type: str
    location_city: str
    region: str
    website: Optional[str] = None
    phone: Optional[str] = None
    established: Optional[int] = None
    description: Optional[str] = None

class UniversityResponse(UniversityBase):
    id: int
    class Config:
        from_attributes = True

class ProgrammeBase(BaseModel):
    name: str
    degree_type: str
    duration_years: int
    field_category: str
    riasec_tags: Optional[str] = None
    shs_background: Optional[str] = None
    core_subjects: Optional[str] = None
    elective_subjects: Optional[str] = None
    career_outcomes: Optional[str] = None
    description: Optional[str] = None

class ProgrammeResponse(ProgrammeBase):
    id: int
    class Config:
        from_attributes = True

class UniversityProgrammeResponse(BaseModel):
    id: int
    university_id: int
    programme_id: int
    wassce_cutoff: Optional[int] = None
    sssce_cutoff: Optional[int] = None
    is_fee_paying: bool
    fee_paying_cutoff: Optional[int] = None
    duration_override: Optional[int] = None
    campus: Optional[str] = None
    notes: Optional[str] = None
    university: UniversityResponse
    programme: ProgrammeResponse
    class Config:
        from_attributes = True

class RIASECQuestionResponse(BaseModel):
    id: int
    question: str
    riasec_type: str
    option_yes: Optional[str] = "Yes, I enjoy this"
    option_no: Optional[str] = "No, not for me"
    class Config:
        from_attributes = True

class RecommendationRequest(BaseModel):
    riasec_scores: dict[str, int] # e.g. {"R": 5, "I": 3, "A": 2, "S": 0, "E": 0, "C": 1}
    core_grades: dict[str, str] # e.g. {"English": "A1", "Maths": "B2", "Science": "C4", "Social": "B3"}
    elective_grades: dict[str, str] # e.g. {"Physics": "A1", "Chemistry": "B2", "Biology": "A1"}

# Authentication Schemas
class UserBase(BaseModel):
    email: str
    full_name: Optional[str] = None

class UserCreate(UserBase):
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

class UserResponse(UserBase):
    id: int
    is_active: bool
    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None

class ForgotPasswordRequest(BaseModel):
    email: str

class GoogleTokenRequest(BaseModel):
    token: str
