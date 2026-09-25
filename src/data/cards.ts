/**
 * SCAM OR NOT A SCAM? : all game content lives in this file.
 *
 * To swap cases for a new semester, edit the `cards` array below. Nothing in
 * /components needs to change. Each card is one object:
 *
 *   id               unique short slug
 *   answer           'scam' | 'legit'
 *   scenarioLabel    one line of context shown above the mockup
 *   mockupType       'sms' | 'email' | 'whatsapp' | 'videocall' | 'bankapp' | 'socialad' | 'voicemail'
 *   sender           shown in the mockup header
 *   messageBody      what the victim saw (see formatting tips below)
 *   verdictHeadline  big line on the reveal
 *   vignette         2 or 3 sentence real-life story
 *   tell             the one red flag or green flag
 *   sourceOutlet     e.g. 'Scamwatch'
 *   sourceDate       free text, e.g. '17 Aug 2026'
 *   sourceUrl        link to the real story
 *   story            in-game news summary { headline, paragraphs, whatToDo }.
 *                    "Read the real story" opens it inside the game (scrollable, no
 *                    new window). Keep it to 150 words or fewer, in your own words.
 *                    Without a story, the button opens sourceUrl in a new tab.
 *
 * Formatting tips for messageBody (optional; plain text always works):
 *   socialad   put the spoken words in 'single quotes' and a call-to-action as [Button: Label]
 *   videocall  Speaker: 'what they say' then any stage direction after the quote
 *   voicemail  (a note in brackets) then 'the words in single quotes'
 *   whatsapp   separate messages with ' · ' and start each with Name: . A name like
 *              'Later, the platform' adds a 'Later' divider. '(screenshot)' adds a chart image.
 *   bankapp    start with the alert title in capitals ending in a full stop, e.g. '⚠ NO MATCH.'
 *
 * The end-screen "Play again" reshuffles the order. Whatever mix of scam and
 * legit cards you put here is the mix players get.
 */
import type { Card } from '../types';

