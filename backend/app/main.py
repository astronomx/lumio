from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from supabase import create_client, Client
from dotenv import load_dotenv

import pymupdf
import pymupdf4llm
import os

load_dotenv();

app = FastAPI(root_path="/api")

supabase_url = os.getenv("NEXT_PUBLIC_SUPABASE_URL")
supabase_key = os.getenv("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY")

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
        return {"error": str(e)}

@app.post("/create-study-set")
def create_study_set(title: str, text: str):

    data = supabase.table("study_sets").insert({
        "title": title,
        "raw_text": text
    }).execute()

    return data



