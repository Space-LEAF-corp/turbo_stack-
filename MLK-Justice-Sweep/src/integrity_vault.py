import json
from pathlib import Path
from typing import List, Optional

from utils.models import Anomaly, VaultRecord
from utils.hashing import sha256_json
from utils.time_utils import now_utc


class IntegrityVault:
    def __init__(self, path: str):
        self.path = Path(path)
        self.path.parent.mkdir(parents=True, exist_ok=True)

    def _load_last_record(self) -> Optional[VaultRecord]:
        if not self.path.exists():
            return None
        last_line = None
        with self.path.open("r", encoding="utf-8") as f:
            for last_line in f:
                pass
        if last_line is None:
            return None
        data = json.loads(last_line)
        return VaultRecord(
            index=data["index"],
            timestamp=now_utc(),  # replay accurate timestamp not critical here
            anomaly_id=data["anomaly_id"],
            hash=data["hash"],
            previous_hash=data["previous_hash"],
        )

    def append_anomalies(self, anomalies: List[Anomaly]) -> List[VaultRecord]:
        last = self._load_last_record()
        last_hash = last.hash if last else None
        index_start = last.index + 1 if last else 0

        from typing import Dict, Any

        records: List[VaultRecord] = []
        with self.path.open("a", encoding="utf-8") as f:
            for i, a in enumerate(anomalies):
                payload: Dict[str, Any] = {
                    "anomaly_id": a.id,
                    "severity": a.severity,
                    "description": a.description,
                    "timestamp": a.timestamp.isoformat(),
                    "score": a.score,
                    "metadata": a.metadata,
                }
                combined: Dict[str, Any] = {
                    "index": index_start + i,
                    "payload": payload,
                    "previous_hash": last_hash,
                }
                record_hash = sha256_json(combined)
                from typing import Union
                record: dict[str, Union[str, int, None]] = {
                    "index": index_start + i,
                    "anomaly_id": a.id,
                    "hash": record_hash,
                    "previous_hash": last_hash,
                }
                f.write(json.dumps(record) + "\n")
                records.append(
                    VaultRecord(
                        index=index_start + i,
                        timestamp=now_utc(),
                        anomaly_id=a.id,
                        hash=record_hash,
                        previous_hash=last_hash,
                    )
                )
                last_hash = record_hash
        return records
