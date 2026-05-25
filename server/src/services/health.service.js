export function evaluateHealth(
  snapshot,
  alerts
) {

  let score = 100;

  if (
    snapshot.cpu.usage_percent > 80
  ) {
    score -= 25;
  }

  if (
    snapshot.memory.percent > 85
  ) {
    score -= 30;
  }

  if (
    snapshot.disk.percent > 90
  ) {
    score -= 20;
  }

  const criticalAlerts =
    alerts.filter(

      (alert) =>
        alert.level ===
        "CRITICAL"
    );

  score -= (
    criticalAlerts.length * 10
  );

  let status = "HEALTHY";

  if (score < 70) {
    status = "DEGRADED";
  }

  if (score < 40) {
    status = "CRITICAL";
  }

  return {

    score,
    status
  };
}