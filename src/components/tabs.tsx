'use client';

import { useState } from 'react';
import ManualPageEditor from './components/ManualPageEditor'; // Adjust import paths

export default function Home() {
  const [activeTab, setActiveTab] = useState<'alphabet' | 'manual'>('manual');

  return (
    <main className="min-h-screen bg-slate-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-yellow-500">
        Tunic Translation Tome
      </h1>

      {/* Tabs */}
      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={() => setActiveTab('alphabet')}
          className={`px-4 py-2 rounded-lg font-medium ${
            activeTab === 'alphabet' ? 'bg-yellow-600' : 'bg-slate-700 hover:bg-slate-600'
          }`}
        >
          Alphabet Translation
        </button>
        <button
          onClick={() => setActiveTab('manual')}
          className={`px-4 py-2 rounded-lg font-medium ${
            activeTab === 'manual' ? 'bg-yellow-600' : 'bg-slate-700 hover:bg-slate-600'
          }`}
        >
          Manual Pages
        </button>
      </div>

      {/* Content Rendering */}
      <div className="max-w-6xl mx-auto">
        {activeTab === 'alphabet' && (
          <div className="p-6 bg-slate-800 rounded-xl">
            <h2 className="text-xl mb-4">Alphabet Input Panel</h2>
            {/* Input fields for characters will go here */}
            <p className="text-slate-400">Map Tunic runes to English letters here.</p>
          </div>
        )}

        {activeTab === 'manual' && (
          <div className="flex flex-col items-center">
            {/* 
               In a full app, you would map over your database of pages here,
               including a checkbox for "Collected". 
               For now, we pass a sample image placeholder. 
            */}
            <ManualPageEditor imageUrl="https://via.placeholder.com/800x1100?text=Upload+Tunic+Manual+Page" />
          </div>
        )}
      </div>
    </main>
  );
}
