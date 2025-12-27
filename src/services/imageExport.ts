import type { PolyCanvasSession } from '@/types'
import { renderForExport } from '@/utils/canvas'

/**
 * セッションからPNG Blobを生成
 */
export async function exportToPng(
  session: PolyCanvasSession,
  backgroundColor: 'white' | 'black' = 'white'
): Promise<Blob> {
  const size = 1080
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size

  const ctx = canvas.getContext('2d')
  if (!ctx) {
    throw new Error('Failed to get canvas context')
  }

  renderForExport(ctx, session, size, backgroundColor)

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob)
        } else {
          reject(new Error('Failed to create blob'))
        }
      },
      'image/png',
      1.0
    )
  })
}

/**
 * Blobをダウンロード
 */
export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)
}

/**
 * X（Twitter）共有URLを生成
 */
export function getXShareUrl(text: string): string {
  const encodedText = encodeURIComponent(text)
  return `https://twitter.com/intent/tweet?text=${encodedText}`
}

/**
 * デフォルトの共有テキスト
 */
export function getDefaultShareText(): string {
  return 'PolyCanvas で色の地図を描き終えました。\n#PolyCanvas'
}
