import { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import { gameConfig } from '../data/cards';

function defaultUrl() {
  if (gameConfig.shareUrl) return gameConfig.shareUrl;
  try {
    const u = new URL(window.location.href);
    u.hash = '';
    return u.toString();
  } catch {
    return window.location.href;
  }
}

export default function QrModal({ onClose }: { onClose: () => void }) {
  const [url, setUrl] = useState(defaultUrl);
  const [img, setImg] = useState<string>('');
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let alive = true;
    QRCode.toDataURL(url || ' ', { margin: 1, width: 720, errorCorrectionLevel: 'M', color: { dark: '#0B0221', light: '#FFFFFF' } })
      .then((d) => alive && setImg(d))
      .catch(() => alive && setImg(''));
    return () => {
      alive = false;
    };
  }, [url]);

  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      prev?.focus();
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center overflow-y-auto bg-night/90 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="qr-title"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="flex w-full max-w-[34rem] flex-col items-center gap-4 rounded-2xl border-2 border-cyan bg-dusk p-5 text-center shadow-[0_0_2rem_rgba(0,240,255,0.35)] sm:p-7">
        <h2 id="qr-title" className="font-display text-[1.6rem] neon-text-cyan">
          Play on your phone
        </h2>
        <p className="text-haze">Scan, then tap Solo mode.</p>
        <div className="w-full max-w-[min(26rem,70vh)] rounded-xl bg-white p-3">
          {img ? (
            <img src={img} alt={`QR code for ${url}`} className="block h-auto w-full" />
          ) : (
            <div className="grid aspect-square place-items-center text-night">Enter an address below</div>
          )}
        </div>
        <label htmlFor="qr-url" className="eyebrow w-full text-left text-sun">
          Address in the code
        </label>
        <input
          id="qr-url"
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full rounded-lg border-2 border-haze/50 bg-night px-3 py-2 font-mono text-[0.8rem] text-ink focus:border-cyan"
          spellCheck={false}
        />
        <button ref={closeRef} type="button" className="btn btn-legit" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
