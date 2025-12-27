/**
 * 視野距離閾値（4段階）
 * 中心からの距離（0〜1正規化座標系）
 * 面積ベースで均等に増加するよう調整
 */
export const VISIBILITY_THRESHOLDS = [
  0.22,  // Level 0: 初期 (~15%)
  0.32,  // Level 1 (~33%)
  0.46,  // Level 2 (~60%)
  0.80,  // Level 3: 全開放 (100%)
] as const

/**
 * 視野拡大に必要な可視エリアの塗り割合
 */
export const VISIBILITY_EXPAND_RATIO = 0.5  // 50%
