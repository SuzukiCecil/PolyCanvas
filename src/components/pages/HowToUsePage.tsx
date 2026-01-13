import { Link } from 'react-router-dom'

export function HowToUsePage() {
  return (
    <div className="min-h-full bg-neutral-900 text-white">
      <div className="max-w-2xl mx-auto px-6 py-12">
        <Link to="/" className="text-neutral-400 hover:text-white text-sm mb-8 inline-block">
          ← トップに戻る
        </Link>

        <h1 className="text-3xl font-bold mb-8">使い方ガイド</h1>

        {/* Step 1 */}
        <section className="mb-10">
          <div className="flex items-center mb-4">
            <span className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mr-3">
              1
            </span>
            <h2 className="text-xl font-semibold">スタート</h2>
          </div>
          <div className="bg-neutral-800 rounded-lg p-6 ml-11">
            <p className="text-neutral-300 mb-4">
              トップページの「START」ボタンをタップすると、新しい幾何学模様が生成されます。
              模様は毎回異なるため、同じものは二度と現れません。
            </p>
            <div className="bg-neutral-700 rounded p-4 text-sm text-neutral-400">
              ヒント: 各模様には固有の「シード値」があり、完成後に確認できます。
            </div>
          </div>
        </section>

        {/* Step 2 */}
        <section className="mb-10">
          <div className="flex items-center mb-4">
            <span className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mr-3">
              2
            </span>
            <h2 className="text-xl font-semibold">色を選ぶ</h2>
          </div>
          <div className="bg-neutral-800 rounded-lg p-6 ml-11">
            <p className="text-neutral-300 mb-4">
              画面下部に表示される16色のパレットから、使いたい色をタップして選択します。
              選択中の色は白い枠で囲まれます。
            </p>
            <div className="flex flex-wrap gap-2 my-4">
              {['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F'].map((color) => (
                <div
                  key={color}
                  className="w-8 h-8 rounded"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            <p className="text-neutral-400 text-sm">
              ※ パレットの色は厳選された16色で構成されており、どの組み合わせでも調和が取れるようになっています。
            </p>
          </div>
        </section>

        {/* Step 3 */}
        <section className="mb-10">
          <div className="flex items-center mb-4">
            <span className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mr-3">
              3
            </span>
            <h2 className="text-xl font-semibold">セルを塗る</h2>
          </div>
          <div className="bg-neutral-800 rounded-lg p-6 ml-11">
            <p className="text-neutral-300 mb-4">
              キャンバス上の塗りたいセル（区画）をタップすると、選択中の色で塗られます。
            </p>
            <div className="bg-red-900/30 border border-red-500/50 rounded p-4 text-sm text-red-200 mb-4">
              <strong>注意:</strong> 一度塗った色は変更できません！
              慎重に、でも考えすぎずに塗っていきましょう。
            </div>
            <p className="text-neutral-400 text-sm">
              スマートフォンでは長押しで色を塗ることもできます。
            </p>
          </div>
        </section>

        {/* Step 4 */}
        <section className="mb-10">
          <div className="flex items-center mb-4">
            <span className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mr-3">
              4
            </span>
            <h2 className="text-xl font-semibold">視野の拡大</h2>
          </div>
          <div className="bg-neutral-800 rounded-lg p-6 ml-11">
            <p className="text-neutral-300 mb-4">
              最初は中央付近のセルしか見えませんが、塗り進めると視野が徐々に広がります。
            </p>
            <div className="space-y-3 text-sm">
              <div className="flex items-center">
                <div className="w-16 h-4 bg-gradient-to-r from-blue-500 to-transparent rounded mr-3" />
                <span className="text-neutral-400">レベル1: 約15%のセルが見える</span>
              </div>
              <div className="flex items-center">
                <div className="w-24 h-4 bg-gradient-to-r from-blue-500 to-transparent rounded mr-3" />
                <span className="text-neutral-400">レベル2: 約33%のセルが見える</span>
              </div>
              <div className="flex items-center">
                <div className="w-32 h-4 bg-gradient-to-r from-blue-500 to-transparent rounded mr-3" />
                <span className="text-neutral-400">レベル3: 約60%のセルが見える</span>
              </div>
              <div className="flex items-center">
                <div className="w-40 h-4 bg-blue-500 rounded mr-3" />
                <span className="text-neutral-400">レベル4: すべてのセルが見える</span>
              </div>
            </div>
            <p className="text-neutral-400 text-sm mt-4">
              表示されているセルの50%を塗ると、次のレベルに進みます。
            </p>
          </div>
        </section>

        {/* Step 5 */}
        <section className="mb-10">
          <div className="flex items-center mb-4">
            <span className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mr-3">
              5
            </span>
            <h2 className="text-xl font-semibold">完成・共有</h2>
          </div>
          <div className="bg-neutral-800 rounded-lg p-6 ml-11">
            <p className="text-neutral-300 mb-4">
              すべてのセルを塗り終えると自動的に完了画面に移動します。
              途中で終了したい場合は「終了する」ボタンをタップしてください。
            </p>
            <p className="text-neutral-300 mb-4">
              完成した作品は以下の方法で保存・共有できます：
            </p>
            <ul className="space-y-2 text-neutral-300">
              <li className="flex items-center">
                <span className="text-blue-400 mr-2">▸</span>
                X（Twitter）に投稿
              </li>
              <li className="flex items-center">
                <span className="text-blue-400 mr-2">▸</span>
                PNG画像としてダウンロード（1080×1080px）
              </li>
            </ul>
          </div>
        </section>

        {/* Tips */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4 text-neutral-200">コツ・ヒント</h2>
          <div className="space-y-4">
            <div className="bg-neutral-800 rounded-lg p-4">
              <h3 className="font-medium text-white mb-2">隣接する色を意識する</h3>
              <p className="text-neutral-400 text-sm">
                隣り合うセルの色のコントラストを考えながら塗ると、より印象的な作品になります。
              </p>
            </div>
            <div className="bg-neutral-800 rounded-lg p-4">
              <h3 className="font-medium text-white mb-2">直感を信じる</h3>
              <p className="text-neutral-400 text-sm">
                考えすぎると手が止まってしまいます。最初に「いいな」と思った色を塗ってみましょう。
              </p>
            </div>
            <div className="bg-neutral-800 rounded-lg p-4">
              <h3 className="font-medium text-white mb-2">全体を見る</h3>
              <p className="text-neutral-400 text-sm">
                視野が広がったら、全体のバランスを見ながら色を配置していきましょう。
              </p>
            </div>
          </div>
        </section>

        <div className="mt-12 pt-8 border-t border-neutral-700">
          <Link
            to="/"
            className="inline-block bg-white text-neutral-900 px-6 py-3 rounded-lg font-medium hover:bg-neutral-200 transition-colors"
          >
            さっそく始める
          </Link>
        </div>
      </div>
    </div>
  )
}
