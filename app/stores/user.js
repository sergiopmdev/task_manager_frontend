import { create } from 'zustand';

const useUser = create((set) => ({
  authenticated: 'unknown',
  name: undefined,
  email: undefined,
  token: undefined,
  setAuthenticated: (value) => set(() => ({ authenticated: value })),
  setName: (value) => set(() => ({ name: value })),
  setEmail: (value) => set(() => ({ email: value })),
  setToken: (value) => set(() => ({ token: value })),
}));

export default useUser;
