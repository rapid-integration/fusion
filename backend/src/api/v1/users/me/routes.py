from fastapi import APIRouter, File, HTTPException, UploadFile, status

from src.api.deps import Session
from src.api.v1.users.deps import CurrentUser
from src.api.v1.users.me.schemas import CurrentUserResponse
from src.api.v1.users.models import User
from src.api.v1.users.schemas import UserEmail, UserPassword
from src.api.v1.users.service import is_email_registered, update_avatar, update_email, update_password, verify_user
from src.api.v1.verification.schemas import Code
from src.api.v1.verification.service import expire_code_if_valid
from src.core.config import settings
from src.core.files import check_file_size, image_cropping

router = APIRouter(prefix="/me")


@router.get("", response_model=CurrentUserResponse)
def get_current_user(current_user: CurrentUser) -> User:
    return current_user


@router.patch("/verify", response_model=CurrentUserResponse)
def verify_current_user(current_user: CurrentUser, schema: Code, session: Session) -> User:
    if current_user.is_verified:
        raise HTTPException(status.HTTP_422_UNPROCESSABLE_ENTITY, "User has already been verified")
    if not expire_code_if_valid(current_user.email, schema.code):
        raise HTTPException(status.HTTP_406_NOT_ACCEPTABLE, "The code is invalid")

    verify_user(session, current_user)
    return current_user


@router.patch("/email", response_model=CurrentUserResponse)
def update_current_user_email(current_user: CurrentUser, schema: UserEmail, session: Session) -> User:
    if is_email_registered(session, schema.email):
        raise HTTPException(status.HTTP_400_BAD_REQUEST, "Email is already taken")

    update_email(session, current_user, schema.email)
    return current_user


@router.patch("/password", response_model=CurrentUserResponse)
def update_current_user_password(current_user: CurrentUser, schema: UserPassword, session: Session) -> User:
    update_password(session, current_user, schema.password)
    return current_user


@router.patch("/image", response_model=CurrentUserResponse)
async def update_current_user_avatar(current_user: CurrentUser, session: Session, file: UploadFile = File(...)):
    is_correct_size = await check_file_size(file, settings.MAX_AVATAR_SIZE)
    if not is_correct_size:
        raise HTTPException(status.HTTP_413_REQUEST_ENTITY_TOO_LARGE, f"File size exceeded maximum avatar size: {settings.MAX_AVATAR_SIZE} bytes")

    if "image" not in file.content_type:
        raise HTTPException(status.HTTP_415_UNSUPPORTED_MEDIA_TYPE, "Unsupported avatar image type. Make sure you're uploading a correct file")

    image_url = image_cropping(file)
    if image_url is None:
        raise HTTPException(status.HTTP_422_UNPROCESSABLE_ENTITY, "Exception occurred whilst attempting to crop image. Make sure your file has no defects")

    update_avatar(session, current_user, image_url)
    return current_user
