import { useCallback, useEffect, useState } from 'react';
import { cards } from './data/cards';
import type { Answer, Card, Mode, Screen } from './types';
import { reshuffle } from './lib/shuffle';
import { playBlip } from './lib/sound';
import { startMusic, stopMusic } from './lib/music';
import StartScreen from './components/StartScreen';
import IntroScreen from './components/IntroScreen';
import CardScreen from './components/CardScreen';
import EndScreen from './components/EndScreen';
import PresenterControls from './components/PresenterControls';
import QrModal from './components/QrModal';
import Footer from './components/Footer';

export default function App() {
  const [screen, setScreen] = useState<Screen>('start');
  const [mode, setMode] = useState<Mode>('solo');
  const [deck, setDeck] = useState<Card[]>(cards);
  const [index, setIndex] = useState(0);
  const [choice, setChoice] = useState<Answer | null>(null);
  const [results, setResults] = useState<boolean[]>([]);
  const [soundOn, setSoundOn] = useState(false);
  // Music is on by default but browsers only allow audio after a tap or key press.
  const [musicOn, setMusicOn] = useState(true);
  const [unlocked, setUnlocked] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);

  const card = deck[index];
  const score = results.filter(Boolean).length;

  const blip = useCallback(
    (kind: Parameters<typeof playBlip>[0]) => {
      if (soundOn) playBlip(kind);
    },
    [soundOn],
  );

  // Unlock audio on the first interaction anywhere.
  useEffect(() => {
    if (unlocked) return;
    const unlock = () => setUnlocked(true);
    window.addEventListener('pointerdown', unlock, { once: true });
    window.addEventListener('keydown', unlock, { once: true });
    return () => {
      window.removeEventListener('pointerdown', unlock);
      window.removeEventListener('keydown', unlock);
    };
  }, [unlocked]);

  // Background music follows the toggle and pauses while the tab is hidden.
  useEffect(() => {
    if (!unlocked) return;
    const sync = () => (musicOn && !document.hidden ? startMusic() : stopMusic());
    sync();
    document.addEventListener('visibilitychange', sync);
    return () => document.removeEventListener('visibilitychange', sync);
  }, [musicOn, unlocked]);

  // Presenter mode scales the whole UI up for the projector.
  useEffect(() => {
    document.documentElement.classList.toggle('is-presenter', mode === 'presenter' && screen !== 'start');
  }, [mode, screen]);

  const resetRound = (nextDeck: Card[]) => {
    setDeck(nextDeck);
    setIndex(0);
    setChoice(null);
    setResults([]);
  };

  const chooseMode = (m: Mode) => {
    blip('tap');
    setMode(m);
    resetRound(cards); // first play uses the lecturer's order
    setScreen('intro');
    window.scrollTo(0, 0);
  };

  const begin = useCallback(() => {
    blip('next');
    setScreen('card');
    window.scrollTo(0, 0);
  }, [blip]);

  const answer = useCallback(
    (a: Answer) => {
      if (choice || !card) return;
      const correct = a === card.answer;
      setChoice(a);
      setResults((r) => [...r, correct]);
      blip(correct ? 'right' : 'wrong');
    },
    [choice, card, blip],
  );

  const next = useCallback(() => {
    if (!choice) return;
    if (index + 1 >= deck.length) {
      setScreen('end');
      blip('fanfare');
    } else {
      setIndex((i) => i + 1);
      setChoice(null);
      blip('next');
    }
    window.scrollTo(0, 0);
  }, [choice, index, deck.length, blip]);

  const playAgain = () => {
    blip('tap');
    resetRound(reshuffle(cards, deck));
    setScreen('card');
    window.scrollTo(0, 0);
  };

  const backToStart = () => {
    blip('tap');
    setScreen('start');
    window.scrollTo(0, 0);
  };

  // Keyboard: S = scam, N = not a scam, Enter/Space = next.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (qrOpen || document.body.dataset.overlay || e.metaKey || e.ctrlKey || e.altKey) return;
      const target = e.target as HTMLElement;
      const tag = target.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || target.isContentEditable) return;
      const key = e.key.toLowerCase();

      if (screen === 'card' && !choice) {
        if (key === 's') {
          e.preventDefault();
          answer('scam');
          return;
        }
        if (key === 'n') {
          e.preventDefault();
          answer('legit');
          return;
        }
      }
      if (key === 'enter' || key === ' ') {
        // A focused button or link handles Enter/Space itself.
        if (tag === 'BUTTON' || tag === 'A') return;
        if (screen === 'intro') {
          e.preventDefault();
          begin();
        } else if (screen === 'card' && choice) {
          e.preventDefault();
          next();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [screen, choice, qrOpen, answer, next, begin]);

  return (
    <>
      <div className="scanlines" aria-hidden="true" />
      {screen !== 'start' && <div className="floor-grid" aria-hidden="true" />}

      <div className="relative z-10 flex min-h-screen flex-col px-4 sm:px-6 lg:px-10">
        <PresenterControls
          screen={screen}
          mode={mode}
          score={score}
          answered={results.length}
          soundOn={soundOn}
          onToggleSound={() => {
            const on = !soundOn;
            setSoundOn(on);
            if (on) playBlip('tap');
          }}
          musicOn={musicOn}
          onToggleMusic={() => setMusicOn((m) => !m)}
          onExit={backToStart}
        />

        <main className="mx-auto flex w-full max-w-[74rem] flex-1 flex-col">
          {screen === 'start' && <StartScreen onChoose={chooseMode} onShowQr={() => setQrOpen(true)} />}
          {screen === 'intro' && <IntroScreen mode={mode} total={deck.length} onGo={begin} />}
          {screen === 'card' && card && (
            <CardScreen
              key={`${card.id}-${index}`}
              card={card}
              index={index}
              total={deck.length}
              results={results}
              mode={mode}
              choice={choice}
              onAnswer={answer}
              onNext={next}
            />
          )}
          {screen === 'end' && (
            <EndScreen score={score} total={deck.length} mode={mode} onPlayAgain={playAgain} onBack={backToStart} />
          )}
        </main>

        <Footer />
      </div>

      {qrOpen && <QrModal onClose={() => setQrOpen(false)} />}
    </>
  );
}
