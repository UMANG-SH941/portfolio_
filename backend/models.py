from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
from datetime import datetime
import uuid


class PersonalInfo(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    title: str
    tagline: str
    email: EmailStr
    linkedin: str
    github: Optional[str] = None
    instagram: Optional[str] = None
    twitter: Optional[str] = None
    bio: str
    profile_photo: Optional[str] = None


class Experience(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    organization: str
    role: str
    duration: str
    location: str
    description: str
    tags: List[str]
    order: int = 0


class Project(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    description: str
    tags: List[str]
    image: str
    status: str  # "In Progress", "Completed", "Research"
    order: int = 0
    sponsor_link: Optional[str] = None
    seeking_sponsors: bool = False
    github_link: Optional[str] = None
    live_link: Optional[str] = None


class Skills(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    category: str  # "technical", "domains", "tools"
    items: List[str]


class Education(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    institution: str
    degree: str
    field: str
    duration: str
    status: str
    order: int = 0


class Certification(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    order: int = 0


class Language(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    language: str
    proficiency: str


class ContactMessage(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    subject: str
    message: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    read: bool = False


class ContactMessageCreate(BaseModel):
    name: str
    email: EmailStr
    subject: str
    message: str
