<template>
  <scroll-view
    class="container"
    :class="isFixed?'fixed':''"
    scroll-x
    :scroll-into-view="'scroll' + navId"
    scroll-with-animation
  >
    <view
      :id="'scroll' + item.id"
      v-for="(item, index) in navList"
      :key="item.id"
      class="nav-text"
      :class="{ selected: item.id == navId }"
    >
      <view :id="item.id" :data-index="index" @tap="chooseNav">{{item.name}}</view>
    </view>
  </scroll-view>
</template>

<script>
export default {
  props: {
    navList: {
      type: Array,
      value: [],
    },
    navId: {
      type: String,
      value: "",
    },
    isFixed: {
      type: Boolean,
      value: false,
    },
  },
  methods: {
    chooseNav(e) {
      this.$emit("changeNavId", {
        navId: e.currentTarget.id,
        index: e.currentTarget.dataset.index,
      });
	  console.log('e',e);
    },
  },
};
</script>

<style>
.container {
  height: 50rpx;
  padding: 0 20rpx;
  box-sizing: border-box;
  overflow: hidden;
  white-space: nowrap;
  /* margin-top: 110rpx; */
}

.nav-text {
  padding: 0 30rpx;
  font-size: 30rpx;
  color: #333;
  line-height: 46rpx;
  display: inline-block;
}

.selected {
  color: #fff;
  background-color: rgba(255, 51, 0, 0.5);
  border-radius: 14rpx;
}
.fixed{
  height: 80rpx;
  background-color: white;
  position: fixed;
  top: 70rpx;
  left: 0;
  line-height: 80rpx;
  z-index: 666;
}
</style>
