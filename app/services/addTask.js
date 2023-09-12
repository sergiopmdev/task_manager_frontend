import useTask from '../stores/task';
import useUser from '../stores/user';

import getTasks from './getTasks';

class TaskAlreadyExists extends Error {
  constructor(message) {
    super(message);
    this.name = 'TaskAlreadyExists';
  }
}

export default function addTask(taskData, router, showAddTaskModal) {
  const email = useUser.getState().email;
  const token = useUser.getState().token;

  const setLoading = useTask.getState().setLoading;
  const setStatusCode = useTask.getState().setStatusCode;
  const reset = useTask.getState().reset;

  setLoading(true);

  const task = {
    name: taskData.name,
    description: taskData.description,
    priority: taskData.priority,
  };

  const encodedKey = encodeURIComponent('user_email');
  const encodedContent = encodeURIComponent(email);

  const encodedEmail = encodedKey + '=' + encodedContent;

  fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks/add_task?${encodedEmail}`, {
    method: 'PATCH',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(task),
  })
    .then((response) => {
      const status = response.status;
      setStatusCode(status);
      if (status === 409) {
        throw new TaskAlreadyExists('Task already exists');
      }
      showAddTaskModal(false);
      getTasks(router);
      setTimeout(() => {
        reset();
      }, 2000);
    })
    .catch((error) => {
      Promise.reject(error);
    })
    .finally(() => {
      setLoading(false);
    });
}
