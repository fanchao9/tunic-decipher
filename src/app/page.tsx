'use client';

import { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ManualPageEditor from '../components/ManualPageEditor';
import RuneGlyph, { placeholderRuneMap, RuneSegment } from '../components/RuneGlyph';
import { ManualPage } from '../types';

const manualPages: ManualPage[] = [
  {
    id: 'manual-1',
    pageNumber: 1,
    imageUrl: '/manual-pages/page-1.svg',
    title: 'Manual Page 1',
    translations: [
      { id: 'p1-placeholder-1', x: 52, y: 18, englishText: 'Placeholder translation', maxWidth: 24 },
      {
        id: 'p1-placeholder-2',
        x: 42,
        y: 72,
        englishText: 'Longer placeholder text wraps inside this box.',
        maxWidth: 30,
        fontSize: 0.85,
      },
    ],
  },
  {
    id: 'manual-2',
    pageNumber: 2,
    imageUrl: '/manual-pages/page-2.svg',
    title: 'Manual Page 2',
    translations: [{ id: 'p2-placeholder-1', x: 50, y: 35, englishText: 'Page two text', maxWidth: 22 }],
  },
  {
    id: 'manual-3',
    pageNumber: 3,
    imageUrl: '/manual-pages/page-3.svg',
    title: 'Manual Page 3',
    translations: [{ id: 'p3-placeholder-1', x: 56, y: 48, englishText: 'Hardcode each box here', maxWidth: 26 }],
  },
  {
    id: 'manual-4',
    pageNumber: 4,
    imageUrl: '/manual-pages/page-4.svg',
    title: 'Manual Page 4',
    translations: [{ id: 'p4-placeholder-1', x: 48, y: 60, englishText: 'Manual translation', maxWidth: 24 }],
  },
];

const placeholderAlphabet = ['A', 'B', 'C', 'D', 'E', 'F'];

const placeholderLetterSegments: RuneSegment[] = [
  'outer-top-left',
  'outer-top-right',
  'outer-top-middle-left',
  'outer-bottom-middle-right',
  'inner-top-right',
  'stem-bottom',
  'base-top-left',
];

const placeholderPhonemeMap: Record<string, RuneSegment[]> = {
  AH: placeholderRuneMap.A,
  B: placeholderRuneMap.B,
  D: placeholderRuneMap.D,
  EH: placeholderRuneMap.E,
  F: placeholderRuneMap.F,
};

type Tab = 'alphabet' | 'manual' | 'translator';

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>('manual');
  const [spreadIndex, setSpreadIndex] = useState(0);
  const [englishInput, setEnglishInput] = useState('The golden path');

  const visiblePages = useMemo(() => manualPages.slice(spreadIndex, spreadIndex + 2), [spreadIndex]);

  const translatedRunes = englishInput
    .split('')
    .filter((character) => /[a-z\s]/i.test(character))
    .map((character) => (character === ' ' ? null : placeholderRuneMap[character.toUpperCase()] ?? placeholderLetterSegments));

  const goToPreviousSpread = () => {
    setSpreadIndex((current) => Math.max(0, current - 2));
  };

  const goToNextSpread = () => {
    setSpreadIndex((current) => Math.min(manualPages.length - 2, current + 2));
  };

  return (
    <main className="min-h-screen bg-[#101820] font-sans text-slate-100">
      <div className="flex w-full flex-col gap-6">
        <header className="flex flex-col gap-4 border-b border-slate-700 px-4 py-5 md:flex-row md:items-end md:justify-between md:px-6">
          <div>
            <h1 className="text-3xl font-extrabold text-yellow-300 md:text-4xl">Tunic Translation Tome</h1>
            <p className="mt-2 text-sm text-slate-300">Decipher runes, annotate manual pages, and test placeholder translations.</p>
          </div>

          <nav className="flex flex-wrap gap-2">
            {(['alphabet', 'manual', 'translator'] as Tab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`rounded px-4 py-2 text-sm font-semibold capitalize transition-colors ${
                  activeTab === tab ? 'bg-yellow-400 text-slate-950' : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                }`}
              >
                {tab === 'translator' ? 'Translate' : tab}
              </button>
            ))}
          </nav>
        </header>

        {activeTab === 'alphabet' && (
          <section className="grid gap-4 px-4 md:grid-cols-[260px_1fr] md:px-6">
            <div className="rounded border border-slate-700 bg-slate-900 p-4">
              <h2 className="text-xl font-bold text-yellow-300">Alphabet</h2>
              <p className="mt-2 text-sm text-slate-300">Placeholder segment maps until the full rune alphabet is filled in.</p>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {placeholderAlphabet.map((letter) => (
                <div key={letter} className="rounded border border-slate-700 bg-slate-800 p-4 text-center">
                  <div className="text-sm font-bold text-slate-400">{letter}</div>
                  <div className="mt-2">
                    <RuneGlyph segments={placeholderRuneMap[letter]} title={`${letter} rune placeholder`} />
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'manual' && (
          <section className="flex flex-col gap-4">
            <div className="grid w-full gap-0 lg:grid-cols-2">
              {visiblePages.map((page) => (
                <ManualPageEditor
                  key={page.id}
                  imageUrl={page.imageUrl}
                  pageTitle={page.title}
                  translations={page.translations}
                />
              ))}
            </div>

            <div className="flex items-center justify-center gap-4 pb-6">
              <button
                onClick={goToPreviousSpread}
                disabled={spreadIndex === 0}
                className="flex h-10 w-10 items-center justify-center rounded bg-slate-800 text-slate-100 disabled:cursor-not-allowed disabled:opacity-40 hover:enabled:bg-slate-700"
                aria-label="Previous pages"
                title="Previous pages"
              >
                <ChevronLeft />
              </button>
              <span className="text-sm text-slate-300">
                Pages {visiblePages[0]?.pageNumber}-{visiblePages[visiblePages.length - 1]?.pageNumber}
              </span>
              <button
                onClick={goToNextSpread}
                disabled={spreadIndex >= manualPages.length - 2}
                className="flex h-10 w-10 items-center justify-center rounded bg-slate-800 text-slate-100 disabled:cursor-not-allowed disabled:opacity-40 hover:enabled:bg-slate-700"
                aria-label="Next pages"
                title="Next pages"
              >
                <ChevronRight />
              </button>
            </div>
          </section>
        )}

        {activeTab === 'translator' && (
          <section className="grid gap-4 px-4 md:grid-cols-2 md:px-6">
            <label className="flex flex-col gap-2">
              <span className="font-bold text-yellow-300">English</span>
              <textarea
                value={englishInput}
                onChange={(event) => setEnglishInput(event.target.value)}
                className="min-h-64 rounded border border-slate-700 bg-slate-950 p-4 text-slate-100 outline-none focus:border-yellow-300"
              />
            </label>
            <div className="flex flex-col gap-2">
              <span className="font-bold text-yellow-300">Tunic placeholder runes</span>
              <div className="flex min-h-64 flex-wrap content-start gap-3 rounded border border-slate-700 bg-slate-800 p-4 text-yellow-100">
                {translatedRunes.map((segments, index) =>
                  segments ? (
                    <RuneGlyph key={`${index}-${segments.join('-')}`} segments={segments} size={48} />
                  ) : (
                    <span key={`space-${index}`} className="w-6" />
                  )
                )}
                {!translatedRunes.length && <span> </span>}
              </div>
              <div className="rounded border border-slate-700 bg-slate-900 p-4 text-sm text-slate-300">
                Python phoneme output can map into this placeholder table later:
                <span className="ml-2 font-mono text-yellow-200">{Object.keys(placeholderPhonemeMap).join(', ')}</span>
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
