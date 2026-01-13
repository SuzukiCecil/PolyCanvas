import { Link } from 'react-router-dom'

export function PrivacyPage() {
  return (
    <div className="min-h-full bg-neutral-900 text-white">
      <div className="max-w-2xl mx-auto px-6 py-12">
        <Link to="/" className="text-neutral-400 hover:text-white text-sm mb-8 inline-block">
          ← トップに戻る
        </Link>

        <h1 className="text-3xl font-bold mb-2">プライバシーポリシー</h1>
        <p className="text-neutral-400 text-sm mb-8">最終更新日: 2026年1月12日</p>

        <div className="space-y-8 text-neutral-300">
          <section>
            <h2 className="text-xl font-semibold mb-4 text-white">1. はじめに</h2>
            <p className="leading-relaxed">
              PolyCanvas（以下「本サービス」）は、ユーザーのプライバシーを尊重し、
              個人情報の保護に努めています。本プライバシーポリシーは、本サービスにおける
              情報の取り扱いについて説明するものです。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-white">2. 収集する情報</h2>
            <p className="leading-relaxed mb-4">
              本サービスは、以下の情報を収集する場合があります：
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>アクセスログ（IPアドレス、ブラウザ情報、アクセス日時など）</li>
              <li>Cookie情報</li>
              <li>デバイス情報（画面サイズ、OS種別など）</li>
            </ul>
            <p className="leading-relaxed mt-4">
              なお、本サービスでは会員登録機能がないため、氏名、メールアドレス等の
              個人を直接特定できる情報は収集しておりません。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-white">3. Cookieの使用</h2>
            <p className="leading-relaxed mb-4">
              本サービスでは、以下の目的でCookieを使用しています：
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>サービスの利便性向上</li>
              <li>アクセス解析</li>
              <li>広告の配信</li>
            </ul>
            <p className="leading-relaxed mt-4">
              ブラウザの設定によりCookieを無効にすることも可能ですが、
              一部の機能が正常に動作しなくなる場合があります。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-white">4. 広告について</h2>
            <p className="leading-relaxed mb-4">
              本サービスでは、第三者配信の広告サービス（Google AdSense）を利用しています。
            </p>
            <div className="bg-neutral-800 rounded-lg p-4 mb-4">
              <h3 className="font-medium text-white mb-2">Google AdSenseについて</h3>
              <ul className="text-sm space-y-2">
                <li>
                  広告配信事業者としてGoogleを使用しており、Cookieを使用することで
                  ユーザーの興味に応じた広告を表示することがあります。
                </li>
                <li>
                  ユーザーはGoogleの広告設定ページ（
                  <a
                    href="https://www.google.com/settings/ads"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline"
                  >
                    https://www.google.com/settings/ads
                  </a>
                  ）で、パーソナライズ広告を無効にすることができます。
                </li>
                <li>
                  詳細は
                  <a
                    href="https://policies.google.com/technologies/ads"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline ml-1"
                  >
                    Googleのポリシーと規約
                  </a>
                  をご確認ください。
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-white">5. アクセス解析</h2>
            <p className="leading-relaxed">
              本サービスでは、サービス改善のためにアクセス解析ツールを使用する場合があります。
              これらのツールはCookieを使用してデータを収集しますが、
              個人を特定する情報は含まれません。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-white">6. 情報の利用目的</h2>
            <p className="leading-relaxed mb-4">
              収集した情報は、以下の目的で利用します：
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>本サービスの提供・運営</li>
              <li>サービスの改善・新機能の開発</li>
              <li>利用状況の分析</li>
              <li>お問い合わせへの対応</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-white">7. 第三者への提供</h2>
            <p className="leading-relaxed">
              本サービスは、法令に基づく場合を除き、ユーザーの同意なく
              第三者に個人情報を提供することはありません。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-white">8. セキュリティ</h2>
            <p className="leading-relaxed">
              本サービスは、収集した情報の漏洩、滅失、毀損の防止その他の
              安全管理のために必要かつ適切な措置を講じます。
              本サービスはHTTPS（SSL/TLS）を使用して通信を暗号化しています。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-white">9. お子様のプライバシー</h2>
            <p className="leading-relaxed">
              本サービスは、13歳未満のお子様から意図的に個人情報を収集することはありません。
              保護者の方は、お子様のオンライン活動を監督し、
              適切なインターネット利用を指導してください。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-white">10. ポリシーの変更</h2>
            <p className="leading-relaxed">
              本プライバシーポリシーは、必要に応じて変更されることがあります。
              重要な変更がある場合は、本サービス上でお知らせします。
            </p>
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
