import useUser from '../stores/user';
import endUserSession from '../utils/endUserSession';

export default function getTasks(router) {
  const email = useUser.getState().email;
  const token = useUser.getState().token;

  const setTasks = useUser.getState().setTasks;

  const encodedKey = encodeURIComponent('user_email');
  const encodedContent = encodeURIComponent(email);

  const encodedEmail = encodedKey + '=' + encodedContent;

  fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks/get_tasks?${encodedEmail}`, {
    method: 'POST',
    headers: { accept: 'application/json', Authorization: `Bearer ${token}` },
  })
    .then((response) => {
      const status = response.status;
      if (status === 401) {
        endUserSession();
        router.push('/login');
      }
      const json = response.json();
      json.then((data) => {
        setTasks(data['tasks']);
      });
    })
    .catch((error) => {
      Promise.reject(error);
    });
}
