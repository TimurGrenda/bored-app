export const handleResponse = (response) =>
  response.json().then((json) => {
    if (!response.ok) {
      return Promise.reject(json);
    } else if (json.error) {
      return Promise.reject(new Error(json.error));
    }

    return json;
  });
