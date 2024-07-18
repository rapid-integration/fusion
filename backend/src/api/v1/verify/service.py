from datetime import timedelta
from random import randint

from sqlalchemy.orm import Session

from src.api.v1.auth.models import User
from src.core.config import settings
from src.core.redis import redis
from src.core.security import get_password_hash


def get_user_by_email(session: Session, email: str) -> User | None:
    return session.query(User).filter(User.email == email).first()


def generate_name(email: str) -> str:
    return f'{settings.CODES_KEY}_{email}'


def delete_verify_code(email: str):
    redis.delete(generate_name(email))


def generate_verify_code(email: str) -> int:
    code = randint(settings.MIN_NUM_FOR_VERIFY_CODE, settings.MAX_NUM_FOR_VERIFY_CODE)
    name = generate_name(email)
    redis.set(name, code)
    redis.expire(name, timedelta(minutes=settings.EMAIL_VERIFY_CODE_EXPIRE_MINUTES))
    return code


def check_verify_code(email: str, user_code: int) -> bool | None:
    code = redis.get(generate_name(email))
    if code is not None:
        return int(code) == user_code
    return None


def verify_email(session: Session, user: User) -> None:
    user.is_verified = True
    session.commit()
    delete_verify_code(user.email)


def reset_password(session: Session, user: User, new_password: str) -> None:
    hashed_password = get_password_hash(password=new_password)
    user.password = hashed_password
    session.commit()
    delete_verify_code(user.email)


def reset_email(session: Session, user: User, new_email: str) -> None:
    user.email = new_email
    user.is_verified = False
    session.commit()
    delete_verify_code(user.email)
