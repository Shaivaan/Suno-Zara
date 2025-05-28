// hooks/useClickOutside.ts
import { useEffect, type RefObject } from 'react';

const useClickOutside = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  callback: () => void,
  isActive: boolean = true
): void => {
  useEffect(() => {
    if (!isActive) return;
    
    const handleClick = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
        console.log('sdsad')  
        callback();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleEscape);
    
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [ref, callback, isActive]);
};

export default useClickOutside;