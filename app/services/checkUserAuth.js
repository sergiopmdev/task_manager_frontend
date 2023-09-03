export default function checkUserAuth() {
  const name = localStorage.getItem('name');
  if (!name) {
    return false;
  }
  return true;
}
