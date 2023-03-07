<template>
  <scroll-view class="list-content" :class="isShow?'showPaddingBottom':''" scroll-y>
    <block v-for="(item,index) in playList" :key="item.id" >
      <view class="programs" :data-id="item.id" :data-index="index" @tap.stop="goPlayPage">
        <view class="programLeft">
          <image mode="aspectFill" :src="item.picUrl"></image>
        </view>
        <view class="programRight">
          <view class="programTitle">
            <view class="boutique">
              <span class="titleBorder" v-if="item.category">{{item.category}}</span>
              <span class="nameItem">{{item.name}}</span>
            </view>
          </view>
          <view class="programContent">
            <span v-if="item.desc">{{item.desc}}</span>
            <span v-else-if="item.rcmdtext">{{item.rcmdtext}}</span>
            <span v-else>作者暂无相关描述...</span>
          </view>
          <view class="programContent">
            <span v-if="item.dj && item.dj.nickname">by {{item.dj.nickname}}</span>
            <span v-if="item.dj && item.dj.signature"> -- {{item.dj.signature}}</span>
          </view>
        </view>
      </view>
    </block>
  </scroll-view>
</template>

<script>
const app = getApp()
import {getProgram} from "../api/djprogram";
export default {
  data() {
    return {
      isShow:false,
    }
  },
  props: {
    playList: {
      type: Array,
      value: [],
    },
  },
  mounted() {
    this.isShow = app.globalData.showAudio
  },
  methods: {
    pageScroll(e){
        var scrollTop = e.detail.scrollTop
        console.log('滑动距离'+scrollTop);
    },
    goPlayPage(e){
      this.isShow = true
      console.log('eee',e);
      app.globalData.idDJ = e.currentTarget.dataset.id
      //等待接口响应后处理函数 这里的id要处理 
      getProgram(e.currentTarget.dataset.id).then(res=>{
          let data = res.programs.map(item => item.mainSong);
          app.globalData.index = 0
          app.addSong(data[0].id)
          app.addDJ(this.playList)
          app.playList(data)
          let id = data[0].id
          if (!app.globalData.isSameDJ) {
            app.globalData.id = data[0].id
            console.log('333');
          }else{
            app.globalData.id = data[app.globalData.index].id
            id = data[app.globalData.index].id
            console.log('555');
          }
          console.log('传过去的id',id);
          uni.navigateTo({
              url: '/pages/song-play/song-play?id=' + id,
          })
      })
    },
  },
};
</script>

<style lang="less">
.list-content{
    height: calc(100%-70rpx);
    overflow: scroll;
    margin-bottom: 50rpx;
    .programs{
        display: flex;
        align-items: center;
        margin: 20rpx 40rpx;
        .programLeft{
            width: 29%;
            image{
                height: 180rpx;
                width: 180rpx;
                border-radius: 15rpx;
            }
        }
        .programRight{
            height: 180rpx;
            width: 71%;
            margin-left: 30rpx;
            display: flex;
            flex-flow: column nowrap;
            justify-content: space-around;
            .programTitle{
                display: flex;
                flex-flow: row wrap;
                align-items: flex-start;
                .boutique{
                    font-size: 28rpx;
                    color: black;
                    font-weight: 300;
                }
                .programName{
                    margin-left: 20rpx;
                    font-size: 35rpx;
                    font-weight: 500;
                }
                .titleBorder{
                    font-size: 24rpx;
                    color: black;
                    border: 3rpx solid black;
                    border-radius: 8rpx;
                    font-weight: 300;
                    padding: 0 6rpx;
                }
                .nameItem{
                    margin-left: 20rpx;
                    font-size: 30rpx;
                    font-weight: 600;
                }
                .empty{
                    margin-left: 100rpx;
                    color: #D3AB58;
                    border: 1rpx solid #a78034;
                    border-radius: 10rpx;
                    padding: 5rpx 10rpx;
                    font-size: 28rpx;
                }
            }
            .programContent{
                font-size: 25rpx;
                color: grey;
                overflow: hidden;
                white-space: wrap;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
            }
            .programDetail{
                color: grey;
                font-size: 25rpx;
            }
        }
        .programsHeader{
            margin-bottom: 40rpx;
        }
    }
}
.showPaddingBottom{
  padding-bottom: 150rpx;
}
</style>
