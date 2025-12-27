import type { Vec2 } from '@/types'

/**
 * Poisson Disk Sampling
 * 均等に分布したランダム点群を生成
 */
export function generatePoissonPoints(
  random: () => number,
  minDist: number = 0.07,
  maxAttempts: number = 30
): Vec2[] {
  const cellSize = minDist / Math.SQRT2
  const gridWidth = Math.ceil(1 / cellSize)
  const gridHeight = Math.ceil(1 / cellSize)
  const grid: (Vec2 | null)[][] = Array.from({ length: gridWidth }, () =>
    Array(gridHeight).fill(null)
  )

  const points: Vec2[] = []
  const activeList: Vec2[] = []

  // 初期点（中央付近）
  const firstPoint: Vec2 = { x: 0.5, y: 0.5 }
  points.push(firstPoint)
  activeList.push(firstPoint)

  const gx = Math.floor(firstPoint.x / cellSize)
  const gy = Math.floor(firstPoint.y / cellSize)
  if (gx >= 0 && gx < gridWidth && gy >= 0 && gy < gridHeight) {
    grid[gx][gy] = firstPoint
  }

  while (activeList.length > 0) {
    const idx = Math.floor(random() * activeList.length)
    const point = activeList[idx]
    let found = false

    for (let k = 0; k < maxAttempts; k++) {
      const angle = random() * 2 * Math.PI
      const r = minDist * (1 + random())
      const newPoint: Vec2 = {
        x: point.x + r * Math.cos(angle),
        y: point.y + r * Math.sin(angle),
      }

      // 境界チェック
      if (
        newPoint.x < 0 ||
        newPoint.x >= 1 ||
        newPoint.y < 0 ||
        newPoint.y >= 1
      ) {
        continue
      }

      const ngx = Math.floor(newPoint.x / cellSize)
      const ngy = Math.floor(newPoint.y / cellSize)

      // 近傍チェック
      let tooClose = false
      for (let i = -2; i <= 2 && !tooClose; i++) {
        for (let j = -2; j <= 2 && !tooClose; j++) {
          const cx = ngx + i
          const cy = ngy + j
          if (cx >= 0 && cx < gridWidth && cy >= 0 && cy < gridHeight) {
            const neighbor = grid[cx][cy]
            if (neighbor) {
              const dx = neighbor.x - newPoint.x
              const dy = neighbor.y - newPoint.y
              if (dx * dx + dy * dy < minDist * minDist) {
                tooClose = true
              }
            }
          }
        }
      }

      if (!tooClose) {
        points.push(newPoint)
        activeList.push(newPoint)
        if (ngx >= 0 && ngx < gridWidth && ngy >= 0 && ngy < gridHeight) {
          grid[ngx][ngy] = newPoint
        }
        found = true
        break
      }
    }

    if (!found) {
      activeList.splice(idx, 1)
    }
  }

  return points
}
