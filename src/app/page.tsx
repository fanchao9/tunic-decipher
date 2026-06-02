'use client';

import { useState } from 'react';
import ManualPageEditor from '../components/ManualPageEditor';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'alphabet' | 'manual'>('manual');

  return (
    <main className="min-h-screen bg-slate-900 text-slate-100 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
            Tunic Translation Tome
          </h1>
          <p className="text-slate-400">Collaboratively decipher and track manual pages.</p>
        </header>

        {/* Tab Navigation */}
        <div className="flex justify-center gap-2 md:gap-4 mb-8">
          <button
            onClick={() => setActiveTab('alphabet')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'alphabet' 
                ? 'bg-yellow-500 text-slate-900 shadow-lg' 
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Alphabet
          </button>
          <button
            onClick={() => setActiveTab('manual')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'manual' 
                ? 'bg-yellow-500 text-slate-900 shadow-lg' 
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Manual Pages
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex flex-col items-center w-full">
          {activeTab === 'alphabet' && (
            <div className="w-full max-w-2xl p-8 bg-slate-800 border border-slate-700 rounded-xl shadow-xl">
              <h2 className="text-2xl font-bold mb-4 text-yellow-500">Alphabet Translation</h2>
              <p className="text-slate-300 mb-6">
                (Alphabet mapping component will go here)
              </p>
            </div>
          )}

          {activeTab === 'manual' && (
            <div className="w-full flex flex-col items-center">
              {/* For now, we use a placeholder image. Later, we'll map through images from Supabase */}
              <ManualPageEditor 
                imageUrl="https://images.unsplash.com/photo-1594909122845-11baa439b7bf?auto=format&fit=crop&q=80&w=800&h=1100" 
              />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
