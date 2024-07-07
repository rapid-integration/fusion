from fastapi import APIRouter, UploadFile, status, HTTPException

from src.core.files import save_files, get_file

router = APIRouter(prefix="/uploads", tags=["Uploads"])


@router.post("", status_code=status.HTTP_201_CREATED)
async def upload_files(files: list[UploadFile]):
    filenames = await save_files(files)
    return {"filenames": filenames}


@router.get("/{filename}")
async def download_file(filename: str):
    file = await get_file(filename)
    if file is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "File not found")
    return file
