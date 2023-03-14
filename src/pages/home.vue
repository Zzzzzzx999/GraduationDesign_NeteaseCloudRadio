<template>
    <view class="home">
        <view class="top">
            <view class="search top-image" @click="changePath('./search/search')">
                <image lazy-load src="../static/icon/search.png"></image>
            </view>
            <view class="regions">
                <span v-for="r in regions" :key="r.id" :class="r.select?'select':''" @click="regionsChange(r.id)">
                    {{r.title}}
                </span>
            </view>
            <view class="history top-image">
                <image lazy-load src="../static/icon/countdown.png" @click="changePath('./recentlyListened')"></image>
            </view>
        </view>
        <view class="content" :style="showAudio?'margin-bottom:200rpx;':''">
            <boutique v-if="regions[0].select"></boutique>
            <classification v-else-if="regions[1].select"></classification>
            <my v-else :userInfo=userInfo :level=level></my>
        </view>
        <player class="audio" v-if="showAudio" :key="timer"></player>
    </view>
</template>

<script>
import {login} from '../api/serverAPI/user'
import pubsub from 'pubsub-js'
import player from "../components/common-player.vue";
import {getLevel} from "../api/home";
import {my} from '../components/home-my.vue'
import {boutique} from '../components/home-boutique.vue'
import {classification} from '../components/home-classification.vue'
const app = getApp()
export default {
    name:'home',
    components:{my,boutique,classification,player},
    data() {
        return {
            showAudio: false,
            loginWay:'',
            works:'0', //作品
            regions:[
                {id:1,title:'精品',select:true},
                {id:2,title:'分类',select:false},
                {id:3,title:'我的',select:false},
            ],
            level:{},
            timer:'',
        }
    },
    onShow() {
        if(app.globalData.id && app.globalData.playList.length > 0) {
            this.showAudio = true
            app.globalData.showAudio = this.showAudio
        }    
    },    
    onLoad(query){
        console.log('1',query);
        if (query) {
            this.loginWay=wx.getStorageSync('loginWay')
        }
        this.getUserInfo()
    },
    mounted() {
        this.pubId=pubsub.subscribe('hello',(msgName,data)=>{
            console.log('有人发布了hello消息,hello消息的回调执行了',msgName,data);
            this.timer = new Date().getTime()
            console.log('this.timer',this.timer);
        })
        /* wx.request({
            method: 'GET',
            url: 'http://127.0.0.1:3000/my/userinfo',
            data:{
                username:'zhou',
                password:'123456',
                id:1,
            },
            success: function (res) {
                console.log('数据获取成功',res);
            },
            fail: function () {
                console.log("获取失败");
            }
        }) */
        let params={
            username:'admin1',
            password:'123456'
        }
        login(params).then(res=>{
            console.log('登录',res);
            uni.setStorageSync('token',res.token)
        })
    },
    methods: {
        regionsChange(id){
            for (let index = 0; index < this.regions.length; index++) {
                this.regions[index].select = false
            }
            for (let index = 0; index < this.regions.length; index++) {
                if (this.regions[index].id == id) {
                    this.regions[index].select = true
                }
            }
        },
        getUserInfo(){
            let userInfo = wx.getStorageSync('userDetail')
            this.userInfo = userInfo
            /* let userInfo = wx.getStorageSync('userInfo')
            if(userInfo) {
                this.userInfo = JSON.parse(userInfo)
                console.log(this.userInfo,'userInfo');
                this.uid = this.userInfo.userId
                this._getLevel()
            } */
        },
        changePath(path){
            wx.navigateTo({url:path})
        },
        _getLevel() {
            getLevel().then(res => {
                this.level = res.data
                wx.setStorage({
                    data: this.level,
                    key: 'level',
                })
            })
        },
    },
    beforeDestroy() {
        pubsub.unsubscribe(this.pubId)
    },
}
</script>

<style lang="less">
.home{
    background-color: #F9F9F9;
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-flow: column nowrap;
    .top{
        height: 75rpx;
        width: 100vw;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
        .top-image{
            height: 75rpx;
            width: 80rpx;
            display: flex;
            align-items: center;
            image{
                height: 40rpx;
                width: 40rpx;
                min-height: 40rpx;
                min-width: 40rpx;
            }
        }
        .regions{
            height: 100%;
            flex-grow: 1;
            padding: 10rpx 100rpx;
            display: flex;
            justify-content: space-around;
            align-items: center;
            font-size: 32rpx;
            font-weight: 500;
            color: rgba(77, 76, 76, 0.705);
            .select{
                color: black;
            }
        }
        .search{
            padding-left: 30rpx;
        }
        .history{
            padding-right: 30rpx;
            justify-content: flex-end;
        }
    }
    .content{
        flex-grow: 1;
        overflow: scroll;
    }
    .wx-slider-thumb {
        display: none;
    }
}
</style>