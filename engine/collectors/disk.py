import psutil


def get_disk_metrics():
    disk = psutil.disk_usage('/')

    return {
        "total_gb": round(disk.total / (1024 ** 3), 2),
        "used_gb": round(disk.used / (1024 ** 3), 2),
        "percent": disk.percent
    }