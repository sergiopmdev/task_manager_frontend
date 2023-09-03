import { create } from 'zustand';

const useUser = create((set) => ({
  authenticated: 'unknown',
  setAuthenticated: (value) => set(() => ({ authenticated: value })),
}));

export default useUser;
