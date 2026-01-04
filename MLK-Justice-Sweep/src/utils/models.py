from dataclasses import dataclass
from typing import Dict, Any, Optional
import datetime


@dataclass
class LogEntry:
    timestamp: datetime.datetime
    source: str
    raw: str
    parsed: Dict[str, Any]


@dataclass
class Anomaly:
    id: str
    severity: str
    description: str
    timestamp: datetime.datetime
    related_entries: list[str]
    score: float
    metadata: Dict[str, Any]


@dataclass
class VaultRecord:
    index: int
    timestamp: datetime.datetime
    anomaly_id: str
    hash: str
    previous_hash: Optional[str]
