import psutil
import time


def get_uptime_hours():

    uptime_seconds = (
        time.time() -
        psutil.boot_time()
    )

    uptime_hours = round(
        uptime_seconds / 3600,
        2
    )

    return uptime_hours