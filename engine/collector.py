import json
import platform
from datetime import datetime, UTC

from collectors.cpu import (
    get_cpu_metrics
)

from collectors.memory import (
    get_memory_metrics
)

from collectors.disk import (
    get_disk_metrics
)

from collectors.uptime import (
    get_uptime_hours
)


def get_os_info():
    return {
        "os": platform.system(),
        "version": platform.version(),
        "hostname": platform.node(),
        "architecture": platform.machine()
    }


def collect_snapshot():
    return {
        "timestamp": (
            datetime.now(UTC).isoformat()
        ),

        "cpu": (
            get_cpu_metrics()
        ),

        "memory": (
            get_memory_metrics()
        ),

        "disk": (
            get_disk_metrics()
        ),

        "uptime_hours": (
            get_uptime_hours()
        ),

        "os_info": (
            get_os_info()
        ),

        "boot_logs": [
            "Boot logs unavailable on Windows"
        ]
    }


if __name__ == "__main__":
    print(
        json.dumps(
            collect_snapshot(),
            indent=2
        )
    )