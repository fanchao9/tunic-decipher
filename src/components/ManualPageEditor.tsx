import Image from 'next/image';
import { Translation } from '../types';
import TranslationBox from './TranslationBox';

interface ManualPageEditorProps {
  imageUrl: string;
  pageTitle: string;
  translations?: Translation[];
  isMissing?: boolean;
  showTranslations?: boolean;
}

export default function ManualPageEditor({
  imageUrl,
  pageTitle,
  translations = [],
  isMissing = false,
  showTranslations = true,
}: ManualPageEditorProps) {
  const pageNumber = pageTitle.replace('Manual Page ', '');

  return (
    <section className="w-full">
      {/* <div className="mb-2 flex items-center justify-between text-sm text-slate-300">
        <span className="font-semibold text-yellow-300">{pageTitle}</span>
      </div> */}
      <div
        className="relative mx-auto overflow-hidden border border-slate-600 bg-slate-800 shadow-xl"
        style={{ maxWidth: 1150, aspectRatio: '1150 / 850', width: '100%' }}
      >
        {isMissing ? (
          <div className="flex h-full w-full items-center justify-center bg-slate-900 p-6 text-center">
            <div>
              <div className="text-xl font-bold uppercase tracking-wide text-yellow-300">
                MISSING MANUAL PAGE {pageNumber}
              </div>
            </div>
          </div>
        ) : (
          <>
            <Image
              src={imageUrl}
              alt={pageTitle}
              fill
              sizes="(max-width: 1150px) 100vw, 1150px"
              className="object-cover"
              draggable={false}
            />
            {showTranslations &&
              translations.map((translation) => (
                <TranslationBox key={translation.id} translation={translation} />
              ))}
          </>
        )}
      </div>
    </section>
  );
}
