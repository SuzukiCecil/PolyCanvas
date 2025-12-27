# PolyCanvas

制約付き塗り絵体験を提供するミニマルなWebサービス

## 概要

PolyCanvasは、毎回ランダム生成される幾何学模様（Voronoiセル）に色を塗る体験を提供します。

**特徴:**
- 塗った色は変更できない（不可逆操作）
- 塗り進めると視野が段階的に拡大
- 完成形がない「過程を楽しむ」創作体験
- 作品は保存されない1回性の体験

## デモ

![PolyCanvas Demo](https://via.placeholder.com/600x400?text=Demo+Screenshot)

## 技術スタック

- **Frontend:** React 18 + TypeScript
- **Build:** Vite 6
- **Styling:** Tailwind CSS
- **Geometry:** d3-delaunay (Voronoi分割)

## セットアップ

### Docker（推奨）

```bash
docker compose up --build
```

http://localhost:5173 でアクセス

### ローカル

```bash
npm install
npm run dev
```

## 機能

### 幾何学模様生成
- Poisson Disk Samplingによる均等な点配置
- Voronoi分割で多角形セルを生成
- 形状補正（小セル・細長セル除外）

### 視野拡大システム
| Level | 可視範囲 | 拡大条件 |
|-------|----------|----------|
| 0 | ~15% | 初期 |
| 1 | ~33% | 可視エリアの50%塗り |
| 2 | ~60% | 可視エリアの50%塗り |
| 3 | 100% | 可視エリアの50%塗り |

### 操作
- **PC:** クリックで塗り、ホバーでプレビュー
- **モバイル:** 長押し（200ms）で塗り確定

### SNS共有
- X（Twitter）投稿
- 1080×1080 PNG画像ダウンロード

## プロジェクト構成

```
src/
├── components/
│   ├── screens/       # 画面コンポーネント
│   ├── canvas/        # Canvas描画
│   └── ui/            # UIパーツ
├── generators/        # 幾何学模様生成
├── hooks/             # カスタムフック
├── utils/             # ユーティリティ
├── constants/         # 定数定義
└── types/             # 型定義
```

## カスタマイズ

### セル数の調整
`src/generators/poissonDisk.ts`
```typescript
minDist: number = 0.07  // 小さくするとセル数増加
```

### 視野閾値の調整
`src/constants/visibility.ts`
```typescript
export const VISIBILITY_THRESHOLDS = [
  0.22,  // Level 0
  0.32,  // Level 1
  0.46,  // Level 2
  0.80,  // Level 3
]
```

### カラーパレット
`src/constants/palette.ts` で16色を定義

## デバッグ

URLパラメータでシードを固定:
```
http://localhost:5173/?seed=12345
```

## ライセンス

MIT

## 作者

- Design & Requirements: User
- Implementation: Claude Code
