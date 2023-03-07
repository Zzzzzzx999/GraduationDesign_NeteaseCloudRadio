<template>
    <div class="search">
        <div class="top">
            <div class="searchInput">
                <input type="text" v-model.trim="searchValue" @confirm="beginSearch" @input="input" placeholder="搜索节目/音乐/主播/广播">
                <image v-if="searchValue!=''" src="../static//icon/取消.png" @click="searchValue=''"></image>
            </div>
            <span @click="backPath('../pages/home')">取消</span>
        </div>
        <div class="content" v-if="show == '0'">
            <div class="title">
                <span>热门搜索:</span>
            </div>
            <ul>
                <li v-for="(word,index) in hotWords" :key="index" :class="index<3?'active':''">
                    <span @click="searchThis(word.searchWord)">{{word.searchWord}}</span>
                </li>
            </ul>
        </div>
        <view class="search-list" v-else-if="show == '1'">
            <block v-for="(item,index) in searchSuggest" :key="index">
            <view :data-name="item.keyword" class="list-item" @click="searchThis(item.keyword)">
                <text class="iconfont icon-sousuo"></text>
                {{item.keyword}}
            </view>
            </block>
        </view>

        <div class="searchResult">
            
        </div>
    </div>
</template>

<script>
import {searchRecord,searchSuggest,search} from '../../api/home'
export default {
    name:"search",
    data() {
        return {
            hotWord:['哈妮克孜','草根升官记','热血传奇','盗墓笔记','张云雷','爱情公寓',
            '单田芳','巴啦啦小魔仙','郭德纲','法医秦明','三体','最强打脸系统'],
            /* hotWords:[
                {id:1,name:'哈妮克孜'},
                {id:2,name:'草根升官记'},
                {id:3,name:'热血传奇'},
                {id:4,name:'盗墓笔记'},
                {id:5,name:'张云雷'},
                {id:6,name:'爱情公寓'},
                {id:7,name:'单田芳'},
                {id:8,name:'巴啦啦小魔仙'},
                {id:9,name:'郭德纲'},
                {id:10,name:'法医秦明'},
                {id:11,name:'三体'},
                {id:12,name:'最强打脸系统'},
            ], */
            hotWords: [],
            searchSuggest: [],
            searchValue:'',
            show:'0',
        }
    },
    onLoad() {
        this._searchRecord()
    },
    methods: {
        changePath(path){
            wx.redirectTo({url:path})
        },
        backPath(path){
            wx.navigateBack({url:path})
        },
        beginSearch(){
            console.log(123);
            wx.setStorageSync('inputValue',this.searchValue)
            wx.navigateTo({url:'../searchResult?keyword='+this.searchValue})
        },
        searchThis(keyword){
            this.searchValue = keyword
            wx.navigateTo({url:"../searchResult?keyword="+this.searchValue})
        },




        _searchRecord() {
            searchRecord().then(res => {
                this.hotWords = res.data
            })
        },
        input(e) {
            let value = e.detail.value
            if(value) {
                searchSuggest(value).then(res => {
                    this.searchSuggest = res.result.allMatch
                    this.show = '1'
                })
            } else {
                this.show = '0'
            }
        },
        search(e) {
            let value = e.detail.value
            search(value).then(res => {
                this.searchInfo = res.result.songs
                // this.show = '2'
            })
        },
    },
}
</script>

<style lang="less">
.search{
    height: 100vh;
    width: 100vw;
    .top{
        height: 60rpx;
        display: flex;
        align-items: center;
        margin:20rpx 0 20rpx 40rpx;
        .searchInput{
            height: 100%;
            flex-grow: 1;
            display: flex;
            align-items: center;
            padding: 0 30rpx;
            background-color: #eeeeee;
            border-radius: 30rpx;
            input{
                flex: 1;
                height: 100%;
                font-size: 28rpx;
            }
            image{
                height: 40rpx;
                width: 40rpx;
                min-width: 40rpx;
                min-height: 40rpx;
            }
        }
        span{
            height: 100%;
            padding: 0 30rpx;
            color: gray;
            font-size: 32rpx;
            font-weight: 500;
            line-height: 60rpx;
        }
    }
    .content{
        margin: 40rpx;
        .title{
            font-size: 30rpx;
            color: rgba(87, 86, 86, 0.966);
        }
        ul{
            display: flex;
            flex-flow: row wrap;
            font-weight: 500;
            margin: 10rpx 0;
            li{
                margin: 15rpx 20rpx 5rpx 0;
                padding: 10rpx 20rpx;
                background-color: #f5efe4;
                border-radius: 40rpx;
                font-size: 25rpx;
            }
            .active{
                margin: 15rpx 20rpx 10rpx 0;
                padding: 10rpx 20rpx;
                background-color: #d1a64f;
                border-radius: 40rpx;
                font-size: 25rpx;
                color: white;
            }
        }
       
    }
    .search-list{
        padding: 20rpx 40rpx;
        .list-item {
            height: 80rpx;
            color: #5c5c5c;
        }
    }
}
</style>