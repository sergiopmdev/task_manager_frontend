import useLogin from '../stores/login';
import useUser from '../stores/user';

class WrongCredentials extends Error {
  constructor(message) {
    super(message);
    this.name = 'WrongCredentials';
  }
}

export default function loginUser(userData, router) {
  const setLoading = useLogin.getState().setLoading;
  const setStatusCode = useLogin.getState().setStatusCode;
  const setAuthenticated = useUser.getState().setAuthenticated;

  setLoading(true);

  const userCredentials = {
    username: userData.email,
    password: userData.password,
  };

  let encodedCredentials = [];

  for (const property in userCredentials) {
    const encodedKey = encodeURIComponent(property);
    const encodedValue = encodeURIComponent(userCredentials[property]);
    encodedCredentials.push(encodedKey + '=' + encodedValue);
  }

  encodedCredentials = encodedCredentials.join('&');

  fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/token`, {
    method: 'POST',
    body: encodedCredentials,
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
  })
    .then((response) => {
      const statusCode = response.status;
      setStatusCode(statusCode);
      if (statusCode === 401) {
        throw new WrongCredentials('Incorrect email or password');
      }
      setAuthenticated('authenticated');
      const json = response.json();
      json.then((data) => {
        const userData = data['user_data'];
        localStorage.setItem('name', userData['name']);
        localStorage.setItem('email', userData['email']);
        localStorage.setItem('token', data['access_token']);
        router.push(`/user/${userData['name'].toLowerCase()}`);
      });
    })
    .catch((error) => {
      Promise.reject(error);
    })
    .finally(() => {
      setLoading(false);
    });
}
