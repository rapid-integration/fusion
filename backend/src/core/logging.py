import logging
import os

from uvicorn.logging import ColourizedFormatter


class RelativePathFormatter(ColourizedFormatter):
    def formatMessage(self, record: logging.LogRecord) -> str:
        abs_path = record.pathname
        cwd = os.getcwd()
        record.pathname = os.path.relpath(abs_path, cwd)
        return super().formatMessage(record)
