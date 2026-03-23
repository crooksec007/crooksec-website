from fastapi import FastAPI, APIRouter, HTTPException
from starlette.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional
import sqlite3
import uuid
import os
from datetime import datetime, timezone
import json

app = FastAPI(title="CrookSec API Powered by SQLite")
api_router = APIRouter(prefix="/api")

DB_FILE = "crooksec.sqlite"

def get_db():
    conn = sqlite3.connect(DB_FILE)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db()
    cur = conn.cursor()
    cur.execute('''
        CREATE TABLE IF NOT EXISTS contacts (
            id TEXT PRIMARY KEY,
            name TEXT,
            email TEXT,
            phone TEXT,
            subject TEXT,
            message TEXT,
            created_at TEXT
        )
    ''')
    cur.execute('''
        CREATE TABLE IF NOT EXISTS projects (
            id TEXT PRIMARY KEY,
            title TEXT,
            category TEXT,
            desc TEXT,
            tags TEXT,
            image TEXT,
            accent TEXT,
            challenge TEXT,
            solution TEXT,
            result TEXT,
            link TEXT,
            liveThumbnail BOOLEAN
        )
    ''')
    conn.commit()
    conn.close()

init_db()

# ── Models ──────────────────────────────────────────────────────────────────

class ContactCreate(BaseModel):
    name: str
    email: str
    phone: str
    subject: str
    message: str

class ContactResponse(BaseModel):
    id: str
    name: str
    email: str
    phone: str
    subject: str
    message: str
    created_at: str

class ProjectResponse(BaseModel):
    id: str
    title: str
    category: str
    desc: str
    tags: List[str]
    image: str
    accent: str
    challenge: str
    solution: str
    result: str
    link: Optional[str] = None
    liveThumbnail: Optional[bool] = False

# ── Routes ───────────────────────────────────────────────────────────────────

@api_router.get("/")
async def root():
    return {"message": "CrookSec API — Online", "database": "SQLite"}

@api_router.post("/contact", response_model=ContactResponse)
async def submit_contact(data: ContactCreate):
    conn = get_db()
    cur = conn.cursor()
    doc_id = str(uuid.uuid4())
    created_at = datetime.now(timezone.utc).isoformat()
    cur.execute('''
        INSERT INTO contacts (id, name, email, phone, subject, message, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    ''', (doc_id, data.name, data.email, data.phone, data.subject, data.message, created_at))
    conn.commit()
    conn.close()
    return ContactResponse(
        id=doc_id, name=data.name, email=data.email, phone=data.phone,
        subject=data.subject, message=data.message, created_at=created_at
    )

@api_router.get("/projects", response_model=List[ProjectResponse])
async def get_projects():
    conn = get_db()
    cur = conn.cursor()
    cur.execute('SELECT * FROM projects')
    rows = cur.fetchall()
    conn.close()
    
    projects = []
    for row in rows:
        proj = dict(row)
        proj['tags'] = json.loads(proj['tags'])
        proj['liveThumbnail'] = bool(proj['liveThumbnail'])
        projects.append(ProjectResponse(**proj))
    return projects

app.include_router(api_router)
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=['*'],
    allow_methods=["*"],
    allow_headers=["*"],
)
