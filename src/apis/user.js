import axios from '@/utils/myaxios.js'
export const login = (data) => {
  return axios({
    method: 'post',
    url: '/login',
    data
  })
}
export const register = (data) => {
  return axios({
    method: 'post',
    url: '/register',
    data
  })
}
export const getUserById = (id) => {
  return axios({
    url: `/user/${id}`
    // headers: { 'Authorization': localStorage.getItem('haima_token') }
  })
}
export const updateUserById = (id, data) => {
  return axios({
    method: 'post',
    url: `/user_update/${id}`,
    data
  })
}
// 过滤器
export const dateFormat = (time, spe) => {
  time = new Date(time)
  spe = spe || '-'
  let year = time.getFullYear()
  let month = time.getMonth()
  let day = time.getDate()
  return `${year}${spe}${month}${spe}${day}`
}
export const followUser = (id) => {
  return axios({
    url: `/user_follows/${id}`
  })
}
export const unfollowUser = (id) => {
  return axios({
    url: `/user_unfollow/${id}`
  })
}
export const likeArticle = (id) => {
  return axios({
    url: `/post_like/${id}`
  })
}
export const getUserFollows = () => {
  return axios({
    url: `/user_follows`
  })
}
export const getUserStars = () => {
  return axios({
    url: `/user_star`
  })
}
export const getUserComments = () => {
  return axios({
    url: `/user_comments`
  })
}
export const getCommentList = (id, params) => {
  return axios({
    url: `/post_comment/${id}`,
    params
  })
}
