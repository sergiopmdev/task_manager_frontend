import { create } from 'zustand';

const initialState = {
  loading: false,
  statusCode: undefined,
};

const useTask = create((set) => ({
  ...initialState,
  setLoading: (value) => set(() => ({ loading: value })),
  setStatusCode: (value) => set(() => ({ statusCode: value })),
  reset: () => set(initialState),
}));

export default useTask;
