import type { Cell, PolyCanvasSession, Vec2 } from '@/types'
import { createSeededRandom, generateSeed, getSeedFromURL } from '@/utils/random'
import { polygonCentroid } from '@/utils/geometry'
import { generatePoissonPoints } from './poissonDisk'
import { buildVoronoiPolygons } from './voronoi'
import { correctCells, hasSufficientCenterCells } from './cellCorrection'
import { PALETTE } from '@/constants/palette'
import { VISIBILITY_THRESHOLDS } from '@/constants/visibility'

const MAX_REGENERATION_ATTEMPTS = 10
const MIN_CELLS = 80
const MAX_CELLS = 180

/**
 * 幾何学模様を生成してセッションを初期化
 */
export function generatePattern(providedSeed?: number): PolyCanvasSession {
  const seed = providedSeed ?? getSeedFromURL() ?? generateSeed()
  let attempts = 0

  while (attempts < MAX_REGENERATION_ATTEMPTS) {
    const random = createSeededRandom(seed + attempts)

    // Poisson Disk Sampling
    const points = generatePoissonPoints(random)

    // Voronoi分割
    const polygons = buildVoronoiPolygons(points)

    // 形状補正
    const correctedPolygons = correctCells(polygons)

    // セル数チェック
    if (correctedPolygons.length < MIN_CELLS || correctedPolygons.length > MAX_CELLS) {
      attempts++
      continue
    }

    // Cell生成
    const cells: Cell[] = correctedPolygons.map((polygon, id) => ({
      id,
      polygon,
      centroid: polygonCentroid(polygon),
      painted: false,
      colorIndex: null,
    }))

    const center: Vec2 = { x: 0.5, y: 0.5 }

    // 中心セル数チェック
    if (!hasSufficientCenterCells(cells, center)) {
      attempts++
      continue
    }

    // セッション初期化
    return {
      meta: {
        seed,
        cellCount: cells.length,
        bounds: { minX: 0, maxX: 1, minY: 0, maxY: 1 },
      },
      cells,
      center,
      visibilityLevel: 0,
      visibleDistanceThreshold: VISIBILITY_THRESHOLDS[0],
      paintedCount: 0,
      totalCells: cells.length,
      finished: false,
      finishReason: null,
      palette: PALETTE,
    }
  }

  // 最大試行回数に達した場合、最後の試行結果を使用
  const random = createSeededRandom(seed)
  const points = generatePoissonPoints(random)
  const polygons = buildVoronoiPolygons(points)
  const correctedPolygons = correctCells(polygons)

  const cells: Cell[] = correctedPolygons.map((polygon, id) => ({
    id,
    polygon,
    centroid: polygonCentroid(polygon),
    painted: false,
    colorIndex: null,
  }))

  const center: Vec2 = { x: 0.5, y: 0.5 }

  return {
    meta: {
      seed,
      cellCount: cells.length,
      bounds: { minX: 0, maxX: 1, minY: 0, maxY: 1 },
    },
    cells,
    center,
    visibilityLevel: 0,
    visibleDistanceThreshold: VISIBILITY_THRESHOLDS[0],
    paintedCount: 0,
    totalCells: cells.length,
    finished: false,
    finishReason: null,
    palette: PALETTE,
  }
}
