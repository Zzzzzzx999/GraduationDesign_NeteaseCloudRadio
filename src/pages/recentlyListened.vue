<template>
    <div class="recentlyListened">
        <div class="addToSiri">
            <image src="../static/Picture_material/1657979583074.jpg"></image>
            <span>添加“播放最近收听”到Siri</span>
            <image id="right" src="../static/icon/homeIcon/右箭头.png"></image>
        </div>
        <div class="recentPrograms everyoneIsListening">
            <div class="title">
                <span>最近收听的音乐</span>
            </div>
            <view class="scroll-record">
                <block v-for="item in recentPlayList" :key="item.song.id">
                    <view :id="item.song.id" class="scroll-item" @tap="chooseSong">
                        <image lazy-load  class="scroll-img" :src="item.song.al.picUrl"/>
                        <view class="desc">{{item.song.name}}</view>
                    </view>
                </block>
            </view>
        </div>
        <div class="everyoneIsListening">
            <div class="title">
                <span>大家都在听</span>
            </div>
            <!-- <div class="programs">
                <div class="programLeft">
                    <image mode="aspectFill" src="https://bkimg.cdn.bcebos.com/pic/d50735fae6cd7b8915c84450012442a7d8330eb8?x-bce-process=image/watermark,image_d2F0ZXIvYmFpa2U5MzM=,g_7,xp_5,yp_5/format,f_auto"></image>
                </div>
                <div class="programRight">
                    <div class="programTitle">
                        <div class="boutique">
                            <span id="Title">精品</span>
                            <span id="Name">蕊希电台</span>
                        </div>
                    </div>
                    <div class="programContent">
                        <span>更新至:朋友圈三天可见，透露了你的社交观 原 【一个人听】...</span>
                    </div>
                    <div class="programDetail">
                        <span>9.7分 | 播放21.5亿 | 蕊希</span>
                    </div>
                </div>
            </div>
            <div class="programs">
                <div class="programLeft">
                    <image mode="aspectFill" src="https://fm-image-1251316161.file.myqcloud.com/fm/photo/album/rmid_album_360/R/i/003OiE121lHxRi.jpg?time=1555472621"></image>
                </div>
                <div class="programRight">
                    <div class="programTitle">
                        <div class="boutique">
                            <span id="Title">精品</span>
                            <span id="Name">最强打脸系统 (爆笑)</span>
                        </div>
                    </div>
                    <div class="programContent">
                        <span>更新至:第1512章，听谦讲故事，专治不开心！今年的笑点，我承包了，此书逗趣...</span>
                    </div>
                    <div class="programDetail">
                        <span>9.6分 | 播放21.5亿 | 谦儿2016</span>
                    </div>
                </div>
            </div> -->
            <div class="programs" v-for="(item,index) in myTodayBestDT" :key="item.id" :data-id="item.id" :data-index="index" @tap.stop="goPlayPage">
                    <div class="programLeft">
                        <image mode="aspectFill" :src="item.picUrl"></image>
                    </div>
                    <div class="programRight">
                        <div class="programTitle">
                            <div class="boutique">
                                <span id="Title" v-if="item.category">{{item.category}}</span>
                                <span id="Name">{{item.name}}</span>
                            </div>
                        </div>
                        <div class="programContent">
                            <span v-if="item.rcmdText">{{item.rcmdText}}</span>
                            <span v-else>作者暂无相关描述...</span>
                        </div>
                        <!-- <div class="programDetail">
                            <span>侯杨方</span>
                        </div> -->
                    </div>
                </div>
            </div>
        <player class="audio" v-if="showAudio" :key="new Date().getTime()"></player>
    </div>
</template>

