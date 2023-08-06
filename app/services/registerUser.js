import useRegister from '../stores/register';

class UserAlreadyExists extends Error {
  constructor(message) {
    super(message);
    this.name = 'UserAlreadyExists';
  }
}

export default function registerUser(userData) {
  const setLoading = useRegister.getState().setLoading;
  const setStatusCode = useRegister.getState().setStatusCode;

  setLoading(true);

  fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
    method: 'POST',
    body: JSON.stringify(userData),
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
  })
    .then((response) => {
      const statusCode = response.status;
      setStatusCode(statusCode);
      if (statusCode === 409) {
        throw new UserAlreadyExists('User already exists');
      }
    })
    .catch((error) => {
      Promise.reject(error);
    })
    .finally(() => {
      setLoading(false);
    });
}
