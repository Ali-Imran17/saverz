/**
 * Currency and general formatting utilities for Saverz Supermarket
 */

export function formatPKR(amount: number): string {
  try {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      maximumFractionDigits: 0,
    }).format(amount).replace('PKR', 'Rs.');
  } catch {
    return `Rs. ${amount.toLocaleString()}`;
  }
}

export function formatNumber(num: number): string {
  return num.toLocaleString('en-US');
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}
