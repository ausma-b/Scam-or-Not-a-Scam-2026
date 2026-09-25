import { useEffect, useRef } from 'react';
import type { Answer, Card, Mode } from '../types';
import Mockup from './Mockup';
import { smartQuotes as sq } from '../lib/typography';
import RevealPanel from './RevealPanel';

interface Props {
  card: Card;
  index: number;
  total: number;
  results: boolean[];
  mode: Mode;
  choice: Answer | null;
  onAnswer: (a: Answer) => void;
  onNext: () => void;
}

export default function CardScreen({ card, index, total, results, mode, choice, onAnswer, onNext }: Props) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => headingRef.current?.focus({ preventScroll: true }), []);

  const revealed = choice !== null;
  const isLast = index + 1 >= total;

  return (
    <section className="flex flex-col gap-4 pb-6 pt-2" aria-labelledby="scenario">
      {revealed && <div className={`flash flash-${card.answer}`} aria-hidden="true" />}

      {/* Progress */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <p className="eyebrow text-sun">
          Card <span className="tabular-nums">{index + 1}</span> / <span className="tabular-nums">{total}</span>
        </p>
        <ol className="flex flex-1 gap-1.5" aria-hidden="true">
          {Array.from({ length: total }, (_, i) => {
            const r = results[i];
            const cls =
              r === true
                ? 'bg-cyan shadow-[0_0_0.4rem_#00F0FF]'
                : r === false
                  ? 'bg-magenta shadow-[0_0_0.4rem_#FF2EC4]'
                  : i === index
                    ? 'bg-sun/80'
                    : 'bg-haze/25';
            return <li key={i} className={`h-1.5 max-w-[4rem] flex-1 rounded-full ${cls}`} />;
          })}
        </ol>
      </div>

      <div className="card-grid">
        <div className="area-label">
          <p className="eyebrow mb-1 text-haze">{mockupName(card.mockupType)}</p>
          <h2
            id="scenario"
            ref={headingRef}
            tabIndex={-1}
            className="text-[1.45rem] font-bold leading-snug text-ink outline-none lg:text-[1.6rem]"
          >
            {sq(card.scenarioLabel)}
          </h2>
        </div>

        <div className="area-mock relative mx-auto w-full max-w-[26rem] lg:mt-1">
          <Mockup card={card} />
          {revealed && (
            <div className={`stamp stamp-${card.answer}`} aria-hidden="true">
              {card.answer === 'scam' ? 'SCAM!' : 'LEGIT!'}
            </div>
          )}
        </div>

        <div className="area-action">
          {!revealed ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <button type="button" className="btn btn-answer btn-scam" onClick={() => onAnswer('scam')}>
                Scam <span className="kbd">S</span>
              </button>
              <button type="button" className="btn btn-answer btn-legit" onClick={() => onAnswer('legit')}>
                Not a scam <span className="kbd">N</span>
              </button>
              {mode === 'presenter' && (
                <p className="text-[1.45rem] leading-snug text-ink sm:col-span-2 lg:col-span-1 xl:col-span-2">
                  Hands up for scam. Hands up for not a scam. Lock in the room&rsquo;s answer.
                </p>
              )}
            </div>
          ) : (
            <RevealPanel card={card} choice={choice} mode={mode} isLast={isLast} onNext={onNext} />
          )}
        </div>
      </div>
    </section>
  );
}

function mockupName(t: Card['mockupType']) {
  return {
    sms: 'Text message',
    email: 'Email',
    whatsapp: 'Group chat',
    videocall: 'Video call',
    bankapp: 'Banking app',
    socialad: 'Social media ad',
    voicemail: 'Voicemail',
  }[t];
}
