/**
 * Phone number formatting + normalization for inquiry forms.
 *
 * - `formatPhoneInput` produces a friendly display value as the user types
 *   (keeps a leading "+", groups digits in 2-5-5 for +91 / Indian numbers,
 *   3-3-4 for +1, otherwise simple 3-3-4-... groups).
 * - `normalizePhone` produces the canonical E.164-ish value to send to
 *   Formspree: leading "+" preserved, all other non-digits stripped.
 */

const MAX_DIGITS = 15; // ITU-T E.164 max

export function normalizePhone(raw: string): string {
  if (!raw) return '';
  const trimmed = raw.trim();
  const hasPlus = trimmed.startsWith('+');
  const digits = trimmed.replace(/\D/g, '').slice(0, MAX_DIGITS);
  if (!digits) return hasPlus ? '+' : '';
  return (hasPlus ? '+' : '') + digits;
}

function groupDigits(digits: string, groups: number[]): string {
  const parts: string[] = [];
  let i = 0;
  for (const size of groups) {
    if (i >= digits.length) break;
    parts.push(digits.slice(i, i + size));
    i += size;
  }
  if (i < digits.length) parts.push(digits.slice(i));
  return parts.join(' ');
}

export function formatPhoneInput(raw: string): string {
  if (!raw) return '';
  // Preserve a leading "+" if user typed one (or starts with country code).
  const hasPlus = raw.trim().startsWith('+');
  const digits = raw.replace(/\D/g, '').slice(0, MAX_DIGITS);
  if (!digits) return hasPlus ? '+' : '';

  // No "+" -> assume local national number, group as 5-5 (Indian mobile) or pass through.
  if (!hasPlus) {
    if (digits.length <= 5) return digits;
    if (digits.length <= 10) return `${digits.slice(0, 5)} ${digits.slice(5)}`;
    return groupDigits(digits, [5, 5, 4]);
  }

  // With "+": detect a few common country codes for nicer grouping.
  // India +91 -> "+91 XXXXX XXXXX"
  if (digits.startsWith('91')) {
    const cc = digits.slice(0, 2);
    const rest = digits.slice(2);
    if (!rest) return `+${cc}`;
    return `+${cc} ${groupDigits(rest, [5, 5, 4])}`.trimEnd();
  }
  // North America +1 -> "+1 XXX XXX XXXX"
  if (digits.startsWith('1')) {
    const cc = digits.slice(0, 1);
    const rest = digits.slice(1);
    if (!rest) return `+${cc}`;
    return `+${cc} ${groupDigits(rest, [3, 3, 4])}`.trimEnd();
  }
  // UK +44, AU +61, DE +49, FR +33, SG +65, AE +971, generic 2-3 digit CC.
  const twoDigitCC = ['44', '49', '33', '61', '65', '81', '82', '86', '92'];
  const threeDigitCC = ['971', '966', '880', '977', '975', '960'];
  let ccLen = 2;
  if (threeDigitCC.some((c) => digits.startsWith(c))) ccLen = 3;
  else if (twoDigitCC.some((c) => digits.startsWith(c))) ccLen = 2;
  else ccLen = Math.min(2, digits.length);

  const cc = digits.slice(0, ccLen);
  const rest = digits.slice(ccLen);
  if (!rest) return `+${cc}`;
  return `+${cc} ${groupDigits(rest, [4, 4, 4, 4])}`.trimEnd();
}
