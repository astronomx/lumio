from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from postgrest.exceptions import APIError
from supabase import create_client, Client
from dotenv import load_dotenv

import pymupdf
import pymupdf4llm
import os
from pathlib import Path

ROOT_DIR = Path(__file__).resolve().parents[2]
load_dotenv(ROOT_DIR / ".env")
load_dotenv(ROOT_DIR / "frontend" / ".env.local")

app = FastAPI(root_path="/api")

def normalize_supabase_url(url: str) -> str:
    return url.rstrip("/").removesuffix("/rest/v1")

supabase_url = normalize_supabase_url(
    os.getenv("SUPABASE_URL") or os.getenv("NEXT_PUBLIC_SUPABASE_URL", "")
)
supabase_key = (
    os.getenv("SUPABASE_SERVICE_ROLE_KEY")
    or os.getenv("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY")
)

if not supabase_url or not supabase_key:
    raise RuntimeError("Missing Supabase environment variables")

supabase: Client = create_client(supabase_url, supabase_key)

origins = [
    "http://localhost:3000",
    "http://localhost:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "DELETE"],
    allow_headers=["*"],
)

def extract_pdf_text(file: UploadFile):
    # Reading uploaded file in bytes
    pdf_bytes = file.file.read()

    # Open the uploaded bytes as a PDF document
    doc = pymupdf.open(stream=pdf_bytes, filetype="pdf")

    try:
        # Extract text from PDF document
        return pymupdf4llm.to_text(doc)
    finally:
        doc.close()


@app.get("/")
def read_root():
    return {"text": "Hello world!"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: str | None = None):
    return {"item_id": item_id, "q": q}

@app.post("/extract-text")
def extract_text_from_pdf(file: UploadFile = File()):
    try:
        text = extract_pdf_text(file)
        return {"raw_text": text}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

class CreateStudySetRequest(BaseModel):
    title: str
    text: str
    user_id: str

@app.post("/create-study-set")
def create_study_set(payload: CreateStudySetRequest):
    try:
        data = supabase.table("study_sets").insert({
            "title": payload.title,
            "raw_text": payload.text,
            "user_id": payload.user_id,
        }).execute()
        return {"success": True, "data": data.data}
    except APIError as e:
        raise HTTPException(status_code=500, detail=e.message)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/get-study-sets")
def retrieve_study_sets(userId: str):
    try:
        data = supabase.table("study_sets").select("*").eq('user_id', userId).execute()

        return {"success": True, "data": data.data}
    except APIError as e:
        raise HTTPException(status_code=500, detail=e.message)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))




