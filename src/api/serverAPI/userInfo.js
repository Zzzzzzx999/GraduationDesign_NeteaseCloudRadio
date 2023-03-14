import request from "./network"
// 修改用户信息
export function updateUserinfo(params) {
  return request({
    url: '/my/userinfo',
    method: 'post',
    data:{
        id: params.id,
        nickname: params.nickname,
        email: params.email,
        user_pic: params.avatarUrl
    }
  })
}
// 获取用户信息
export function getUserinfo(id) {
  return request({
    url: '/api/login',
    method: 'post',
    data:{
        id
    }
  })
}
// banner
export function getBanner(params) {
  return request({
    url: '/my/banner/add',
    method: 'post',
    data:{
      params
    }
  })
}