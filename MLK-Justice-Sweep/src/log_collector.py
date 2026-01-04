import datetime
from typing import List
from pathlib import Path

from utils.models import LogEntry
from utils.time_utils import within_window


def parse_line(line: str, source: str) -> LogEntry:
    # Very simplistic parser; you can enhance this based on your real log formats.
    # Here we just attach the current time as a placeholder.
    return LogEntry(
        timestamp=datetime.datetime.now(datetime.timezone.utc),
        source=source,
        raw=line.strip(),
        parsed={"raw": line.strip(), "source": source},
    )


def collect_logs(sources: List[str], time_window_minutes: int) -> List[LogEntry]:
    entries: List[LogEntry] = []
    for src in sources:
        path = Path(src)
        if not path.exists():
            continue
        with path.open("r", encoding="utf-8", errors="ignore") as f:
            for line in f:
                entry = parse_line(line, source=src)
                if within_window(entry.timestamp, time_window_minutes):
                    entries.append(entry)
    return entries
