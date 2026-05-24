import psutil


def get_memory_metrics():
    mem = psutil.virtual_memory()

    return {
        "total_gb": round(mem.total / (1024 ** 3), 2),
        "used_gb": round(mem.used / (1024 ** 3), 2),
        "percent": mem.percent
    }