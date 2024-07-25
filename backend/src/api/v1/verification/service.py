from datetime import timedelta
from random import randint
from typing import Any

from src.core.cache import redis, separate
from src.core.config import settings

__CACHE_KEY_PREFIX = "codes"


def set_code(email: str) -> int:
    code = generate_code()
    name = generate_code_key(email)
    redis.set(name, code)
    redis.expire(name, timedelta(minutes=settings.VERIFICATION_CODE_EXPIRE_MINUTES))
    return code


def get_code(email: str) -> Any:  # TODO: Use proper type conversion.
    return redis.get(generate_code_key(email))


def expire_code_if_valid(email: str, code: int) -> bool:
    is_valid = is_valid_code(email, code)
    if is_valid:
        expire_code(email)
    return is_valid


def is_valid_code(email: str, code: int) -> bool:
    cached_code = get_code(email)
    if cached_code:
        # TODO: Use proper type conversion.
        return int(cached_code) == code  # type: ignore
    return False


def generate_code() -> int:
    return randint(settings.VERIFICATION_CODE_MIN, settings.VERIFICATION_CODE_MAX)


def generate_code_key(email: str) -> str:
    return separate(__CACHE_KEY_PREFIX, email)


def expire_code(email: str) -> None:
    redis.delete(generate_code_key(email))