<script>
const app = getApp()
import {getTodayPerfered,getProgram} from "../api/djprogram";
import {getRecentPlayList} from '../api/home'
import {getSongDetail} from '../api/songs'
import player from "../components/common-player.vue";
export default {
    name:"recentlyListened",
    components:{player},
    data() {
        return {
            userInfo:{},
            recentPlayList: [], // 用户播放记录
            myTodayBestDT:[], // 推荐电台
            showAudio:false,
        }
    },
    onLoad(){
        let userInfo = wx.getStorageSync('userInfo')
        if(userInfo) {
            this.userInfo = JSON.parse(userInfo)
            this._getRecentPlayList()
        }
        this._getTodayPerfered()
    },
    methods: {
        goPlayPage(e,rid){
            app.globalData.idDJ = e.currentTarget.dataset.id
            //等待接口响应后处理函数 这里的id要处理 
            getProgram(e.currentTarget.dataset.id).then(res=>{
                let data = res.programs.map(item => item.mainSong);
                console.log('mainSongdatadata',data);
                app.globalData.index = 0
                app.addDJ(this.myTodayBestDT)
                app.addSong(data[0].id)
                app.playList(data)
                uni.navigateTo({
                    url: '/pages/song-play/song-play?id=' + data[0].id,
                })
            })
        },
        chooseSong(e) {
            let id = e.currentTarget.id
            app.addSong(id)
            getSongDetail(id).then(res => {
                app.playList(res.songs)
            })
            wx.navigateTo({
                url: '/pages/song-play/song-play?id=' + id,
            })
        },
        _getRecentPlayList() {
            let params = {
                uid: this.userInfo.userId,
                type: 1
            }
            getRecentPlayList(params).then(res => {
                this.recentPlayList = res.weekData
            })
        },
        _getTodayPerfered(){
            getTodayPerfered().then(res=>{
                console.log('电台个性推荐电台列表',res);
                this.myTodayBestDT = res.data
                app.currentDT = this.myTodayBestDT
                console.log('getTodayPerfered...',this.myTodayBestDT);
            })
        },
    },
    onShow() {
        if(app.globalData.id && app.globalData.playList.length > 0) {
            this.showAudio = true
            app.globalData.showAudio = this.showAudio
        }
    },
}
</script>

<style lang="less">
.recentlyListened{
    height: 100%;
    width: 100vw;
    position: relative;
    display: flex;
    flex-flow: column nowrap;
    background-color: whitesmoke;
    overflow: scroll;
    .addToSiri{
        background-color: rgba(255, 255, 255, 0.45);
        height: 100rpx;
        padding: 0 40rpx;
        display: flex;
        align-items: center;
        image{
            width: 55rpx;
            height: 55rpx;
            min-height: 55rpx;
            min-width: 55rpx;
        }
        span{
            padding-left: 40rpx;
            font-size: 32rpx;
            flex-grow: 1;
        }
        #right{
            width: 30rpx;
            height: 30rpx;
            min-height: 30rpx;
            min-width: 30rpx;
        }
    }
    .notRecentPrograms{
        height: 540rpx;
        width: 100vw;
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
        justify-content: center;
        font-size: 28rpx;
        image{
            height: 150rpx;
            width: 150rpx;
        }
        .recent{
            margin: 10rpx 0;
            color: gray;
        }
        .more{
            color: #D3AB58;
        }

    }
    .recentPrograms{
        margin: 40rpx 0;
    }
    .everyoneIsListening{
        margin-bottom: 100rpx;
        .title{
            text-align: center;
            font-size: 38rpx;
            font-weight: 600;
            margin: 25rpx 0 60rpx 0;
        }
    }
    // 节目
    /* .programs{
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
            width: 71%;
            margin-left: 30rpx;
            display: flex;
            flex-flow: column nowrap;
            .programTitle{
                display: flex;
                flex-flow: row wrap;
                align-items: center;
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
                #Title{
                    font-size: 24rpx;
                    color: black;
                    border: 3rpx solid black;
                    border-radius: 8rpx;
                    font-weight: 300;
                    padding: 0 6rpx;
                }
                #Name{
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
                margin: 15rpx 0;
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
    } */
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
                #Title{
                    font-size: 24rpx;
                    color: black;
                    border: 3rpx solid black;
                    border-radius: 8rpx;
                    font-weight: 300;
                    padding: 0 6rpx;
                }
                #Name{
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
                margin: 15rpx 0;
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
    .scroll-record {
        width: 100%;
        height: 390rpx;
        display: flex;
        margin: 20rpx 40rpx;
        overflow: auto;
        .scroll-item {
            width: 270rpx;
            margin-right: 20rpx;
        }
        .scroll-img {
            width: 270rpx;
            height: 270rpx;
            border-radius: 20rpx;
            box-shadow: 10rpx 10rpx 10rpx rgba(0,0,0,0.1);
        }
        .desc {
            font-size: 24rpx;
            text-align: left;
            color: #5c5c5c;
            text-overflow: -o-ellipsis-lastline;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            -webkit-box-orient: vertical;
        }
    }
}
.wx-slider-thumb {
    display: none;
}
</style>