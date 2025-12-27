import { useCallback, useRef } from 'react'

interface UseLongPressOptions {
  duration?: number
  onLongPress: () => void
  onPress?: () => void
  onRelease?: () => void
}

/**
 * 長押し検出フック
 * モバイルでの誤タップ防止用
 */
export function useLongPress({
  duration = 200,
  onLongPress,
  onPress,
  onRelease,
}: UseLongPressOptions) {
  const timerRef = useRef<number | null>(null)
  const isLongPressRef = useRef(false)

  const start = useCallback(() => {
    isLongPressRef.current = false
    onPress?.()

    timerRef.current = window.setTimeout(() => {
      isLongPressRef.current = true
      onLongPress()
    }, duration)
  }, [duration, onLongPress, onPress])

  const cancel = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
    onRelease?.()
  }, [onRelease])

  return {
    onTouchStart: start,
    onTouchEnd: cancel,
    onTouchCancel: cancel,
    onMouseDown: start,
    onMouseUp: cancel,
    onMouseLeave: cancel,
  }
}
