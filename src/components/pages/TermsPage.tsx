import { Link } from 'react-router-dom'

export function TermsPage() {
  return (
    <div className="min-h-full bg-neutral-900 text-white">
      <div className="max-w-2xl mx-auto px-6 py-12">
        <Link to="/" className="text-neutral-400 hover:text-white text-sm mb-8 inline-block">
          ← トップに戻る
        </Link>

        <h1 className="text-3xl font-bold mb-2">利用規約</h1>
        <p className="text-neutral-400 text-sm mb-8">最終更新日: 2026年1月12日</p>

        <div className="space-y-8 text-neutral-300">
          <section>
            <h2 className="text-xl font-semibold mb-4 text-white">第1条（適用）</h2>
            <p className="leading-relaxed">
              本規約は、PolyCanvas（以下「本サービス」）の利用条件を定めるものです。
              ユーザーは本サービスを利用することにより、本規約に同意したものとみなされます。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-white">第2条（サービスの内容）</h2>
            <p className="leading-relaxed mb-4">
              本サービスは、以下の機能を提供するWebアプリケーションです：
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>幾何学模様の生成</li>
              <li>色塗り機能</li>
              <li>完成した作品の画像出力</li>
              <li>SNSへの共有機能</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-white">第3条（利用条件）</h2>
            <ol className="list-decimal list-inside space-y-3 ml-4">
              <li>
                本サービスの利用に会員登録は不要です。
              </li>
              <li>
                本サービスは、インターネットに接続できるデバイスから無料でご利用いただけます。
              </li>
              <li>
                本サービスの利用に必要な通信費用は、ユーザーの負担となります。
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-white">第4条（禁止事項）</h2>
            <p className="leading-relaxed mb-4">
              ユーザーは、本サービスの利用にあたり、以下の行為を行ってはなりません：
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>法令または公序良俗に違反する行為</li>
              <li>犯罪行為に関連する行為</li>
              <li>本サービスのサーバーやネットワークに過度な負荷をかける行為</li>
              <li>本サービスの運営を妨害する行為</li>
              <li>他のユーザーまたは第三者に不利益、損害、不快感を与える行為</li>
              <li>本サービスの不正アクセス、リバースエンジニアリング、改ざん</li>
              <li>本サービスを商業目的で無断利用する行為</li>
              <li>その他、運営者が不適切と判断する行為</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-white">第5条（知的財産権）</h2>
            <ol className="list-decimal list-inside space-y-3 ml-4">
              <li>
                本サービスのソフトウェア、デザイン、ロゴ等の知的財産権は、
                運営者または正当な権利者に帰属します。
              </li>
              <li>
                ユーザーが本サービスを使用して作成した作品の著作権は、ユーザーに帰属します。
              </li>
              <li>
                ユーザーは、作成した作品を自由に使用、共有、配布することができます。
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-white">第6条（作品の取り扱い）</h2>
            <ol className="list-decimal list-inside space-y-3 ml-4">
              <li>
                本サービスで作成した作品は、サーバーに保存されません。
                ブラウザを閉じると作品データは失われます。
              </li>
              <li>
                作品を保存したい場合は、画像ダウンロード機能をご利用ください。
              </li>
              <li>
                運営者は、作品データの消失について一切の責任を負いません。
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-white">第7条（サービスの変更・停止）</h2>
            <ol className="list-decimal list-inside space-y-3 ml-4">
              <li>
                運営者は、ユーザーへの事前の通知なしに、本サービスの内容を変更、
                または提供を停止することができるものとします。
              </li>
              <li>
                運営者は、サービスの変更または停止によりユーザーに生じた損害について、
                一切の責任を負いません。
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-white">第8条（免責事項）</h2>
            <ol className="list-decimal list-inside space-y-3 ml-4">
              <li>
                運営者は、本サービスに事実上または法律上の瑕疵がないことを保証しません。
              </li>
              <li>
                運営者は、本サービスの利用により生じたいかなる損害についても、
                一切の責任を負いません。
              </li>
              <li>
                運営者は、本サービスの中断、停止、終了、利用不能、
                または変更によりユーザーに生じた損害について、一切の責任を負いません。
              </li>
              <li>
                本サービスは「現状有姿」で提供され、明示または黙示を問わず、
                いかなる保証も行いません。
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-white">第9条（広告）</h2>
            <p className="leading-relaxed">
              本サービスには、第三者が提供する広告が表示される場合があります。
              広告の内容については、当該広告主が責任を負うものとし、
              運営者は広告の内容について一切の責任を負いません。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-white">第10条（規約の変更）</h2>
            <ol className="list-decimal list-inside space-y-3 ml-4">
              <li>
                運営者は、必要と判断した場合には、ユーザーへの事前の通知なしに
                本規約を変更することができるものとします。
              </li>
              <li>
                変更後の利用規約は、本サービス上に掲示した時点から効力を生じるものとします。
              </li>
              <li>
                変更後に本サービスを利用した場合、ユーザーは変更後の規約に
                同意したものとみなされます。
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-white">第11条（準拠法・管轄裁判所）</h2>
            <ol className="list-decimal list-inside space-y-3 ml-4">
              <li>
                本規約の解釈にあたっては、日本法を準拠法とします。
              </li>
              <li>
                本サービスに関して紛争が生じた場合には、東京地方裁判所を
                第一審の専属的合意管轄裁判所とします。
              </li>
            </ol>
          </section>

        </div>

        <div className="mt-12 pt-8 border-t border-neutral-700">
          <Link
            to="/"
            className="inline-block bg-white text-neutral-900 px-6 py-3 rounded-lg font-medium hover:bg-neutral-200 transition-colors"
          >
            トップに戻る
          </Link>
        </div>
      </div>
    </div>
  )
}
