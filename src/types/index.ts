/** 2D座標 */
export type Vec2 = {
  x: number
  y: number
}

/** セル（多角形領域） */
export type Cell = {
  id: number
  polygon: Vec2[]
  centroid: Vec2
  painted: boolean
  colorIndex: number | null
}

/** 生成メタ情報 */
export type PolyCanvasMeta = {
  seed: number
  cellCount: number
  bounds: {
    minX: number
    maxX: number
    minY: number
    maxY: number
  }
}

/** パレット色 */
export type PaletteColor = {
  index: number
  hex: string
}

/** セッション状態 */
export type PolyCanvasSession = {
  meta: PolyCanvasMeta
  cells: Cell[]
  center: Vec2
  visibilityLevel: number
  visibleDistanceThreshold: number
  paintedCount: number
  totalCells: number
  finished: boolean
  finishReason: 'auto' | 'manual' | null
  palette: PaletteColor[]
}

/** 画面種別 */
export type Screen = 'landing' | 'canvas' | 'result'
