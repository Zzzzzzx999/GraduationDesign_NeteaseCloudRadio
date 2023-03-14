<template>
	<view class="container">
	  <view class="wrapper">
	    <view class="left-top-sign">LOGIN</view>
	    <view class="welcome">
	      拥有一个自己的账号吧！
	    </view>
	    <view class="input-content">
	      <view class="input-item">
	        <text class="tit">用户名</text>
	        <input v-model="username" type="text" placeholder="请输入用户名"/>
	      </view>
	      <view class="input-item">
	        <text class="tit">密码</text>
	        <input v-model="pwd" type="password" placeholder="请输入密码"/>
	      </view>
	    </view>
	    <button class="confirm-btn" @click="reguser">注册</button>
	  </view>
	  <view class="register-section">
		<div class="inline-block">游客登陆</div>
		<div class="inline-block" @click="goLogin">返回登陆页面</div>
	  </view>
	</view>
</template>

<script>
	import {reguser} from '../../api/serverAPI/user'
	export default {
		data() {
			return {
				pwd: '',
				username: '',
			}
		},
		methods: {
			goLogin(){
				wx.redirectTo({
					url: '../login/login',
				})
			},
			reguser() {
				let {pwd, username} = this
				if (!username) {
					wx.showToast({
						title: '请输入用户名',
						icon: 'none'
					})
					return
				}else if(!pwd) {
					wx.showToast({
						title: '请输入密码',
						icon: 'none'
					})
					return
				}else{
					let params = {}
					params = {
						username,
						password: pwd,
					}
					reguser(params).then(res => {
						if(res.status === 1) {
							wx.showToast({
								title: res.message,
								icon: 'none'
							})
						} else if(res.status === 0){
							wx.showToast({
								title: res.message,
								icon: 'none'
							})
							wx.setStorage({
								data: res.profile.insertId,
								key: 'userId',
							})
							wx.redirectTo({
								url: '../userInfo/userInfo',
							})
							console.log('注册成功！');
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
  width: 100%;
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
