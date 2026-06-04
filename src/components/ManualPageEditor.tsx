import Image from 'next/image';
import { Translation } from '../types';
import TranslationBox from './TranslationBox';

interface ManualPageEditorProps {
  imageUrl: string;
  pageTitle: string;
  translations?: Translation[];
}

export default function ManualPageEditor({
  imageUrl,
  pageTitle,
  translations = [],
}: ManualPageEditorProps) {
  return (
    <section className="w-full">
      <div className="mb-2 flex items-center justify-between text-sm text-slate-300">
        <span className="font-semibold text-yellow-300">{pageTitle}</span>
      </div>
      <div data-manual-page className="relative w-full overflow-hidden border border-slate-600 bg-slate-800 shadow-xl">
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
            translation={translation} 
          />
        ))}
      </div>
    </section>
  );
}
