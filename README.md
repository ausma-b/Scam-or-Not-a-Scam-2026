# Scam or Not a Scam?

A classroom game for criminology lectures. Ten real cases (2024 to 2026), 80s synthwave styling, presenter mode for the projector and solo mode for phones. No login, no data collection, no analytics, no cookies, no backend. Fonts are bundled locally, so the page makes no third-party requests at all.

## Run it

```bash
npm install
npm run dev        # local preview at http://localhost:5173
npm run build      # static site in dist/  (upload to Netlify, Vercel, GitHub Pages, S3...)
npm run build:single   # one self-contained dist-single/index.html (works offline, email it, put it on a USB)
```

`base` is set to `./`, so `dist/` works from any folder or subpath.

## Change the cases each semester

Edit **`src/data/cards.ts`** only. The comment at the top of that file lists every field and a few formatting tips for the mockups. The same file also holds:

- the tagline and intro lines
- the end-screen ranks and blurbs
- the "5 red flags" recap
- `shareUrl`: the address encoded in the QR code. Leave it empty to use the current page address; set it if the game is embedded in an LMS or another page.

The scam to legit mix is whatever you put in the file. "Play again" reshuffles the order and keeps that mix.

## Controls

- `S` scam, `N` not a scam, `Enter` or `Space` next card
- Sound is off by default (toggle top right)
- Presenter mode scales all type up (28px body at 1920x1080)
- `prefers-reduced-motion` turns off the grid animation, flash and stamp motion

## Structure

```
src/
  data/cards.ts            all content
  App.tsx                  game state and keyboard
  components/
    StartScreen.tsx        sun, grid, mode buttons, QR button
    QrModal.tsx            client-side QR (qrcode package)
    IntroScreen.tsx
    CardScreen.tsx         progress, scenario, mockup, answer buttons
    Mockup.tsx             sms, email, whatsapp, videocall, bankapp, socialad, voicemail
    RevealPanel.tsx        verdict, vignette, the tell, source link, next
    EndScreen.tsx          score, rank, red flags recap
    PresenterControls.tsx  wordmark, score, sound toggle, exit
    Footer.tsx
  lib/sound.ts             Web Audio blips
  lib/shuffle.ts
```
