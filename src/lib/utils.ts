import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { Update } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const STORAGE_KEY = "updates:lastSeenAt";

export function getLastSeenAt(): number {
  if (typeof window === "undefined") return 0;
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? Number(raw) : 0;
}

export function hasUnreadUpdates(updates: Update[]): boolean {
  if (typeof window === "undefined") return false;

  const lastSeenAt = getLastSeenAt();

  return updates.some(
    (u) => u.createdAt.seconds * 1000 > lastSeenAt
  );
}