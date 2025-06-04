import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export const AppName = 'Sunte Ho';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const routes = {
  home : '/',
  search : '/search',
  library : '/library',
  queue : '/queue',
  genre : '/genre'
};

export const loadArray = new Array(15).fill(0);