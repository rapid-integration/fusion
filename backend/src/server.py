from logging.config import dictConfig as configure_logging

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from src.api import api_router
from src.config import settings

configure_logging(settings.logging)

app = FastAPI(
    debug=settings.debug,
    title=settings.app.name,
    version=settings.app.version,
    redoc_url=None,
    docs_url="/docs" if settings.debug else None,
    swagger_ui_parameters={"persistAuthorization": True},
)

app.mount("/uploads", StaticFiles(directory=settings.path.uploads))

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)
