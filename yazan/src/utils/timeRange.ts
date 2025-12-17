export function getTimeRange(range: "30m" | "2h" | "24h") {
  const now = Date.now();

  switch (range) {
    case "30m":
      return { from: now - 30 * 60 * 1000, to: now };
    case "2h":
      return { from: now - 2 * 60 * 60 * 1000, to: now };
    case "24h":
      return { from: now - 24 * 60 * 60 * 1000, to: now };
  }
}
