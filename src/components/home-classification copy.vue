<template>
    <div class="content">
        <tab-bar :navId="params.id" :navList="navList" @changeNavId="changeNav"/>
        <play-list :playList="playList"/>
    </div>
</template>

<script>
    import {getNavList, getPlayList} from "../api/songs"
    import tabBar from '../components/classification-nav-tabbar'
    import playList from '../components/classification-play-list'
    export default {
        name:'home-classification',
        components:{tabBar, playList},
		data() {
			return {
				params: {
					limit: 1,
					before: '',
					tag: '',
					id: ''
				},
				navList: [],
				playList: []
			}
		},
		created() {
			this._getNavList()
		},
		methods: {
			_getNavList() {
				getNavList().then(res => {
					this.navList = res.tags.slice(0, 9),
					this.params = {
						limit: 1,
						before: 0,
						tag: res.tags[0].name,
						id: res.tags[0].id
					}
					this._getPlayList(this.params)
				})
			},
			_getPlayList(params) {
				getPlayList(params).then(res => {
					this.playList = res.playlists
				})
			},
			changeNav(e) {
				let params = {
					limit: 1,
					before: '',
					tag: this.navList[e.index].name,
					id: this.navList[e.index].id
				}
				this._getPlayList(params)
				this.params = params
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
tab-bar{
	padding-top: 50rpx;
}
</style>