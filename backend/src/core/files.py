import os
import secrets

import aiofiles
from fastapi import UploadFile
from fastapi.responses import FileResponse

from src.core.config import settings


def generate_name(file_type: str):
    return f"{secrets.token_hex(nbytes=12)}.{file_type}"


def generate_unique_name(file: UploadFile):
    file_type = file.filename.split(".")[-1]
    filename = generate_name(file_type)
    while os.path.exists(os.path.join(settings.UPLOADS_PATH, filename)):
        filename = generate_name(file_type)
    return filename


async def save_files(files: list[UploadFile]) -> list[str]:
    filenames = []
    for file in files:
        filename = generate_unique_name(file)
        await save_file(file, filename)
        filenames.append(filename)
    return filenames


async def save_file(file: UploadFile, filename: str) -> None:
    async with aiofiles.open(os.path.join(settings.UPLOADS_PATH, filename), "wb") as out_file:
        content = await file.read()
        await out_file.write(content)


async def get_file(filename: str):
    if os.path.exists(os.path.join(settings.UPLOADS_PATH, filename)):
        return FileResponse(
            path=os.path.join(os.path.join(settings.UPLOADS_PATH, filename)),
            media_type="application/octet-stream",
            filename=filename,
        )
    return None
