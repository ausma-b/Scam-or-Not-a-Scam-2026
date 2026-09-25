// Tiny synth blips made with the Web Audio API. Nothing is loaded from the network.
import { getAudio as audio } from './audio';
type Blip = 'tap' | 'right' | 'wrong' | 'next' | 'fanfare';

function tone(c: AudioContext, freq: number, start: number, dur: number, type: OscillatorType, vol = 0.12) {
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, c.currentTime + start);
  gain.gain.setValueAtTime(0.0001, c.currentTime + start);
  gain.gain.exponentialRampToValueAtTime(vol, c.currentTime + start + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + start + dur);
  osc.connect(gain).connect(c.destination);
  osc.start(c.currentTime + start);
  osc.stop(c.currentTime + start + dur + 0.02);
}

export function playBlip(kind: Blip) {
  const c = audio();
  if (!c) return;
  switch (kind) {
    case 'tap':
      tone(c, 660, 0, 0.08, 'square', 0.06);
      break;
    case 'next':
      tone(c, 440, 0, 0.06, 'triangle', 0.08);
      tone(c, 880, 0.05, 0.08, 'triangle', 0.08);
      break;
    case 'right':
      tone(c, 523.25, 0, 0.1, 'square', 0.07);
      tone(c, 659.25, 0.09, 0.1, 'square', 0.07);
      tone(c, 783.99, 0.18, 0.18, 'square', 0.07);
      break;
    case 'wrong':
      tone(c, 220, 0, 0.16, 'sawtooth', 0.07);
      tone(c, 164.81, 0.14, 0.26, 'sawtooth', 0.07);
      break;
    case 'fanfare':
      [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => tone(c, f, i * 0.11, 0.2, 'square', 0.07));
      break;
  }
}
