import request from "./network"

export function getRecommendedStations() {
  return request({
    url: '/personalized/djprogram'
  })
}

// 电台Banner
export function getDjBannerData() {
  return request({
    url: '/dj/banner',
  })
}

// 个性推荐
export function getPersonalizeRecommend() {
  return request({
    url: '/dj/personalize/recommend',
    data: {
      limit:'20',
    }
  })
}
// 今日优选
export function getTodayPerfered() {
  return request({
    url: '/dj/today/perfered',
    data: {
      // limit:'6',
    }
  })
}

// 电台详情
export function getDetail(id) {
  return request({
    url: '/dj/detail',
    data: {
      rid: id,
    }
  })
}

// 电台节目
export function getProgram(id) {
  return request({
    url: '/dj/program',
    data: {
      rid: id,
      limit:40
    }
  })
}

// 电台 - 热门电台
export function getHotRadioList() {
  return request({
    url: '/dj/hot',
    data: {
      limit:30
    }
  })
}

// 电台 - 节目榜
export function getProgramList() {
  return request({
    url: '/dj/program/toplist',
    data: {
      limit:30
    }
  })
}

// 电台 - 新晋电台榜/热门电台榜
export function getNewRadioList(type) {
  return request({
    url: '/dj/toplist',
    data: {
      limit:30,
      type:type // new / hot
    }
  })
}

// 电台 - 付费精品
export function getPaidBoutique() {
  return request({
    url: '/dj/toplist/pay',
    data: {
      limit:30,
    }
  })
}

// 电台 - 分类
export function getCatelistDJ() {
  return request({
    url: '/dj/catelist',
  })
}

// 电台 - 分类推荐
export function getRecommendTypeDJ(type) {
  return request({
    url: '/dj/recommend/type',
    data: {
      type:type,
    }
  })
}


