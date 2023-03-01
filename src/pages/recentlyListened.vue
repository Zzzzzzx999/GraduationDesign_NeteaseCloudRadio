<template>
    <div class="recentlyListened">
        <div class="addToSiri">
            <image src="../static/Picture_material/1657979583074.jpg"></image>
            <span>添加“播放最近收听”到Siri</span>
            <image id="right" src="../static/icon/homeIcon/右箭头.png"></image>
        </div>
        <div class="notRecentPrograms" v-if="!recentProgram">
            <image src="../static/icon/Time-Folder.png"></image>
            <div class="recent">
                <span>暂无最近收听</span>
            </div>
            <div class="more">
                <span>去收听更多精彩节目</span>
            </div>
        </div>
        <div class="recentPrograms" v-if="recentProgram">
            <div class="programs">
                <div class="programLeft">
                    <image mode="aspectFill" src="https://img2.baidu.com/it/u=1719968675,2457840328&fm=253&fmt=auto&app=138&f=JPEG?w=998&h=500"></image>
                </div>
                <div class="programRight programsHeader">
                    <div class="programTitle">
                        <span>最近收听的节目</span>
                        <div class="empty" @click="recentProgram=false">
                            <span>清空</span>
                        </div>
                    </div>
                    <div class="programContent">
                        <span>共4集</span>
                    </div>
                </div>
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
            <div class="programs">
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
            </div>
        </div>
        <!-- <player></player> -->
    </div>
</template>

<script>
const app = getApp()
import {getRecentPlayList} from '../service/home'
import {getSongDetail} from '../service/songs'
import player from "../components/common-player.vue";
export default {
    name:"recentlyListened",
    components:{player},
    data() {
        return {
            userInfo:{},
            recentProgram:true, //是否有最近收听节目
            recentPlayList: [], // 用户播放记录
        }
    },
    onLoad(){
        let userInfo = wx.getStorageSync('userInfo')
        if(userInfo) {
            this.userInfo = JSON.parse(userInfo)
            this._getRecentPlayList()
        }
    },
    methods: {
        goPlayer(){
            wx.navigateTo({url:'../pages/playPage'})
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
        display: flex;
        align-items: center;
        flex-flow: column nowrap;
        margin-bottom: 50rpx;
        .title{
            font-size: 38rpx;
            font-weight: 600;
            margin: 40rpx 0;
        }
    }
    // 节目
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