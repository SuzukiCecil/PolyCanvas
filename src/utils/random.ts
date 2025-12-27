/**
 * Mulberry32 シード付き乱数生成器
 * 再現可能な乱数列を生成
 */
export function createSeededRandom(seed: number): () => number {
  return function () {
    let t = (seed += 0x6d2b79f5)
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/**
 * ランダムシード生成
 */
export function generateSeed(): number {
  return Math.floor(Math.random() * 2147483647)
}

/**
 * URLパラメータからシードを取得
 * ?seed=1234 形式
 */
export function getSeedFromURL(): number | null {
  const params = new URLSearchParams(window.location.search)
  const seed = params.get('seed')
  if (seed) {
    const parsed = parseInt(seed, 10)
    if (!isNaN(parsed)) {
      return parsed
    }
  }
  return null
}
