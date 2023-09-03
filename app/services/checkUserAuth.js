import useUser from '../stores/user';

export default function checkUserAuth() {
  return useUser.getState().authenticated;
}
