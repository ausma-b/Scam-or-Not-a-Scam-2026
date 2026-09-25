import { gameConfig } from '../data/cards';
import type { Mode } from '../types';
import { smartQuotes as sq } from '../lib/typography';

interface Props {
  onChoose: (mode: Mode) => void;
  onShowQr: () => void;
}

export default function StartScreen({ onChoose, onShowQr }: Props) {
  return (
    <section className="flex flex-1 flex-col items-center justify-center gap-6 py-4 text-center" aria-labelledby="game-title">
      <div className="scene" aria-hidden="true">
        <div className="sun-wrap">
          <div className="sun" />
        </div>
        <div className="horizon-grid" />
        <div className="horizon-line" />
      </div>

      <h1 id="game-title" className="title-chrome mt-4 flex flex-col items-center gap-[0.3em] text-[clamp(2.3rem,8vw,5.8rem)]">
        <span className="block">SCAM OR</span>
        <span className="block">NOT A SCAM?</span>
      </h1>

      <p className="max-w-[34rem] text-[1.15rem] font-medium text-ink">{sq(gameConfig.tagline)}</p>

      <div className="grid w-full max-w-[44rem] gap-4 sm:grid-cols-2">
        <button type="button" className="btn btn-scam flex-col !gap-1 py-4 text-[1.3rem]" onClick={() => onChoose('presenter')}>
          Presenter mode
          <span className="font-sans text-[0.85rem] normal-case tracking-normal">
            For the projector. The room votes together.
          </span>
        </button>
        <button type="button" className="btn btn-legit flex-col !gap-1 py-4 text-[1.3rem]" onClick={() => onChoose('solo')}>
          Solo mode
          <span className="font-sans text-[0.85rem] normal-case tracking-normal">On your phone. Just you.</span>
        </button>
      </div>

      <button type="button" className="btn btn-ghost btn-small" onClick={onShowQr}>
        <QrIcon /> Show QR code
      </button>
    </section>
  );
}

function QrIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M3 3h8v8H3V3zm2 2v4h4V5H5zm8-2h8v8h-8V3zm2 2v4h4V5h-4zM3 13h8v8H3v-8zm2 2v4h4v-4H5zm8-2h2v2h-2v-2zm4 0h4v2h-2v2h-2v-4zm-4 4h2v2h2v2h-4v-4zm6 2h2v2h-2v-2z" />
    </svg>
  );
}
