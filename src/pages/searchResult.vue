<template>
    <div class="searchResult">
        <div class="top">
            <div class="searchInput">
                <input type="text" v-model="searchValue" @confirm="beginSearch" placeholder="搜索节目/音乐/主播/广播">
                <image v-if="searchValue!=''" src="../static//icon/取消.png" @click="searchValue=''"></image>
            </div>
            <div class="cancel" @click="changePath('./home')">取消</div>
        </div>
        <div class="content">
            <div class="total">
                <div class="programs">
                    <div class="programLeft">
                        <image mode="aspectFill" :src="searchResultDJ[0].picUrl || searchResultPrograms[0].coverImgUrl || searchResult[0].album.artist.img1v1Url"></image>
                    </div>
                    <div class="programRight">
                        <div class="programTitle">
                            <div class="boutique">
                                <span id="titleName">{{searchValue}}</span>
                            </div>
                        </div>
                        <div class="programContent">
                            <span>累计找到 {{searchResult.length + searchResultDJ.length + searchResultPrograms.length}} 个结果</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="totalContent">
                <div class="contentType">
                    <div class="music typeItem" :class="{'typeActive':contentType.music}" @click="changeMusicType">
                        <span>音乐</span>
                    </div>
                    <div class="album typeItem" :class="{'typeActive':contentType.album}" @click="changeAlbumType">
                        <span>电台</span>
                    </div>
                    <div class="program typeItem" :class="{'typeActive':contentType.program}" @click="changeProgramType">
                        <span>节目</span>
                    </div>
                    <div class="anchor typeItem" :class="{'typeActive':contentType.anchor}" @click="changeAnchorType">
                        <span>主播</span>
                    </div>
                </div>
                <div class="sort">
                    <image src="../static/icon/沙漏.png"></image>
                </div>
            </div>
            <!-- funtionalAreas musicAreas -->
            <scroll-view class="musicAreas" :class="showAudio?'showPaddingBottom':''" scroll-y  v-if="contentType.music">
                <block v-for="(item,index) in searchResult" :key="item.id">
                    <view :data-id="item.id" :data-index="index" class="result-item" @tap="chooseSong">
                        <view class="mark"></view>
                        <view class="detail">
                            <view class="title">{{item.name}}</view>
                            <view class="desc">
                                <view v-if="item.fee =='1'" class="symbol special">VIP</view>
                                <view v-if="item.fee =='1'" class="symbol">试听</view>
                                <view class="symbol special" v-if="item.album.status == 0 && item.album.size < 14">SQ</view>
                                {{item.artists[0].name}} - {{item.album.name}}
                            </view>
                        </view>
                    </view>
                </block>
            </scroll-view>
            <scroll-view class="list-content" :class="showAudio?'showPaddingBottom':''" scroll-y v-if="contentType.album">
                <block v-for="(item,index) in searchResultDJ" :key="index">
                    <div class="programs" :data-id="item.id" :data-index="index" @tap.stop="goPlayPage">
                        <div class="programLeft">
                            <image mode="aspectFill" :src="item.picUrl"></image>
                        </div>
                        <div class="programRight">
                            <div class="programTitle">
                                <div class="boutique">
                                    <span v-if="item.category" id="Title">{{item.category}}</span>
                                    <span v-else id="Title">推荐</span>
                                    <span id="titleName">{{item.name}}</span>
                                    <!-- <span id="Name">第3季</span> -->
                                </div>
                            </div>
                            <div class="programContent">
                                <span v-if="item.desc">{{item.desc}}</span>
                                <span v-else>作者暂无相关描述...</span>
                            </div>
                            <div class="programDetail">
                                <span>已播放{{item.playCount}}次</span>
                                <span id="separate">|</span>
                                <span v-if="item.privacy">隐私歌单</span>
                                <span v-else>公开歌单</span>
                            </div>
                        </div>
                    </div>
                </block>
            </scroll-view>
            <scroll-view class="list-content" :class="showAudio?'showPaddingBottom':''" scroll-y v-if="contentType.program">
                <block v-for="(item,index) in searchResultPrograms" :key="item.id" >
                <view class="programs" :data-id="item.id" :data-index="index" @tap.stop="goSongList">
                    <view class="programLeft">
                        <image mode="aspectFill" :src="item.coverImgUrl"></image>
                    </view>
                    <view class="programRight">
                        <view class="programTitle">
                            <view class="boutique">
                                <span class="titleBorder" v-if="item.category">{{item.category}}</span>
                                <span class="nameItem" id="titleName">{{item.name}}</span>
                            </view>
                        </view>
                        <view class="programContent">
                            <span v-if="item.playCount">累计{{item.playCount}}首</span>
                            <span v-else>累计0首</span>
                        </view>
                        <view class="programContent">
                            <span v-if="item.creator && item.creator.nickname">by {{item.creator.nickname}}</span>
                            <span v-if="item.creator && item.creator.experts"> -- {{item.creator.experts}}</span>
                        </view>
                    </view>
                </view>
                </block>
            </scroll-view>
            <scroll-view class="list-content" :class="showAudio?'showPaddingBottom':''" scroll-y v-if="contentType.anchor">
                <block v-for="(item,index) in searchResultPrograms" :key="item.creator.userId" >
                <view class="programs" :data-id="item.creator.userId" :data-index="index">
                    <view class="programLeft">
                        <image mode="aspectFill" id="avatarUrl" :src="item.creator.avatarUrl"></image>
                    </view>
                    <view class="programRight">
                        <view class="programTitle">
                            <view class="boutique">
                                <span class="nameItem" id="titleName">{{item.creator.nickname}}</span>
                            </view>
                        </view>
                        <view class="programContent">
                            <span v-if="item.name">《{{item.name}}》</span>
                        </view>
                        <view class="programContent">
                            <span v-if="item.playCount">累计{{item.playCount}}首</span>
                            <span v-else>累计0首</span>
                        </view>
                    </view>
                </view>
                </block>
            </scroll-view>
        </div>
        <player class="audio" v-if="showAudio"></player>
    </div>
