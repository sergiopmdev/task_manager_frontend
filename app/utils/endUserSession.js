import useUser from '../stores/user';

export default function endUserSession() {
  localStorage.clear();
  useUser.getState().setName(undefined);
  useUser.getState().setEmail(undefined);
  useUser.getState().setToken(undefined);
  useUser.getState().setTasks(undefined);
}
