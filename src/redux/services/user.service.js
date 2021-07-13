const { REACT_APP_API_URL } = process.env;

export const userService = {
  register,
};

function register(user) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  };

  return fetch(`${REACT_APP_API_URL}/users/regsiter`, requestOptions)
    .then(handleResponse)
    .then((user) => {
      return user;
    });
}

const handleResponse = (response) => {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);

    if (!response.ok) {
      if (response.status === 401) {
        //Auto logout if 401 response returned from api.
        return `logout here`;
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
};
