def sponge_conversation(conversation_id: str):
    # Crypto-shred: delete the key, not just the rows
    key_id = get_conversation_key_id(conversation_id)
    delete_key_from_secure_store(key_id)

    # Optionally also remove ciphertext rows (defense in depth)
    delete_ciphertext_rows(conversation_id)


def periodic_sponge_job():
    for convo in list_conversations():
        if convo.expired():
            sponge_conversation(convo.id)
