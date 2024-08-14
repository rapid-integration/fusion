from fastapi import APIRouter, HTTPException, status
from fastapi.responses import FileResponse

from src.storage import fs

router = APIRouter(prefix="/uploads", tags=["Uploads"])


@router.get("/{name}")
def get_file(name: str):
    if not fs.exists(name):
        raise HTTPException(status.HTTP_404_NOT_FOUND, "File not found")

    path = fs.get_system_path(name)
    return FileResponse(path=path, media_type="application/octet-stream", filename=name)
