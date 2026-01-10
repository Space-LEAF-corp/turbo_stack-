import hashlib
import json
from typing import Any


def sha256_json(obj: Any) -> str:
    """
    Create a stable SHA-256 hash of a JSON-serializable object.
    """
    canonical = json.dumps(obj, sort_keys=True, separators=(",", ":"))
    return hashlib.sha256(canonical.encode("utf-8")).hexdigest()
