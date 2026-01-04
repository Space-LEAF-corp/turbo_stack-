import json
from pathlib import Path
from typing import List

from utils.models import Anomaly


class JarvondisAdapter:
    """
    Converts merged anomalies into a stream format that
    JARVONDIS can consume (story, game engine, or analytics).
    """

    def __init__(self, output_path: str):
        self.path = Path(output_path)
        self.path.parent.mkdir(parents=True, exist_ok=True)

    def write_stream(self, anomalies: List[Anomaly]) -> None:
        from typing import Dict, Any
        with self.path.open("a", encoding="utf-8") as f:
            for a in anomalies:
                record: Dict[str, Any] = {
                    "id": a.id,
                    "severity": a.severity,
                    "description": a.description,
                    "timestamp": a.timestamp.isoformat(),
                    "score": a.score,
                    "metadata": a.metadata,
                    "related_entries": a.related_entries,
                }
                f.write(json.dumps(record) + "\n")
