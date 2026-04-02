import { Search, Bell, User, Sun, Moon } from 'lucide-react';
import { useThemeStore } from '../../store/useThemeStore';

export default function Topbar() {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <header className="h-20 bg-surface/80 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-10 border-b border-outline-variant/10">
      <div className="w-96">
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
          <input 
            type="text" 
            placeholder="Search transactions..." 
            className="w-full bg-surface-container-highest border border-outline-variant/20 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 text-on-surface placeholder:text-on-surface-variant"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-surface-variant text-on-surface-variant transition-colors"
          title="Toggle Theme"
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        
        <button className="p-2 rounded-full hover:bg-surface-variant text-on-surface-variant transition-colors relative">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full animate-pulse"></span>
        </button>
        <div className="h-8 w-8 rounded-full bg-surface-container-highest border border-outline-variant/20 flex items-center justify-center text-on-surface-variant cursor-pointer hover:bg-surface-variant transition-colors">
          <User size={18} />
        </div>
      </div>
    </header>
  );
}
