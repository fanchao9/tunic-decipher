'use client';

import { useState, MouseEvent } from 'react';

interface Translation {
  id: string;
  x: number;
  y: number;
  tunicText: string;
  englishText: string;
  isEditing: boolean;
}

export default function ManualPageEditor({ imageUrl }: { imageUrl: string }) {
  const [translations, setTranslations] = useState<Translation[]>([]);

  // When you click the image, calculate the X and Y percentage
  const handleImageClick = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    const newTranslation: Translation = {
      id: Date.now().toString(),
      x,
      y,
      tunicText: '',
      englishText: '',
      isEditing: true, // Start in edit mode
    };

    setTranslations([...translations, newTranslation]);
  };

  const updateTranslation = (id: string, updatedFields: Partial<Translation>) => {
    setTranslations((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updatedFields } : t))
    );
  };

  return (
    <div className="relative inline-block w-full max-w-4xl border-2 border-slate-700 rounded-md">
      {/* The base manual screenshot */}
      <div onClick={handleImageClick} className="cursor-crosshair relative">
        <img 
          src={imageUrl} 
          alt="Tunic Manual Page" 
          className="w-full h-auto pointer-events-none select-none"
        />
      </div>

      {/* Render all the translation textboxes */}
      {translations.map((translation) => (
        <TranslationBox 
          key={translation.id} 
          translation={translation} 
          onUpdate={(fields) => updateTranslation(translation.id, fields)}
        />
      ))}
    </div>
  );
}
