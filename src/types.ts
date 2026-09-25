export type Answer = 'scam' | 'legit';

export type MockupType =
  | 'sms'
  | 'email'
  | 'whatsapp'
  | 'videocall'
  | 'bankapp'
  | 'socialad'
  | 'voicemail';

/** An in-game news summary shown after the answer (written in our own words, based on the source). */
export interface Story {
  headline: string;
  paragraphs: string[];
  whatToDo: string[];
}

export interface Card {
  id: string;
  answer: Answer;
  scenarioLabel: string;
  mockupType: MockupType;
  sender: string;
  messageBody: string;
  verdictHeadline: string;
  vignette: string;
  tell: string;
  sourceOutlet: string;
  sourceDate: string;
  sourceUrl: string;
  /** Optional. When present, 'Read the real story' opens this in-game instead of a new tab. */
  story?: Story;
}

export type Mode = 'presenter' | 'solo';
export type Screen = 'start' | 'intro' | 'card' | 'end';
