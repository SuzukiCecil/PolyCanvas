import { Delaunay } from 'd3-delaunay'
import type { Vec2 } from '@/types'

/**
 * Voronoi分割で多角形セルを生成
 */
export function buildVoronoiPolygons(points: Vec2[]): Vec2[][] {
  if (points.length === 0) return []

  // d3-delaunayはフラットな座標配列を期待
  const coords = new Float64Array(points.length * 2)
  for (let i = 0; i < points.length; i++) {
    coords[i * 2] = points[i].x
    coords[i * 2 + 1] = points[i].y
  }

  const delaunay = new Delaunay(coords)
  const voronoi = delaunay.voronoi([0, 0, 1, 1])

  const polygons: Vec2[][] = []

  for (let i = 0; i < points.length; i++) {
    const polygon = voronoi.cellPolygon(i)
    if (!polygon || polygon.length === 0) {
      polygons.push([])
      continue
    }

    // d3-delaunayは最後の点が最初の点と同じなので除外
    const verts: Vec2[] = []
    for (let j = 0; j < polygon.length - 1; j++) {
      verts.push({ x: polygon[j][0], y: polygon[j][1] })
    }
    polygons.push(verts)
  }

  return polygons
}
