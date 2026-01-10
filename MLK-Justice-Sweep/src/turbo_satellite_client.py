import os
import json
from typing import List, Dict, Any
import urllib.request

from utils.models import VaultRecord


class TurboSatelliteClient:
    """
    Represents the Turbo Stack Krystal Core satellite relay.

    In reality, this would use proper auth / TLS / retries.
    Here we use a simple HTTP POST to symbolize anchoring.
    """

    def __init__(self, endpoint: str, api_key_env_var: str):
        self.endpoint = endpoint
        self.api_key = os.getenv(api_key_env_var)

    def anchor_records(self, records: List[VaultRecord]) -> Dict[str, Any]:
        if not self.api_key:
            return {"status": "skipped", "reason": "No API key set"}

        payload: Dict[str, Any] = {
            "api_key": self.api_key,
            "records": [
                {"index": r.index, "hash": r.hash, "previous_hash": r.previous_hash}
                for r in records
            ],
        }
        data = json.dumps(payload).encode("utf-8")
        req = urllib.request.Request(
            self.endpoint,
            data=data,
            headers={"Content-Type": "application/json"},
            method="POST",
        )
        try:
            with urllib.request.urlopen(req, timeout=10) as resp:
                body = resp.read().decode("utf-8")
                return {"status": "ok", "response": body}
        except Exception as e:
            return {"status": "error", "error": str(e)}
