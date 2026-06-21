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
  | 'stem-top-mini'
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
  'stem-top-mini',
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
  'inner-top-left': [60, 66, 24, 55],
  'inner-top-right': [60, 66, 96, 55],
  'inner-bottom-left': [60, 98, 24, 125],
  'inner-bottom-right': [60, 98, 96, 125],
  'stem-top': [60, 82, 60, 21],
  'stem-top-mini': [60, 82, 60, 70],
  'stem-bottom': [60, 98, 60, 159],
  'base-top-left': [20, 82, 60, 82],
  'base-top-right': [60, 82, 100, 82],
};

export const RuneMap: Record<string, RuneSegment[]> = {
  //vowels
  uh: ['outer-top-left', 'outer-top-right'],
  ee: ['outer-top-left', 'outer-top-middle-left', 'outer-bottom-middle-left', 'outer-bottom-left', 'outer-bottom-right'],
  oh: ['outer-top-left', 'outer-top-right', 'outer-top-middle-left', 'outer-bottom-middle-left', 'outer-bottom-left', 'outer-bottom-right'],
  uu: ['outer-top-left', 'outer-top-right', 'outer-top-middle-left','outer-bottom-middle-left','outer-bottom-middle-left', 'outer-bottom-left'],
  ih: ['outer-bottom-left', 'outer-bottom-right'],
  eh: ['outer-top-middle-left', 'outer-bottom-middle-left', 'outer-bottom-left', 'outer-bottom-right'],
  ar: ['outer-top-left', 'outer-top-right', 'outer-bottom-left', 'outer-bottom-right'],
  eye: ['outer-top-right'],
  ay: ['outer-top-left'],
  er: ['outer-top-right', 'outer-top-middle-left', 'outer-bottom-middle-left', 'outer-bottom-left', 'outer-bottom-right'],
  air: ['outer-top-middle-left', 'outer-bottom-middle-left', 'outer-bottom-right'],
  aaa: ['outer-top-left', 'outer-top-right', 'outer-top-middle-left', 'outer-bottom-middle-left',],
  ear: ['outer-top-left', 'outer-top-middle-left', 'outer-bottom-middle-left', 'outer-bottom-right'],
  oy: ['outer-bottom-left'],
  ow: ['outer-bottom-right'],
  oo: ['outer-top-middle-left', 'outer-bottom-middle-left', 'outer-bottom-left'],
  aw: ['outer-top-left', 'outer-top-middle-left', 'outer-bottom-middle-left'],
  or: ['outer-top-right', 'outer-top-left', 'outer-top-middle-left', 'outer-bottom-right', 'outer-bottom-middle-left'],
  
  //consonants
  b: ['stem-top', 'inner-bottom-right'],
  d: ['stem-top', 'inner-bottom-left', 'inner-bottom-right'],
  f: ['stem-top-mini', 'stem-bottom', 'inner-top-right', 'inner-bottom-left'],
  g: ['inner-top-right', 'inner-bottom-right', 'stem-bottom', 'stem-top-mini'],
  h: ['stem-top', 'stem-bottom', 'inner-bottom-right'],
  j: ['stem-top', 'inner-bottom-left'],
  k: ['stem-top', 'inner-top-right', 'inner-bottom-right'],
  l: ['stem-top', 'stem-bottom'],
  m: ['inner-bottom-left', 'inner-bottom-right'],
  n: ['inner-top-left', 'inner-bottom-left', 'inner-bottom-right'],
  p: ['stem-top-mini', 'stem-bottom', 'inner-top-right'],
  r: ['stem-top', 'stem-bottom', 'inner-top-right'],
  s: ['stem-top', 'stem-bottom', 'inner-top-right', 'inner-bottom-left'],
  t: ['stem-top-mini', 'stem-bottom', 'inner-top-left', 'inner-top-right'],
  v: ['stem-top', 'inner-top-left', 'inner-bottom-right'],
  w: ['inner-top-left', 'inner-top-right'],
  y: ['stem-top', 'stem-bottom', 'inner-top-left'],
  z: ['stem-top', 'stem-bottom', 'inner-top-left', 'inner-bottom-right'],
  sh: ['stem-top-mini', 'stem-bottom', 'inner-top-left', 'inner-top-right', 'inner-bottom-left', 'inner-bottom-right'],
  th: ['stem-top', 'stem-bottom', 'inner-bottom-left', 'inner-bottom-right'],
  th_also: ['stem-top', 'stem-bottom', 'inner-top-left', 'inner-top-right'],
  ng: ['stem-top','stem-bottom', 'inner-top-left', 'inner-top-right', 'inner-bottom-left', 'inner-bottom-right'],
  ch: ['stem-top-mini', 'stem-bottom', 'inner-top-left'],

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
