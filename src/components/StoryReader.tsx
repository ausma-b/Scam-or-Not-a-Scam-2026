import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import type { Card } from '../types';
import { smartQuotes as sq } from '../lib/typography';

interface Props {
  card: Card;
  onClose: () => void;
}

/** Full-screen, scrollable news summary shown inside the game (no new window). */
export default function StoryReader({ card, onClose }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const story = card.story!;

  useEffect(() => {
    const prevFocus = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.body.dataset.overlay = 'story';
    closeRef.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
      delete document.body.dataset.overlay;
      prevFocus?.focus({ preventScroll: true });
    };
  }, [onClose]);

  return createPortal(
    <div
      className="fixed inset-0 z-[70] overflow-y-auto overscroll-contain bg-dusk sm:bg-night/95 sm:backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="story-title"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <article className="relative mx-auto flex min-h-full w-full max-w-[54rem] flex-col bg-dusk sm:my-8 sm:min-h-0 sm:rounded-2xl sm:border-2 sm:border-magenta/70 sm:shadow-[0_0_2rem_rgba(255,46,196,0.25)]">
        <header className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-haze/20 bg-dusk px-4 py-3 pt-[max(0.75rem,env(safe-area-inset-top,0px))] sm:rounded-t-2xl sm:px-6">
          <div className="min-w-0 leading-tight">
            <p className="eyebrow truncate text-sun">{card.sourceOutlet}</p>
            <p className="text-[0.8rem] text-haze">{card.sourceDate}</p>
          </div>
          <button ref={closeRef} type="button" className="btn btn-ghost btn-small shrink-0" onClick={onClose}>
            Back to the game
          </button>
        </header>

        <div className="flex flex-col gap-5 px-4 pb-8 pt-5 sm:px-6">
          <p className="eyebrow text-[0.9rem] text-haze">The real story</p>
          <h2 id="story-title" className="font-display text-[2.1rem] leading-tight neon-text-magenta sm:text-[2.4rem]">
            {sq(story.headline)}
          </h2>

          <div className="flex flex-col gap-5 text-[1.2rem] text-ink sm:text-[1.3rem]">
            {story.paragraphs.map((p, i) => (
              <p key={i} className="max-w-[48rem] leading-relaxed">
                {sq(p)}
              </p>
            ))}
          </div>

          <section className="rounded-xl border-2 border-cyan/70 bg-night px-4 py-4" aria-labelledby="story-todo">
            <h3 id="story-todo" className="mb-3 font-display text-[1.5rem] neon-text-cyan">
              What to do
            </h3>
            <ul className="flex flex-col gap-2">
              {story.whatToDo.map((t, i) => (
                <li key={i} className="flex gap-3 text-[1.2rem] leading-snug text-ink sm:text-[1.3rem]">
                  <span className="mt-[0.55em] h-2 w-2 shrink-0 rounded-full bg-cyan" aria-hidden="true" />
                  <span>{sq(t)}</span>
                </li>
              ))}
            </ul>
          </section>

          <p className="text-[1rem] text-haze">
            Summary written for this game from {card.sourceOutlet}, {card.sourceDate}.
          </p>

          <button type="button" className="btn btn-sun self-stretch text-[1.2rem] sm:self-start sm:px-10" onClick={onClose}>
            Back to the game
          </button>
        </div>
      </article>
    </div>,
    document.body,
  );
}
