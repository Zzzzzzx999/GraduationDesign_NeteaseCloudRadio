<template>
  <div class="home-my">
    <div class="myInfo" @click="changePath('./myPage?userInfo='+JSON.stringify(userInfo)+'&level='+level)">
      <div class="headSculpture">
        <div class="userHeadSculpture">
          <image
            lazy-load
            :src="
              isLogin
                ? userInfo.user_pic
                : '../static/icon/homeIcon/未登录-头像.png'
            "
          ></image>
        </div>
      </div>
      <div class="infoDetail">
        <div class="infoDetailTop">
          <div class="name">
            <span>{{ userInfo.nickname }}</span>
            <div class="grade">
              <span>LV{{ level }}</span>
            </div>
          </div>
          <div class="recording" @tap.stop>
            <image lazy-load src="../static/icon/麦克风.png"></image>
            <span>录制</span>
          </div>
        </div>
        <div class="infoDetailBottom">
          <div class="works bottomItem">
            <span>{{ userInfo.works }}</span>
            <span class="infoType">作品</span>
          </div>
          <div class="follow bottomItem">
            <span>{{ userInfo.follows }}</span>
            <span class="infoType">关注</span>
          </div>
          <div class="fans bottomItem">
            <span>{{ userInfo.followeds }}</span>
            <span class="infoType">粉丝</span>
          </div>
        </div>
      </div>
    </div>
    <div class="functionalDomain">
      <div class="areasMy">
        <div
          class="functionalItem"
          @tap.stop="changePath('./recentlyListened')"
        >
          <div class="functionalItemLeft">
            <image
              lazy-load
              src="../static/icon/homeIcon/time_fill.png"
            ></image>
            <span>最近收听</span>
          </div>
          <div class="functionalItemRight">
            <image
              lazy-load
              class="rightArrow"
              src="../static/icon/homeIcon/右箭头.png"
            ></image>
          </div>
        </div>
        <div class="functionalItem" @tap.stop="changePath('./myDownloads')">
          <div class="functionalItemLeft">
            <image
              lazy-load
              src="../static/icon/homeIcon/square_check_fill.png"
            ></image>
            <span>我的下载</span>
          </div>
          <div class="functionalItemRight">
            <image
              lazy-load
              class="rightArrow"
              src="../static/icon/homeIcon/右箭头.png"
            ></image>
          </div>
        </div>
        <!-- <div class="functionalItem" @tap.stop="changePath('./myCollection')">
          <div class="functionalItemLeft">
            <image
              lazy-load
              src="../static/icon/homeIcon/favor_fill_light.png"
            ></image>
            <span>我的收藏</span>
          </div>
          <div class="functionalItemRight">
            <image
              lazy-load
              class="rightArrow"
              src="../static/icon/homeIcon/右箭头.png"
            ></image>
          </div>
        </div> -->
        <div
          class="functionalItem"
          @tap.stop="changePath('./today-Best?ids=' + '1')"
        >
          <div class="functionalItemLeft">
            <image
              lazy-load
              src="../static/icon/homeIcon/home_fill.png"
            ></image>
            <span>今日优选电台</span>
          </div>
          <div class="functionalItemRight">
            <image
              lazy-load
              class="rightArrow"
              src="../static/icon/homeIcon/右箭头.png"
            ></image>
          </div>
        </div>
        <div
          class="functionalItem"
          @tap.stop="changePath('./today-Best?ids=' + '2')"
        >
          <div class="functionalItemLeft">
            <image
              lazy-load
              src="../static/icon/homeIcon/cart_fill.png"
            ></image>
            <span>个性电台</span>
          </div>
          <div class="functionalItemRight">
            <image
              lazy-load
              class="rightArrow"
              src="../static/icon/homeIcon/右箭头.png"
            ></image>
          </div>
        </div>
        <div class="functionalItem" @tap.stop="changePath('./myWallet')">
          <div class="functionalItemLeft">
            <image
              lazy-load
              src="../static/icon/homeIcon/money_bag_fill.png"
            ></image>
            <span>我的钱包</span>
          </div>
          <div class="functionalItemRight">
            <image
              lazy-load
              class="rightArrow"
              src="../static/icon/homeIcon/右箭头.png"
            ></image>
          </div>
        </div>
      </div>
      <!-- <div class="areasCentre">
        <div class="functionalItem">
          <div class="functionalItemLeft">
            <image
              lazy-load
              src="../static/icon/homeIcon/home_fill.png"
            ></image>
            <span>活动中心</span>
          </div>
          <div class="functionalItemRight">
            <image
              lazy-load
              class="rightArrow"
              src="../static/icon/homeIcon/右箭头.png"
            ></image>
          </div>
        </div>
        <div class="functionalItem">
          <div class="functionalItemLeft">
            <image
              lazy-load
              src="../static/icon/homeIcon/comment_fill.png"
            ></image>
            <span>消息中心</span>
          </div>
          <div class="functionalItemRight">
            <image
              lazy-load
              class="rightArrow"
              src="../static/icon/homeIcon/右箭头.png"
            ></image>
          </div>
        </div>
      </div> -->
      <div class="areasListen">
        <div
          class="functionalItem"
          @tap.stop="changePath('./runningListening')"
        >
          <div class="functionalItemLeft">
            <image
              lazy-load
              src="../static/icon/homeIcon/activity_fill.png"
            ></image>
            <span>跑步听</span>
          </div>
          <div class="functionalItemRight">
            <image
              lazy-load
              class="rightArrow"
              src="../static/icon/homeIcon/右箭头.png"
            ></image>
          </div>
        </div>
        <div class="functionalItem">
          <div class="functionalItemLeft">
            <image lazy-load src="../static/icon/homeIcon/Wifi.png"></image>
            <span>免流量收听</span>
          </div>
          <div class="functionalItemRight">
            <span>未开通</span>
            <image
              lazy-load
              class="rightArrow"
              src="../static/icon/homeIcon/右箭头.png"
            ></image>
          </div>
        </div>
        <div class="functionalItem" @tap.stop="changePath('./setting')">
          <div class="functionalItemLeft">
            <image
              lazy-load
              src="../static/icon/homeIcon/selection_fill.png"
            ></image>
            <span>设置</span>
          </div>
          <div class="functionalItemRight">
            <image
              lazy-load
              class="rightArrow"
              src="../static/icon/homeIcon/右箭头.png"
            ></image>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "home-my",
  props: ["userInfo", "level"],
  data() {
    return {
      isLogin:true,
    };
  },
  methods: {
    changePath(path) {
      wx.navigateTo({ url: path });
    },
  },
  mounted() {
    /* let userInfo = wx.getStorageSync('userDetail');
    // this.userInfo = JSON.parse(userInfo);
    console.log('userDetail',userInfo); */
  },
  
};
</script>

