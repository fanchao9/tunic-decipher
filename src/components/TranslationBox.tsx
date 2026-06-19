import { Translation } from '../types';

interface TranslationBoxProps {
  translation: Translation;
}

export default function TranslationBox({ translation }: TranslationBoxProps) {
  return (
    <div
      className="absolute z-10 rounded border border-yellow-200/70 bg-yellow-100/90 px-1 py-1 text-center text-slate-950 shadow-md"
      style={{
        left: `${translation.x}%`,
        top: `${translation.y}%`,
        maxWidth: `${translation.maxWidth ?? 22}%`,
        fontSize: `${translation.fontSize ?? 1}rem`,
        transform: 'translate(-50%, -50%)',
      }}
      data-translation-box
    >
      <span className="block text-wrap break-words font-bold leading-tight">{translation.englishText}</span>
    </div>
  );
}
