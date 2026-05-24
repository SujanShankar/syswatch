import psutil


def get_cpu_metrics():
    freq = psutil.cpu_freq()

    return {
        "usage_percent": psutil.cpu_percent(interval=1),
        "core_count": psutil.cpu_count(),
        "freq_mhz": (
            round(freq.current, 2)
            if freq
            else None
        )
    }