<style lang="less">
.home-my {
  height: 100%;
  overflow: scroll;
  .myInfo {
    padding: 0 30rpx;
    height: 250rpx;
    width: 100vw;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    .headSculpture {
      width: 25%;
      height: 150rpx;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .userHeadSculpture {
        position: relative;
        image {
          height: 125rpx;
          width: 125rpx;
          border-radius: 50%;
          z-index: 1;
        }
        #wechat {
          height: 33rpx;
          width: 33rpx;
          position: absolute;
          bottom: 5rpx;
          right: 0rpx;
          z-index: 2;
        }
      }
    }
    .infoDetail {
      width: 75%;
      height: 150rpx;
      display: flex;
      flex-flow: column nowrap;
      justify-content: space-between;
      .infoDetailTop {
        height: 45%;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .name {
          height: 50rpx;
          font-size: 35rpx;
          font-weight: 400;
          position: relative;
          .grade {
            width: 40rpx;
            height: 16rpx;
            font-size: 15rpx;
            font-weight: 600;
            position: absolute;
            top: 10rpx;
            right: -50rpx;
            background-color: #d3ab58;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
        .recording {
          width: 125rpx;
          height: 40rpx;
          border: 3rpx solid #d3ab58;
          border-radius: 70rpx;
          display: flex;
          justify-content: center;
          align-items: center;
          image {
            height: 30rpx;
            width: 30rpx;
            padding-right: 10rpx;
          }
          span {
            color: #d3ab58;
            font-size: 25rpx;
          }
        }
      }
      .infoDetailBottom {
        height: 55%;
        display: flex;
        justify-content: space-between;
        .bottomItem {
          width: 33%;
          display: flex;
          flex-flow: column nowrap;
          font-weight: 600;
          font-size: 30rpx;
          .infoType {
            font-size: 24rpx;
            font-weight: 400;
            color: gray;
          }
        }
      }
    }
  }
  .functionalDomain {
    padding: 0 30rpx;
    box-sizing: border-box;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    .areasMy {
      display: flex;
      flex-flow: column nowrap;
      width: 100%;
      border-bottom: 1rpx solid #f0f0f0;
      padding-bottom: 35rpx;
    }
    .areasCentre {
      display: flex;
      flex-flow: column nowrap;
      width: 100%;
      border-bottom: 1rpx solid #f0f0f0;
      padding: 35rpx 0;
    }
    .areasListen {
      display: flex;
      flex-flow: column nowrap;
      width: 100%;
      padding: 35rpx 0;
    }
    .functionalItem {
      height: 75rpx;
      width: 100%;
      display: flex;
      align-items: center;
      .functionalItemLeft {
        width: 50%;
        height: 100%;
        display: flex;
        align-items: center;
        image {
          width: 40rpx;
          height: 40rpx;
          min-width: 40rpx;
          min-height: 40rpx;
          margin-right: 36rpx;
        }
        span {
          font-size: 30rpx;
        }
      }
      .functionalItemRight {
        width: 50%;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        span {
          color: #c0bfbf;
          font-size: 27rpx;
          padding: 0 10rpx;
        }
        .rightArrow {
          width: 25rpx;
          height: 25rpx;
        }
      }
    }
  }
}
</style>