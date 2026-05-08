from fastapi import FastAPI, APIRouter, HTTPException, UploadFile, File
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from typing import List, Optional
import shutil
from models import (
    PersonalInfo, Experience, Project, Skills, Education,
    Certification, Language, ContactMessage, ContactMessageCreate
)
from seed_data import (
    personal_info_data, experience_data, projects_data, skills_data,
    education_data, certifications_data, languages_data
)


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


# Seed database on startup
@app.on_event("startup")
async def seed_database():
    logger.info("Checking database collections...")
    
    # Seed Personal Info
    if await db.personal_info.count_documents({}) == 0:
        personal_info = PersonalInfo(**personal_info_data)
        await db.personal_info.insert_one(personal_info.dict())
        logger.info("Seeded personal info")
    
    # Seed Experience
    if await db.experience.count_documents({}) == 0:
        for exp_data in experience_data:
            exp = Experience(**exp_data)
            await db.experience.insert_one(exp.dict())
        logger.info("Seeded experience")
    
    # Seed Projects
    if await db.projects.count_documents({}) == 0:
        for proj_data in projects_data:
            proj = Project(**proj_data)
            await db.projects.insert_one(proj.dict())
        logger.info("Seeded projects")
    
    # Seed Skills
    if await db.skills.count_documents({}) == 0:
        for skill_data in skills_data:
            skill = Skills(**skill_data)
            await db.skills.insert_one(skill.dict())
        logger.info("Seeded skills")
    
    # Seed Education
    if await db.education.count_documents({}) == 0:
        for edu_data in education_data:
            edu = Education(**edu_data)
            await db.education.insert_one(edu.dict())
        logger.info("Seeded education")
    
    # Seed Certifications
    if await db.certifications.count_documents({}) == 0:
        for cert_data in certifications_data:
            cert = Certification(**cert_data)
            await db.certifications.insert_one(cert.dict())
        logger.info("Seeded certifications")
    
    # Seed Languages
    if await db.languages.count_documents({}) == 0:
        for lang_data in languages_data:
            lang = Language(**lang_data)
            await db.languages.insert_one(lang.dict())
        logger.info("Seeded languages")
    
    logger.info("Database seeding complete!")


# Root endpoint
@api_router.get("/")
async def root():
    return {"message": "Umang Shukla Portfolio API - v1.0"}


# Personal Info
@api_router.get("/personal-info", response_model=PersonalInfo)
async def get_personal_info():
    personal_info = await db.personal_info.find_one()
    if not personal_info:
        raise HTTPException(status_code=404, detail="Personal info not found")
    return PersonalInfo(**personal_info)


# Experience
@api_router.get("/experience", response_model=List[Experience])
async def get_experience():
    experiences = await db.experience.find().sort("order", 1).to_list(100)
    return [Experience(**exp) for exp in experiences]


# Projects
@api_router.get("/projects", response_model=List[Project])
async def get_projects(status: Optional[str] = None):
    query = {}
    if status and status != "All":
        query["status"] = status
    projects = await db.projects.find(query).sort("order", 1).to_list(100)
    return [Project(**proj) for proj in projects]


# Skills
@api_router.get("/skills")
async def get_skills():
    skills = await db.skills.find().to_list(100)
    result = {}
    for skill in skills:
        result[skill["category"]] = skill["items"]
    return result


# Education
@api_router.get("/education", response_model=List[Education])
async def get_education():
    education = await db.education.find().sort("order", 1).to_list(100)
    return [Education(**edu) for edu in education]


# Certifications
@api_router.get("/certifications")
async def get_certifications():
    certs = await db.certifications.find().sort("order", 1).to_list(100)
    return [cert["name"] for cert in certs]


# Languages
@api_router.get("/languages", response_model=List[Language])
async def get_languages():
    languages = await db.languages.find().to_list(100)
    return [Language(**lang) for lang in languages]


# Contact
@api_router.post("/contact")
async def submit_contact(contact_data: ContactMessageCreate):
    contact = ContactMessage(**contact_data.dict())
    await db.contact_messages.insert_one(contact.dict())
    logger.info(f"Contact message received from {contact.email}")
    return {
        "success": True,
        "message": "Thank you for reaching out! I'll get back to you soon."
    }


# Profile Photo Upload
@api_router.post("/upload-profile-photo")
async def upload_profile_photo(file: UploadFile = File(...)):
    try:
        # Create uploads directory if it doesn't exist
        upload_dir = Path("/app/backend/uploads")
        upload_dir.mkdir(exist_ok=True)
        
        # Save file
        file_path = upload_dir / f"profile_{file.filename}"
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        # Update database
        photo_url = f"/uploads/profile_{file.filename}"
        await db.personal_info.update_one(
            {},
            {"$set": {"profile_photo": photo_url}}
        )
        
        logger.info(f"Profile photo uploaded: {photo_url}")
        return {"success": True, "photo_url": photo_url}
    except Exception as e:
        logger.error(f"Error uploading profile photo: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


# Create Project
@api_router.post("/projects", response_model=Project)
async def create_project(project: Project):
    try:
        await db.projects.insert_one(project.dict())
        logger.info(f"Project created: {project.title}")
        return project
    except Exception as e:
        logger.error(f"Error creating project: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


# Update Project
@api_router.put("/projects/{project_id}")
async def update_project(project_id: str, project_data: dict):
    try:
        result = await db.projects.update_one(
            {"id": project_id},
            {"$set": project_data}
        )
        if result.modified_count == 0:
            raise HTTPException(status_code=404, detail="Project not found")
        logger.info(f"Project updated: {project_id}")
        return {"success": True, "message": "Project updated successfully"}
    except Exception as e:
        logger.error(f"Error updating project: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


# Delete Project
@api_router.delete("/projects/{project_id}")
async def delete_project(project_id: str):
    try:
        result = await db.projects.delete_one({"id": project_id})
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Project not found")
        logger.info(f"Project deleted: {project_id}")
        return {"success": True, "message": "Project deleted successfully"}
    except Exception as e:
        logger.error(f"Error deleting project: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()