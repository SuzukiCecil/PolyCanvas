import { useRef, useEffect, useCallback } from 'react'
import type { PolyCanvasSession } from '@/types'
import { renderSession } from '@/utils/canvas'

interface UseCanvasOptions {
  session: PolyCanvasSession | null
  hoveredCellId: number | null
  selectedColorIndex: number
}

// アニメーション設定
const ANIMATION_SPEED = 0.08 // 補間速度（0〜1、大きいほど速い）

export function useCanvas({
  session,
  hoveredCellId,
  selectedColorIndex,
}: UseCanvasOptions) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameRef = useRef<number | null>(null)
  const sizeRef = useRef<number>(0)

  // 最新のpropsをrefで保持（描画ループから参照）
  const sessionRef = useRef(session)
  const hoveredCellIdRef = useRef(hoveredCellId)
  const selectedColorIndexRef = useRef(selectedColorIndex)

  // 視野アニメーション用
  const animatedThresholdRef = useRef(session?.visibleDistanceThreshold ?? 0)
  const targetThresholdRef = useRef(session?.visibleDistanceThreshold ?? 0)

  // propsが変わるたびにrefを更新
  useEffect(() => {
    sessionRef.current = session
    if (session) {
      targetThresholdRef.current = session.visibleDistanceThreshold
    }
  }, [session])

  useEffect(() => {
    hoveredCellIdRef.current = hoveredCellId
  }, [hoveredCellId])

  useEffect(() => {
    selectedColorIndexRef.current = selectedColorIndex
  }, [selectedColorIndex])

  // 描画ループ（アニメーション付き）
  useEffect(() => {
    const render = () => {
      const canvas = canvasRef.current
      const currentSession = sessionRef.current
      if (!canvas || !currentSession) return

      const ctx = canvas.getContext('2d')
      if (!ctx) return

      const size = sizeRef.current
      if (size === 0) return

      // 視野閾値のアニメーション補間
      const target = targetThresholdRef.current
      const current = animatedThresholdRef.current
      const diff = target - current

      if (Math.abs(diff) > 0.001) {
        animatedThresholdRef.current = current + diff * ANIMATION_SPEED
      } else {
        animatedThresholdRef.current = target
      }

      // アニメーション中の閾値でセッションを一時的に上書き
      const sessionWithAnimatedThreshold = {
        ...currentSession,
        visibleDistanceThreshold: animatedThresholdRef.current,
      }

      renderSession(
        ctx,
        sessionWithAnimatedThreshold,
        size,
        hoveredCellIdRef.current,
        selectedColorIndexRef.current
      )
    }

    const animate = () => {
      render()
      animationFrameRef.current = requestAnimationFrame(animate)
    }

    if (session) {
      // 初期値を設定
      if (animatedThresholdRef.current === 0) {
        animatedThresholdRef.current = session.visibleDistanceThreshold
      }
      animate()
    }

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current)
        animationFrameRef.current = null
      }
    }
  }, [session !== null]) // sessionの存在/非存在でのみ再開

  // Canvas サイズ調整
  const resizeCanvas = useCallback((containerSize: number) => {
    const canvas = canvasRef.current
    if (!canvas) return

    sizeRef.current = containerSize

    // デバイスピクセル比対応
    const dpr = window.devicePixelRatio || 1
    canvas.width = containerSize * dpr
    canvas.height = containerSize * dpr
    canvas.style.width = `${containerSize}px`
    canvas.style.height = `${containerSize}px`

    const ctx = canvas.getContext('2d')
    if (ctx) {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
  }, [])

  return {
    canvasRef,
    resizeCanvas,
  }
}
