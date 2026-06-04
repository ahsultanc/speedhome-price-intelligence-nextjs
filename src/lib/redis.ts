import "server-only";
import { Redis } from "@upstash/redis";

/**
 * Upstash Redis client — configured automatically from environment variables:
 *   UPSTASH_REDIS_REST_URL
 *   UPSTASH_REDIS_REST_TOKEN
 * (set in .env.local for local dev and in the Vercel project env for production).
 *
 * Server-only: never import this from a client component.
 */
export const redis = Redis.fromEnv();
