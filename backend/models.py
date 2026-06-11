from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, Text, DateTime
from sqlalchemy.orm import relationship
from database import Base
from datetime import datetime

class University(Base):
    __tablename__ = "universities"
    id = Column(Integer, primary_key=True, index=True)
    code = Column(String(20), unique=True, nullable=False)
    name = Column(String(150), nullable=False)
    short_name = Column(String(30), nullable=False)
    type = Column(String(20), nullable=False)
    location_city = Column(String(60), nullable=False)
    region = Column(String(60), nullable=False)
    website = Column(String(150))
    phone = Column(String(40))
    established = Column(Integer)
    description = Column(Text)

    faculties = relationship("Faculty", back_populates="university", cascade="all, delete-orphan")
    programmes = relationship("UniversityProgramme", back_populates="university", cascade="all, delete-orphan")
    application_steps = relationship("ApplicationStep", back_populates="university")

class Faculty(Base):
    __tablename__ = "faculties"
    id = Column(Integer, primary_key=True, index=True)
    university_id = Column(Integer, ForeignKey("universities.id", ondelete="CASCADE"), nullable=False)
    name = Column(String(150), nullable=False)
    code = Column(String(30))

    university = relationship("University", back_populates="faculties")

class Programme(Base):
    __tablename__ = "programmes"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(200), nullable=False)
    degree_type = Column(String(20), nullable=False)
    duration_years = Column(Integer, default=4, nullable=False)
    field_category = Column(String(60), nullable=False)
    riasec_tags = Column(String(20))
    shs_background = Column(String(200))
    core_subjects = Column(Text)
    elective_subjects = Column(Text)
    career_outcomes = Column(Text)
    description = Column(Text)

    universities = relationship("UniversityProgramme", back_populates="programme", cascade="all, delete-orphan")

class UniversityProgramme(Base):
    __tablename__ = "university_programmes"
    id = Column(Integer, primary_key=True, index=True)
    university_id = Column(Integer, ForeignKey("universities.id", ondelete="CASCADE"), nullable=False)
    programme_id = Column(Integer, ForeignKey("programmes.id", ondelete="CASCADE"), nullable=False)
    wassce_cutoff = Column(Integer)
    sssce_cutoff = Column(Integer)
    is_fee_paying = Column(Boolean, default=False)
    fee_paying_cutoff = Column(Integer)
    duration_override = Column(Integer)
    campus = Column(String(80), default="Main Campus")
    notes = Column(Text)

    university = relationship("University", back_populates="programmes")
    programme = relationship("Programme", back_populates="universities")

class RIASECQuestion(Base):
    __tablename__ = "riasec_questions"
    id = Column(Integer, primary_key=True, index=True)
    question = Column(Text, nullable=False)
    riasec_type = Column(String(1), nullable=False)
    option_yes = Column(String(100), default="Yes, I enjoy this")
    option_no = Column(String(100), default="No, not for me")

class ApplicationStep(Base):
    __tablename__ = "application_steps"
    id = Column(Integer, primary_key=True, index=True)
    university_id = Column(Integer, ForeignKey("universities.id"))
    step_number = Column(Integer, nullable=False)
    title = Column(String(150), nullable=False)
    description = Column(Text, nullable=False)
    deadline_note = Column(String(200))
    action_url = Column(String(200))
    applies_to_all = Column(Boolean, default=False)

    university = relationship("University", back_populates="application_steps")

class SHSTrack(Base):
    __tablename__ = "shs_tracks"
    id = Column(Integer, primary_key=True, index=True)
    track_name = Column(String(60), unique=True, nullable=False)
    typical_electives = Column(Text, nullable=False)
    description = Column(Text)
    note = Column(Text)

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    full_name = Column(String)
    is_active = Column(Boolean, default=True)
    auth_provider = Column(String, default="local")
    
    # Add these new fields
    reset_token = Column(String, nullable=True)
    reset_token_expires = Column(DateTime, nullable=True)
    
    # Track student progress
    riasec_scores = Column(Text) # JSON string of scores
    core_grades = Column(Text) # JSON string
    elective_grades = Column(Text) # JSON string
    
    saved_recommendations = relationship("SavedRecommendation", back_populates="user")

class SavedRecommendation(Base):
    __tablename__ = "saved_recommendations"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"))
    programme_id = Column(Integer, ForeignKey("programmes.id"))
    university_id = Column(Integer, ForeignKey("universities.id"))
    score = Column(Integer)
    created_at = Column(String(50)) # Simplification for SQLite

    user = relationship("User", back_populates="saved_recommendations")
