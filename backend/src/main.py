import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from src.api import api_router
from src.core.config import settings

if not os.path.exists(settings.UPLOADS_PATH):
    os.mkdir(settings.UPLOADS_PATH)

app = FastAPI(
    debug=settings.DEBUG,
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    redoc_url=None,
    docs_url="/docs" if settings.DEBUG else None,
    swagger_ui_parameters={"persistAuthorization": True},
)

app.mount("/uploads", StaticFiles(directory=settings.UPLOADS_PATH), name="uploads")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)
