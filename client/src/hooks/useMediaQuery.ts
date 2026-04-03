import { useState, useEffect } from 'react';

/**
 * Tracks whether the viewport matches a CSS media query string.
 * Used by AppShell to determine if sidebar should be collapsed.
 * @param query - A valid CSS media query string e.g. '(min-width: 1024px)'
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    const mql = window.matchMedia(query);
    const handleChange = (e: MediaQueryListEvent) => setMatches(e.matches);

    mql.addEventListener('change', handleChange);
    setMatches(mql.matches);

    return () => mql.removeEventListener('change', handleChange);
  }, [query]);

  return matches;
}
