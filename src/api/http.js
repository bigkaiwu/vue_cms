import axios from 'axios'

const http = axios.create({
  baseURL: 'http://127.0.0.1:8888/api/private/v1/'
})

http.interceptors.request.use(function (config) {
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
}, function (error) {
  return Promise.reject(error)
})

export default http
