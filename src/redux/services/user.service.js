const { REACT_APP_API_URL } = process.env;

export const userService = {
  register,
};

function register(user) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user.user),
  };

  return fetch(`${REACT_APP_API_URL}/register`, requestOptions)
    .then(handleResponse)
    .then((user) => {
      return user;
    });
}

const handleResponse = (response) => {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);

    if (!response.ok) {
      const error = (data && data.error) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
};
