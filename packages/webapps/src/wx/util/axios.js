import axios from 'axios';

const proxyHandler = axios.create({
  baseURL: '/wx-proxy/'
});
proxyHandler.interceptors.response.use(res => res.data);
const proxy = {
  post: proxyHandler.post
};

const apiHandler = axios.create({
  baseURL: '/wx-api/'
});
apiHandler.interceptors.response.use(res => res.data, err => {
  let href;
  const res = err.response || {}
  switch (+res.status) {
    case 401:
      href = encodeURI(window.location.href);
      window.location.href = `/oauth2/authorize?url=${ href }`;
      break;
    default:
      throw new Error(res.data.error)
  }
});

const api = {
  get: (api, data = {}) => {
    return apiHandler.get(api, { params: data });
  },
  post: apiHandler.post,
  put: apiHandler.put
}

export {
  proxy,
  api
}
