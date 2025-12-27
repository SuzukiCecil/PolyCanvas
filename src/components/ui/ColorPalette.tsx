import type { PaletteColor } from '@/types'

interface ColorPaletteProps {
  palette: PaletteColor[]
  selectedIndex: number
  onSelect: (index: number) => void
}

export function ColorPalette({
  palette,
  selectedIndex,
  onSelect,
}: ColorPaletteProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2 p-2">
      {palette.map((color) => (
        <button
          key={color.index}
          onClick={() => onSelect(color.index)}
          className={`w-8 h-8 rounded-full transition-transform ${
            selectedIndex === color.index
              ? 'ring-2 ring-white ring-offset-2 ring-offset-neutral-900 scale-110'
              : 'hover:scale-105'
          }`}
          style={{ backgroundColor: color.hex }}
          aria-label={`Color ${color.index + 1}`}
          aria-pressed={selectedIndex === color.index}
        />
      ))}
    </div>
  )
}
