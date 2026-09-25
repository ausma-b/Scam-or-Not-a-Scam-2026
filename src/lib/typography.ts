/**
 * Typographic quotes. Straight ' and " in the data file are shown as curly
 * quotes: an opening mark (‘ “) after a space or bracket, a closing mark or
 * apostrophe (’ ”) everywhere else.
 */
export function smartQuotes(s: string): string {
  return s
    .replace(/(^|[\s([{—–/-])'/g, '$1‘')
    .replace(/'/g, '’')
    .replace(/(^|[\s([{—–/-])"/g, '$1“')
    .replace(/"/g, '”');
}
