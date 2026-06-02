'use client';

import { useState } from 'react';
import { Translation } from '../types';

interface TranslationBoxProps {
  translation: Translation & { isEditing?: boolean };
  onUpdate: (fields: Partial<Translation> & { isEditing?: boolean }) => void;
}

export default function TranslationBox({ translation, onUpdate }: TranslationBoxProps) {
  const [showEnglish, setShowEnglish] = useState(false);

  if (translation.isEditing) {
    return (
      <div 
        className="absolute bg-white/90 p-2 rounded shadow-lg border border-slate-400 z-10 w-48"
        style={{ left: `${translation.x}%`, top: `${translation.y}%`, transform: 'translate(-50%, -50%)' }}
      >
        <input
          type="text"
          placeholder="Tunic Text..."
          className="w-full mb-2 p-1 border rounded text-sm text-black"
          value={translation.tunicText}
          onChange={(e) => onUpdate({ tunicText: e.target.value })}
        />
        <input
          type="text"
          placeholder="English Translation..."
          className="w-full mb-2 p-1 border rounded text-sm text-black"
          value={translation.englishText}
          onChange={(e) => onUpdate({ englishText: e.target.value })}
        />
        <button 
          onClick={() => onUpdate({ isEditing: false })}
          className="bg-green-600 text-white text-xs px-2 py-1 rounded w-full"
        >
          Save
        </button>
      </div>
    );
  }

  return (
    <div
      className="absolute bg-yellow-100/80 p-2 rounded shadow cursor-pointer text-center min-w-[100px] hover:bg-yellow-200 transition-colors z-0 hover:z-10"
      style={{ left: `${translation.x}%`, top: `${translation.y}%`, transform: 'translate(-50%, -50%)' }}
      onClick={() => setShowEnglish(!showEnglish)}
      onDoubleClick={() => onUpdate({ isEditing: true })}
    >
      <span className="text-black font-semibold">
        {showEnglish ? translation.englishText : translation.tunicText || "Empty"}
      </span>
      <div className="text-[10px] text-gray-500 mt-1">(Double click to edit)</div>
    </div>
  );
}
