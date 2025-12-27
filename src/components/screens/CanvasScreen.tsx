import { useState, useEffect, useCallback } from 'react'
import type { PolyCanvasSession } from '@/types'
import { useSession } from '@/hooks/useSession'
import { CanvasRenderer } from '@/components/canvas/CanvasRenderer'
import { ColorPalette } from '@/components/ui/ColorPalette'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'
import { Button } from '@/components/ui/Button'

interface CanvasScreenProps {
  initialSession: PolyCanvasSession
  onFinish: (session: PolyCanvasSession) => void
}

export function CanvasScreen({ initialSession, onFinish }: CanvasScreenProps) {
  const { session, paintCell, finishManually } = useSession(initialSession)
  const [selectedColorIndex, setSelectedColorIndex] = useState(0)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)

  // セルを塗る
  const handleCellPaint = useCallback(
    (cellId: number) => {
      paintCell(cellId, selectedColorIndex)
    },
    [paintCell, selectedColorIndex]
  )

  // 自動終了チェック
  useEffect(() => {
    if (session.finished && session.finishReason === 'auto') {
      onFinish(session)
    }
  }, [session, onFinish])

  // 手動終了ボタン
  const handleFinishClick = () => {
    setShowConfirmDialog(true)
  }

  // 終了確認
  const handleConfirmFinish = () => {
    setShowConfirmDialog(false)
    finishManually()
    onFinish({ ...session, finished: true, finishReason: 'manual' })
  }

  // キャンセル
  const handleCancelFinish = () => {
    setShowConfirmDialog(false)
  }

  // 進捗計算
  const progress = Math.round((session.paintedCount / session.totalCells) * 100)

  return (
    <div className="min-h-full flex flex-col p-4">
      {/* ヘッダー */}
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm text-neutral-400">
          {session.paintedCount} / {session.totalCells}
        </div>
        <Button variant="ghost" size="sm" onClick={handleFinishClick}>
          この状態で終える
        </Button>
      </div>

      {/* Canvas */}
      <div className="flex-1 flex items-center justify-center">
        <CanvasRenderer
          session={session}
          selectedColorIndex={selectedColorIndex}
          onCellPaint={handleCellPaint}
        />
      </div>

      {/* カラーパレット */}
      <div className="mt-4">
        <ColorPalette
          palette={session.palette}
          selectedIndex={selectedColorIndex}
          onSelect={setSelectedColorIndex}
        />
      </div>

      {/* 進捗バー */}
      <div className="mt-4">
        <div className="h-1 bg-neutral-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-white transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* 確認ダイアログ */}
      <ConfirmDialog
        isOpen={showConfirmDialog}
        title="終了しますか？"
        message="この状態で終了します。塗り途中のセルは白いまま残ります。"
        confirmLabel="終了する"
        cancelLabel="続ける"
        onConfirm={handleConfirmFinish}
        onCancel={handleCancelFinish}
      />
    </div>
  )
}
