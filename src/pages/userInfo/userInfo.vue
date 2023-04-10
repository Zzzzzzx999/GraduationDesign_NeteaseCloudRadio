<template>
  <view class="container">
    <view class="wrapper">
      <view class="left-top-sign">LOGIN</view>
      <view class="welcome"> 完善信息！ </view>
      <button
        class="avatar-wrapper"
        open-type="chooseAvatar"
        @chooseavatar="onChooseAvatar"
      >
        <image class="avatar" :src="user_pic"></image>
      </button>
      <view class="input-content">
        <view class="input-item">
          <label for="nickname">
            <text class="tit">昵称</text>
            <input v-model="nickname" type="text" placeholder="请输入昵称" />
          </label>
        </view>
        <view class="input-item">
          <label for="email">
            <text class="tit">邮箱</text>
            <input v-model="email" type="text" placeholder="请输入邮箱" />
          </label>
        </view>
        <view class="input-item">
          <label for="signature">
            <text class="tit">个性签名</text>
            <input name="signature" v-model="signature" type="text" placeholder="请输入个性签名" />
          </label>
        </view>
      </view>
      <button class="confirm-btn" @click="updateUserInfo">提交</button>
    </view>
  </view>
</template>

<script>
const defaultAvatarUrl = "https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0";
import { updateUserinfo,getUserinfo } from "../../api/serverAPI/userInfo";
export default {
  data() {
    return {
      user_pic: defaultAvatarUrl,
      nickname: "",
      userId: "",
      email:'', 
      signature:'',
    };
  },
  methods: {
    updateUserInfo() {
      let { user_pic, nickname, userId,email,signature } = this;
      if (!signature) {
        signature = '暂无介绍'
      }
      if (!user_pic) {
        wx.showToast({
          title: "选个帅气的头像吧！",
          icon: "none",
        });
        return;
      } else if (!nickname) {
        wx.showToast({
          title: "起个帅气的名字先！",
          icon: "none",
        });
        return;
      } else if (!email) {
        wx.showToast({
          title: "什么邮箱都行噢！",
          icon: "none",
        });
        return;
      }else {
        let params = {};
        params = {
          id: userId,
          user_pic,
          nickname: nickname,
          email,
          signature
        };
        console.log("1", params);
        // params = JSON.stringify(params);
        updateUserinfo(params).then((res) => {
          if (res.status === 1) {
            wx.showToast({
              title: res.message,
              icon: "none",
            });
          } else if (res.status === 0) {
            wx.showToast({
              title: "更新信息成功！",
              icon: "none",
            });
            //查询用户信息
            console.log('userId',userId);
            getUserinfo(userId).then((res=>{
              wx.setStorage({
                data: res.profile[0],
                key: 'userDetail',
              })
            }))
            wx.redirectTo({
              url: "../home",
            });
            console.log("登录成功！");
          } else {
            if (res.message) {
              wx.showToast({
                title: res.message,
                icon: "none",
              });
            } else {
              wx.showToast({
                title: "未知错误！",
                icon: "none",
              });
            }
          }
        });
      }
    },
    onChooseAvatar(e) {
      console.log(e.detail);
      this.user_pic = e.detail.avatarUrl;
      this.convertFileToBase64(this.user_pic).then(data=>{
        this.user_pic = data
      });
    },
    formSubmit(e) {
      console.log("昵称：", e.detail.value.nickname);
    },
    convertFileToBase64(filePath) {
      return new Promise((resolve, reject) => {
        wx.getFileSystemManager().readFile({
          filePath: filePath,
          encoding: 'base64',
          success: (res) => {
            const base64String = `data:image/png;base64,${res.data}`;
            resolve(base64String);
          },
          fail: (error) => {
            reject(error);
          },
        });
      });
    },
  },
  mounted() {
    this.userId = wx.getStorageSync("userId");
  },
};
</script>

<style>
/* pages/login/login.wxss */
.wrapper {
  position: relative;
  z-index: 90;
  padding-bottom: 40rpx;
  width: 100vw;
}

.left-top-sign {
  font-size: 120rpx;
  color: #f8f8f8;
  position: relative;
  left: -16rpx;
}

.welcome {
  position: relative;
  left: 50rpx;
  top: -90rpx;
  font-size: 46rpx;
  color: #555;
}

.input-content {
  padding: 0 60rpx;
}
.input-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 0 30rpx;
  background: #f8f6fc;
  height: 120rpx;
  border-radius: 4px;
  margin-bottom: 50rpx;
}

.input-item:last-child {
  margin-bottom: 0;
}
.input-item .tit {
  height: 50rpx;
  line-height: 56rpx;
  font-size: 30rpx;
  color: #606266;
}
.input-item input {
  height: 60rpx;
  font-size: 30rpx;
  color: #303133;
  width: 100%;
}
.confirm-btn {
  width: 630rpx !important;
  height: 76rpx;
  line-height: 76rpx;
  border-radius: 50rpx;
  margin-top: 70rpx;
  background: #d43c33;
  color: #fff;
  font-size: 32rpx;
  padding: 0;
}
.confirm-btn2:after {
  border-radius: 100px;
}

.forget-section {
  font-size: 28rpx;
  color: #4399fc;
  text-align: center;
  margin-top: 40rpx;
}

.register-section {
  position: absolute;
  left: 0;
  bottom: 50rpx;
  width: 100%;
  font-size: 28rpx;
  color: #606266;
  text-align: center;
}

.avatar-wrapper {
  padding: 0;
  width: 56px !important;
  border-radius: 8px;
  margin-top: 40px;
  margin-bottom: 40px;
  background-color: #fff;
}

.avatar {
  display: block;
  width: 56px;
  height: 56px;
}

.container {
  display: flex;
}
.row {
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  display: flex;
  align-items: center;
  height: 80rpx;
  padding-left: 20rpx;
}
.text1 {
  flex: 2;
}
.weui-input {
  flex: 6;
}
</style>
