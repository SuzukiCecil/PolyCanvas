import type { PolyCanvasSession } from '@/types'
import { Button } from '@/components/ui/Button'
import { generatePattern } from '@/generators/patternGenerator'

interface LandingScreenProps {
  onStart: (session: PolyCanvasSession) => void
}

export function LandingScreen({ onStart }: LandingScreenProps) {
  const handleStart = () => {
    const session = generatePattern()
    onStart(session)
  }

  return (
    <div className="min-h-full flex flex-col items-center justify-center p-6">
      <div className="max-w-md text-center">
        {/* ロゴ・タイトル */}
        <h1 className="text-4xl font-bold mb-2">PolyCanvas</h1>
        <p className="text-neutral-400 mb-8">制約付き塗り絵体験</p>

        {/* 説明文 */}
        <div className="bg-neutral-800 rounded-lg p-6 mb-8 text-left">
          <p className="text-neutral-300 mb-4">
            これは思い通りに描くためのツールではありません。
          </p>
          <ul className="text-neutral-400 text-sm space-y-2">
            <li>・ 毎回異なる幾何学模様が生成されます</li>
            <li>・ 塗った色は変更できません</li>
            <li>・ 塗り進めると視野が広がります</li>
            <li>・ 作品は保存されません</li>
          </ul>
        </div>

        {/* 広告プレースホルダー */}
        <div className="bg-neutral-800 border border-neutral-700 rounded-lg h-20 mb-8 flex items-center justify-center">
          <span className="text-neutral-500 text-sm">Ad Space</span>
        </div>

        {/* スタートボタン */}
        <Button size="lg" onClick={handleStart} className="w-full">
          START
        </Button>
      </div>
    </div>
  )
}
