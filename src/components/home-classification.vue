<template>
    <div class="content">
        <tab-bar :navId="navId" :navList="navList" @changeNavId="changeNav"/>
        <play-list :playList="playList"/>
    </div>
</template>

<script>
    import {getCatelistDJ, getRecommendTypeDJ} from "../api/djprogram"
    import tabBar from '../components/classification-nav-tabbar'
    import playList from '../components/classification-play-list'
    export default {
        name:'home-classification',
        components:{tabBar, playList},
		data() {
			return {
				navId:'',
				navList: [],
				playList: []
			}
		},
		created() {
			this._getCatelistDJ()
		},
		methods: {
			_getCatelistDJ() {
				getCatelistDJ().then(res => {
					console.log('resres',res);
					// this.navList = res.tags.slice(0, 9),
					this.navList = res.categories
					this.navId = res.categories[0].id
					this._getRecommendTypeDJ(this.navId)
				})
			},
			_getRecommendTypeDJ(params) {
				getRecommendTypeDJ(params).then(res => {
					console.log('@@@',res);
					this.playList = res.djRadios
				})
			},
			changeNav(e) {
				console.log(e,'e');
				this._getRecommendTypeDJ(this.navList[e.index].id)
				this.navId = this.navList[e.index].id
			}
		}
    }
</script>

<style scoped>
.content {
  position: relative;
  width: 100%;
  height: cale(100%-160rpx);
  display: flex;
  flex-flow: row nowrap;
}
</style>