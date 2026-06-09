import math
from typing import List, Dict, Any
from sqlalchemy.orm import Session
import models

def calculate_wassce_aggregate(core_grades: Dict[str, str], elective_grades: Dict[str, str]) -> int:
    grade_values = {"A1": 1, "B2": 2, "B3": 3, "C4": 4, "C5": 5, "C6": 6, "D7": 7, "E8": 8, "F9": 9}
    aggregate = 0
    # Core subjects: Best 3
    core_scores = [grade_values.get(g, 9) for g in core_grades.values()]
    core_scores.sort()
    aggregate += sum(core_scores[:3])
    
    # Elective subjects: Best 3
    elective_scores = [grade_values.get(g, 9) for g in elective_grades.values()]
    elective_scores.sort()
    aggregate += sum(elective_scores[:3])
    
    return aggregate

def calculate_eligibility_score(aggregate: int, cutoff: int) -> float:
    # Basic scoring: if aggregate is less than or equal to cutoff, high score
    # otherwise penalty
    if not cutoff:
        cutoff = 24 # Default average cutoff
        
    if aggregate <= cutoff:
        return 1.0
    else:
        # Score drops off as aggregate goes above cutoff
        diff = aggregate - cutoff
        return max(0.0, 1.0 - (diff * 0.1))

def calculate_riasec_similarity(user_scores: Dict[str, int], programme_tags: str) -> float:
    if not programme_tags:
        return 0.5 # Default middle score if no tags
        
    tags = [t.strip() for t in programme_tags.split(',')]
    
    # Create programme vector (1 for tags present, 0 otherwise)
    prog_vector = {tag: 1 if tag in tags else 0 for tag in ['R', 'I', 'A', 'S', 'E', 'C']}
    
    # Normalize user scores
    max_user_score = max(user_scores.values()) if user_scores.values() else 1
    if max_user_score == 0:
        max_user_score = 1
        
    user_vector = {k: v / max_user_score for k, v in user_scores.items()}
    
    # Cosine similarity
    dot_product = sum(user_vector.get(k, 0) * prog_vector.get(k, 0) for k in ['R', 'I', 'A', 'S', 'E', 'C'])
    
    mag_user = math.sqrt(sum(v**2 for v in user_vector.values()))
    mag_prog = math.sqrt(sum(v**2 for v in prog_vector.values()))
    
    if mag_user == 0 or mag_prog == 0:
        return 0.0
        
    return dot_product / (mag_user * mag_prog)

def get_recommendations(db: Session, riasec_scores: Dict[str, int], core_grades: Dict[str, str], elective_grades: Dict[str, str]) -> List[Dict[str, Any]]:
    aggregate = calculate_wassce_aggregate(core_grades, elective_grades)
    
    programmes = db.query(models.Programme).all()
    uni_programmes = db.query(models.UniversityProgramme).all()
    
    # Map programme id to its lowest cutoff across universities
    cutoff_map = {}
    for up in uni_programmes:
        if up.wassce_cutoff:
            if up.programme_id not in cutoff_map or up.wassce_cutoff > cutoff_map[up.programme_id]:
                # In Ghana, higher cutoff number means it's easier to get in (e.g. 24 is easier than 10)
                # Wait, usually cutoff 10 means you need aggregate <= 10.
                # So we want the highest allowed number to represent the easiest path.
                cutoff_map[up.programme_id] = up.wassce_cutoff
                
    recommendations = []
    
    for prog in programmes:
        cutoff = cutoff_map.get(prog.id, 24)
        
        eligibility_score = calculate_eligibility_score(aggregate, cutoff)
        interest_score = calculate_riasec_similarity(riasec_scores, prog.riasec_tags)
        
        # Formula: (0.6 * Eligibility) + (0.4 * Interest)
        final_score = (0.6 * eligibility_score) + (0.4 * interest_score)
        
        if final_score > 0.4: # Arbitrary threshold
            recommendations.append({
                "programme": {
                    "id": prog.id,
                    "name": prog.name,
                    "degree_type": prog.degree_type,
                    "field_category": prog.field_category,
                    "riasec_tags": prog.riasec_tags,
                    "description": prog.description,
                    "career_outcomes": prog.career_outcomes
                },
                "scores": {
                    "final_score": round(final_score, 2),
                    "eligibility_score": round(eligibility_score, 2),
                    "interest_score": round(interest_score, 2)
                },
                "student_aggregate": aggregate,
                "typical_cutoff": cutoff
            })
            
    # Sort by final score descending
    recommendations.sort(key=lambda x: x["scores"]["final_score"], reverse=True)
    
    return recommendations[:20] # Return top 20