</template>

<script>
const app = getApp()
import {search} from '../service/home';
import {getProgram} from "../service/djprogram";
import player from "../components/common-player.vue";
export default {
    name:'searchResult',
    components:{player},
    data() {
        return {
            searchValue: '',
            contentType:{
                music:true,
                album:false,
                anchor:false,
                program:false
            },
            showAudio:false,
            searchResult:[],
            searchResultDJ:[],
            searchResultPrograms:[],
        };
    },
    onShow(){
        this.showAudio = app.globalData.showAudio
        if(wx.getStorageSync('inputValue')){
            this.searchValue = wx.getStorageSync('inputValue')
            wx.setNavigationBarTitle({title:this.searchValue})
            wx.removeStorageSync('inputValue')
        }
    },
    onLoad(query){
        if (query.keyword) {
            console.log(query.keyword);
            wx.setNavigationBarTitle({title:query.keyword})
            this.searchValue = query.keyword
            this._search('1')       //音乐编号1
            this._search('1009')    //电台编号1009
            this._search('1000')    //歌单编号1000
        }
    },
    methods: {
        changePath(path){
            wx.redirectTo({url:path})
        },
        changeType(){
            for(let a in this.contentType){
                this.contentType[a] = false
            }
        },
        changeMusicType(){
            this.changeType()
            this.contentType.music=true
        },
        changeAlbumType(){
            this.changeType()
            this.contentType.album=true
        },
        changeAnchorType(){
            this.changeType()
            this.contentType.anchor=true
        },
        changeProgramType(){
            this.changeType()
            this.contentType.program=true
        },
        goPlayer(){
            wx.navigateTo({url:'../pages/playPage'})
        },
        _search(type) {
            if (type == '1') {
                search(this.searchValue,type).then(res => {
                    this.searchResult = res.result.songs
                    // console.log(res.result);
                })
            }else if (type == '1009') {
                search(this.searchValue,type).then(res=>{
                    this.searchResultDJ = res.result.djRadios
                    // console.log(res.result);
                })
            }else if (type == '1000') {
                search(this.searchValue,type).then(res=>{
                    this.searchResultPrograms = res.result.playlists
                    console.log('searchResultPrograms',this.searchResultPrograms);
                })
            }
            
        },
        chooseSong(e) {
            let {id,index} = e.currentTarget.dataset
            app.globalData.index = index
            app.addSong(id)
            app.playList(this.searchResult)
            uni.navigateTo({
                url: '/pages/song-play/song-play?id='+ id,
            })
        },
        goPlayPage(e){
            this.showAudio = true
            app.globalData.idDJ = e.currentTarget.dataset.id
            //等待接口响应后处理函数 这里的id要处理 
            getProgram(e.currentTarget.dataset.id).then(res=>{
                let data = res.programs.map(item => item.mainSong);
                console.log('mainSongdatadata',data);
                console.log('ididididi',data[0].id);
                app.globalData.playListDJ = this.searchResultDJ
                app.globalData.index = 0
                app.addSong(data[0].id)
                app.playList(data)
                uni.navigateTo({
                    url: '/pages/song-play/song-play?id=' + data[0].id,
                })
            })
        },
        goSongList(e){
            console.log('eeeee',e);
            let id = e.currentTarget.id || e.currentTarget.dataset.id
            uni.navigateTo({
                url: '/pages/song-list/song-list?id=' + id,
            })
        }
    },
}
</script>

