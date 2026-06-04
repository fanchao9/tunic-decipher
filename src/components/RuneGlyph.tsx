export type RuneSegment =
  | 'outer-top-left'
  | 'outer-top-right'
  | 'outer-top-middle-left'
  | 'outer-top-middle-right'
  | 'outer-bottom-middle-left'
  | 'outer-bottom-middle-right'
  | 'outer-bottom-left'
  | 'outer-bottom-right'
  | 'inner-top-left'
  | 'inner-top-right'
  | 'inner-bottom-left'
  | 'inner-bottom-right'
  | 'stem-top'
  | 'stem-bottom'
  | 'base-top-left'
  | 'base-top-right'
  | 'circle-bottom';

interface RuneGlyphProps {
  segments?: RuneSegment[];
  size?: number;
  stroke?: string;
  title?: string;
}

const defaultSegments: RuneSegment[] = [
  'outer-top-left',
  'outer-top-right',
  'outer-top-middle-left',
  'outer-top-middle-right',
  'outer-bottom-middle-left',
  'outer-bottom-middle-right',
  'outer-bottom-left',
  'outer-bottom-right',
  'inner-top-left',
  'inner-top-right',
  'inner-bottom-left',
  'inner-bottom-right',
  'stem-top',
  'stem-bottom',
  'base-top-left',
  'base-top-right',
];

const segmentLines: Partial<Record<RuneSegment, [number, number, number, number]>> = {
  'outer-top-left': [60, 21, 20, 55],
  'outer-top-right': [60, 21, 100, 55],
  'outer-top-middle-left': [20, 55, 20, 82],
  'outer-top-middle-right': [100, 55, 100, 82],
  'outer-bottom-middle-left': [20, 98, 20, 125],
  'outer-bottom-middle-right': [100, 98, 100, 125],
  'outer-bottom-left': [20, 125, 60, 159],
  'outer-bottom-right': [100, 125, 60, 159],
  'inner-top-left': [60, 82, 20, 55],
  'inner-top-right': [60, 82, 100, 55],
  'inner-bottom-left': [60, 98, 20, 125],
  'inner-bottom-right': [60, 98, 100, 125],
  'stem-top': [60, 82, 60, 21],
  'stem-bottom': [60, 98, 60, 159],
  'base-top-left': [20, 82, 60, 82],
  'base-top-right': [60, 82, 100, 82],
};

export const placeholderRuneMap: Record<string, RuneSegment[]> = {
  uh: ['outer-top-left', 'outer-top-right'],
  ee: ['outer-top-middle-left', 'outer-top-left', 'outer-bottom-middle-left', 'outer-bottom-left', 'outer-bottom-right'],
  B: ['outer-top-right', 'outer-top-middle-right', 'inner-top-left', 'stem-bottom'],
  C: ['outer-top-left', 'outer-bottom-left', 'inner-bottom-right'],
  D: ['outer-top-right', 'outer-bottom-right', 'inner-bottom-left'],
  E: ['stem-top', 'stem-bottom', 'base-top-left'],
  F: ['inner-top-left', 'inner-top-right'],
};

export default function RuneGlyph({
  segments = defaultSegments,
  size = 72,
  stroke = '#fde68a',
  title = 'Tunic rune',
}: RuneGlyphProps) {
  const visibleSegments = new Set([
    ...segments,
    'base-top-left',
    'base-top-right',
  ] as RuneSegment[]);

  return (
    <svg
      role="img"
      aria-label={title}
      viewBox="0 0 120 185"
      width={size}
      height={(size * 185) / 120}
      className="inline-block align-middle"
    >
      <g stroke={stroke} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none">
        {Object.entries(segmentLines).map(([id, points]) => {
          if (!visibleSegments.has(id as RuneSegment)) return null;
          const [x1, y1, x2, y2] = points;
          return <line key={id} x1={x1} y1={y1} x2={x2} y2={y2} />;
        })}
        {visibleSegments.has('circle-bottom') && <circle cx="60" cy="167" r="6" />}
      </g>
    </svg>
  );
}
