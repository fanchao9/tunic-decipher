'use client';

import { useEffect, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ManualPageEditor from '../components/ManualPageEditor';
import ManualPageToc from '../components/ManualPageToc';
import RuneGlyph, { RuneMap, RuneSegment } from '../components/RuneGlyph';
import { ManualPage } from '../types';
import { manualPages } from '../lib/manualPages';

const placeholderAlphabet = ['eye', 'ay', 'oy', 'ow', 'uh', 'ih', 'aw', 'oo', 'air', 'ar', 'aaa', 'eh', 'ear', 'ee', 'uu',  'er', 'or', 'oh', 'l', 'b', 'j', 'm', 'w', 'p', 'ch', 'k', 'v', 'n', 'd', 'h', 'r', 'y', 't', 'th', 'th_also', 'f', 'g', 's', 'z', 'sh', 'ng', 'test1', 'test2', 'all'];

const placeholderDisplayNames: Record<string, string> = {
  uu: 'uu (blue)',
  ih: 'ih (sit)',
  eh: 'eh (bed)',
  ar: 'ar (car)',
  eye: 'eye (fly)',
  ay: 'ay (day)',
  ow: 'ow (now)',
  air: "air (there)",
  oo: 'oo (should)',
  aaa: 'aaa (bad)',
  aw: 'aw (law)',
  er: 'er (her)',
  or: 'or (door)',
  ear: 'ear (hear)',
  oy: 'oy (boy)',
};

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
  AH: RuneMap.A,
  B: RuneMap.B,
  D: RuneMap.D,
  EH: RuneMap.E,
  F: RuneMap.F,
};

const buildAllManualSpreads = (pages: ManualPage[]) => {
  const pageMap = new Map(pages.map((page) => [page.pageNumber, page]));
  const pageNumbers = Array.from(pageMap.keys()).sort((a, b) => a - b);
  const spreads: ManualPage[][] = [];

  if (!pageNumbers.length) return spreads;

  const maxPageNumber = pageNumbers[pageNumbers.length - 1];

  for (let pageNumber = 1; pageNumber <= maxPageNumber; pageNumber += 2) {
    const spread: ManualPage[] = [];

    if (pageMap.has(pageNumber)) {
      spread.push(pageMap.get(pageNumber)!);
    }

    if (pageMap.has(pageNumber + 1)) {
      spread.push(pageMap.get(pageNumber + 1)!);
    }

    if (spread.length > 0) {
      spreads.push(spread);
    }
  }

  return spreads;
};

const buildBookSpreads = (pages: ManualPage[]) => {
  const pageMap = new Map(pages.map((page) => [page.pageNumber, page]));
  const spreads: ManualPage[][] = [];

  if (pageMap.has(1)) {
    const spread: ManualPage[] = [pageMap.get(1)!];
    if (pageMap.has(52)) {
      spread.push(pageMap.get(52)!);
    }
    spreads.push(spread);
  }

  for (let pageNumber = 2; pageNumber <= 50; pageNumber += 2) {
    const spread: ManualPage[] = [];

    if (pageMap.has(pageNumber)) {
      spread.push(pageMap.get(pageNumber)!);
    }

    if (pageMap.has(pageNumber + 1)) {
      spread.push(pageMap.get(pageNumber + 1)!);
    }

    if (spread.length > 0) {
      spreads.push(spread);
    }
  }

  return spreads;
};

