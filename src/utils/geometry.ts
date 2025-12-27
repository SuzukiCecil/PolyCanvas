import type { Vec2 } from '@/types'

/**
 * 2点間の距離を計算
 */
export function distance(a: Vec2, b: Vec2): number {
  const dx = a.x - b.x
  const dy = a.y - b.y
  return Math.sqrt(dx * dx + dy * dy)
}

/**
 * 多角形の面積を計算（Shoelace formula）
 */
export function polygonArea(polygon: Vec2[]): number {
  if (polygon.length < 3) return 0

  let area = 0
  for (let i = 0; i < polygon.length; i++) {
    const j = (i + 1) % polygon.length
    area += polygon[i].x * polygon[j].y
    area -= polygon[j].x * polygon[i].y
  }
  return Math.abs(area) / 2
}

/**
 * 多角形の重心を計算
 */
export function polygonCentroid(polygon: Vec2[]): Vec2 {
  if (polygon.length === 0) return { x: 0, y: 0 }
  if (polygon.length < 3) {
    // 点や線分の場合は平均を返す
    const sumX = polygon.reduce((s, p) => s + p.x, 0)
    const sumY = polygon.reduce((s, p) => s + p.y, 0)
    return { x: sumX / polygon.length, y: sumY / polygon.length }
  }

  let area = 0
  let cx = 0
  let cy = 0

  for (let i = 0; i < polygon.length; i++) {
    const p1 = polygon[i]
    const p2 = polygon[(i + 1) % polygon.length]
    const cross = p1.x * p2.y - p2.x * p1.y
    area += cross
    cx += (p1.x + p2.x) * cross
    cy += (p1.y + p2.y) * cross
  }

  area *= 0.5
  if (Math.abs(area) < 1e-10) {
    // 面積がほぼ0の場合は平均を返す
    const sumX = polygon.reduce((s, p) => s + p.x, 0)
    const sumY = polygon.reduce((s, p) => s + p.y, 0)
    return { x: sumX / polygon.length, y: sumY / polygon.length }
  }

  const factor = 1 / (6 * area)
  return { x: cx * factor, y: cy * factor }
}

/**
 * 多角形のアスペクト比（外接矩形の縦横比）
 */
export function aspectRatio(polygon: Vec2[]): number {
  if (polygon.length < 2) return 1

  const xs = polygon.map((p) => p.x)
  const ys = polygon.map((p) => p.y)
  const w = Math.max(...xs) - Math.min(...xs)
  const h = Math.max(...ys) - Math.min(...ys)

  if (Math.min(w, h) < 1e-10) return Infinity
  return Math.max(w, h) / Math.min(w, h)
}

/**
 * 点が多角形内にあるか判定（Ray casting algorithm）
 */
export function isPointInPolygon(point: Vec2, polygon: Vec2[]): boolean {
  if (polygon.length < 3) return false

  let inside = false
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i].x
    const yi = polygon[i].y
    const xj = polygon[j].x
    const yj = polygon[j].y

    if (
      yi > point.y !== yj > point.y &&
      point.x < ((xj - xi) * (point.y - yi)) / (yj - yi) + xi
    ) {
      inside = !inside
    }
  }
  return inside
}
