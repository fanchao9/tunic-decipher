'use client';

import { FormEvent, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, Lock, LogOut, Unlock } from 'lucide-react';
import ManualPageEditor from '../components/ManualPageEditor';
import { ManualPage } from '../types';

const manualPages: ManualPage[] = [
  { id: 'manual-1', pageNumber: 1, imageUrl: '/manual-pages/page-1.svg', title: 'Manual Page 1' },
  { id: 'manual-2', pageNumber: 2, imageUrl: '/manual-pages/page-2.svg', title: 'Manual Page 2' },
  { id: 'manual-3', pageNumber: 3, imageUrl: '/manual-pages/page-3.svg', title: 'Manual Page 3' },
  { id: 'manual-4', pageNumber: 4, imageUrl: '/manual-pages/page-4.svg', title: 'Manual Page 4' },
];

const placeholderAlphabet = [
  ['A', '𐌰'], ['B', '𐌱'], ['C', '𐌲'], ['D', '𐌳'], ['E', '𐌴'], ['F', '𐌵'],
  ['G', '𐌶'], ['H', '𐌷'], ['I', '𐌹'], ['J', '𐌾'], ['K', '𐌺'], ['L', '𐌻'],
];

const placeholderMap: Record<string, string> = {
  a: '𐌰', b: '𐌱', c: '𐌲', d: '𐌳', e: '𐌴', f: '𐌵', g: '𐌶', h: '𐌷',
  i: '𐌹', j: '𐌾', k: '𐌺', l: '𐌻', m: '◇', n: '△', o: '○', p: '□',
  q: '⌁', r: '⌂', s: '⌄', t: '⌃', u: '◌', v: '◍', w: '◈', x: '✦',
  y: '✧', z: '✶',
};

type Tab = 'alphabet' | 'manual' | 'translator';

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>('manual');
  const [spreadIndex, setSpreadIndex] = useState(0);
  const [activeTranslationId, setActiveTranslationId] = useState<string | null>(null);
  const [manualUnlocked, setManualUnlocked] = useState(false);
  const [password, setPassword] = useState('');
  const [authMessage, setAuthMessage] = useState('');
  const [englishInput, setEnglishInput] = useState('The golden path');

  const visiblePages = useMemo(
    () => manualPages.slice(spreadIndex, spreadIndex + 2),
    [spreadIndex]
  );

  const translatedText = englishInput
    .split('')
    .map((character) => {
      const lower = character.toLowerCase();
      return placeholderMap[lower] || character;
    })
    .join('');

  const handleUnlock = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAuthMessage('Checking password...');

    const response = await fetch('/api/manual-auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    const result = await response.json();

    if (result.ok) {
      setManualUnlocked(true);
      setPassword('');
      setAuthMessage('Manual editing unlocked.');
      return;
    }

    setAuthMessage('That password did not unlock editing.');
  };

  const goToPreviousSpread = () => {
    setActiveTranslationId(null);
    setSpreadIndex((current) => Math.max(0, current - 2));
  };

  const goToNextSpread = () => {
    setActiveTranslationId(null);
    setSpreadIndex((current) => Math.min(manualPages.length - 2, current + 2));
  };

  return (
    <main className="min-h-screen bg-[#101820] text-slate-100 p-4 md:p-6 font-sans">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <header className="flex flex-col gap-4 border-b border-slate-700 pb-5 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-yellow-300 md:text-4xl">
              Tunic Translation Tome
            </h1>
            <p className="mt-2 text-sm text-slate-300">
              Decipher runes, annotate manual pages, and test placeholder translations.
            </p>
          </div>

          <nav className="flex flex-wrap gap-2">
            {(['alphabet', 'manual', 'translator'] as Tab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`rounded px-4 py-2 text-sm font-semibold capitalize transition-colors ${
                  activeTab === tab
                    ? 'bg-yellow-400 text-slate-950'
                    : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                }`}
              >
                {tab === 'translator' ? 'Translate' : tab}
              </button>
            ))}
          </nav>
        </header>

        {activeTab === 'alphabet' && (
          <section className="grid gap-4 md:grid-cols-[260px_1fr]">
            <div className="rounded border border-slate-700 bg-slate-900 p-4">
              <h2 className="text-xl font-bold text-yellow-300">Alphabet</h2>
              <p className="mt-2 text-sm text-slate-300">
                Placeholder runes until your screenshot reference is added.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {placeholderAlphabet.map(([letter, rune]) => (
                <div key={letter} className="rounded border border-slate-700 bg-slate-800 p-4 text-center">
                  <div className="text-sm font-bold text-slate-400">{letter}</div>
                  <div className="mt-2 text-3xl text-yellow-200">{rune}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'manual' && (
          <section className="flex flex-col gap-4">
            <div className="flex flex-col gap-3 rounded border border-slate-700 bg-slate-900 p-4 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-3">
                {manualUnlocked ? <Unlock className="text-green-300" size={20} /> : <Lock className="text-yellow-300" size={20} />}
                <div>
                  <h2 className="font-bold text-slate-100">Manual editing</h2>
                  <p className="text-sm text-slate-300">
                    Viewing is open. Adding, editing, moving, and deleting notes requires the shared password.
                  </p>
                </div>
              </div>

              {manualUnlocked ? (
                <button
                  onClick={() => {
                    setManualUnlocked(false);
                    setActiveTranslationId(null);
                    setAuthMessage('');
                  }}
                  className="flex items-center justify-center gap-2 rounded bg-slate-700 px-4 py-2 text-sm font-semibold hover:bg-slate-600"
                >
                  <LogOut size={16} />
                  Lock editing
                </button>
              ) : (
                <form onSubmit={handleUnlock} className="flex flex-col gap-2 sm:flex-row sm:items-center">
                  <input
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Manual password"
                    className="rounded border border-slate-600 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-yellow-300"
                  />
                  <button className="rounded bg-yellow-400 px-4 py-2 text-sm font-bold text-slate-950 hover:bg-yellow-300">
                    Unlock
                  </button>
                </form>
              )}
            </div>

            {authMessage && <p className="text-sm text-slate-300">{authMessage}</p>}

            <div className="grid gap-4 lg:grid-cols-2">
              {visiblePages.map((page) => (
                <ManualPageEditor
                  key={page.id}
                  imageUrl={page.imageUrl}
                  pageTitle={page.title}
                  canEdit={manualUnlocked}
                  activeTranslationId={activeTranslationId}
                  onSetActiveTranslation={setActiveTranslationId}
                />
              ))}
            </div>

            <div className="flex items-center justify-center gap-4">
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
          <section className="grid gap-4 md:grid-cols-2">
            <label className="flex flex-col gap-2">
              <span className="font-bold text-yellow-300">English</span>
              <textarea
                value={englishInput}
                onChange={(event) => setEnglishInput(event.target.value)}
                className="min-h-64 rounded border border-slate-700 bg-slate-950 p-4 text-slate-100 outline-none focus:border-yellow-300"
              />
            </label>
            <div className="flex flex-col gap-2">
              <span className="font-bold text-yellow-300">Tunic placeholder</span>
              <div className="min-h-64 rounded border border-slate-700 bg-slate-800 p-4 text-3xl leading-relaxed text-yellow-100">
                {translatedText || ' '}
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