<style lang="less">
body{
    background-color: #f9f9f9;
}
.searchResult{
    display: flex;
    flex-flow: column nowrap;
    position: relative;
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
            background-color: #e4e3e3;
            border-radius: 30rpx;
            input{
                flex: 1;
                height: 100%;
                font-size: 27rpx;
                font-weight: 600;
            }
            image{
                height: 40rpx;
                width: 40rpx;
                min-width: 40rpx;
                min-height: 40rpx;
            }
        }
        .cancel{
            padding: 0 30rpx;
            color: gray;
            font-size: 32rpx;
            font-weight: 500;
            vertical-align: center;
            line-height: 60rpx;
        }
    }
    .content{
        display: flex;
        flex-flow: column nowrap;
        .total{
            display: flex;
            flex-flow: column nowrap;
            background-color: #f8f8f8;
            
        }
        .totalContent{
            height: 75rpx;
            background-color: #f4f4f4;
            display: flex;
            align-items: center;
            font-size: 30rpx;
            font-weight: 500;
            .contentType{
                flex-grow: 1;
                height: 75rpx;
                display: flex;
                align-items: center;
                justify-content: space-evenly;
                margin-left: 100rpx;
                .typeItem{
                    height: 95%;
                    display: flex;
                    align-items: center;
                }
                .typeActive{
                    color: #D3AB58;
                    border-bottom: 5rpx solid #D3AB58;
                }
            }
            .sort{
                height: 95%;
                width: 100rpx;
                display: flex;
                align-items: center;
                image{
                    width: 42rpx;
                    height: 42rpx;
                    min-width: 42rpx;
                    min-height: 42rpx;
                }
            }
        }
        .musicAreas{
            background-color: #f9f9f9;
            display: flex;
            flex-flow: column nowrap;
            // margin: 10rpx 0 220rpx;
            margin-bottom: 20rpx;
            color: #333;
            padding: 20rpx 40rpx;
            .result-item {
                height: 100rpx;
                margin-bottom: 20rpx;
                display: flex;
                align-items: center;
                .mark{
                    height: 60rpx;
                    width: 10rpx;
                    background-color: #D3AB58;
                }
                .detail{
                    padding-left: 20rpx;
                    .title{
                        color: #333;
                        line-height: 60rpx;
                    }
                    .desc {
                        font-size: 24rpx;
                        color: #5c5c5c;
                        .symbol {
                            display: inline-block;
                            font-size: 20rpx;
                            height: 30rpx;
                            line-height: 30rpx;
                            color: #ff5100;
                            border: 1rpx solid #ff5100;
                            padding: 0 10rpx;
                            border-radius: 6rpx;
                            transform: scale(.8);
                        }
                        .special {
                            transform: translateY(-4rpx) scale(.8);
                            line-height: 28rpx;
                        }
                    }
                }
            }
        }
    }
}

.wx-slider-thumb {
    display: none;
}

.list-content{
    height: calc(100%-70rpx);
    overflow: scroll;
    margin-bottom: 50rpx;
}
.showPaddingBottom{
  padding-bottom: 150rpx;
}


.programs{
    display: flex;
    align-items: center;
    margin: 10rpx 40rpx;
    .programLeft{
        width: 29%;
        image{
            height: 160rpx;
            width: 160rpx;
            border-radius: 15rpx;
        }
    }
    .programRight{
        height: 160rpx;
        width: 71%;
        margin-left: 10rpx;
        display: flex;
        flex-flow: column nowrap;
        justify-content: space-around;
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
                font-weight: 500;
                padding: 0 6rpx;
                margin-right: 15rpx;
            }
            #Name{
                margin-left: 15rpx;
                font-size: 30rpx;
                font-weight: 500;
            }
            #Name2{
                font-size: 30rpx;
                font-weight: 500;
            }
            .empty{
                margin-left: 50rpx;
                color: #D3AB58;
                border: 1rpx solid #a78034;
                border-radius: 10rpx;
                padding: 5rpx 10rpx;
            }
        }
        .programContent{
            height: 40rpx;
            line-height: 40rpx;
            font-size: 25rpx;
            color: grey;
            overflow: hidden;
            white-space: wrap;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
        }
        .programDetail{
            color: grey;
            font-size: 25rpx;
            #separate{
                padding: 0 12rpx;
            }
        }
    }
    .programsHeader{
        margin-bottom: 40rpx;
    }
}

#titleName{
    font-size: 30rpx;
    color: #D3AB58;
}
#avatarUrl{
    border-radius: 50%;
}
</style>