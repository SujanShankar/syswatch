export function formatPercentage(value) {
  return `${value}%`;
}

export function formatTimestamp(timestamp) {
  return new Date(timestamp).toLocaleString();
}