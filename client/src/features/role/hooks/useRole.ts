import { useRoleStore } from '@/store/useRoleStore';
import { useToastStore } from '@/store/useToastStore';
import type { RoleType } from '@/types';

/**
 * Provides role state and a type-safe role switcher action with toast feedback.
 */
export function useRole() {
  const role = useRoleStore((state) => state.role);
  const setRole = useRoleStore((state) => state.setRole);
  const addToast = useToastStore((state) => state.addToast);

  const switchRole = (newRole: RoleType) => {
    setRole(newRole);
    addToast(
      `Switched to ${newRole === 'admin' ? 'Admin' : 'Viewer'} mode`,
      newRole === 'admin' ? 'success' : 'info'
    );
  };

  return { role, switchRole };
}
