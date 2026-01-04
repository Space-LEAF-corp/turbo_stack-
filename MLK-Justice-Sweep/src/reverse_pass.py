from typing import List
from utils.models import LogEntry, Anomaly
from utils.time_utils import now_utc


def reverse_pass(entries: List[LogEntry]) -> List[Anomaly]:
    """
    Reverse-time anomaly detection.
    Here we process entries in reverse order to find unusual sequences.
    """
    anomalies: List[Anomaly] = []
    reversed_entries = list(reversed(entries))

    for i, e in enumerate(reversed_entries):
        # Example heuristic: search for "sudo" or "root" escalations
        if "sudo" in e.raw.lower() or "root" in e.raw.lower():
            anomalies.append(
                Anomaly(
                    id=f"rv-{i}",
                    severity="high",
                    description="Privilege-related event detected in reverse pass",
                    timestamp=now_utc(),
                    related_entries=[e.raw],
                    score=0.8,
                    metadata={"source": e.source, "direction": "reverse"},
                )
            )
    return anomalies
