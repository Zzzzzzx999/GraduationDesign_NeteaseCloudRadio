<template>
    <scroll-view class="myTodayBest" scroll-y @scroll="pageScroll">
        <banner :banners="banners"></banner>
        <tab-bar :navId="navId" :navList="navList" @changeNavId="changeNav" :class="isFixed?'fixed':''"/>
	    <play-list :playList="playList"/>
    </scroll-view>
</template>

<script>

import {getProgramList,getNewRadioList,getProgram,getHotRadioList,getPaidBoutique,getDjBannerData} from "../service/djprogram";
import tabBar from 'components/boutique-nav-tabbar'
import playList from 'components/boutique-play-list'
import banner from 'components/boutique-banner'
const app = getApp()

export default {
    name:"home-boutique",
    components:{tabBar, playList,banner},
	data() {
		return {
            params: {
                limit: 1,
                before: '',
                tag: '',
                id: ''
            },
            navId:'1',
            navList: [{
                id:1,
                name:'热门电台',
            },{
                id:2,
                name:'电台 - 节目榜',
            },{
                id:3,
                name:'电台 - 主播新人榜',
            },{
                id:4,
                name:'电台 - 热门电台榜',
            },{
                id:5,
                name:'电台 - 付费精品',
            },
            ],
            playList: [],
            banners:[],
            isFixed:false,

			collectRadioStations: 'true',
            programListDT:[],
            dailySongs:[],
            id:'',
		};
	},
    created() {
		this._getHotRadioList()
        this._getDjBannerData()
    },
    methods: {
        pageScroll(e){
            var scrollTop = e.detail.scrollTop
            if (scrollTop>150) {
                this.isFixed = true
            }else{
                this.isFixed = false
            }
            // console.log('滑动距离'+scrollTop);
        },
        _getDjBannerData() {
            getDjBannerData().then(res => {
                this.banners = res.data
                console.log('banners',res);
            })
        },
        _getHotRadioList(type){
            getHotRadioList(type).then(res=>{
                console.log('getHotRadioList...',res);
                this.playList = res.djRadios
                app.currentDT = this.playList
                // this.playList = this.playList.map(item => item.program.radio)
                console.log('getHotRadioList...',this.playList);
            })
        },
        _getProgramList(){
            getProgramList().then(res=>{
                this.playList = res.toplist
                app.currentDT = this.playList
				this.playList = this.playList.map(item => item.program.radio)
                console.log('playList...',this.playList);
            })
        },
        _getNewRadioList(type){
            getNewRadioList(type).then(res=>{
                console.log('getNewRadioList...',res);
                this.playList = res.toplist
                app.currentDT = this.playList
				// this.playList = this.playList.map(item => item.program.radio)
                console.log('getNewRadioList...',this.playList);
            })
        },
        _getPaidBoutique(type){
            getPaidBoutique(type).then(res=>{
                console.log('getPaidBoutique...',res);
                this.playList = res.data.list
                app.currentDT = this.playList
				// this.playList = this.playList.map(item => item.program.radio)
                console.log('getPaidBoutique...',this.playList);
            })
        },
        goPlayPage(e,rid){
            //等待接口响应后处理函数 这里的id要处理 
            this.id = getProgram(e.currentTarget.dataset.id).then(res=>{
                let data = res.programs.map(item => item.mainSong);
                console.log('mainSongdatadata',data);
                app.globalData.index = 0
                app.addSong(data[0].id)
                app.playList(data)
                uni.navigateTo({
                    url: '/pages/song-play/song-play?id=' + data[0].id,
                })
            })
        },





        _getPlayList(id) {
            if (id == '1'){
                this.navId == '1'
                this._getHotRadioList()
            }else if (id == '2') {
                this.navId == '2'
                this._getProgramList()
            }else if (id == '3') {
                this.navId == '3'
                this._getNewRadioList('new')
            }else if (id == '4') {
                this.navId == '4'
                this._getNewRadioList('hot')
            }else if (id == '5') {
                this.navId == '5'
                this._getPaidBoutique()
            }
        },
        changeNav(e) {
            this.navId = e.navId
            this._getPlayList(e.navId)
            console.log('e',e);
        },
    },
    
}
</script>

<style lang="less" scoped>
.myTodayBest{
    height: 100%;
	width: 100vw;
    position: relative;
}
tab-bar{
	padding-top: 10rpx;
}
.fixed{
    height: 80rpx;
    background-color: white;
    position: fixed;
    top: 70rpx;
    left: 0;
    z-index: 666;
}
</style>