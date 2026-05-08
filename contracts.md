# API Contracts & Integration Plan

## Overview
This document outlines the backend API contracts and integration strategy for Umang Shukla's portfolio website.

## Current Mock Data (from mock.js)
- Personal Info
- Experience (2 entries)
- Projects (6 entries)
- Skills (technical, domains, tools)
- Education (2 entries)
- Certifications (4 entries)
- Languages (3 entries)

## Backend MongoDB Models

### 1. PersonalInfo
```python
{
    "_id": ObjectId,
    "name": str,
    "title": str,
    "tagline": str,
    "email": str,
    "linkedin": str,
    "bio": str
}
```

### 2. Experience
```python
{
    "_id": ObjectId,
    "organization": str,
    "role": str,
    "duration": str,
    "location": str,
    "description": str,
    "tags": List[str],
    "order": int
}
```

### 3. Projects
```python
{
    "_id": ObjectId,
    "title": str,
    "description": str,
    "tags": List[str],
    "image": str,
    "status": str,  # "In Progress", "Completed", "Research"
    "order": int
}
```

### 4. Skills
```python
{
    "_id": ObjectId,
    "category": str,  # "technical", "domains", "tools"
    "items": List[str]
}
```

### 5. Education
```python
{
    "_id": ObjectId,
    "institution": str,
    "degree": str,
    "field": str,
    "duration": str,
    "status": str,
    "order": int
}
```

### 6. ContactMessages
```python
{
    "_id": ObjectId,
    "name": str,
    "email": str,
    "subject": str,
    "message": str,
    "timestamp": datetime,
    "read": bool
}
```

## API Endpoints

### Personal Info
- `GET /api/personal-info` - Get personal information

### Experience
- `GET /api/experience` - Get all experience entries (sorted by order)

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects?status={status}` - Filter by status

### Skills
- `GET /api/skills` - Get all skills grouped by category

### Education
- `GET /api/education` - Get all education entries (sorted by order)

### Certifications
- `GET /api/certifications` - Get all certifications

### Languages
- `GET /api/languages` - Get all languages

### Contact
- `POST /api/contact` - Submit contact form
  - Body: { name, email, subject, message }
  - Response: { success: bool, message: str }

### Space Data (External APIs)
- `GET /api/space/apod` - NASA Astronomy Picture of the Day
- `GET /api/space/launches` - SpaceX upcoming launches

## Frontend Integration Strategy

### Phase 1: Create API Service Layer
Create `/app/frontend/src/services/api.js` with axios methods for all endpoints

### Phase 2: Update Components
1. **Hero.jsx** - Fetch personal info
2. **About.jsx** - Fetch education, certifications, languages
3. **Experience.jsx** - Fetch experience data
4. **Projects.jsx** - Fetch projects with filtering
5. **Skills.jsx** - Fetch skills
6. **Contact.jsx** - Submit contact form to backend

### Phase 3: Remove Mock Dependencies
- Remove imports from mock.js
- Replace with API calls using React hooks (useState, useEffect)
- Add loading states
- Add error handling

## Backend Implementation Order
1. Setup MongoDB collections and seed initial data
2. Create Pydantic models
3. Implement GET endpoints for static data
4. Implement POST endpoint for contact form
5. Add NASA/SpaceX API integration
6. Test all endpoints

## Integration Testing Checklist
- [ ] Personal info displays correctly
- [ ] Experience section loads from backend
- [ ] Projects load and filter works
- [ ] Skills display correctly
- [ ] Education, certifications, languages load
- [ ] Contact form submits successfully
- [ ] Space data displays (if integrated)
- [ ] Error states handled gracefully
- [ ] Loading states show appropriately
