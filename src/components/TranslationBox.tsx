'use client';

import { useState } from 'react';
import { Grip, Save, Trash2 } from 'lucide-react';
import { Translation } from '../types';

interface TranslationBoxProps {
  translation: Translation;
  isEditing: boolean;
  canEdit: boolean;
  onUpdate: (fields: Partial<Translation>) => void;
  onEdit: () => void;
  onSave: () => void;
  onDelete: () => void;
  onStartDrag: (event: React.PointerEvent<HTMLDivElement>) => void;
  onDrag: (event: React.PointerEvent<HTMLDivElement>) => void;
  onStopDrag: (event: React.PointerEvent<HTMLDivElement>) => void;
}

export default function TranslationBox({
  translation,
  isEditing,
  canEdit,
  onUpdate,
  onEdit,
  onSave,
  onDelete,
  onStartDrag,
  onDrag,
  onStopDrag,
}: TranslationBoxProps) {
  const [showEnglish, setShowEnglish] = useState(false);

  if (isEditing) {
    return (
      <div 
        className="absolute bg-white/95 p-3 rounded-lg shadow-xl border border-slate-300 z-30 w-56 transition-all"
        style={{ left: `${translation.x}%`, top: `${translation.y}%`, transform: 'translate(-50%, -50%)' }}
        onClick={(event) => event.stopPropagation()}
        data-translation-box
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
        <div className="flex gap-2">
          <button 
            onClick={onSave}
            className="flex flex-1 items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white font-medium text-sm px-3 py-1.5 rounded transition-colors"
            title="Save note"
          >
            <Save size={15} />
            Save
          </button>
          <button
            onClick={onDelete}
            className="flex h-9 w-9 items-center justify-center rounded bg-red-600 text-white hover:bg-red-500 transition-colors"
            title="Delete note"
            aria-label="Delete note"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="absolute bg-yellow-100/90 p-2 rounded shadow-md cursor-grab active:cursor-grabbing text-center min-w-[112px] max-w-[190px] hover:bg-yellow-200 transition-colors z-10 hover:z-20 border border-yellow-300 touch-none"
      style={{ left: `${translation.x}%`, top: `${translation.y}%`, transform: 'translate(-50%, -50%)' }}
      onClick={(event) => {
        event.stopPropagation();
        setShowEnglish(!showEnglish);
      }}
      onDoubleClick={(event) => {
        event.stopPropagation();
        if (canEdit) onEdit();
      }}
      onPointerDown={onStartDrag}
      onPointerMove={onDrag}
      onPointerUp={onStopDrag}
      onPointerCancel={onStopDrag}
      data-translation-box
    >
      <div className="flex items-center justify-center gap-1 text-black">
        {canEdit && <Grip size={13} className="shrink-0 text-slate-500" />}
        <span className="break-words font-bold tracking-wide">
        {showEnglish ? translation.englishText : translation.tunicText || "Empty"}
        </span>
      </div>
      {canEdit && <div className="text-[10px] text-slate-600 mt-1 select-none">Double click to edit</div>}
    </div>
  );
}
