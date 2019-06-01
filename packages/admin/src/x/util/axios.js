import axios from 'axios';

const apiHandler = axios.create({
  baseURL: '/x-api/'
});
apiHandler.interceptors.response.use(res => res.data, err => {
  let href;
  const res = err.response || {}
  switch (+res.status) {
    case 401:
      href = encodeURI(window.location.href);
      window.location.href = `/x/pages/login.html?${ href }`
      break;
    default:
      throw new Error(res.data.error)
  }
});

export const api = {
  get: (api, data = {}) => {
    return apiHandler.get(api, { params: data });
  },
  post: apiHandler.post,
  put: apiHandler.put
};
