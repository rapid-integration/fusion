import os
import secrets

import aiofiles
from fastapi import UploadFile
from fastapi.responses import FileResponse
from PIL import Image

from src.core.config import settings


def generate_name(file_type: str):
    return f"{secrets.token_hex(nbytes=12)}.{file_type}"


def generate_unique_name(file: UploadFile):
    file_type = file.filename.split(".")[-1]  # type: ignore
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


def crop_image_to_square(file: UploadFile) -> Image | None:
    try:
        image = Image.open(file.file)
        width, height = image.size
        new_side = min(width, height)
        left = (width - new_side) / 2
        top = (height - new_side) / 2
        right = (width + new_side) / 2
        bottom = (height + new_side) / 2
        cropped_image = image.crop((left, top, right, bottom))
        return cropped_image

    except Exception:
        return None


def generate_cropped_image(file: UploadFile) -> str | None:
    cropped_image = crop_image_to_square(file)
    if cropped_image:
        filename = generate_unique_name(file)
        cropped_image.save(os.path.join(settings.UPLOADS_PATH, filename))
        return filename
    return None


async def check_file_size(file: UploadFile, max_size: int) -> bool:
    contents = await file.read()
    return len(contents) < max_size


def check_is_image(file: UploadFile) -> bool:
    return "image" in file.content_type


def delete_file(filename: str) -> None:
    if os.path.exists(os.path.join(settings.UPLOADS_PATH, filename)):
        os.remove(os.path.join(settings.UPLOADS_PATH, filename))
