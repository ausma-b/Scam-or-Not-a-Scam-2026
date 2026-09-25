// One shared AudioContext for blips and music. Created on first user gesture.
let ctx: AudioContext | null = null;

export function getAudio(): AudioContext | null {
  try {
    if (!ctx) {
      const AC =
        window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
    }
    if (ctx.state === 'suspended') void ctx.resume();
    return ctx;
  } catch {
    return null;
  }
}
