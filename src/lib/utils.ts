import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export const AppName = 'Suna Kro';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}