'use client';

import { useState } from 'react';
import { Translation } from '../types';

interface TranslationBoxProps {
  translation: Translation;
  onUpdate: (fields: Partial<Translation>) => void;
}

export default function TranslationBox({ translation, onUpdate }: TranslationBoxProps) {
  const [showEnglish, setShowEnglish] = useState(false);

  if (translation.isEditing) {
    return (
      <div 
        className="absolute bg-white/95 p-3 rounded-lg shadow-xl border border-slate-300 z-20 w-56 transition-all"
        style={{ left: `${translation.x}%`, top: `${translation.y}%`, transform: 'translate(-50%, -50%)' }}
      >
        <input
          type="text"
          placeholder="Tunic Text..."
          className="w-full mb-2 p-2 border rounded text-sm text-black focus:outline-none focus:ring-2 focus:ring-yellow-500"
          value={translation.tunicText}
          onChange={(e) => onUpdate({ tunicText: e.target.value })}
        />
        <input
          type="text"
          placeholder="English Translation..."
          className="w-full mb-3 p-2 border rounded text-sm text-black focus:outline-none focus:ring-2 focus:ring-yellow-500"
          value={translation.englishText}
          onChange={(e) => onUpdate({ englishText: e.target.value })}
        />
        <button 
          onClick={() => onUpdate({ isEditing: false })}
          className="bg-green-600 hover:bg-green-500 text-white font-medium text-sm px-3 py-1.5 rounded w-full transition-colors"
        >
          Save
        </button>
      </div>
    );
  }

  return (
    <div
      className="absolute bg-yellow-100/90 p-2 rounded shadow-md cursor-pointer text-center min-w-[100px] hover:bg-yellow-200 transition-colors z-10 hover:z-20 border border-yellow-300"
      style={{ left: `${translation.x}%`, top: `${translation.y}%`, transform: 'translate(-50%, -50%)' }}
      onClick={() => setShowEnglish(!showEnglish)}
      onDoubleClick={() => onUpdate({ isEditing: true })}
    >
      <span className="text-black font-bold tracking-wide">
        {showEnglish ? translation.englishText : translation.tunicText || "Empty"}
      </span>
      <div className="text-[10px] text-slate-600 mt-1 select-none">(Double click to edit)</div>
    </div>
  );
}
