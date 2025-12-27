import type { Vec2, Cell, PolyCanvasSession } from '@/types'
import { distance } from './geometry'

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
    } else {
      ctx.fillStyle = '#FFFFFF'
    }
    ctx.fill()

    // ホバー表示（未塗りセルのみ）
    if (hoveredCellId === cell.id && !cell.painted) {
      ctx.fillStyle = session.palette[selectedColorIndex].hex + '80'
      ctx.fill()
    }

    // セル境界線
    ctx.strokeStyle = '#00000033'
    ctx.lineWidth = 1
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
    } else {
      // 未塗りセル
      ctx.fillStyle = backgroundColor === 'white' ? '#FFFFFF' : '#333333'
    }
    ctx.fill()

    // セル境界線
    ctx.strokeStyle = '#00000022'
    ctx.lineWidth = 1
    ctx.stroke()
  }

  // 右下にロゴ
  ctx.font = '24px -apple-system, BlinkMacSystemFont, sans-serif'
  ctx.fillStyle = backgroundColor === 'white' ? '#00000066' : '#FFFFFF66'
  ctx.textAlign = 'right'
  ctx.textBaseline = 'bottom'
  ctx.fillText('PolyCanvas', size - 20, size - 20)
}
