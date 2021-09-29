import axios from 'axios';
import { message } from 'ant-design-vue';

const config = {
 baseURL: '//localhost:3000/api',

 headers: {
   auth: 'Xuedong Wang',
   email: 'email@wangxuedong.com'
 },

//  withCredentials: true
};

const httpInstant = axios.create(config);// 添加请求拦截器
httpInstant.interceptors.request.use(config => {
  return config;
}, error => {
  return Promise.reject(error);
});

httpInstant.interceptors.response.use(response => {
  const { code } = response.data;
  if (code === 0) {
    return response.data;
  } else if (code === -1001) {
    message.error({
      content: '登录过期，请重新登录',
      key: 'key'
    });
    return Promise.reject(response);
  } else {
    return Promise.reject(response)
  }
}, error => {
  return Promise.reject(error);
});
export default httpInstant;
