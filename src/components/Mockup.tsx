import type { Card } from '../types';
import { smartQuotes as sq } from '../lib/typography';

/**
 * Stylised recreations of what the victim saw. Generic UI and text only:
 * no real logos, photos or brand artwork. Faces are neon silhouettes.
 */
export default function Mockup({ card }: { card: Card }) {
  switch (card.mockupType) {
    case 'sms':
      return <SmsMockup card={card} />;
    case 'email':
      return <EmailMockup card={card} />;
    case 'whatsapp':
      return <ChatMockup card={card} />;
    case 'videocall':
      return <VideoCallMockup card={card} />;
    case 'bankapp':
      return <BankAppMockup card={card} />;
    case 'socialad':
      return <SocialAdMockup card={card} />;
    case 'voicemail':
      return <VoicemailMockup card={card} />;
    default:
      return <SmsMockup card={card} />;
  }
}

/* ---------- Shared bits ---------- */

function initials(name: string, max = 2) {
  const letters = name
    .replace(/[^A-Za-z ]/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w[0]!.toUpperCase());
  return letters.slice(0, max).join('') || '#';
}

function isPhoneNumber(s: string) {
  return /^[+\d][\d\sX]+$/i.test(s.trim());
}

function Avatar({ label, tone = 'cyan' }: { label: string; tone?: 'cyan' | 'magenta' | 'sun' }) {
  const ring = { cyan: 'border-cyan text-cyan', magenta: 'border-magenta text-magenta', sun: 'border-sun text-sun' }[tone];
  return (
    <span
      className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border-2 bg-night font-display text-[0.8rem] ${ring}`}
      aria-hidden="true"
    >
      {label}
    </span>
  );
}

function Silhouette({ color, initials: ini, className = '' }: { color: string; initials?: string; className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true" style={{ filter: `drop-shadow(0 0 4px ${color})` }}>
      <circle cx="50" cy="38" r="17" fill="none" stroke={color} strokeWidth="3" />
      <path d="M16 98 C16 72 31 60 50 60 C69 60 84 72 84 98" fill="none" stroke={color} strokeWidth="3" />
      {ini && (
        <text x="50" y="43" textAnchor="middle" fontSize="13" fill={color} fontFamily="Righteous, sans-serif">
          {ini}
        </text>
      )}
    </svg>
  );
}

function StatusBar() {
  return (
    <div className="flex items-center justify-between px-5 pt-2 font-mono text-[0.62rem] text-haze" aria-hidden="true">
      <span>9:41</span>
      <span className="h-1.5 w-14 rounded-full bg-haze/30" />
      <span>5G ▮▮▮</span>
    </div>
  );
}

/* ---------- SMS ---------- */

function SmsMockup({ card }: { card: Card }) {
  const phone = isPhoneNumber(card.sender);
  return (
    <figure className="device" aria-label={`Text message from ${card.sender}`}>
      <StatusBar />
      <div className="flex flex-col items-center gap-1 border-b border-haze/15 px-4 pb-3 pt-2">
        <Avatar label={phone ? '#' : initials(card.sender)} tone={phone ? 'magenta' : 'cyan'} />
        <p className="text-[0.9rem] font-bold text-ink">{card.sender}</p>
        <p className="font-mono text-[0.62rem] uppercase tracking-wider text-haze">Text message · Today</p>
      </div>
      <div className="flex flex-col gap-2 px-4 py-5">
        <p className="self-center font-mono text-[0.62rem] text-haze">2:14 pm</p>
        <p className="max-w-[88%] rounded-2xl rounded-bl-md bg-[#2C1D57] px-4 py-3 text-[1rem] leading-snug text-ink">
          {sq(card.messageBody)}
        </p>
      </div>
      <div className="flex items-center gap-2 border-t border-haze/15 px-4 py-3" aria-hidden="true">
        <span className="flex-1 rounded-full border border-haze/30 px-3 py-1.5 text-[0.75rem] text-haze">Text message</span>
        <span className="grid h-8 w-8 place-items-center rounded-full bg-cyan/20 text-cyan">↑</span>
      </div>
    </figure>
  );
}

/* ---------- Email ---------- */

function EmailMockup({ card }: { card: Card }) {
  return (
    <figure
      className="overflow-hidden rounded-xl border-2 border-cyan/60 bg-[#F4F0FF] text-[#1A0536] shadow-[0_0_1.2rem_rgba(0,240,255,0.25)]"
      aria-label={`Email from ${card.sender}`}
    >
      <div className="flex items-center gap-1.5 bg-[#1A0536] px-3 py-2" aria-hidden="true">
        <span className="h-2.5 w-2.5 rounded-full bg-magenta" />
        <span className="h-2.5 w-2.5 rounded-full bg-sun" />
        <span className="h-2.5 w-2.5 rounded-full bg-cyan" />
        <span className="ml-3 font-mono text-[0.62rem] uppercase tracking-wider text-haze">Inbox</span>
      </div>
      <div className="flex items-center gap-3 border-b border-[#1A0536]/15 px-4 py-3">
        <span
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#1A0536] font-display text-[0.8rem] text-cyan"
          aria-hidden="true"
        >
          {initials(card.sender)}
        </span>
        <div className="min-w-0 text-[0.85rem] leading-tight">
          <p className="font-bold">{card.sender}</p>
          <p className="text-[#4A3A75]">To: me · 10:02 am</p>
        </div>
      </div>
      <div className="px-4 py-4 text-[1rem] leading-relaxed">
        <p>{sq(card.messageBody)}</p>
      </div>
    </figure>
  );
}

/* ---------- Group chat (WhatsApp-style, unbranded) ---------- */

interface ChatMsg {
  divider?: string;
  name: string;
  text: string;
  screenshot: boolean;
}

function parseChat(body: string): ChatMsg[] {
  return body.split(' · ').map((seg) => {
    const screenshot = /\(screenshot\)/i.test(seg);
    let s = seg.replace(/\(screenshot\)/i, '').trim();
    let name = '';
    const idx = s.indexOf(': ');
    if (idx > 0 && idx < 40) {
      name = s.slice(0, idx);
      s = s.slice(idx + 2);
    }
    s = s.replace(/^'(.*)'$/s, '$1');
    let divider: string | undefined;
    const comma = name.indexOf(', ');
    if (comma > 0) {
      divider = name.slice(0, comma);
      name = name.slice(comma + 2);
      name = name.charAt(0).toUpperCase() + name.slice(1);
    }
    return { divider, name, text: s, screenshot };
  });
}

function ChatMockup({ card }: { card: Card }) {
  const msgs = parseChat(card.messageBody);
  const m = card.sender.match(/^(.*?)\s*\(([^)]+)\)\s*$/);
  const groupName = m ? m[1] : card.sender;
  const members = m ? m[2] : '';
  const nameTone = (n: string) => (/admin/i.test(n) ? 'text-orange' : /member/i.test(n) ? 'text-cyan' : 'text-sun');

  return (
    <figure className="device" aria-label={`Group chat: ${card.sender}`}>
      <StatusBar />
      <div className="flex items-center gap-3 border-b border-haze/15 px-4 pb-3 pt-2">
        <Avatar label={groupName.split(/\s+/)[0]!.slice(0, 3).toUpperCase()} tone="sun" />
        <div className="min-w-0 leading-tight">
          <p className="truncate text-[0.9rem] font-bold text-ink">{groupName}</p>
          {members && <p className="text-[0.72rem] text-haze">{members}</p>}
        </div>
      </div>
      <div
        className="flex flex-col gap-3 px-4 py-4"
        style={{ backgroundImage: 'radial-gradient(rgba(203,185,242,0.08) 1px, transparent 1px)', backgroundSize: '14px 14px' }}
      >
        {msgs.map((msg, i) => (
          <div key={i} className="flex flex-col gap-3">
            {msg.divider && (
              <p className="self-center rounded-full bg-night/80 px-3 py-0.5 font-mono text-[0.62rem] uppercase tracking-wider text-haze">
                {msg.divider}
              </p>
            )}
            <div className="max-w-[90%] rounded-2xl rounded-tl-md bg-[#2C1D57] px-3.5 py-2.5">
              {msg.name && <p className={`text-[0.78rem] font-bold ${nameTone(msg.name)}`}>{msg.name}</p>}
              {msg.screenshot && <FakeChart />}
              <p className="text-[1rem] leading-snug text-ink">{sq(msg.text)}</p>
            </div>
          </div>
        ))}
      </div>
    </figure>
  );
}

function FakeChart() {
  return (
    <div className="my-1.5 rounded-lg bg-night p-2" aria-hidden="true">
      <svg viewBox="0 0 160 60" className="block h-auto w-full">
        <path d="M0 50 L20 46 L40 48 L60 38 L80 40 L100 28 L120 24 L140 12 L160 6" fill="none" stroke="#00F0FF" strokeWidth="2.5" />
        <path d="M0 50 L20 46 L40 48 L60 38 L80 40 L100 28 L120 24 L140 12 L160 6 L160 60 L0 60 Z" fill="rgba(0,240,255,0.15)" />
        <text x="6" y="16" fill="#FFD319" fontSize="13" fontFamily="Space Mono, monospace" fontWeight="700">
          +38%
        </text>
      </svg>
    </div>
  );
}

/* ---------- Video call ---------- */

function parseSpeech(body: string) {
  const m = body.match(/^([^:']{1,40}):\s*'(.*)'\s*(.*)$/s);
  if (!m) return { speaker: '', quote: body, note: '' };
  return { speaker: m[1].trim(), quote: m[2], note: m[3].trim() };
}

function VideoCallMockup({ card }: { card: Card }) {
  const { speaker, quote, note } = parseSpeech(card.messageBody);
  const tiles = [
    { label: speaker || 'Host', ini: initials(speaker || 'Host'), color: '#FF2EC4', speaking: true },
    { label: 'Colleague', ini: 'C1', color: '#00F0FF', speaking: false },
    { label: 'Colleague', ini: 'C2', color: '#FFD319', speaking: false },
    { label: 'Colleague', ini: 'C3', color: '#FF6B35', speaking: false },
  ];
  return (
    <figure className="device !rounded-xl" aria-label={card.sender}>
      <div className="flex items-center justify-between gap-2 px-3 py-2">
        <p className="min-w-0 truncate text-[0.78rem] font-bold text-ink">{card.sender}</p>
        <span className="flex items-center gap-1 font-mono text-[0.62rem] text-magenta">
          <span className="h-2 w-2 rounded-full bg-magenta" /> REC 04:12
        </span>
      </div>
      <div className="grid grid-cols-2 gap-1.5 px-1.5">
        {tiles.map((t, i) => (
          <div
            key={i}
            className={`relative aspect-[4/3] overflow-hidden rounded-lg bg-[#0E0428] ${t.speaking ? 'ring-2 ring-magenta' : ''}`}
          >
            <Silhouette color={t.color} initials={t.ini} className="absolute inset-x-0 bottom-0 mx-auto h-[85%] w-auto" />
            <span className="absolute bottom-1 left-1 rounded bg-night/80 px-1.5 py-0.5 text-[0.62rem] text-ink">{t.label}</span>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-1.5 px-3 py-3">
        <p className="rounded-lg bg-night/80 px-3 py-2 text-[1rem] leading-snug text-ink">
          {speaker && <span className="font-bold text-magenta">{speaker}: </span>}
          {sq(quote)}
        </p>
        {note && <p className="text-[0.85rem] italic text-haze">{sq(note)}</p>}
      </div>
      <div className="flex justify-center gap-3 pb-3" aria-hidden="true">
        <span className="h-8 w-8 rounded-full bg-haze/20" />
        <span className="h-8 w-8 rounded-full bg-haze/20" />
        <span className="h-8 w-12 rounded-full bg-magenta/70" />
      </div>
    </figure>
  );
}

/* ---------- Banking app ---------- */

function BankAppMockup({ card }: { card: Card }) {
  const m = card.messageBody.match(/^(⚠?\s*[A-Z][A-Z ]+[.!])\s*(.*)$/s);
  const title = m ? m[1].replace(/^⚠\s*/, '') : '';
  const text = m ? m[2] : card.messageBody;
  const fields = [
    ['Account name', 'As entered'],
    ['BSB', 'XXX-XXX'],
    ['Account number', 'XXXX XXXX'],
  ];
  return (
    <figure className="device" aria-label={card.sender}>
      <StatusBar />
      <div className="px-4 pb-4 pt-2">
        <p className="font-mono text-[0.62rem] uppercase tracking-wider text-haze">{card.sender}</p>
        <p className="mb-3 font-display text-[1.2rem] text-ink">Pay someone</p>
        <dl className="flex flex-col gap-2">
          {fields.map(([k, v]) => (
            <div key={k} className="rounded-lg border border-haze/25 bg-night/60 px-3 py-2">
              <dt className="text-[0.66rem] uppercase tracking-wider text-haze">{k}</dt>
              <dd className="font-mono text-[0.85rem] text-ink">{v}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-3 rounded-xl bg-sun px-4 py-3 text-night" role="presentation">
          {title && (
            <p className="flex items-center gap-2 font-display text-[1.1rem] tracking-wide">
              <span aria-hidden="true">⚠</span> {title}
            </p>
          )}
          <p className="text-[1rem] font-medium leading-snug">{sq(text)}</p>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2" aria-hidden="true">
          <span className="rounded-lg border-2 border-cyan py-2 text-center text-[0.8rem] font-bold text-cyan">Edit details</span>
          <span className="rounded-lg bg-haze/15 py-2 text-center text-[0.8rem] text-haze">Continue anyway</span>
        </div>
      </div>
    </figure>
  );
}

/* ---------- Social ad ---------- */

function SocialAdMockup({ card }: { card: Card }) {
  let body = card.messageBody;
  const btn = body.match(/\[Button:\s*([^\]]+)\]/i);
  body = body.replace(/\[Button:[^\]]*\]/i, '').trim();
  const q = body.match(/^(.*?)'(.*)'(.*)$/s);
  const lead = q ? q[1].trim() : '';
  const quote = q ? q[2] : body;
  const [sponsored, pageName] = card.sender.includes(' · ') ? card.sender.split(' · ') : ['Sponsored', card.sender];

  return (
    <figure className="device !rounded-xl" aria-label={`Sponsored post: ${pageName}`}>
      <div className="flex items-center gap-3 px-4 py-3">
        <Avatar label={initials(pageName)} tone="magenta" />
        <div className="leading-tight">
          <p className="text-[0.9rem] font-bold text-ink">{pageName}</p>
          <p className="text-[0.72rem] text-haze">{sponsored}</p>
        </div>
      </div>
      <div className="relative aspect-video overflow-hidden bg-[radial-gradient(circle_at_50%_30%,#3A1470,#0E0428_70%)]">
        <Silhouette color="#00F0FF" className="absolute inset-x-0 bottom-6 mx-auto h-[78%] w-auto" />
        <span className="absolute left-2 top-2 rounded bg-magenta px-1.5 py-0.5 font-display text-[0.66rem] tracking-wider text-night">
          LIVE
        </span>
        <div className="absolute inset-x-0 bottom-0 flex items-stretch text-[0.7rem]">
          <span className="bg-sun px-2 py-1 font-display tracking-wider text-night">BREAKING</span>
          <span className="flex-1 truncate bg-night/90 px-2 py-1 text-ink">New government-backed platform</span>
        </div>
        <span className="absolute right-2 top-2 rounded bg-night/80 px-1.5 py-0.5 font-mono text-[0.62rem] text-ink">▶ 0:42</span>
      </div>
      <div className="flex flex-col gap-2 px-4 py-3">
        {lead && <p className="text-[0.85rem] italic text-haze">{sq(lead)}</p>}
        <p className="text-[1rem] leading-snug text-ink">&ldquo;{sq(quote)}&rdquo;</p>
      </div>
      {btn && (
        <div className="flex items-center justify-between gap-3 border-t border-haze/15 px-4 py-3">
          <span className="text-[0.72rem] text-haze">Limited places</span>
          <span className="rounded-lg bg-cyan px-4 py-2 text-[0.85rem] font-bold text-night">{btn[1]}</span>
        </div>
      )}
    </figure>
  );
}

/* ---------- Voicemail ---------- */

function VoicemailMockup({ card }: { card: Card }) {
  const m = card.messageBody.match(/^\((.*?)\)\s*'(.*)'\s*$/s);
  const note = m ? m[1] : '';
  const words = m ? m[2] : card.messageBody;
  const [, duration = ''] = card.sender.split(' · ');
  const bars = Array.from({ length: 36 }, (_, i) => 0.25 + Math.abs(Math.sin(i * 1.7) * Math.cos(i * 0.45)) * 0.75);

  return (
    <figure className="device" aria-label={`Voicemail ${duration}`}>
      <StatusBar />
      <div className="flex flex-col gap-4 px-4 pb-5 pt-3">
        <div className="flex items-center gap-3">
          <Avatar label="?" tone="sun" />
          <div className="leading-tight">
            <p className="text-[0.9rem] font-bold text-ink">Voicemail</p>
            <p className="text-[0.72rem] text-haze">Mobile · Today, 8:03 pm</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-xl bg-night/70 px-3 py-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-cyan text-night" aria-hidden="true">
            ▶
          </span>
          <svg viewBox="0 0 144 40" className="h-10 min-w-0 flex-1" preserveAspectRatio="none" aria-hidden="true">
            {bars.map((h, i) => (
              <rect
                key={i}
                className="wave-bar"
                style={{ animationDelay: `${(i % 7) * 0.12}s` }}
                x={i * 4}
                y={20 - h * 18}
                width="2.4"
                height={h * 36}
                rx="1.2"
                fill={i < 14 ? '#00F0FF' : '#CBB9F2'}
              />
            ))}
          </svg>
          <span className="font-mono text-[0.75rem] tabular-nums text-haze">{duration}</span>
        </div>
        <div>
          <p className="eyebrow mb-1 text-haze">Transcription</p>
          {note && <p className="mb-1 text-[0.85rem] italic text-haze">{sq(note)}</p>}
          <p className="text-[1rem] leading-snug text-ink">&ldquo;{sq(words)}&rdquo;</p>
        </div>
      </div>
    </figure>
  );
}