export const cards: Card[] = [
  {
    id: 'deepfake-pm-ad',
    answer: 'scam',
    mockupType: 'socialad',
    scenarioLabel: 'A sponsored video pops up in your feed.',
    sender: 'Sponsored · Breaking News',
    messageBody:
      "The Prime Minister, speaking in real news footage: 'Invest $4,000 today and earn up to $40,000 a month on our new platform. It's official and guaranteed by the government.' [Button: Register now]",
    verdictHeadline: 'Real face. Fake voice.',
    vignette:
      "In 2026 ASIC reported a sharp rise in deepfake investment ads using Anthony Albanese, RBA Governor Michele Bullock, the ABC's Alan Kohler and others. Some scams kept genuine news footage and replaced only the audio with an AI-cloned voice, so the usual advice to check lip-sync and blinking no longer works.",
    tell: "No government guarantees investment returns. 'Guaranteed' plus a celebrity equals scam.",
    sourceOutlet: 'ABC News',
    sourceDate: '17 Aug 2026',
    sourceUrl:
      'https://www.abc.net.au/news/2026-08-17/asic-ai-powered-impersonation-scams-warning-alan-kohler/107038256',
    story: {
      headline: "Trusted faces, fake investments",
      paragraphs: [
        "ASIC removed about 19,400 scam websites and related content in the year to August 2026, up 182% on the year before. Over three years the total passed 33,400.",
        "Many scams used AI deepfakes of trusted Australians, including Anthony Albanese, Angus Taylor, Gina Rinehart, Pauline Hanson, Michele Bullock and the ABC's Alan Kohler.",
        "The path is simple: a sponsored video, then a fake news article as 'proof', then an investment site. Callers follow up with fake profits to build trust. Some ads keep real footage and swap only the voice.",
        "Kohler called the takedowns a game of whack-a-mole. ASIC's chair said AI is making the problem much harder. Australians lost more than $2 billion to scams in 2025, and investment scams made up about 38% of that.",
      ],
      whatToDo: [
        "Check a firm's licence on ASIC's register before investing.",
        "Never invest through a link in an ad.",
      ],
    },
  },
  {
    id: 'nasc-warning-email',
    answer: 'legit',
    mockupType: 'email',
    scenarioLabel: 'An email from a government anti-scam agency lands in your inbox.',
    sender: 'National Anti-Scam Centre',
    messageBody:
      'Your contact details were identified during an overseas police investigation into an organised crime group targeting crypto users. Your information may still be circulating, so please be alert to further scam attempts. We will never ask you to call a number, click a link or send money.',
    verdictHeadline: 'Genuine. The warning was real.',
    vignette:
      'In August 2026 the National Anti-Scam Centre emailed more than 10,000 Australians after UK police uncovered their details during a crypto fraud investigation. The AFP passed the details on. The twist: scammers were also impersonating the NASC and AFP at the same time.',
    tell: 'Green flag: it asks for nothing. No link, no number, no money, no personal details.',
    sourceOutlet: 'Scamwatch',
    sourceDate: '17 Aug 2026',
    sourceUrl:
      'https://www.scamwatch.gov.au/about-us/news-and-alerts/nasc-contacts-australians-following-international-cryptocurrency-scam-investigation',
    story: {
      headline: "The warning that asked for nothing",
      paragraphs: [
        "On 17 August 2026 the National Anti-Scam Centre emailed more than 10,000 Australians. UK police had found their contact details while investigating an organised crime group targeting crypto users, and the AFP passed them on.",
        "The email warned that their details might still be circulating among criminals, so they should expect more scam attempts. It asked for nothing. It said the NASC would never request money or sensitive information, or send a text with links.",
        "At the same time, scammers were posing as the NASC and AFP, inviting people to 'help an investigation' and then asking for money and personal details.",
        "That is why a genuine warning looks the way it does: no link, no number, no request.",
      ],
      whatToDo: [
        "Verify any agency using contact details you find yourself.",
        "Report scams to Scamwatch and cyber.gov.au, and call your bank if you've paid.",
      ],
    },
  },
  {
    id: 'fake-recruiter-sms',
    answer: 'scam',
    mockupType: 'sms',
    scenarioLabel: "You're job hunting. A text arrives.",
    sender: '+61 4XX XXX XXX',
    messageBody:
      "Hi! I'm Jess from Amazon Recruitment. We have 20 remote e-commerce assistant roles: $300 to $800 per day, flexible hours, free training. Reply YES and I'll add you on WhatsApp to get started.",
    verdictHeadline: 'The job is the scam.',
    vignette:
      "Scamwatch warned in May 2026 of a spike in fake recruiters posing as Amazon and YouTube. Victims are moved to WhatsApp, given simple 'tasks', set up with a crypto account and paid a small amount to build trust. Then they're told to top up with their own money to unlock their commission. That money never comes back.",
    tell: "No real job asks you to pay before you get paid, and real recruiters don't move you to WhatsApp.",
    sourceOutlet: 'Scamwatch',
    sourceDate: '20 May 2026',
    sourceUrl: 'https://www.scamwatch.gov.au/about-us/news-and-alerts/scam-alert-job-recruitment-scams',
    story: {
      headline: "Hired into a scam",
      paragraphs: [
        "Scamwatch warned of a spike in texts from 'recruiters' posing as Amazon and YouTube. The roles sound ideal: remote, flexible hours, high pay, and no experience, qualifications or references needed.",
        "Replies move to an encrypted WhatsApp chat for 'more details'. Victims are given simple tasks, such as rating products or optimising listings, and paid small amounts so the job feels real. They are often helped to open a crypto account along the way.",
        "Then they are told to deposit their own money to 'unlock' bigger commissions. Once they pay, the money disappears and the recruiter stops replying.",
        "Job seekers and people looking for flexible work, including students, are the main targets.",
      ],
      whatToDo: [
        "A real employer never asks you to pay to get paid.",
        "Take your time, and contact the company using details you find yourself.",
      ],
    },
  },
  {
    id: 'arup-deepfake-call',
    answer: 'scam',
    mockupType: 'videocall',
    scenarioLabel:
      'You work in finance. You doubted an email from the CFO, so you joined a video call to check.',
    sender: 'Video call · CFO (London) + 3 colleagues',
    messageBody:
      "CFO: 'Thanks for jumping on. This acquisition is confidential. We need the payments split across several accounts today. The team here can confirm.' Colleagues nod and agree.",
    verdictHeadline: 'Everyone on the call was fake. Except you.',
    vignette:
      "In early 2024 a finance worker at global engineering firm Arup's Hong Kong office joined a video call with what looked and sounded like the CFO and colleagues. All of them were deepfakes. He made 15 transfers totalling about US$25.6 million before checking with head office.",
    tell: 'Secrecy plus urgency plus money. Verify big transfers through a separate, known channel, even after a video call.',
    sourceOutlet: 'CNN',
    sourceDate: '16 May 2024',
    sourceUrl: 'https://www.cnn.com/2024/05/16/tech/arup-deepfake-scam-loss-hong-kong-intl-hnk',
    story: {
      headline: "A video call full of deepfakes",
      paragraphs: [
        "In early 2024 a finance employee at the Hong Kong office of engineering firm Arup received an email, apparently from the UK-based chief financial officer, about a confidential transaction. He was suspicious, so he joined a video call to check.",
        "The CFO and colleagues looked and sounded real. All of them were AI-generated. Hong Kong police said the fraudsters had downloaded earlier videos and added fake voices.",
        "Reassured, he made 15 transfers to five local bank accounts, totalling HK$200 million, or about US$25.6 million. The fraud was only uncovered when he checked with head office.",
        "Police called it the city's first deepfake video-conference fraud. Arup's chief information officer later said the company is attacked every day.",
      ],
      whatToDo: [
        "Confirm large payments through a separate channel you already trust.",
      ],
    },
  },
  {
    id: 'confirmation-of-payee',
    answer: 'legit',
    mockupType: 'bankapp',
    scenarioLabel:
      "Your 'property manager' emailed new bank details for rent. You enter them in your banking app and see this.",
    sender: 'Your bank app',
    messageBody:
      "⚠ NO MATCH. The account name you entered doesn't match the account details. Check with the person you're paying, using contact details you trust, before you continue.",
    verdictHeadline: "The warning is real. The email probably isn't.",
    vignette:
      "Since July 2025 Australian banks have rolled out Confirmation of Payee, which checks the account name against the BSB and account number before you pay. A 'no match' is your bank protecting you. The likely scam here is the email that changed the payment details.",
    tell: 'Changed bank details by email is a classic payment-redirection scam. Call your agent on a number you already have.',
    sourceOutlet: 'Australian Banking Association',
    sourceDate: '2025 to 2026',
    sourceUrl: 'https://www.ausbanking.org.au/scam-safe-accord/confirmation-of-payee/',
    story: {
      headline: "Your bank now checks the name",
      paragraphs: [
        "Since July 2025 Australian banks have rolled out Confirmation of Payee. When you pay someone by BSB and account number, it checks the account name you typed and shows a match, a close match or no match.",
        "The big four banks, HSBC and Macquarie went first, and it now covers more than 95% of personal accounts. Banks paid about $100 million to build it under the Scam-Safe Accord, with no government funding.",
        "It warns rather than blocks, so the decision is still yours. It doesn't cover international transfers.",
        "A 'no match' after an email changes someone's bank details is a strong sign of payment-redirection fraud, where criminals pose as a landlord, agent or supplier.",
      ],
      whatToDo: [
        "Stop, and call the payee on a number you already have.",
      ],
    },
  },
  {
    id: 'fake-purchase-callback',
    answer: 'scam',
    mockupType: 'sms',
    scenarioLabel: "A text about a purchase you don't remember.",
    sender: '+61 4XX XXX XXX',
    messageBody:
      'PayPal: A payment of A$718.90 was flagged due to unusual login activity. If this wasn\'t you, call PayPal Support on 1800 XXX XXX within 30 minutes to cancel.',
    verdictHeadline: 'Panic is the product.',
    vignette:
      "Scamwatch warned in July 2026 about fake purchase messages for items between $300 and $2,000, arriving by text, email, app notifications and even calendar invites. Callers ask for card details for a 'refund', install remote-access software, or ask you to buy gift cards to 'catch the scammers'.",
    tell: 'Never call the number in the message. Open the official app yourself and check.',
    sourceOutlet: 'Scamwatch',
    sourceDate: '14 Jul 2026',
    sourceUrl: 'https://www.scamwatch.gov.au/about-us/news-and-alerts/scam-alert-fake-purchase-callback-scams',
    story: {
      headline: "Panic, then a phone number",
      paragraphs: [
        "Scamwatch warned about alerts for purchases you never made. They urge you to call a number straight away, or the money will leave your account.",
        "The fakes copy services such as shopping app receipts, Google Meet, Apple iMessage, PayPal invoices, Norton and McAfee renewals, and Microsoft subscriptions. They arrive by text, email, app notification or calendar invite.",
        "Amounts are usually between $300 and $2,000: big enough to cause panic, small enough to be believable. The 'purchases' include phones, laptops, security software, tickets and crypto.",
        "Call the number and a 'support agent' asks for card details for a refund, claims they over-refunded you, gets you to install remote-access software, or asks you to buy gift cards and send the codes.",
      ],
      whatToDo: [
        "Never call the number in the message.",
        "Check your account in the official app.",
      ],
    },
  },
  {
    id: 'premier-voice-clone',
    answer: 'scam',
    mockupType: 'voicemail',
    scenarioLabel: 'You know the Queensland Premier personally. You get a voice message from him.',
    sender: 'Voicemail · 0:18',
    messageBody:
      "(A familiar voice) 'Hey, it's Steven. I've got an investment idea I'd love to run past you. Give me a call back when you can.'",
    verdictHeadline: 'A cloned voice, close to home.',
    vignette:
      'In October 2024 ABC News reported that a voicemail made to sound like then Queensland Premier Steven Miles was sent to one of his friends. Scammers built the voice from publicly available audio. Politicians, executives and anyone with videos online now have a voice that can be copied.',
    tell: 'A familiar voice plus money talk. Hang up and call the person back on the number you already have.',
    sourceOutlet: 'ABC News',
    sourceDate: '8 Oct 2024',
    sourceUrl: 'https://www.abc.net.au/news/2024-10-08/steven-miles-has-had-his-voice-manipulated-by-ai/104366354',
    story: {
      headline: "A friend's voice, cloned",
      paragraphs: [
        "In October 2024 ABC News reported that a voicemail manipulated with AI to sound like then Queensland Premier Steven Miles was sent to one of his friends. It invited them to talk about an investment.",
        "It wasn't the first time that year his likeness was faked. In July 2024 the ABC reported that the Premier had criticised the state opposition for posting an AI-generated video of him on TikTok.",
        "Voice-cloning tools can copy a voice from short public clips, such as speeches, interviews and social media videos. Politicians and executives are easy targets, but anyone who posts videos online has enough audio to copy.",
        "The attack works because a familiar voice lowers our guard.",
      ],
      whatToDo: [
        "If a familiar voice raises money, hang up and call back on the number you have.",
        "Agree on a family code word.",
      ],
    },
  },
  {
    id: 'ato-no-link-sms',
    answer: 'legit',
    mockupType: 'sms',
    scenarioLabel: "It's tax time. A text appears in your existing ATO thread (not labelled 'Unverified').",
    sender: 'ATO',
    messageBody:
      'Your 2026 tax return has been processed. To view your notice of assessment, sign in to myGov directly. We will never send you a link.',
    verdictHeadline: 'This is what genuine looks like.',
    vignette:
      "Since 1 July 2026, organisations must register the brand name that appears at the top of their texts. Unregistered names are replaced with 'Unverified'. The ATO also never sends unsolicited messages containing links. A branded name alone isn't proof, but a no-link message telling you to go in yourself is the safe pattern.",
    tell: 'Green flag: no link, no number, no request. You go to myGov yourself.',
    sourceOutlet: 'ACMA',
    sourceDate: '1 Jul 2026',
    sourceUrl: 'https://www.acma.gov.au/about-register',
    story: {
      headline: "The name on your texts is now checked",
      paragraphs: [
        "From 1 July 2026, Australian organisations must register the sender name that appears at the top of their texts, such as 'ATO'. Texts using an unregistered name now show as 'Unverified' and are grouped separately.",
        "The register targets scammers who borrow trusted names to make fake texts look real, then push people to tap a link or share details. Australians lost more than $13.8 million to text scams in the first nine months of 2025.",
        "A registered name helps, but it isn't proof on its own. The ATO also doesn't send unsolicited texts with links.",
        "The safest texts tell you to go in yourself, and ask for nothing.",
      ],
      whatToDo: [
        "Don't tap links in texts, even from names you know.",
        "Go to myGov or the official app yourself.",
      ],
    },
  },
  {
    id: 'stock-tips-group',
    answer: 'scam',
    mockupType: 'whatsapp',
    scenarioLabel: "You joined a free 'ASX stock tips' group from a social media ad.",
    sender: 'ASX Insider Tips 📈 (2,418 members)',
    messageBody:
      "Member: 'Up 38% this week thanks to Prof!' (screenshot) · Admin: 'New members, open your account on our partner platform today. Places are limited.' · Later, the platform: 'Withdrawal pending. Pay a 15% release fee to unlock your funds.'",
    verdictHeadline: 'The profits were pixels.',
    vignette:
      "Scamwatch warned in May 2026 that 'stock tips' groups on messaging apps funnel people into fake crypto trading platforms. The dashboards show trades and profits, but nothing is real. When victims try to withdraw, they're charged 'fees' that also go to the scammers.",
    tell: "Fees to withdraw your own money. Check any crypto platform on AUSTRAC's register first.",
    sourceOutlet: 'Scamwatch',
    sourceDate: '19 May 2026',
    sourceUrl: 'https://www.scamwatch.gov.au/about-us/news-and-alerts/scam-alert-fake-crypto-trading-platforms',
    story: {
      headline: "Profits that were never real",
      paragraphs: [
        "Scamwatch warned that 'stock tips' posts on social media lead people into WhatsApp and Telegram groups. Inside, scammers pose as well-known finance experts or public figures, and other 'members' share screenshots of big wins.",
        "New members are pushed onto a 'partner' trading platform. The website looks professional and the dashboard shows trades and growing profits, but nothing is ever traded. Every deposit goes straight to the criminals.",
        "The trap closes at withdrawal. The platform demands a fee, tax or 'release' payment first, and that money goes to the scammers too. The balance on screen was never real.",
        "Warning signs include pressure to act fast and promises of guaranteed or steady high returns.",
      ],
      whatToDo: [
        "Check a platform on AUSTRAC's register first.",
        "If you've sent money, call your bank now and report it to Scamwatch.",
      ],
    },
  },
  {
    id: 'delivery-code-takeover',
    answer: 'scam',
    mockupType: 'sms',
    scenarioLabel: 'You deliver food on weekends. Mid-shift, a message arrives.',
    sender: 'DoorDash Support',
    messageBody:
      "Hi, support here. Your KFC delivery was flagged because the customer used someone else's card. Don't worry, you'll still be paid. I've just sent you a 6-digit code. Reply with it so I can confirm your account and release your payment.",
    verdictHeadline: 'Your code is the key to your wages.',
    vignette:
      "Scamwatch warned in June 2026 that scammers pose as delivery platforms, restaurants and customers. Delivery workers get messages about 'fraudulent' or 'double' orders, then hand over codes that let scammers take over their accounts and redirect their earnings.",
    tell: 'Nobody legitimate needs your one-time code. Check inside the official app only.',
    sourceOutlet: 'Scamwatch',
    sourceDate: '12 Jun 2026',
    sourceUrl: 'https://www.scamwatch.gov.au/about-us/news-and-alerts/scam-alert-food-delivery-scams',
    story: {
      headline: "The code that steals your wages",
      paragraphs: [
        "Scamwatch warned that scammers are posing as food delivery platforms, restaurants and even customers. Everyone on the apps is a target.",
        "Diners get unexpected messages about an order, a refund or an account problem, and are pushed to pay or share details outside the app.",
        "Delivery workers are told an order was flagged as fraudulent or placed twice, and that they need to confirm details to be paid. The request for a one-time code is the key step. The code lets scammers take over the account, change payment settings and redirect the worker's earnings.",
        "Other warning signs include password reset emails or login alerts you didn't ask for, and pressure to act immediately.",
      ],
      whatToDo: [
        "Never share a one-time code or password.",
        "Check problems inside the official app only, and report a takeover straight away.",
      ],
    },
  },
];

