import { useEffect, useRef } from 'react';
import { gameConfig } from '../data/cards';
import type { Mode } from '../types';
import { smartQuotes as sq } from '../lib/typography';

interface Props {
  score: number;
  total: number;
  mode: Mode;
  onPlayAgain: () => void;
  onBack: () => void;
}

export default function EndScreen({ score, total, mode, onPlayAgain, onBack }: Props) {
  const headRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => headRef.current?.focus({ preventScroll: true }), []);
  const rank = gameConfig.ranks.find((r) => score >= r.min) ?? gameConfig.ranks[gameConfig.ranks.length - 1];

  return (
    <section className="flex flex-col items-center gap-8 py-6" aria-labelledby="end-title">
      <div className="flex flex-col items-center gap-2 text-center">
        <p className="eyebrow text-sun">{mode === 'presenter' ? 'Room score' : 'Your score'}</p>
        <h2 id="end-title" ref={headRef} tabIndex={-1} className="outline-none">
          <span className="block font-display text-[clamp(4rem,14vw,8rem)] leading-none tabular-nums neon-text-cyan">
            {score}
            <span className="text-[0.5em] text-haze">/{total}</span>
          </span>
          <span className="title-chrome mt-3 block text-[clamp(2rem,6vw,4rem)]">{rank.name}</span>
        </h2>
        <p className="max-w-[34rem] text-ink">{sq(rank.blurb)}</p>
      </div>

      <div className="w-full max-w-[52rem] rounded-2xl border-2 border-magenta/70 bg-panel/85 p-5 shadow-[0_0_1.6rem_rgba(255,46,196,0.2)] sm:p-7">
        <h3 className="mb-4 font-display text-[1.5rem] neon-text-magenta">{gameConfig.redFlagsTitle}</h3>
        <ul className="grid gap-3 sm:grid-cols-2">
          {gameConfig.redFlags.map((f, i) => (
            <li
              key={sq(f.name)}
              className={`flex gap-3 rounded-xl bg-night/70 p-4 ${i === gameConfig.redFlags.length - 1 && gameConfig.redFlags.length % 2 === 1 ? 'sm:col-span-2' : ''}`}
            >
              <FlagIcon />
              <div>
                <p className="font-bold text-sun">{sq(f.name)}</p>
                <p className="text-ink">{sq(f.detail)}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex w-full max-w-[36rem] flex-col gap-3 sm:flex-row">
        <button type="button" className="btn btn-scam flex-1 text-[1.2rem]" onClick={onPlayAgain}>
          Play again
        </button>
        <button type="button" className="btn btn-legit flex-1 text-[1.2rem]" onClick={onBack}>
          Back to start
        </button>
      </div>
    </section>
  );
}

function FlagIcon() {
  return (
    <svg className="mt-1 h-5 w-5 shrink-0 text-magenta drop-shadow-[0_0_0.3rem_#FF2EC4]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M5 21V3h2v1h12l-2.5 5L19 14H7v7H5z" />
    </svg>
  );
}
