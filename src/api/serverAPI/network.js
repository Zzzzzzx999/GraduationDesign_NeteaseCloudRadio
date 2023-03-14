import { baseURL, timeout} from "./config"


function request(options) {
  return new Promise((resolve, reject) => {
    wx.request({
			// #ifdef H5
      // url: '/lmusic' + options.url,
			// #endif
			// #ifdef MP-WEIXIN
			url: baseURL + options.url,
      timeout: timeout,
      data: {
        ...options.data,
        // cookie: uni.getStorageSync('cookies')
	    },
      method: options.method,
      header: {
				'content-type': 'application/x-www-form-urlencoded;charset=UTF-8', 
				// 'content-type': 'application/x-www-form-urlencoded;application/json;charset=UTF-8', 
				// cookies: uni.getStorageSync('cookies')
        cookie:uni.getStorageSync('cookies')?uni.getStorageSync('cookies').toString():'',
        token:uni.getStorageSync('token')?uni.getStorageSync('token').toString():'',
        // time:new Date().getTime()
      },
      success: function(res) {
        if(options.data && options.data.islogin) {
          uni.setStorage({
						data:res.data.token,
            key: 'token',
          })
        }
        resolve(res.data)
      },
      fail: reject,
      complete: res => {
      }
    })
  })
}

export default request;