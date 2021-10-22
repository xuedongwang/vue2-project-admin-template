import $http from './http';
import { API } from '@/config';


const upload = ({file, url=API.COMMON.UPLOAD, userConfig={}}) => {
  const defaultConfig = {
    headers: {
      'Content-Type': 'multipart/form-data;charset=UTF-8'
    },
    loadingMsg: '上传中...'
  }
  const config = {
    ...defaultConfig,
    ...userConfig
  }
  const formData = new FormData()
  formData.append('file', file)
  return $http.post(url, formData, config)
}

export default upload;