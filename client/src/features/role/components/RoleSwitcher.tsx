import { Shield, Eye } from 'lucide-react';
import { useRole } from '../hooks/useRole';

/**
 * RoleSwitcher — Presentational dropdown in the Sidebar.
 * Fires toast on role change via useRole hook.
 */
export function RoleSwitcher() {
  const { role, switchRole } = useRole();

  return (
    <div className="px-3 pb-4">
      <p className="text-xs font-label text-on-surface-variant uppercase tracking-widest mb-2 px-1">
        Role
      </p>
      <div className="flex rounded-xl overflow-hidden border border-outline-variant/20 bg-surface-container-highest/50">
        <button
          onClick={() => switchRole('admin')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-medium transition-all duration-200
            ${role === 'admin'
              ? 'bg-primary text-on-primary shadow-sm'
              : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/30'
            }`}
        >
          <Shield size={13} />
          Admin
        </button>
        <button
          onClick={() => switchRole('viewer')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-medium transition-all duration-200
            ${role === 'viewer'
              ? 'bg-primary text-on-primary shadow-sm'
              : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/30'
            }`}
        >
          <Eye size={13} />
          Viewer
        </button>
      </div>
    </div>
  );
}