type Tab = 'alphabet' | 'manual' | 'translator';

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>('manual');
  const [spreadIndex, setSpreadIndex] = useState(0);
  const [isTocOpen, setIsTocOpen] = useState(false);
  const [showRunicTranslations, setShowRunicTranslations] = useState(() => {
    try {
      return localStorage.getItem('showRunicTranslations') !== 'false';
    } catch (e) {
      return true;
    }
  });
  const [englishInput, setEnglishInput] = useState('The golden path');
  const [collectedPageIds, setCollectedPageIds] = useState<Record<string, boolean>>(
    () => Object.fromEntries(manualPages.map((page) => [page.id, false]))
  );

  const pageSpreads = useMemo(() => buildAllManualSpreads(manualPages), []);
  const tocSpreads = useMemo(() => buildBookSpreads(manualPages), []);

  const spreadColumns = useMemo(
    () => [tocSpreads.slice(0, 9), tocSpreads.slice(9, 18), tocSpreads.slice(18)],
    [tocSpreads]
  );

  const toggleSpreadSelection = (spread: ManualPage[]) => {
    const shouldSelect = !spread.every((page) => collectedPageIds[page.id]);
    setCollectedPageIds((current) => ({
      ...current,
      ...spread.reduce((acc, page) => ({
        ...acc,
        [page.id]: shouldSelect,
      }), {}),
    }));
  };

  const selectAllPages = () => {
    setCollectedPageIds(Object.fromEntries(manualPages.map((page) => [page.id, true])));
  };

  const clearAllPages = () => {
    setCollectedPageIds(Object.fromEntries(manualPages.map((page) => [page.id, false])));
  };

  useEffect(() => {
    setSpreadIndex((current) => (pageSpreads.length === 0 ? 0 : Math.min(current, pageSpreads.length - 1)));
  }, [pageSpreads.length]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (activeTab !== 'manual') return;
      const target = document.activeElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.getAttribute('contenteditable') === 'true')) {
        return;
      }
      // Use 'A' and 'D' keys to paginate left and right through spreads
      const key = event.key.toLowerCase();
      if (key === 'a') {
        event.preventDefault();
        setSpreadIndex((current) => Math.max(0, current - 1));
      } else if (key === 'd') {
        event.preventDefault();
        setSpreadIndex((current) => Math.min(pageSpreads.length - 1, current + 1));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeTab, pageSpreads.length]);

  useEffect(() => {
    try {
      localStorage.setItem('showRunicTranslations', showRunicTranslations ? 'true' : 'false');
    } catch (e) {
      // ignore
    }
  }, [showRunicTranslations]);

  const visiblePages = pageSpreads[spreadIndex] ?? [];
  const visiblePageLabel = visiblePages.length
    ? visiblePages.map((page) => page.pageNumber).join('/')
    : 'No collected pages selected';

  const translatedRunes = englishInput
    .split('')
    .filter((character) => /[a-z\s]/i.test(character))
    .map((character) => (character === ' ' ? null : RuneMap[character.toUpperCase()] ?? placeholderLetterSegments));

  const goToPreviousSpread = () => {
    setSpreadIndex((current) => Math.max(0, current - 1));
  };

  const goToNextSpread = () => {
    setSpreadIndex((current) => Math.min(pageSpreads.length - 1, current + 1));
  };

  return (
    <main className="min-h-screen bg-[#101820] font-sans text-slate-100">
      <div className="flex w-full flex-col gap-6">
        <header className="flex flex-col gap-4 border-b border-slate-700 px-4 py-5 md:flex-row md:items-end md:justify-between md:px-6">
          <div>
            <h1 className="text-3xl font-extrabold text-yellow-300 md:text-4xl">Tunic Translation Tome</h1>
            <p className="mt-2 text-sm text-slate-300">Decipher runes, read the manual, and translate into Tunic.</p>
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
          <section className="grid gap-4 px-4 md:px-6">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              <div className="rounded border border-slate-700 bg-slate-900 p-4 text-center">
                <h2 className="text-xl font-bold text-yellow-300">Alphabet</h2>
                <p className="mt-2 text-sm text-slate-300">Each rune depicts a syllabic sound in the Tunic language.</p>
              </div>
              {placeholderAlphabet.map((letter) => (
                <div key={letter} className="rounded border border-slate-700 bg-slate-800 p-4 text-center">
                  <div className="text-m font-bold text-slate-400">{placeholderDisplayNames[letter] ?? letter}</div>
                  <div className="mt-2">
                    <RuneGlyph segments={RuneMap[letter]} title={`${placeholderDisplayNames[letter] ?? letter} rune placeholder`} />
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'manual' && (
          <section className="flex flex-col items-center gap-4">

              <button
                type="button"
                onClick={() => setIsTocOpen(true)}
                className="inline-flex items-center justify-center w-50 rounded bg-yellow-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-yellow-300"
              >
                Table of Contents
              </button>
              <button
                type="button"
                onClick={() => setShowRunicTranslations((s) => !s)}
                className={`inline-flex items-center justify-center w-50 rounded px-4 py-2 text-sm font-semibold transition ${
                  showRunicTranslations ? 'bg-yellow-400 text-slate-950 hover:bg-yellow-300' : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                }`}
              >
                Toggle Runic Translations
              </button>

            <ManualPageToc
              isOpen={isTocOpen}
              tocSpreads={tocSpreads}
              collectedPageIds={collectedPageIds}
              onToggleSpread={toggleSpreadSelection}
              onSelectAll={selectAllPages}
              onClearAll={clearAllPages}
              onClose={() => setIsTocOpen(false)}
            />

            <div className="grid w-full gap-0 lg:grid-cols-2">
              {visiblePages.map((page) => (
                <ManualPageEditor
                  key={page.id}
                  imageUrl={page.imageUrl}
                  pageTitle={page.title}
                  translations={page.translations}
                  showTranslations={showRunicTranslations}
                  isMissing={!collectedPageIds[page.id]}
                />
              ))}
            </div>

            <div className="flex items-center justify-center gap-4 pb-6">
              <button
                onClick={goToPreviousSpread}
                disabled={spreadIndex === 0 || pageSpreads.length === 0}
                className="flex h-10 w-10 items-center justify-center rounded bg-slate-800 text-slate-100 disabled:cursor-not-allowed disabled:opacity-40 hover:enabled:bg-slate-700"
                aria-label="Previous pages"
                title="Previous pages"
              >
                <ChevronLeft />
              </button>
              <span className="text-sm text-slate-300">
                {visiblePages.length ? `Pages ${visiblePageLabel}` : visiblePageLabel}
              </span>
              <button
                onClick={goToNextSpread}
                disabled={spreadIndex >= pageSpreads.length - 1 || pageSpreads.length === 0}
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
