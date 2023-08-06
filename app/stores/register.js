import { create } from 'zustand';

const useRegister = create((set) => ({
  loading: false,
  statusCode: undefined,
  setLoading: (value) => set(() => ({ loading: value })),
  setStatusCode: (value) => set(() => ({ statusCode: value })),
}));

export default useRegister;
