import { useRef, useEffect, useState } from 'react'
import type { PolyCanvasSession } from '@/types'
import { Button } from '@/components/ui/Button'
import { renderForExport } from '@/utils/canvas'

interface ResultScreenProps {
  session: PolyCanvasSession
  onRestart: () => void
}

export function ResultScreen({ session, onRestart }: ResultScreenProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [imageUrl, setImageUrl] = useState<string | null>(null)

  // 完成画像を生成
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const size = 1080
    canvas.width = size
    canvas.height = size

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    renderForExport(ctx, session, size, 'white')

    // DataURLを生成
    const url = canvas.toDataURL('image/png')
    setImageUrl(url)
  }, [session])

  // X共有
  const handleShareX = () => {
    const text = encodeURIComponent(
      'PolyCanvas で色の地図を描き終えました。\n#PolyCanvas'
    )
    const url = `https://twitter.com/intent/tweet?text=${text}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  // 画像ダウンロード
  const handleDownload = () => {
    if (!imageUrl) return

    const link = document.createElement('a')
    link.href = imageUrl
    link.download = `polycanvas-${session.meta.seed}.png`
    link.click()
  }

  return (
    <div className="min-h-full flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full text-center">
        {/* 完了メッセージ */}
        <h2 className="text-2xl font-semibold mb-2">終了しました</h2>
        <p className="text-neutral-400 mb-6">
          {session.finishReason === 'auto'
            ? 'すべてのセルを塗り終えました'
            : `${session.paintedCount} / ${session.totalCells} セルを塗りました`}
        </p>

        {/* プレビュー画像 */}
        <div className="bg-neutral-800 rounded-lg overflow-hidden mb-6">
          <canvas
            ref={canvasRef}
            className="w-full aspect-square"
            style={{ display: 'block' }}
          />
        </div>

        {/* 共有ボタン */}
        <div className="flex gap-3 mb-4">
          <Button
            variant="secondary"
            className="flex-1"
            onClick={handleShareX}
          >
            X に投稿
          </Button>
          <Button
            variant="secondary"
            className="flex-1"
            onClick={handleDownload}
          >
            画像を保存
          </Button>
        </div>

        {/* リスタートボタン */}
        <Button
          variant="ghost"
          className="w-full"
          onClick={onRestart}
        >
          新しい模様を始める
        </Button>

        {/* シード情報 */}
        <p className="text-neutral-500 text-xs mt-4">
          Seed: {session.meta.seed}
        </p>
      </div>
    </div>
  )
}
