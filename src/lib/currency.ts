// Currency utility functions for Jewelcart
// Consistent Indian Rupee formatting across the application

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
};

export const formatPrice = (amount: number): string => {
  // Alternative formatting without currency symbol for display
  return new Intl.NumberFormat('en-IN', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
};

export const formatCurrencyCompact = (amount: number): string => {
  // Compact formatting for large numbers (e.g., ₹1.2L instead of ₹1,20,000)
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    notation: 'compact',
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  }).format(amount);
};

export const parseCurrency = (currencyString: string): number => {
  // Parse currency string back to number
  return parseFloat(currencyString.replace(/[₹,\s]/g, '')) || 0;
};

// Constants
export const CURRENCY_SYMBOL = '₹';
export const CURRENCY_CODE = 'INR';
export const LOCALE = 'en-IN';

// Price formatting with custom suffix
export const formatPriceWithSuffix = (amount: number, suffix: string = ''): string => {
  return `${formatCurrency(amount)}${suffix ? ' ' + suffix : ''}`;
};

export default formatCurrency;