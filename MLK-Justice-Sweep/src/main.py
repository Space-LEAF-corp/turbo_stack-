
import importlib
try:

    yaml = importlib.import_module("yaml")
except ImportError:
    try:
        ruamel_yaml = importlib.import_module("ruamel.yaml")
        yaml = ruamel_yaml
    except ImportError:
        raise ImportError("PyYAML or ruamel.yaml is required. Install with 'pip install pyyaml' or 'pip install ruamel.yaml'.")
from typing import Any

from log_collector import collect_logs
from forward_pass import forward_pass
from reverse_pass import reverse_pass
from anomaly_merger import merge_anomalies
from integrity_vault import IntegrityVault
from turbo_satellite_client import TurboSatelliteClient
from jarvondis_adapter import JarvondisAdapter
from scheduler import run_infinity_loops


def load_config(path: str = "config/settings.yaml") -> dict[str, Any]:
    with open(path, "r", encoding="utf-8") as f:
        return yaml.safe_load(f)


def run_cycle(config: dict[str, Any]):
    # Function implementation below
    sources = [str(s) for s in config["log_sources"]]
    time_window: int = int(str(config["time_window_minutes"]))

    adapter = JarvondisAdapter(config["jarvondis"]["output_path"])
    entries = collect_logs(sources, time_window)

    # 2. Forward + Reverse passes
    forward_anoms = forward_pass(entries)
    reverse_anoms = reverse_pass(entries)

    # 3. Merge anomalies
    merged = merge_anomalies(forward_anoms, reverse_anoms)

    # 4. Integrity vault append
    vault = IntegrityVault(config["integrity_vault"]["path"])
    vault_records = vault.append_anomalies(merged)

    # 5. Satellite anchor (optional)
    if config["integrity_vault"].get("enable_satellite_anchor", False):
        sat_client = TurboSatelliteClient(
            endpoint=config["turbo_satellite"]["endpoint"],
            api_key_env_var=config["turbo_satellite"]["api_key_env_var"]
        )
        sat_client.anchor_records(vault_records)

    # 6. JARVONDIS output
    adapter.write_stream(merged)

    print(f"Cycle completed. Entries: {len(entries)}, Anomalies: {len(merged)}")


def main():
    config: dict[str, Any] = load_config()
    try:
        forward_interval = int(config["scheduling"]["infinity_loop_forward_seconds"])
    except (ValueError, TypeError, KeyError):
        forward_interval = 60  # default fallback
    try:
        reverse_interval = int(config["scheduling"]["infinity_loop_reverse_seconds"])
    except (ValueError, TypeError, KeyError):
        reverse_interval = 60  # default fallback

    def forward_only():
        # For now, entire cycle is run once;
        # you can separate forward/reverse logic if desired.
        run_cycle(config)

    def reverse_only():
        # In a more advanced design, you might re-run only reverse analysis.
        pass

    run_infinity_loops(
        forward_func=forward_only,
        reverse_func=reverse_only,
        forward_interval=forward_interval,
        reverse_interval=reverse_interval,
    )


if __name__ == "__main__":
    main()
