import { useState, useCallback } from 'react'
import type { PolyCanvasSession, Cell, Vec2 } from '@/types'
import { VISIBILITY_THRESHOLDS, VISIBILITY_EXPAND_RATIO } from '@/constants/visibility'
import { distance } from '@/utils/geometry'

/**
 * セルが可視範囲内か判定
 */
function isVisible(cell: Cell, center: Vec2, threshold: number): boolean {
  return distance(cell.centroid, center) <= threshold
}

/**
 * 現在の視野レベルで可視のセルを取得
 */
function getVisibleCells(
  cells: Cell[],
  center: Vec2,
  threshold: number
): Cell[] {
  return cells.filter((cell) => isVisible(cell, center, threshold))
}

/**
 * 可視セルの塗り割合に基づいて新しい視野レベルを計算
 */
function calculateNewLevel(
  cells: Cell[],
  center: Vec2,
  currentLevel: number
): number {
  const maxLevel = VISIBILITY_THRESHOLDS.length - 1
  let newLevel = currentLevel

  // 現在のレベルから順にチェック
  while (newLevel < maxLevel) {
    const threshold = VISIBILITY_THRESHOLDS[newLevel]
    const visibleCells = getVisibleCells(cells, center, threshold)
    const visibleCount = visibleCells.length
    const paintedVisibleCount = visibleCells.filter((c) => c.painted).length

    // 可視セルの50%以上を塗ったら次のレベルへ
    if (visibleCount > 0 && paintedVisibleCount >= visibleCount * VISIBILITY_EXPAND_RATIO) {
      newLevel++
    } else {
      break
    }
  }

  return newLevel
}

export function useSession(initialSession: PolyCanvasSession) {
  const [session, setSession] = useState<PolyCanvasSession>(initialSession)

  /**
   * セルを塗る
   */
  const paintCell = useCallback((cellId: number, colorIndex: number) => {
    setSession((prev) => {
      const cell = prev.cells.find((c) => c.id === cellId)
      if (!cell || cell.painted) return prev

      const updatedCells = prev.cells.map((c) =>
        c.id === cellId ? { ...c, painted: true, colorIndex } : c
      )

      const newPaintedCount = prev.paintedCount + 1

      // 可視エリアの塗り割合に基づいて視野レベルを計算
      const newLevel = calculateNewLevel(
        updatedCells,
        prev.center,
        prev.visibilityLevel
      )

      const finished = newPaintedCount === prev.totalCells

      return {
        ...prev,
        cells: updatedCells,
        paintedCount: newPaintedCount,
        visibilityLevel: newLevel,
        visibleDistanceThreshold: VISIBILITY_THRESHOLDS[newLevel],
        finished,
        finishReason: finished ? 'auto' : null,
      }
    })
  }, [])

  /**
   * 手動終了
   */
  const finishManually = useCallback(() => {
    setSession((prev) => ({
      ...prev,
      finished: true,
      finishReason: 'manual',
    }))
  }, [])

  return {
    session,
    paintCell,
    finishManually,
  }
}
