<template>
	<swiper indicator-dots='true' 
	        indicator-active-color='#d43c33'
	        autoplay='true'
	        circular='true'
	        interval='3000'
	        class='swiper'>
	  <block v-for="(item,index) in banners" :key="index">
	    <swiper-item class="swiper-item">
	      <image :src="item.pic" class="swiper-image" mode='widthFix'></image>
	    </swiper-item>
	  </block>
	</swiper>
</template>

<script>
	export default {
		props: {
			banners: {
				type: Array,
				value: []
			}
		},
	}
</script>

<style>
.swiper {
  height: 280rpx;
  margin-bottom: 30rpx;
}
.swiper-item{
  display: flex;
  justify-content: center;
}
.swiper-image {
  width: 95%;
  border-radius: 20rpx;
}
</style>
