import json
import sys

from datetime import (
    datetime,
    UTC
)

THRESHOLDS = {
    "cpu_usage_percent": {
        "warn": 80,
        "critical": 95
    },

    "memory_percent": {
        "warn": 85,
        "critical": 95
    },

    "disk_percent": {
        "warn": 80,
        "critical": 90
    },
}


def evaluate_metrics(snapshot):

    alerts = []

    checks = [

        (
            "cpu_usage_percent",
            snapshot["cpu"]["usage_percent"]
        ),

        (
            "memory_percent",
            snapshot["memory"]["percent"]
        ),

        (
            "disk_percent",
            snapshot["disk"]["percent"]
        ),
    ]

    for metric_key, value in checks:

        rule = THRESHOLDS[
            metric_key
        ]

        if value >= rule["critical"]:

            level = "CRITICAL"

        elif value >= rule["warn"]:

            level = "WARNING"

        else:
            continue

        alerts.append({

            "metric": metric_key,

            "value": value,

            "level": level,

            "threshold":
                rule[
                    level.lower()
                ],

            "message":
                f"{metric_key} "
                f"is at {value}%",

            "triggered_at":
                datetime.now(
                    UTC
                ).isoformat(),

            "status": "OPEN"
        })

    return alerts


if __name__ == "__main__":

    snapshot = json.loads(
        sys.argv[1]
    )

    results = evaluate_metrics(
        snapshot
    )

    print(
        json.dumps(
            results
        )
    )