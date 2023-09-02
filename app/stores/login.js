import { create } from 'zustand';

const useLogin = create((set) => ({
  loading: false,
  statusCode: undefined,
  setLoading: (value) => set(() => ({ loading: value })),
  setStatusCode: (value) => set(() => ({ statusCode: value })),
}));

export default useLogin;
