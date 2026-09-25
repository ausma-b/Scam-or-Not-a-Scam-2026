/**
 * Quiet synthwave loop generated live with Web Audio (no audio files).
 * A minor: Am, F, C, G. Soft pad, pulsing bass and a gentle arpeggio at 96 BPM.
 */
import { getAudio } from './audio';

const BPM = 96;
const STEP = 60 / BPM / 4; // sixteenth note in seconds
const VOLUME = 0.05; // deliberately low

// MIDI note numbers for each bar's chord (root, third, fifth)
const CHORDS = [
  [57, 60, 64], // Am
  [53, 57, 60], // F
  [48, 52, 55], // C
  [55, 59, 62], // G
];
const ARP = [0, 1, 2, 1, 2, 3, 2, 1]; // index into chord + octave

const hz = (m: number) => 440 * Math.pow(2, (m - 69) / 12);

let master: GainNode | null = null;
let timer: number | null = null;
let nextTime = 0;
let step = 0;
let playing = false;

function note(c: AudioContext, out: AudioNode, freq: number, t: number, dur: number, type: OscillatorType, vol: number, cutoff: number, detune = 0) {
  const osc = c.createOscillator();
  const filt = c.createBiquadFilter();
  const g = c.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t);
  osc.detune.setValueAtTime(detune, t);
  filt.type = 'lowpass';
  filt.frequency.setValueAtTime(cutoff, t);
  g.gain.setValueAtTime(0.0001, t);
  g.gain.linearRampToValueAtTime(vol, t + Math.min(0.02, dur / 4));
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  osc.connect(filt).connect(g).connect(out);
  osc.start(t);
  osc.stop(t + dur + 0.05);
}

function schedule(c: AudioContext) {
  if (!master) return;
  while (nextTime < c.currentTime + 0.25) {
    const bar = Math.floor(step / 16) % CHORDS.length;
    const s16 = step % 16;
    const chord = CHORDS[bar];

    // Pad: once per bar, three slightly detuned saws
    if (s16 === 0) {
      chord.forEach((m) => {
        note(c, master!, hz(m), nextTime, STEP * 16 * 0.98, 'sawtooth', 0.18, 900, -6);
        note(c, master!, hz(m), nextTime, STEP * 16 * 0.98, 'sawtooth', 0.18, 900, 6);
      });
    }
    // Bass: eighth notes, octave bounce
    if (s16 % 2 === 0) {
      const oct = s16 % 4 === 0 ? -24 : -12;
      note(c, master!, hz(chord[0] + oct), nextTime, STEP * 1.8, 'sawtooth', 0.55, 420);
    }
    // Arpeggio: sixteenths, up an octave
    const tones = [...chord, chord[0] + 12];
    const a = tones[ARP[s16 % ARP.length]];
    note(c, master!, hz(a + 12), nextTime, STEP * 0.9, 'triangle', 0.22, 2600);

    nextTime += STEP;
    step++;
  }
}

export function startMusic() {
  const c = getAudio();
  if (!c || playing) return;
  playing = true;
  master = c.createGain();
  master.gain.setValueAtTime(0.0001, c.currentTime);
  master.gain.linearRampToValueAtTime(VOLUME, c.currentTime + 2.5);
  master.connect(c.destination);
  nextTime = c.currentTime + 0.1;
  step = 0;
  timer = window.setInterval(() => schedule(c), 50);
  schedule(c);
}

export function stopMusic() {
  const c = getAudio();
  playing = false;
  if (timer !== null) window.clearInterval(timer);
  timer = null;
  if (c && master) {
    const m = master;
    m.gain.cancelScheduledValues(c.currentTime);
    m.gain.setValueAtTime(m.gain.value, c.currentTime);
    m.gain.linearRampToValueAtTime(0.0001, c.currentTime + 0.6);
    window.setTimeout(() => m.disconnect(), 800);
  }
  master = null;
}
