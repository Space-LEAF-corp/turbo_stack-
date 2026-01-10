# Security Policies

## 1. Threat model

- **Adversaries:**
  - External attackers attempting unauthorized access.
  - Insiders attempting to erase or alter forensic evidence.
  - Malicious automation (bots, worms, scripts) attempting lateral movement.

- **Assets:**
  - Access logs, auth logs, system logs.
  - Configuration snapshots.
  - Integrity vault records.
  - Turbo Stack / Krystal Core anchor proofs.

- **Key goals:**
  - Detect anomalies and possible backdoors.
  - Preserve tamper-evident records.
  - Provide structured reports to appropriate entities.

## 2. Log integrity

- Log entries are:
  - Hashed with a cryptographic hash.
  - Linked via hash chains (each entry includes previous hash).
  - Optionally anchored via Turbo Stack Krystal Core satellite relay.

## 3. Least privilege

- Each component runs under a restricted role:
  - Collector: read-only on logs.
  - Analyzer: read-only on collected data.
  - Vault: append-only on integrity store.
  - Satellite client: outbound-only to trusted relay endpoints.

## 4. Privacy and governance

- Use only operationally necessary data in analysis.
- Document retention policies and deletion criteria.
- Any external reporting must comply with local laws and contracts.
