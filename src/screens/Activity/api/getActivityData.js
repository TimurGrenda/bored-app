import { handleResponse } from './utils/handleResponse';

export const getActivityData = (url, onSuccess, onError) => {
  fetch(url)
    .then(handleResponse)
    .then(onSuccess)
    .catch(onError);
};
