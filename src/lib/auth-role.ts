export type AppRole = "admin" | "user";

export function normalizeAppRole(value: unknown): AppRole {
  if (value === "admin") {
    return "admin";
  }

  return "user";
}
