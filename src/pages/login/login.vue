<template>
	<view class="container">
	  <view class="wrapper">
	    <view class="left-top-sign">LOGIN</view>
	    <view class="welcome">
	      欢迎回来！
	    </view>
	    <view class="input-content">
	      <view v-if="!change" class="input-item">
	        <text class="tit">手机号码</text>
	        <input v-model="phone" type="text" placeholder="请输入手机号码"/>
	      </view>
	      <view  v-else class="input-item">
	        <text class="tit">用户名</text>
	        <input v-model="username" type="text" placeholder="请输入用户名"/>
	      </view>
	      <view class="input-item">
	        <text class="tit">密码</text>
	        <input v-model="pwd" :type="open?'text':'password'" placeholder="请输入密码"/>
			<image id="password" :src="open?'../../static/icon/eye.png':'../../static/icon/eye-off.png'" @click="open=!open"></image>
	      </view>
	    </view>
	    <button class="confirm-btn" @click="login">登录</button>
	    <!-- <view class="forget-section" @click="changeLoginType">
	      {{change?'切换手机密码登陆':'切换用户名登录'}}
	    </view> -->
	  </view>
	  <view class="register-section">
	    还没有账号?
		<div class="inline-block" @click="goReguser">马上注册</div>
	    <!-- <div class="inline-block">游客登陆</div> -->
		<!-- <view>
			<text>游客登陆</text>
		</view> -->
	  </view>
	</view>
</template>

<script>
	const app = getApp()
	import {logins,visitorLogin} from '../../api/home'
	import {login} from '../../api/serverAPI/user'
	export default {
		data() {
			return {
				phone: '',
				pwd: '',
				username: '',
				change: true,
				open:false,
			}
		},
		methods: {
			/* changeLoginType() {
				this.change = !this.change
				this.username = ''
				this.pwd = ''
			}, */
			checkPwd(){
				let {pwd,username,phone} = this
				let params = {}
				if(!this.change) {
					params = {
						phone,
						password: pwd,
						islogin: true
					}
				} else {
					params = {
						username,
						password: pwd,
						islogin: true
					}
				}
				if (!pwd) {
					wx.showToast({	
						title: '请输入密码',
						icon: 'none'
					})
					return
				}else{
					console.log('@',params);
					login(params).then(res => {
						if(res.status === 1) {
							wx.showToast({
								title: res.message,
								icon: 'none'
							})
						} else if(res.status === 0){
							// console.log('@1',res.profile.user_pic);
							// res.profile.user_pic = app.getImageSrc(res.profile.user_pic)
							// console.log('@2',res.profile.user_pic);
							wx.setStorage({
								data: res.profile,
								key: 'userDetail',
							})
							wx.setStorageSync('token',res.token)
							wx.redirectTo({
								url: '../home',
							})
							console.log('登录成功！');
						}else{
							if (res.message) {
								wx.showToast({
									title: res.message,
									icon: 'none'
								})
							}else{
								wx.showToast({
									title: '未知错误！',
									icon: 'none'
								})
							}
						}
					})
				}
			},
			login() {
				let {phone, username} = this
				if (!this.change) {
					if (!phone) {
						wx.showToast({
							title: '请输入手机号',
							icon: 'none'
						})
						return
					}else{
						let phoneReg = /^1(3|4|5|6|7|8|9)\d{9}$/
						if (!phoneReg.test(phone)) {
							wx.showToast({	
								title: '请输入正确的手机号',
								icon: 'none'
							})
							return
						}else{
							this.checkPwd()
						}
					}
				}else{
					if (!username) {
						wx.showToast({
							title: '请输入用户名',
							icon: 'none'
						})
						return
					}else{
						this.checkPwd()
					}
				}
			},
			goReguser(){
				wx.redirectTo({
					url: '../reguser/reguser',
				})
			}
		},
		created() {
			/* uni.showModal({
				title: '提示',
				content: '当前仅支持二维码登录',
				showCancel:false,
				success: function (res) {
					console.log('用户点击确定');
					if (res.confirm) {
						uni.navigateTo({url:'../loginQR/loginQR'})
					}
				}
			}); */
		},
	}
</script>

<style>
/* pages/login/login.wxss */.wrapper{
  position:relative;
  z-index: 90;
  padding-bottom: 40rpx;
}

.left-top-sign{
  font-size: 120rpx;
  color: #f8f8f8;
  position:relative;
  left: -16rpx;
}

.welcome{
  position:relative;
  left: 50rpx;
  top: -90rpx;
  font-size: 46rpx;
  color: #555;
}


.input-content{
  padding: 0 60rpx;
}
.input-item{
  display:flex;
  flex-direction: column;
  align-items:flex-start;
  justify-content: center;
  padding: 0 30rpx;
  background:#f8f6fc;
  height: 120rpx;
  border-radius: 4px;
  margin-bottom: 50rpx;
  position: relative;
}

#password{
	position: absolute;
	right: 25rpx;
	width: 50rpx;
	height: 50rpx;
}



.input-item:last-child{
  margin-bottom: 0;
}
.input-item .tit{
  height: 50rpx;
  line-height: 56rpx;
  font-size: 30rpx;
  color: #606266;
}
.input-item input{
  height: 60rpx;
  font-size: 30rpx;
  color: #303133;
  width: 85%;
}
.confirm-btn{
  width: 630rpx!important;
  height: 76rpx;
  line-height: 76rpx;
  border-radius: 50rpx;
  margin-top: 70rpx;
  background: #d43c33;
  color: #fff;
  font-size: 32rpx;
  padding: 0;
}
.confirm-btn2:after{
  border-radius: 100px;
}

.forget-section{
  font-size: 28rpx;
  color: #4399fc;
  text-align: center;
  margin-top: 40rpx;
}

.register-section{
  position:absolute;
  left: 0;
  bottom: 50rpx;
  width: 100%;
  font-size: 28rpx;
  color: #606266;
  text-align: center;

}
.register-section .inline-block{
	display: inline-block;
  color: #4399fc;
  margin-left: 10rpx;
}


</style>
