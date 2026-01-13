import { Link } from 'react-router-dom'

export function AboutPage() {
  return (
    <div className="min-h-full bg-neutral-900 text-white">
      <div className="max-w-2xl mx-auto px-6 py-12">
        <Link to="/" className="text-neutral-400 hover:text-white text-sm mb-8 inline-block">
          ← トップに戻る
        </Link>

        <h1 className="text-3xl font-bold mb-8">PolyCanvasについて</h1>

        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4 text-neutral-200">コンセプト</h2>
          <p className="text-neutral-300 leading-relaxed mb-4">
            PolyCanvasは「制約付き塗り絵体験」を提供するWebアプリケーションです。
            通常のお絵描きツールとは異なり、自由に描くことはできません。
            その代わりに、予め生成された幾何学模様の中で、限られた選択肢から色を選び、
            一度塗った色は変更できないというルールの中で作品を完成させます。
          </p>
          <p className="text-neutral-300 leading-relaxed">
            制約があるからこそ生まれる偶然の美しさ、予想外の色の組み合わせ、
            そして「やり直しができない」緊張感を楽しんでいただければ幸いです。
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4 text-neutral-200">特徴</h2>
          <ul className="space-y-3 text-neutral-300">
            <li className="flex items-start">
              <span className="text-blue-400 mr-3">●</span>
              <div>
                <strong className="text-white">毎回異なる模様</strong>
                <p className="text-sm text-neutral-400 mt-1">
                  Voronoi図とPoisson Disk Samplingアルゴリズムにより、
                  毎回ユニークな幾何学模様が生成されます。
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-green-400 mr-3">●</span>
              <div>
                <strong className="text-white">16色パレット</strong>
                <p className="text-sm text-neutral-400 mt-1">
                  厳選された16色のカラーパレットから色を選択します。
                  色の制限があるからこそ、調和のとれた作品が生まれます。
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-yellow-400 mr-3">●</span>
              <div>
                <strong className="text-white">不可逆な塗り</strong>
                <p className="text-sm text-neutral-400 mt-1">
                  一度塗った色は変更できません。
                  この緊張感が、一筆一筆を大切にする体験を生み出します。
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-purple-400 mr-3">●</span>
              <div>
                <strong className="text-white">視野の拡大</strong>
                <p className="text-sm text-neutral-400 mt-1">
                  最初は中央部分のみが見えています。
                  塗り進めると徐々に視野が広がり、全体像が見えてきます。
                </p>
              </div>
            </li>
          </ul>
        </section>

        <div className="mt-12 pt-8 border-t border-neutral-700">
          <Link
            to="/"
            className="inline-block bg-white text-neutral-900 px-6 py-3 rounded-lg font-medium hover:bg-neutral-200 transition-colors"
          >
            PolyCanvasを始める
          </Link>
        </div>
      </div>
    </div>
  )
}
