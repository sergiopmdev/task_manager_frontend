export default function logoutUser(router) {
  localStorage.clear();
  router.push('/login');
}
