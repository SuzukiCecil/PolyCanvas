import type { Vec2, Cell } from '@/types'
import { polygonArea, polygonCentroid, aspectRatio, distance } from '@/utils/geometry'

const MIN_AREA_RATIO = 1 / 700
const MAX_ASPECT_RATIO = 3.0
const MAX_AREA_MULTIPLIER = 5
const BOUNDARY_DISTANCE = 0.1

/**
 * 形状補正：小セル・細長セル・巨大セルを除外
 */
export function correctCells(polygons: Vec2[][]): Vec2[][] {
  const center: Vec2 = { x: 0.5, y: 0.5 }

  // 有効なポリゴンのみフィルタリング
  const validPolygons = polygons.filter((poly) => poly.length >= 3)

  // 平均面積を計算
  const areas = validPolygons.map((p) => polygonArea(p))
  const totalArea = areas.reduce((a, b) => a + b, 0)
  const avgArea = totalArea / areas.length

  // フィルタリング
  const corrected = validPolygons.filter((poly, i) => {
    const area = areas[i]
    const centroid = polygonCentroid(poly)
    const distFromCenter = distance(centroid, center)

    // 小セル除外
    if (area < MIN_AREA_RATIO) {
      return false
    }

    // 細長セル除外
    if (aspectRatio(poly) > MAX_ASPECT_RATIO) {
      return false
    }

    // 境界の巨大セル除外
    if (
      distFromCenter > 1 - BOUNDARY_DISTANCE &&
      area > avgArea * MAX_AREA_MULTIPLIER
    ) {
      return false
    }

    return true
  })

  return corrected
}

/**
 * 中心付近に十分なセルがあるか確認
 */
export function hasSufficientCenterCells(
  cells: Cell[],
  center: Vec2,
  radius: number = 0.1,
  minCount: number = 6
): boolean {
  const centerCells = cells.filter(
    (cell) => distance(cell.centroid, center) <= radius
  )
  return centerCells.length >= minCount
}
