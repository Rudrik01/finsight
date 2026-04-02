import type { ReactNode } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

interface AppShellProps {
  children: ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex h-screen w-full bg-surface overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 h-full w-full relative ml-64">
        <Topbar />
        <main className="flex-1 overflow-y-auto w-full">
          <div className="max-w-7xl mx-auto w-full p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
