import request from "./network"
// 注册
export function reguser(params) {
  return request({
    url: '/api/reguser',
    method: 'post',
    data:{
      username:params.username,
      password:params.password,
      user_pic:params.user_pic,
      nickname:params.nickname,
      email:params.email,
      growthValue:params.growthValue,
      works:params.works,
      follows:params.follows,
      followed:params.followed,
      giftsReceived:params.giftsReceived,
      signature:params.signature,
    }
  })
}
// 登录
export function login(params) {
  return request({
    url: '/api/login',
    method: 'post',
    data:{
      username:params.username,
      password:params.password
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






// 每日推荐
export function getSongs() {
  return request({
    url: '/recommend/songs'
  })
}
export function getSongUrl(id) {
  return request({
    url: '/song/url',
    data: {
      id: id
    }
  })
}
// 歌单类型
export function getPlayList(params) {
  return request({
    url: '/top/playlist/highquality',
    data: {
      cat: params.tag,
      limit: 21,
      before: params.before
    }
  })
}
