from os import getenv
from logging import getLogger

logger = getLogger("uvicorn")

from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from sse_starlette.sse import EventSourceResponse
import aoai

app = FastAPI()


@app.get("/api/")
async def api_root():
    return {"message": "foo!"}


@app.get("/api/chat")
async def api_chat():
    messages = [{"role": "user", "content": "Hello!"}]  # Dummy text
    agen = await aoai.chat(messages)

    async def event_generator(agen):
        async for item in agen:
            choice = item.choices[0]
            if not choice.finish_reason:
                yield {"event": "new_message", "data": choice.delta}
            else:
                yield {"event": "end_event", "data": choice.delta}

    return EventSourceResponse(event_generator(agen))


# 本番環境では単一コンテナの App Service で動かすため、
# FastAPI 側で静的ファイルの配信も行う
STATIC_FILES_DIR = getenv("STATIC_FILES_DIR")
if STATIC_FILES_DIR:
    app.mount("/", StaticFiles(directory=STATIC_FILES_DIR, html=True))
