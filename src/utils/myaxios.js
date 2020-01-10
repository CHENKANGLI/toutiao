import axios from 'axios'
// 配置基准路径
axios.defaults.baseURL = 'http://localhost:3000'
// 添加请求拦截器：所有请求都会经过这个拦截器
axios.interceptors.request.use(function (config) {
  // 获取token
  let token = localStorage.getItem('haima_token')
  if (token) {
    // 以请求头的方式进行传递
    config.headers.Authorization = token
  }
  return config
}, function (error) {
  return Promise.reject(error)
})
// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  if (response.data.message === '用户信息验证失败') {
    // 返回登录页面
    window.location.href = '#/login'
  }
  return response
}, function (error) {
  return Promise.reject(error)
})

export default axios
