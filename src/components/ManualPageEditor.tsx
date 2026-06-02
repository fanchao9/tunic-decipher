'use client';

import { useState, MouseEvent, PointerEvent } from 'react';
import Image from 'next/image';
import { Translation } from '../types';
import TranslationBox from './TranslationBox';

interface ManualPageEditorProps {
  imageUrl: string;
  pageTitle: string;
  canEdit: boolean;
  activeTranslationId: string | null;
  onSetActiveTranslation: (id: string | null) => void;
}

export default function ManualPageEditor({
  imageUrl,
  pageTitle,
  canEdit,
  activeTranslationId,
  onSetActiveTranslation,
}: ManualPageEditorProps) {
  const [translations, setTranslations] = useState<Translation[]>([]);
  const [draggingId, setDraggingId] = useState<string | null>(null);

  const handleImageClick = (e: MouseEvent<HTMLDivElement>) => {
    if (!canEdit) return;
    if (activeTranslationId) return;
    if ((e.target as HTMLElement).closest('[data-translation-box]')) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    const newTranslation: Translation = {
      id: Date.now().toString(), // Temporary ID until we hook up Supabase
      x,
      y,
      tunicText: '',
      englishText: '',
    };

    setTranslations((prev) => [...prev, newTranslation]);
    onSetActiveTranslation(newTranslation.id);
  };

  const updateTranslation = (id: string, updatedFields: Partial<Translation>) => {
    setTranslations((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updatedFields } : t))
    );
  };

  const deleteTranslation = (id: string) => {
    setTranslations((prev) => prev.filter((translation) => translation.id !== id));
    if (activeTranslationId === id) onSetActiveTranslation(null);
  };

  const moveTranslation = (id: string, event: PointerEvent<HTMLDivElement>) => {
    const page = event.currentTarget.closest('[data-manual-page]');
    if (!page) return;

    const rect = page.getBoundingClientRect();
    const x = Math.min(98, Math.max(2, ((event.clientX - rect.left) / rect.width) * 100));
    const y = Math.min(98, Math.max(2, ((event.clientY - rect.top) / rect.height) * 100));
    updateTranslation(id, { x, y });
  };

  const handleDragStart = (id: string, event: PointerEvent<HTMLDivElement>) => {
    if (!canEdit || activeTranslationId) return;
    event.stopPropagation();
    event.currentTarget.setPointerCapture(event.pointerId);
    setDraggingId(id);
  };

  const handleDragMove = (id: string, event: PointerEvent<HTMLDivElement>) => {
    if (draggingId !== id) return;
    event.stopPropagation();
    moveTranslation(id, event);
  };

  const handleDragEnd = (id: string, event: PointerEvent<HTMLDivElement>) => {
    if (draggingId !== id) return;
    event.stopPropagation();
    setDraggingId(null);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  return (
    <section className="w-full">
      <div className="mb-2 flex items-center justify-between text-sm text-slate-300">
        <span className="font-semibold text-yellow-300">{pageTitle}</span>
        {canEdit && <span>{activeTranslationId ? 'Finish the open note before adding another.' : 'Click empty space to add a note.'}</span>}
      </div>
      <div
        data-manual-page
        onClick={handleImageClick}
        className={`relative w-full overflow-hidden rounded border border-slate-600 bg-slate-800 shadow-xl ${
          canEdit && !activeTranslationId ? 'cursor-crosshair' : 'cursor-default'
        }`}
      >
        <Image 
          src={imageUrl} 
          alt={pageTitle}
          width={1920}
          height={1080}
          className="w-full h-auto block select-none pointer-events-none"
          draggable={false}
        />
        
        {translations.map((translation) => (
          <TranslationBox 
            key={translation.id} 
            canEdit={canEdit}
            isEditing={activeTranslationId === translation.id}
            translation={translation} 
            onUpdate={(fields) => updateTranslation(translation.id, fields)}
            onEdit={() => onSetActiveTranslation(translation.id)}
            onSave={() => onSetActiveTranslation(null)}
            onDelete={() => deleteTranslation(translation.id)}
            onStartDrag={(event) => handleDragStart(translation.id, event)}
            onDrag={(event) => handleDragMove(translation.id, event)}
            onStopDrag={(event) => handleDragEnd(translation.id, event)}
          />
        ))}
      </div>
    </section>
  );
}
