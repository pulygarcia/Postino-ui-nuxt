import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatCurrency = (amount:Number) => Number(amount).toLocaleString('en-US', {
  style: 'currency',
  currency: 'USD'
})