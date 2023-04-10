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
        user_pic: params.user_pic,
        signature: params.signature,
    }
  })
}
// 获取用户信息
export function getUserinfo(id) {
  return request({
    url: '/my/userinfo',
    method: 'get',
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
// upLoadFile
export function upLoadFile(params) {
  return request({
    url: '/my/upload/add',
    method: 'post',
    body:params
  })
}
// 获取收藏电台id
export function getCollects(id) {
  return request({
    url: '/my/collect',
    method: 'get',
    data:{
      id
    }
  })
}
// 更新收藏电台id
export function UpdateCollects(params) {
  return request({
    url: '/my/updateCollect',
    method: 'post',
    data:{
      collect: params.collect,
      id: params.id,
    }
  })
}