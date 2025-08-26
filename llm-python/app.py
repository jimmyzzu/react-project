import os
from typing import Optional
from fastapi import FastAPI
from pydantic import BaseModel
from transformers import pipeline
from dotenv import load_dotenv

load_dotenv()

MODEL_ID = os.getenv("MODEL_ID", "google/flan-t5-base")
TASK = os.getenv("TASK", "text2text-generation")
DEVICE = int(os.getenv("DEVICE", "-1"))  # -1: CPU

app = FastAPI(title="LLM Python Service")

_pipe = None

def get_pipe():
    global _pipe
    if _pipe is None:
        _pipe = pipeline(TASK, model=MODEL_ID, device=DEVICE)
    return _pipe

class CompleteReq(BaseModel):
    text: str
    max_new_tokens: Optional[int] = 128

@app.post("/complete")
def complete(req: CompleteReq):
    pipe = get_pipe()
    out = pipe(req.text, max_new_tokens=req.max_new_tokens)
    # transformers output varies per pipeline; normalize to string
    if isinstance(out, list) and len(out) > 0:
        item = out[0]
        if "generated_text" in item:
            return item["generated_text"]
        if "summary_text" in item:
            return item["summary_text"]
        if "text" in item:
            return item["text"]
    return str(out)


