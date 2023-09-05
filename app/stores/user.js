import { create } from 'zustand';

const useUser = create((set) => ({
  name: undefined,
  email: undefined,
  token: undefined,
  tasks: undefined,
  setName: (value) => set(() => ({ name: value })),
  setEmail: (value) => set(() => ({ email: value })),
  setToken: (value) => set(() => ({ token: value })),
  setTasks: (value) => set(() => ({ tasks: value })),
}));

export default useUser;
