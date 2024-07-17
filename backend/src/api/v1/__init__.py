from fastapi import APIRouter

from src.api.v1 import auth, uploads, users, verify

v1_router = APIRouter(prefix="/v1")

v1_router.include_router(auth.router)
v1_router.include_router(users.router)
v1_router.include_router(uploads.router)
v1_router.include_router(verify.router)

__all__ = [
    "v1_router",
]
