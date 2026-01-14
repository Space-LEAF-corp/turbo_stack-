def send_message(recipient_id: str, plaintext: str):
    # 1. Geo-fence firewall
    if not krystal_core.is_location_allowed(current_location()):
        raise GeoFenceError("Sending blocked in this region")

    # 2. Load or establish secure session
    session = load_session(recipient_id)
    if session is None:
        session = establish_session(recipient_id)  # X25519 + double ratchet

    # 3. Encrypt message
    ciphertext, header = session.encrypt(plaintext)

    # 4. Build minimal metadata
    envelope = {
        "routing_id": derive_routing_id(recipient_id),
        "ciphertext": ciphertext,
        "header": header,  # ratchet header, no plaintext
        "timestamp_bucket": bucketize_timestamp(now()),
        "region_bucket": bucketize_region(current_location()),
    }

    # 5. Send to satellite uplink
    sat_uplink.send(envelope)


def receive_message(envelope):
    session = load_session_from_header(envelope["header"])
    plaintext = session.decrypt(envelope["ciphertext"], envelope["header"])

    # Store locally in encrypted DB
    store_encrypted_message(
        conversation_id=session.conversation_id,
        ciphertext=envelope["ciphertext"],
        header=envelope["header"],
        ttl=get_conversation_ttl(session.conversation_id),
    )

    return plaintext
