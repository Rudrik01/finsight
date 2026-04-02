import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { RoleType } from '@/types';

interface RoleState {
  role: RoleType;
}

interface RoleActions {
  setRole: (role: RoleType) => void;
}

type RoleStore = RoleState & RoleActions;

const initialState: RoleState = {
  role: 'admin',
};

export const useRoleStore = create<RoleStore>()(
  devtools(
    (set) => ({
      ...initialState,
      
      setRole: (role) => {
        set({ role }, false, 'role/setRole');
      }
    }),
    { name: 'RoleStore' }
  )
);
