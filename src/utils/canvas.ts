import type { Vec2, Cell, PolyCanvasSession } from '@/types'
import { distance } from './geometry'

/** 市松模様パターンを作成（キャンバスサイズに応じてスケール） */
const checkerboardPatternCache = new Map<number, CanvasPattern | null>()

function getCheckerboardPattern(ctx: CanvasRenderingContext2D, canvasSize: number): CanvasPattern | null {
  // キャンバスサイズに応じたパターンサイズ（400px基準で8px）
  const baseSize = 8
  const baseCanvasSize = 400
  const size = Math.round(baseSize * (canvasSize / baseCanvasSize))

  if (checkerboardPatternCache.has(size)) {
    return checkerboardPatternCache.get(size) || null
  }

  const canvas = document.createElement('canvas')
  canvas.width = size * 2
  canvas.height = size * 2
  const patternCtx = canvas.getContext('2d')
  if (!patternCtx) return null

  patternCtx.fillStyle = '#FFFFFF'
  patternCtx.fillRect(0, 0, size * 2, size * 2)
  patternCtx.fillStyle = '#E0E0E0'
  patternCtx.fillRect(0, 0, size, size)
  patternCtx.fillRect(size, size, size, size)

  const pattern = ctx.createPattern(canvas, 'repeat')
  checkerboardPatternCache.set(size, pattern)
  return pattern
}

/**
 * 多角形パスを描画
 */
export function drawPolygon(
  ctx: CanvasRenderingContext2D,
  polygon: Vec2[],
  scale: number,
  offset: { x: number; y: number }
): void {
  if (polygon.length === 0) return

  ctx.beginPath()
  ctx.moveTo(polygon[0].x * scale + offset.x, polygon[0].y * scale + offset.y)

  for (let i = 1; i < polygon.length; i++) {
    ctx.lineTo(polygon[i].x * scale + offset.x, polygon[i].y * scale + offset.y)
  }
  ctx.closePath()
}

/**
 * セルが可視範囲内か判定
 */
export function isVisible(
  cell: Cell,
  center: Vec2,
  threshold: number
): boolean {
  return distance(cell.centroid, center) <= threshold
}

/**
 * セッション全体をCanvasに描画
 */
export function renderSession(
  ctx: CanvasRenderingContext2D,
  session: PolyCanvasSession,
  canvasSize: number,
  hoveredCellId: number | null = null,
  selectedColorIndex: number = 0
): void {
  const scale = canvasSize
  const offset = { x: 0, y: 0 }

  // 背景クリア（不可視領域の色）
  ctx.fillStyle = '#1a1a1a'
  ctx.fillRect(0, 0, canvasSize, canvasSize)

  for (const cell of session.cells) {
    const visible = isVisible(
      cell,
      session.center,
      session.visibleDistanceThreshold
    )

    drawPolygon(ctx, cell.polygon, scale, offset)

    if (!visible) {
      // 不可視セル
      ctx.fillStyle = '#222222'
      ctx.fill()
      continue
    }

    // 可視セル
    if (cell.painted && cell.colorIndex !== null) {
      ctx.fillStyle = session.palette[cell.colorIndex].hex
      ctx.fill()
    } else {
      // 未塗りセル（市松模様）
      const pattern = getCheckerboardPattern(ctx, canvasSize)
      if (pattern) {
        ctx.fillStyle = pattern
      } else {
        ctx.fillStyle = '#F5F5E8'
      }
      ctx.fill()
    }

    // ホバー表示（未塗りセルのみ）
    if (hoveredCellId === cell.id && !cell.painted) {
      ctx.fillStyle = session.palette[selectedColorIndex].hex + '80'
      ctx.fill()
    }

    // セル境界線
    ctx.strokeStyle = '#00000050'
    ctx.lineWidth = 1.5
    ctx.stroke()
  }
}

/**
 * エクスポート用描画（視野制限なし、フル解像度）
 */
export function renderForExport(
  ctx: CanvasRenderingContext2D,
  session: PolyCanvasSession,
  size: number,
  backgroundColor: 'white' | 'black' = 'white'
): void {
  const scale = size
  const offset = { x: 0, y: 0 }

  // 背景
  ctx.fillStyle = backgroundColor === 'white' ? '#FFFFFF' : '#000000'
  ctx.fillRect(0, 0, size, size)

  for (const cell of session.cells) {
    drawPolygon(ctx, cell.polygon, scale, offset)

    if (cell.painted && cell.colorIndex !== null) {
      ctx.fillStyle = session.palette[cell.colorIndex].hex
      ctx.fill()
    } else {
      // 未塗りセル（市松模様）
      const pattern = getCheckerboardPattern(ctx, size)
      if (pattern) {
        ctx.fillStyle = pattern
      } else {
        ctx.fillStyle = backgroundColor === 'white' ? '#F5F5E8' : '#333333'
      }
      ctx.fill()
    }

    // セル境界線
    ctx.strokeStyle = '#00000050'
    ctx.lineWidth = size / 270
    ctx.stroke()
  }

  // 右下にロゴ
  ctx.font = '24px -apple-system, BlinkMacSystemFont, sans-serif'
  ctx.fillStyle = backgroundColor === 'white' ? '#00000066' : '#FFFFFF66'
  ctx.textAlign = 'right'
  ctx.textBaseline = 'bottom'
  ctx.fillText('PolyCanvas', size - 20, size - 20)
}
