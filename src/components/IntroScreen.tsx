import { useEffect, useRef } from 'react';
import { gameConfig } from '../data/cards';
import type { Mode } from '../types';

interface Props {
  mode: Mode;
  total: number;
  onGo: () => void;
}

export default function IntroScreen({ mode, total, onGo }: Props) {
  const goRef = useRef<HTMLButtonElement>(null);
  useEffect(() => goRef.current?.focus({ preventScroll: true }), []);

  return (
    <section className="flex flex-1 flex-col items-center justify-center gap-8 py-8 text-center" aria-labelledby="intro-title">
      <h2 id="intro-title" className="flex flex-col gap-2 font-display text-[clamp(2rem,6vw,4.4rem)] leading-[1.1]">
        <span className="neon-text-sun">{total} real situations.</span>
        {gameConfig.introLines.map((line, i) => (
          <span key={line} className={i === 0 ? 'neon-text-magenta' : i === 1 ? 'neon-text-cyan' : 'text-ink'}>
            {line}
          </span>
        ))}
      </h2>

      <p className={mode === 'presenter' ? 'max-w-[48rem] text-[1.6rem] leading-snug text-ink' : 'max-w-[36rem] text-haze'}>
        {mode === 'presenter'
          ? 'Vote by show of hands or just shout it out. The presenter locks in the room’s answer.'
          : 'Tap your answer, see what really happened, then tap Next. Nothing is saved.'}
      </p>

      <button ref={goRef} type="button" className="btn btn-sun px-10 text-[1.5rem]" onClick={onGo}>
        Let&rsquo;s go
      </button>

      <p className="text-[0.85rem] text-haze [@media(hover:none)]:hidden">
        Keys: <span className="kbd">S</span> scam, <span className="kbd">N</span> not a scam, <span className="kbd">Enter</span> next
      </p>
    </section>
  );
}
