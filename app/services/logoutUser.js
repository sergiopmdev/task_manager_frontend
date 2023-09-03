import useUser from '../stores/user';

export default function logoutUser(router) {
  localStorage.clear();
  useUser.getState().setAuthenticated('unauthenticated');
  useUser.getState().setName(undefined);
  useUser.getState().setEmail(undefined);
  useUser.getState().setToken(undefined);
  router.push('/login');
}
