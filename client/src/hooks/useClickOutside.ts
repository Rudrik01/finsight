import { useEffect, type RefObject } from 'react';

/**
 * Fires a callback when a click event occurs outside the referenced element.
 * Used for closing dropdowns, modals triggered by non-overlay clicks.
 * @param ref - React ref to the element to detect outside clicks for
 * @param handler - Callback to invoke when clicking outside
 */
export function useClickOutside<T extends HTMLElement>(
  ref: RefObject<T>,
  handler: () => void
): void {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) return;
      handler();
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}
