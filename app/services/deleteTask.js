import useUser from '../stores/user';
import getTasks from './getTasks';

export default function deleteTask(taskName, setDeletingTask) {
  const email = useUser.getState().email;
  const token = useUser.getState().token;

  const properties = {
    user_email: email,
    task_name: taskName,
  };

  let encodedProperties = [];

  for (const property in properties) {
    const encodedKey = encodeURIComponent(property);
    const encodedValue = encodeURIComponent(properties[property]);
    encodedProperties.push(encodedKey + '=' + encodedValue);
  }

  encodedProperties = encodedProperties.join('&');

  setDeletingTask(true);

  fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/tasks/delete_task?${encodedProperties}`,
    {
      method: 'PATCH',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  ).then(() => {
    getTasks();
  });
}
