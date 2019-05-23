import axios from 'axios';

const apiHandler = axios.create({
  baseURL: '/x-api/'
});
apiHandler.interceptors.response.use(res => {
  let href;
  const data = res.data || {};
  const status = data.status || {};
  switch (+status.code) {
    case 0:
      return data.data;
    case 101:
      href = encodeURI(window.location.href);
      window.location.href = `/x/pages/login.html?${ href }`
      break;
    default:
      throw new Error(status.message);
  }
});

export const api = {
  get: (api, data = {}) => {
    return apiHandler.get(api, { params: data });
  },
  post: apiHandler.post,
  put: apiHandler.put
};
