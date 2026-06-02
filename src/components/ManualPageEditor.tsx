'use client';

import { useState, MouseEvent } from 'react';
import { Translation } from '../types';
import TranslationBox from './TranslationBox';

export default function ManualPageEditor({ imageUrl }: { imageUrl: string }) {
  const [translations, setTranslations] = useState<Translation[]>([]);

  // Calculate percentage-based coordinates so it scales with screen size
  const handleImageClick = (e: MouseEvent<HTMLDivElement>) => {
    // Prevent creating a new box if we clicked on an existing box
    if ((e.target as HTMLElement).closest('.absolute')) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    const newTranslation: Translation = {
      id: Date.now().toString(), // Temporary ID until we hook up Supabase
      x,
      y,
      tunicText: '',
      englishText: '',
      isEditing: true,
    };

    setTranslations([...translations, newTranslation]);
  };

  const updateTranslation = (id: string, updatedFields: Partial<Translation>) => {
    setTranslations((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updatedFields } : t))
    );
  };

  return (
    <div className="relative inline-block w-full max-w-4xl border border-slate-600 rounded-lg overflow-hidden shadow-2xl bg-slate-800">
      <div onClick={handleImageClick} className="cursor-crosshair relative w-full h-full">
        {/* Make sure the image acts as a solid background block */}
        <img 
          src={imageUrl} 
          alt="Tunic Manual Page" 
          className="w-full h-auto block select-none pointer-events-none"
        />
        
        {translations.map((translation) => (
          <TranslationBox 
            key={translation.id} 
            translation={translation} 
            onUpdate={(fields) => updateTranslation(translation.id, fields)}
          />
        ))}
      </div>
      <div className="p-3 bg-slate-700 text-sm text-center text-slate-300">
        Click anywhere on the manual page to add a translation box.
      </div>
    </div>
  );
}
