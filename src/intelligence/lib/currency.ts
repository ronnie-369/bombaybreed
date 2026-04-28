// Indicative INR -> USD / EUR conversion shown alongside checkout prices for
// international subscribers. Razorpay still charges in INR; these are display
// helpers only, hence the explicit "approx" framing in the UI.
//
// Update these constants when rates drift materially.
export const INR_PER_USD = 84;
export const INR_PER_EUR = 92;

const usdFmt = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});
const eurFmt = new Intl.NumberFormat("en-IE", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

export function inrToUsd(inr: number): number {
  return Math.round(inr / INR_PER_USD);
}

export function inrToEur(inr: number): number {
  return Math.round(inr / INR_PER_EUR);
}

export function formatUsd(inr: number): string {
  return usdFmt.format(inrToUsd(inr));
}

export function formatEur(inr: number): string {
  return eurFmt.format(inrToEur(inr));
}

// "approx $119 / €109"
export function formatIntlBracket(inr: number): string {
  return `approx ${formatUsd(inr)} / ${formatEur(inr)}`;
}
