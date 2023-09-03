import { create } from 'zustand';

const useUser = create((set) => ({
  name: undefined,
  email: undefined,
  token: undefined,
  setName: (value) => set(() => ({ name: value })),
  setEmail: (value) => set(() => ({ email: value })),
  setToken: (value) => set(() => ({ token: value })),
}));

export default useUser;
