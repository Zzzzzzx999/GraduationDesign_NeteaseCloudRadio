<template>
  <scroll-view class="list-content" scroll-y>
    <block v-for="item in playList" :key="item.id" :data-index="index">
      <view :id="item.id" class="list-item" @tap="goPlayPage">
        <image class="list-img" :src="item.picUrl" mode="widthFix" />
        <view class="desc">{{ item.name }}</view>
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
      id:'',
    }
  },
  props: {
    playList: {
      type: Array,
      value: [],
    },
  },
  methods: {
    goPlayPage(e){
      this.id = e.currentTarget.id
      app.globalData.idDJ = this.id
      // pubsub.publish('hello',666) //emit触发hello事件,发送数据
      getProgram(e.currentTarget.id).then(res=>{
          let data = res.programs.map(item => item.mainSong);
          app.globalData.index = 0
          app.globalData.id = data[0].id
          console.log('app.globalData.id',app.globalData.id);
          app.addSong(data[0].id)
          app.addDJ(this.playList)
          app.playList(data)
          uni.navigateTo({
              url: '/pages/song-play/song-play?id=' + data[0].id,
          })
      })
    },
  },
};
</script>

<style>
.list-content {
  width: 100%;
  height: calc(100vh - 250rpx);
  padding: 20rpx;
  box-sizing: border-box;
  display: flex;
  flex-flow: row wrap;
}
.list-content :after{
	content:".";
	clear:both;
	height:0;
	overflow:hidden;
	display:block;
	visibility:hidden;
}

.list-item {
  display: inline-block;
  height: 23%;
  width: 33.33333%;
  text-align: center;
  padding: 10rpx;
}
.list-img {
  width: 100%;
  border-radius: 10rpx;
}

.desc {
  font-size: 28rpx;
  height: 75rpx;
  text-align: left;
  color: #333;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