/** Screen copy and settings that may change between semesters. */
export const gameConfig = {
  tagline: 'Could you spot a 2026 scam?',
  introLines: ['Some are scams.', 'Some are genuine.', 'Decide fast.'],

  /**
   * Address encoded in the "Show QR code" button. Leave empty to use the
   * current page address. Set it to your deployed URL if the game runs
   * inside another page (for example an LMS frame).
   */
  shareUrl: '',

  /** Ranks on the end screen, checked from the top. `min` is the lowest score for that rank. */
  ranks: [
    { min: 10, name: 'Fraud Squad', blurb: 'Perfect score. The scammers should be worried about you.' },
    { min: 8, name: 'Scam Radar', blurb: 'Sharp instincts. One or two still got through, and that is the point.' },
    { min: 5, name: 'Street Smart', blurb: 'Solid, but the best scams only need to work once.' },
    { min: 0, name: 'Easy Mark', blurb: 'Tough round. These cases fooled real people too, including finance professionals.' },
  ],

  redFlagsTitle: '5 red flags that still work in 2026',
  redFlags: [
    { name: 'Urgency', detail: 'Act in minutes or lose money.' },
    { name: 'Pay to get paid', detail: 'Top-ups, release fees, upfront costs.' },
    { name: 'Channel switching', detail: 'Being moved to WhatsApp, Telegram or a phone number they give you.' },
    { name: 'Codes and control', detail: 'Requests for one-time codes, logins or remote access.' },
    {
      name: 'Seeing and hearing is no longer proof',
      detail: 'Faces and voices can be faked. Verify through a channel you find yourself.',
    },
  ],
};
