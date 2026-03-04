import { format, getISOWeek, getDay, isWeekend, isBefore, startOfDay } from 'date-fns';

const SLOT_POOL = ['12:30', '13:30', '14:30', '15:30', '16:30'] as const;
const SLOTS_PER_DAY = 2;

/**
 * Deterministic pseudo-random number from a seed.
 * Simple hash: consistent across all visitors for the same date.
 */
function seededShuffle(seed: number, array: string[]): string[] {
  const arr = [...array];
  let s = seed;
  for (let i = arr.length - 1; i > 0; i--) {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    const j = s % (i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Generate a numeric seed from a date that varies by week pattern and day of week.
 */
function dateSeed(date: Date): number {
  const weekNum = getISOWeek(date);
  const dayOfWeek = getDay(date); // 0=Sun, 1=Mon...6=Sat
  const year = date.getFullYear();
  // Rotate every 4 weeks, vary by day
  return ((weekNum % 4) * 7 + dayOfWeek) * 31 + (year % 100);
}

/**
 * Get the 2 available time slots for a given date.
 * Returns empty array for weekends or past dates.
 */
export function getSlotsForDate(date: Date): string[] {
  const today = startOfDay(new Date());
  const target = startOfDay(date);

  if (isBefore(target, today)) return [];
  if (isWeekend(date)) return [];

  const seed = dateSeed(date);
  const shuffled = seededShuffle(seed, [...SLOT_POOL]);
  return shuffled.slice(0, SLOTS_PER_DAY).sort();
}

/**
 * Check if a specific date is bookable (weekday, not past).
 */
export function isBookableDate(date: Date): boolean {
  const today = startOfDay(new Date());
  return !isBefore(startOfDay(date), today) && !isWeekend(date);
}

/**
 * Format a time slot for display (e.g., "12:30" → "12:30 PM", "14:30" → "2:30 PM").
 */
export function formatSlotTime(slot: string): string {
  const [hours, minutes] = slot.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours > 12 ? hours - 12 : hours;
  return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
}
