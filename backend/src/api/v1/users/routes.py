from fastapi import APIRouter

from src.api.deps import Session
from src.api.v1.users.schemas import UserEmail
from src.api.v1.users.service import is_email_registered

router = APIRouter(prefix="/users", tags=["Users"])


@router.post("/exists")
def user_exists(schema: UserEmail, session: Session) -> bool:
    return is_email_registered(session, schema.email)
