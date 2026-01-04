import datetime
from typing import Optional


def now_utc() -> datetime.datetime:
    return datetime.datetime.now(datetime.timezone.utc)


def within_window(ts: datetime.datetime, minutes: int, reference: Optional[datetime.datetime] = None) -> bool:
    if reference is None:
        reference = now_utc()
    delta = reference - ts
    return datetime.timedelta(minutes=0) <= delta <= datetime.timedelta(minutes=minutes)
