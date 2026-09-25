import { useCallback, useEffect, useRef, useState } from 'react';
import { smartQuotes as sq } from '../lib/typography';
import StoryReader from './StoryReader';
import type { Answer, Card, Mode } from '../types';

interface Props {
  card: Card;
  choice: Answer;
  mode: Mode;
  isLast: boolean;
  onNext: () => void;
}

export default function RevealPanel({ card, choice, mode, isLast, onNext }: Props) {
  const nextRef = useRef<HTMLButtonElement>(null);
  const [storyOpen, setStoryOpen] = useState(false);
  const closeStory = useCallback(() => setStoryOpen(false), []);
  useEffect(() => nextRef.current?.focus({ preventScroll: true }), []);

  const correct = choice === card.answer;
  const said = choice === 'scam' ? 'SCAM' : 'NOT A SCAM';
  const who = mode === 'presenter' ? 'The room said' : 'You said';
  const scam = card.answer === 'scam';

  return (
    <div className="rise-in reveal-grid">
      <p
        role="status"
        className={`r-fb flex flex-wrap items-baseline gap-x-3 font-display ${mode === 'presenter' ? 'text-[2rem]' : 'text-[1.5rem]'} ${correct ? 'neon-text-sun' : 'text-orange'}`}
      >
        <span>{correct ? 'Correct!' : 'Not quite.'}</span>
        <span className={`font-sans font-medium ${mode === 'presenter' ? 'text-[1.35rem] text-ink' : 'text-[1rem] text-haze'}`}>
          {who} {said}. It was {scam ? 'a scam' : 'genuine'}.
        </span>
      </p>

      <div
        className={`r-panel flex flex-col gap-3 rounded-2xl border-2 bg-panel/90 p-5 ${
          scam ? 'border-magenta/80 shadow-[0_0_1.4rem_rgba(255,46,196,0.25)]' : 'border-cyan/80 shadow-[0_0_1.4rem_rgba(0,240,255,0.22)]'
        }`}
      >
        <h3 className={`font-display ${mode === 'presenter' ? 'text-[2.1rem]' : 'text-[1.7rem]'} leading-tight ${scam ? 'neon-text-magenta' : 'neon-text-cyan'}`}>
          {sq(card.verdictHeadline)}
        </h3>
        <p className={`text-ink ${mode === 'presenter' ? 'max-w-[48rem] text-[1.2rem] leading-snug' : 'max-w-[40rem]'}`}>{sq(card.vignette)}</p>

        <div className="rounded-xl border-l-4 border-sun bg-night/70 px-4 py-3">
          <p className="eyebrow mb-1 text-sun">The tell</p>
          <p className={`font-medium text-ink ${mode === 'presenter' ? 'text-[1.2rem] leading-snug' : ''}`}>{sq(card.tell)}</p>
        </div>

        {card.story ? (
          <button
            type="button"
            onClick={() => setStoryOpen(true)}
            className="btn btn-ghost btn-small w-full !justify-between !normal-case !tracking-normal text-left sm:w-auto sm:self-start"
          >
            <span className="flex flex-col leading-tight">
              <span className="font-display text-[0.95rem] tracking-wide">Read the real story</span>
              <span className="font-sans text-[0.8rem] text-haze">
                {card.sourceOutlet}, {card.sourceDate}
              </span>
            </span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
              <path d="M5 4h11l3 3v13H5zM8 10h8M8 14h8M8 18h5" />
            </svg>
          </button>
        ) : (
          <a
            href={card.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost btn-small w-full !justify-between !normal-case !tracking-normal text-left sm:w-auto sm:self-start"
          >
            <span className="flex flex-col leading-tight">
              <span className="font-display text-[0.95rem] tracking-wide">Read the real story</span>
              <span className="font-sans text-[0.8rem] text-haze">
                {card.sourceOutlet}, {card.sourceDate}
              </span>
            </span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
              <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
            </svg>
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        )}
      </div>

      <button ref={nextRef} type="button" className="r-next btn btn-sun text-[1.3rem] sm:justify-self-end sm:px-10" onClick={onNext}>
        {isLast ? 'See the score' : 'Next card'} <span className="kbd">Enter</span>
      </button>
      {storyOpen && <StoryReader card={card} onClose={closeStory} />}
    </div>
  );
}
