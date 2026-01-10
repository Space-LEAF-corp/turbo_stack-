import time
from typing import Callable


def run_infinity_loops(
    forward_func: Callable[[], None],
    reverse_func: Callable[[], None],
    forward_interval: float,
    reverse_interval: float,
):
    """
    Symbolic infinity loops:
    - Forward pass every forward_interval seconds.
    - Reverse pass every reverse_interval seconds.
    For simplicity, we just call them once here; in a real system, you'd
    keep these running in their own scheduler or service.
    """
    # Forward
    time.sleep(forward_interval)
    forward_func()

    # Reverse
    time.sleep(reverse_interval)
    reverse_func()
