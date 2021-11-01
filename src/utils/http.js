import axios from 'axios';
import { message } from 'ant-design-vue';
import router from '@/router';

const config = {
  baseURL: '//localhost:9000/v1',

  headers: {
    auth: 'Xuedong Wang',
    email: 'email@wangxuedong.com'
  },
  // 加载的loading
  loadingMsg: '加载中...',
  showLoadingMsg: true
//  withCredentials: true
};

const httpInstant = axios.create(config);// 添加请求拦截器
let hide = null;
httpInstant.interceptors.request.use(config => {
  if (localStorage.getItem('token')) {
    config.headers.token = localStorage.getItem('token')
  }
  console.log(config);
  if (config.showLoadingMsg) {
    hide = message.loading({
      content: config.loadingMsg,
      duration: 0,
      key: 'key'
    });
  }
  return config;
}, error => {
  hide && hide();
  return Promise.reject(error);
});

function errorMsg(content = '网络故障，请重试') {
  message.error({
    content,
    key: 'key'
  });
}

httpInstant.interceptors.response.use(response => {
  hide && hide();
  const { code } = response.data;
  if (code === 0) {
    return response.data;
  } else if (code === -1001) {
    localStorage.removeItem('token');
    errorMsg('登录过期，请重新登录');
    router.replace('/login');
    return Promise.reject(response);
  } else {
    errorMsg(response.data.message);
    return Promise.reject(response);
  }
}, error => {
  errorMsg();
  return Promise.reject(error);
});
export default httpInstant;
