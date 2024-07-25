import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { format } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatCurrency = (amount:Number) => Number(amount).toLocaleString('en-US', {
  style: 'currency',
  currency: 'USD'
})

export function formatDate(isoDate:string) {
  return format(new Date(isoDate), 'dd-MM-yyyy');
}