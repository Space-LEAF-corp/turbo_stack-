from typing import List
from utils.models import Anomaly


def merge_anomalies(forward: List[Anomaly], reverse: List[Anomaly]) -> List[Anomaly]:
    """
    Merge forward and reverse anomalies into a single stream.
    Basic deduplication by identical description + related_entries.
    """
    merged: List[Anomaly] = []
    seen_signatures: set[str] = set()

    def signature(a: Anomaly) -> str:
        key = (a.description, tuple(sorted(a.related_entries)))
        return str(key)

    for group in (forward, reverse):
        for a in group:
            sig = signature(a)
            if sig not in seen_signatures:
                seen_signatures.add(sig)
                merged.append(a)
    return merged
