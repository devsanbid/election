/**
 * Lightweight in-memory LRU image cache for serverless warm instances.
 * Shared across both symbol and candidate-photo proxy routes.
 *
 * - Max entries: 500 (~15-25 KB each ≈ 10-12 MB RAM)
 * - TTL: 10 hour (images rarely change)
 * - LRU eviction when full
 */

const MAX_ENTRIES = 500;
const TTL = 60 * 60 * 10000; // 1 hour

// Map<key, { buf: ArrayBuffer, type: string, ts: number }>
const cache = new Map();

export function getImage(key) {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.ts > TTL) {
    cache.delete(key);
    return null;
  }
  // Move to end (most-recently-used)
  cache.delete(key);
  cache.set(key, entry);
  return entry;
}

export function setImage(key, buf, contentType) {
  // Evict oldest if at capacity
  if (cache.size >= MAX_ENTRIES) {
    const oldest = cache.keys().next().value;
    cache.delete(oldest);
  }
  cache.set(key, { buf, type: contentType, ts: Date.now() });
}

export function cacheStats() {
  return { size: cache.size, max: MAX_ENTRIES };
}
