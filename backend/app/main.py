from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pymupdf4llm
from io import TextIOWrapper

app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://localhost:8080",
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
    return {"text": "Hello World"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: str | None = None):
    return {"item_id": item_id, "q": q}

@app.post("/extract-text")
def extract_text_from_pdf(file: TextIOWrapper):
    text = pymupdf4llm.to_text(file)
    

