from datetime import timedelta
from random import randint

from src.core.config import settings
from src.core.redis import redis


def generate_name(email: str) -> str:
    return f'{settings.CODES_KEY}_{email}'


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


def delete_verify_code(email: str):
    redis.delete(generate_name(email))
