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


export const stopPropagation = (event:React.MouseEvent<any>)=>event.stopPropagation();

export const loadArray = new Array(15).fill(0);

export const localStorageKeys = {
    volume : 'volume'
};

export const indexDbUtils = {
  dbName : 'musicApp',
  
  storeNames : {
    volume:'volume'
  }
}

export const toastMessages = {
  favourited : 'Saved to Favorites!',
  unfavourited : 'No Longer a Favorite!'
}