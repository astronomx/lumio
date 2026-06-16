from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from supabase import create_client, Client
from dotenv import load_dotenv
from datetime import datetime

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


@app.get("/")
def read_root():
    return {"text": "Hello world!"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: str | None = None):
    return {"item_id": item_id, "q": q}

@app.post("/extract-text")
def extract_text_from_pdf(file, title: str):
    text = pymupdf4llm.to_text(file)
    
    data = supabase.table("study_sets").insert({
        "title": title,
        "raw_text": text
    }).execute()

    return data


