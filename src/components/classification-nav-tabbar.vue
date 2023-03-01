<template>
  <scroll-view
    class="container"
    scroll-y
    :scroll-into-view="'scroll' + navId"
    scroll-with-animation
  >
    <view
      :id="'scroll' + item.id"
      v-for="(item, index) in navList"
      :key="item.id"
      class="nav-text"
      :class="{ selected: item.id == navId} "
    >
      <view :id="item.id" :data-index="index" @tap="chooseNav">{{
        item.name
      }}</view>
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
  },
  methods: {
    chooseNav(e) {
      console.log('eeeee',e);
      this.$emit("changeNavId", {
        navId: e.currentTarget.id,
        index: e.currentTarget.dataset.index,
      });
    },
  },
};
</script>

<style>
.container {
  width: 212rpx;
  height: calc(100vh - 250rpx);
  display: flex;
  flex-flow: column;
  align-items: center;
  box-sizing: border-box;
  overflow: hidden;
  padding-left: 20rpx;
  padding-top: 20rpx;
}

.nav-text {
	height: 80rpx;
	width: 177rpx;
  font-size: 30rpx;
  line-height: 80rpx;
  display: inline-block;
  text-align: center;
}

.selected {
  color: #fff;
  background-color: rgba(255, 51, 0, 0.5);
  border-radius: 14rpx;
}

</style>
