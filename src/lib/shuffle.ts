export function shuffle<T>(items: T[]): T[] {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/** Shuffle, trying to avoid starting with the same card as last time. */
export function reshuffle<T extends { id: string }>(items: T[], previous: T[]): T[] {
  let next = shuffle(items);
  for (let tries = 0; tries < 5 && items.length > 1 && next[0].id === previous[0]?.id; tries++) {
    next = shuffle(items);
  }
  return next;
}
