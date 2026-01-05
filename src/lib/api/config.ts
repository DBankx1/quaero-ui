// lib/api/config.ts
export const API_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api",
  timeout: 10000, // 10 seconds
  headers: {
    "Content-Type": "application/json",
  },
} as const;

// Validate environment variables
if (!process.env.NEXT_PUBLIC_API_URL) {
  console.warn("⚠️ NEXT_PUBLIC_API_URL is not set, using default");
}
