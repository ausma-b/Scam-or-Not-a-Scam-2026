import type { Mode, Screen } from '../types';

interface Props {
  screen: Screen;
  mode: Mode;
  score: number;
  answered: number;
  soundOn: boolean;
  onToggleSound: () => void;
  musicOn: boolean;
  onToggleMusic: () => void;
  onExit: () => void;
}

/** Top bar: wordmark, running score, sound toggle and exit. */
export default function PresenterControls({ screen, mode, score, answered, soundOn, onToggleSound, musicOn, onToggleMusic, onExit }: Props) {
  const inGame = screen === 'card' || screen === 'intro';
  const showScore = screen === 'card' || screen === 'intro';
  const scoreLabel = mode === 'presenter' ? 'Room score' : 'Your score';

  return (
    <header className="mx-auto flex w-full max-w-[74rem] items-center justify-between gap-3 pt-4 pb-2">
      <div className="min-w-0">
        {screen !== 'start' && (
          <button
            type="button"
            onClick={onExit}
            className={`font-display text-[0.95rem] tracking-wider neon-text-magenta hover:underline ${showScore ? 'hidden sm:inline' : ''}`}
            title="Back to start"
          >
            SCAM OR NOT A SCAM?
          </button>
        )}
      </div>

      <div className="flex shrink-0 items-center gap-2">
        {showScore && (
          <div
            className="flex items-baseline gap-2 rounded-lg border-2 border-sun/70 bg-night/70 px-3 py-1.5"
            aria-live="polite"
          >
            <span className="eyebrow text-sun"><span className="hidden sm:inline">{scoreLabel}</span><span className="sm:hidden">Score</span></span>
            <span className="font-display text-[1.2rem] tabular-nums text-ink">
              {score}
              <span className="text-haze">/{answered}</span>
            </span>
          </div>
        )}
        <button
          type="button"
          className="btn btn-ghost btn-small"
          aria-pressed={musicOn}
          onClick={onToggleMusic}
          title="Background music"
        >
          <MusicIcon on={musicOn} />
          <span className="hidden sm:inline">Music {musicOn ? 'on' : 'off'}</span>
          <span className="sr-only sm:hidden">Music {musicOn ? 'on' : 'off'}</span>
        </button>
        <button
          type="button"
          className="btn btn-ghost btn-small"
          aria-pressed={soundOn}
          onClick={onToggleSound}
          title="Sound effects"
        >
          <SpeakerIcon on={soundOn} />
          <span className="hidden sm:inline">Effects {soundOn ? 'on' : 'off'}</span>
          <span className="sr-only sm:hidden">Sound effects {soundOn ? 'on' : 'off'}</span>
        </button>
        {inGame && (
          <button type="button" className="btn btn-ghost btn-small" onClick={onExit}>
            Exit
          </button>
        )}
      </div>
    </header>
  );
}

function SpeakerIcon({ on }: { on: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor" />
      {on ? (
        <>
          <path d="M16.5 8.5a5 5 0 0 1 0 7" />
          <path d="M19 6a8.5 8.5 0 0 1 0 12" />
        </>
      ) : (
        <path d="M17 9l5 6M22 9l-5 6" />
      )}
    </svg>
  );
}

function MusicIcon({ on }: { on: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18V5l11-2v13" />
      <circle cx="6" cy="18" r="3" fill="currentColor" />
      <circle cx="17" cy="16" r="3" fill="currentColor" />
      {!on && <path d="M3 3l18 18" />}
    </svg>
  );
}
