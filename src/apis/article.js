import axios from '../utils/myaxios'

export const getPostList = (params) => {
  return axios({
    url: '/post',
    params
  })
}
export const getArticleById = (id) => {
  return axios({
    url: `/post/${id}`
  })
}
export const starArticle = (id) => {
  return axios({
    url: `/post_star/${id}`
  })
}
export const replyComment = (id, data) => {
  return axios({
    method: 'post',
    url: `/post_comment/${id}`,
    data
  })
}
export const searchArticle = (params) => {
  return axios({
    url: '/post_search',
    params
  })
}
