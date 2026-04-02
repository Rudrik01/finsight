import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ReceiptText, BarChart3, ShieldCheck, User as UserIcon } from 'lucide-react';
import { useRoleStore } from '../../store/useRoleStore';
import { useToastStore } from '../../store/useToastStore';
import { ROUTES } from '../../constants/routes';
import { APP_NAME } from '../../constants/config';

const NAV_ITEMS = [
  { label: 'Dashboard', path: ROUTES.DASHBOARD, icon: LayoutDashboard },
  { label: 'Transactions', path: ROUTES.TRANSACTIONS, icon: ReceiptText },
  { label: 'Insights', path: ROUTES.INSIGHTS, icon: BarChart3 },
];

export default function Sidebar() {
  const { role, setRole } = useRoleStore();
  const addToast = useToastStore((state) => state.addToast);

  const toggleToAdmin = () => {
    setRole('admin');
    addToast('Switched to Admin Role', 'info');
  };

  const toggleToViewer = () => {
    setRole('viewer');
    addToast('Switched to Viewer Role', 'info');
  };

  return (
    <aside className="fixed left-0 top-0 w-64 bg-surface-container-low flex flex-col h-full z-20 shadow-ambient dark:shadow-ambient-dark">
      <div className="p-6">
        <h1 className="text-xl font-heading font-bold text-primary-500 flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-primary-500/20 flex items-center justify-center">
            <LayoutDashboard size={18} className="text-primary-500" />
          </div>
          {APP_NAME}
        </h1>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-primary/20 to-transparent text-primary font-semibold border-l-4 border-primary'
                  : 'text-on-surface-variant hover:bg-surface-variant hover:text-on-surface'
              }`
            }
          >
            <item.icon size={20} />
            {item.label}
          </NavLink>
        ))}
      </nav>
      
      <div className="p-4 mt-auto flex flex-col gap-4">
        {/* Upgrade Plan Card */}
        <div className="bg-gradient-to-br from-primary to-primary-variant text-on-primary p-4 rounded-xl flex flex-col gap-3 shadow-glow-primary">
          <span className="font-semibold text-sm">Upgrade Plan</span>
          <button className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-md border border-white/10 font-bold py-2 rounded-lg text-sm w-full transition-all duration-300">
            Get Pro
          </button>
        </div>

        {/* Real Toggling per screenshots */}
        <div className="flex flex-col gap-1 mt-2">
          <button 
             onClick={toggleToAdmin}
             className={`flex items-center gap-3 p-2.5 rounded-lg transition-all duration-200 ${role === 'admin' ? 'bg-primary/10 text-primary font-semibold' : 'text-on-surface-variant hover:bg-surface-variant'}`}
          >
            <ShieldCheck size={18} className={role === 'admin' ? 'text-primary' : ''} />
            <span className="text-sm">Admin</span>
          </button>
          
          <button 
             onClick={toggleToViewer}
             className={`flex items-center gap-3 p-2.5 rounded-lg transition-all duration-200 ${role === 'viewer' ? 'bg-primary/10 text-primary font-semibold' : 'text-on-surface-variant hover:bg-surface-variant'}`}
          >
            <UserIcon size={18} className={role === 'viewer' ? 'text-primary' : ''} />
            <span className="text-sm">Viewer</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
