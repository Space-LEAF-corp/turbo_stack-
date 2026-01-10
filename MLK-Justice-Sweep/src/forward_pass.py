from typing import List
from utils.models import LogEntry, Anomaly
from utils.time_utils import now_utc


def forward_pass(entries: List[LogEntry]) -> List[Anomaly]:
    """
    Forward-time anomaly detection.
    Very simple heuristics for now; you can enhance these.
    """
    anomalies: List[Anomaly] = []
    for i, e in enumerate(entries):
        # Example heuristic: search for "failed" in auth logs
        if "failed" in e.raw.lower() or "error" in e.raw.lower():
            anomalies.append(
                Anomaly(
                    id=f"fw-{i}",
                    severity="medium",
                    description="Suspicious log message detected in forward pass",
                    timestamp=now_utc(),
                    related_entries=[e.raw],
                    score=0.5,
                    metadata={"source": e.source, "direction": "forward"},
                )
            )
    return anomalies
