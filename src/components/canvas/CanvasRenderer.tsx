import { useEffect, useRef, useState, useCallback } from 'react'
import type { Cell, PolyCanvasSession, Vec2 } from '@/types'
import { useCanvas } from '@/hooks/useCanvas'
import { isPointInPolygon } from '@/utils/geometry'
import { isVisible } from '@/utils/canvas'

interface CanvasRendererProps {
  session: PolyCanvasSession
  selectedColorIndex: number
  onCellPaint: (cellId: number) => void
}

export function CanvasRenderer({
  session,
  selectedColorIndex,
  onCellPaint,
}: CanvasRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [hoveredCellId, setHoveredCellId] = useState<number | null>(null)
  const [containerSize, setContainerSize] = useState(0)

  // 長押し用
  const longPressTimerRef = useRef<number | null>(null)
  const pendingCellRef = useRef<number | null>(null)

  const { canvasRef, resizeCanvas } = useCanvas({
    session,
    hoveredCellId,
    selectedColorIndex,
  })

  // コンテナサイズの監視
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const updateSize = () => {
      const rect = container.getBoundingClientRect()
      const size = Math.min(rect.width, rect.height)
      setContainerSize(size)
      resizeCanvas(size)
    }

    updateSize()

    const resizeObserver = new ResizeObserver(updateSize)
    resizeObserver.observe(container)

    return () => resizeObserver.disconnect()
  }, [resizeCanvas])

  // Canvas座標を正規化座標に変換
  const canvasToNormalized = useCallback(
    (clientX: number, clientY: number): Vec2 | null => {
      const canvas = canvasRef.current
      if (!canvas || containerSize === 0) return null

      const rect = canvas.getBoundingClientRect()
      const x = (clientX - rect.left) / containerSize
      const y = (clientY - rect.top) / containerSize

      if (x < 0 || x > 1 || y < 0 || y > 1) return null
      return { x, y }
    },
    [containerSize]
  )

  // 座標からセルを特定
  const findCellAtPoint = useCallback(
    (point: Vec2): Cell | null => {
      for (const cell of session.cells) {
        // 可視セルのみ対象
        if (!isVisible(cell, session.center, session.visibleDistanceThreshold)) {
          continue
        }
        if (isPointInPolygon(point, cell.polygon)) {
          return cell
        }
      }
      return null
    },
    [session]
  )

  // マウス移動（PC用ホバー）
  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const point = canvasToNormalized(e.clientX, e.clientY)
      if (!point) {
        setHoveredCellId(null)
        return
      }

      const cell = findCellAtPoint(point)
      setHoveredCellId(cell?.id ?? null)
    },
    [canvasToNormalized, findCellAtPoint]
  )

  const handleMouseLeave = useCallback(() => {
    setHoveredCellId(null)
  }, [])

  // PCクリック
  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      const point = canvasToNormalized(e.clientX, e.clientY)
      if (!point) return

      const cell = findCellAtPoint(point)
      if (cell && !cell.painted) {
        onCellPaint(cell.id)
      }
    },
    [canvasToNormalized, findCellAtPoint, onCellPaint]
  )

  // モバイル長押し開始
  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      const touch = e.touches[0]
      const point = canvasToNormalized(touch.clientX, touch.clientY)
      if (!point) return

      const cell = findCellAtPoint(point)
      if (cell && !cell.painted) {
        setHoveredCellId(cell.id)
        pendingCellRef.current = cell.id

        // 長押しタイマー開始（200ms）
        longPressTimerRef.current = window.setTimeout(() => {
          if (pendingCellRef.current !== null) {
            onCellPaint(pendingCellRef.current)
            pendingCellRef.current = null
          }
        }, 200)
      }
    },
    [canvasToNormalized, findCellAtPoint, onCellPaint]
  )

  // モバイルタッチ終了
  const handleTouchEnd = useCallback(() => {
    if (longPressTimerRef.current !== null) {
      clearTimeout(longPressTimerRef.current)
      longPressTimerRef.current = null
    }
    pendingCellRef.current = null
    setHoveredCellId(null)
  }, [])

  // モバイルタッチキャンセル
  const handleTouchCancel = useCallback(() => {
    if (longPressTimerRef.current !== null) {
      clearTimeout(longPressTimerRef.current)
      longPressTimerRef.current = null
    }
    pendingCellRef.current = null
    setHoveredCellId(null)
  }, [])

  // クリーンアップ
  useEffect(() => {
    return () => {
      if (longPressTimerRef.current !== null) {
        clearTimeout(longPressTimerRef.current)
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="canvas-container w-full aspect-square max-w-[600px] mx-auto"
    >
      <canvas
        ref={canvasRef}
        className="block"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchCancel}
      />
    </div>
  )
}
