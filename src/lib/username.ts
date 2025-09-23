export function generateUsername(
  name: string,
  email: string,
  attempt: number,
): string {
  let base = name.replace(/[^a-zA-Z0-9_]/g, "").toLowerCase();

  if (base.length < 3) {
    base = email
      .split("@")[0]
      .replace(/[^a-zA-Z0-9_]/g, "")
      .toLowerCase();
  }

  const minLen = 8;
  const maxLen = 15;

  let candidate = base;

  // First try → just clean base (trim if too long)
  if (attempt === 0) {
    candidate = base.slice(0, maxLen);
  } else {
    // Later retries → append something random/unique
    const chars = "0123456789_";
    const suffix = Array.from({ length: Math.min(3, attempt) }, () =>
      chars.charAt(Math.floor(Math.random() * chars.length)),
    ).join("");

    candidate = (base + suffix).slice(0, maxLen);
  }

  // Ensure minimum length
  if (candidate.length < minLen) {
    const padding = Math.random()
      .toString()
      .slice(2, minLen - candidate.length + 2);
    candidate = (candidate + padding).slice(0, maxLen);
  }

  return candidate;
}
