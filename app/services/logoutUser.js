import useUser from '../stores/user';

export default function logoutUser(router) {
  localStorage.clear();
  useUser.getState().setAuthenticated('unauthenticated');
  router.push('/login');
}
