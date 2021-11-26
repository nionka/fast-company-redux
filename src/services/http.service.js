import axios from 'axios';
import { toast } from 'react-toastify';
import config from '../config.json';

axios.defaults.baseURL = config.apiEndPoint;

axios.interceptors.response.use(res => res, function (err) {
  const expectedErrors = err.response && err.response.status >= 400 && err.response.status < 500;

  if (!expectedErrors) {
    console.log(err);
    toast.error('Что-то пошло не так. Попробуйте позже!!!');
  }

  return Promise.reject(err);
});

const httpService = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete
};

export default httpService;
