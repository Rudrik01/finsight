import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

type Theme = 'light' | 'dark';

interface ThemeState {
  theme: Theme;
}

interface ThemeActions {
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

type ThemeStore = ThemeState & ThemeActions;

export const useThemeStore = create<ThemeStore>()(
  devtools(
    persist(
      (set, get) => ({
        theme: 'dark',
        toggleTheme: () => {
          const newTheme = get().theme === 'dark' ? 'light' : 'dark';
          set({ theme: newTheme }, false, 'theme/toggle');
          document.documentElement.setAttribute('data-theme', newTheme);
        },
        setTheme: (theme) => {
          set({ theme }, false, 'theme/set');
          document.documentElement.setAttribute('data-theme', theme);
        }
      }),
      {
        name: 'theme-storage',
        onRehydrateStorage: () => (state) => {
          if (state) {
            document.documentElement.setAttribute('data-theme', state.theme);
          }
        }
      }
    ),
    { name: 'ThemeStore' }
  )
);
