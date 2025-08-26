# LLM Python Service (Hugging Face)

A minimal FastAPI service that exposes a /complete endpoint powered by Hugging Face Transformers.

## Quick start

1) Create and activate a virtualenv

```bash
python3 -m venv .venv
source .venv/bin/activate
```

2) Install dependencies

```bash
pip install -r requirements.txt
```

3) (Optional) Configure model via env

Set env vars or create a .env file similar to:

```
MODEL_ID=google/flan-t5-base
TASK=text2text-generation
DEVICE=-1
```

4) Run server

```bash
uvicorn app:app --host 0.0.0.0 --port 8010
```

5) Test

```bash
curl -X POST http://localhost:8010/complete \
  -H 'Content-Type: application/json' \
  -d '{"text":"Write a haiku about the ocean"}'
```

## Notes
- Default model: google/flan-t5-base (small, instruction-tuned, CPU friendly).
- First run will download the model to the Hugging Face cache (~1GB).
- To change model or device, set env vars shown above.

## Test snapshot:
![test](./resource/test.png)