from os import getenv
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

app = FastAPI()


@app.get("/api/")
async def api_root():
    return {"message": "foo!"}


# 本番環境では単一コンテナの App Service で動かすため、
# FastAPI 側で静的ファイルの配信も行う
STATIC_FILES_DIR = getenv("STATIC_FILES_DIR")
if STATIC_FILES_DIR:
    app.mount("/", StaticFiles(directory=STATIC_FILES_DIR))
