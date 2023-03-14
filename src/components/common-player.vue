<template>
    <view class="footer" @click.stop="goPlayer">
        <view class="playBar">
            <view class="radioAvatar">
                <!-- <image mode="aspectFill" :src="songInfo.al.picUrl"></image> -->
                <image mode="aspectFill" :src="(songInfo.al && songInfo.al.pic==0)?playListDJ[indexDJ].picUrl:(songInfo.al && songInfo.al.picUrl)"></image>
            </view>
            <view class="radioContent">
                <view class="radioContentHeader">
                    <!-- <span>{{songInfo.name}}</span> -->
                    <span>{{songInfo.name || playListSongInfo.name || '暂无数据'}}</span>
                </view>
                <view class="radioContentFooter">
                    <span>{{songInfo.ar[0].name || '网络歌手'}}</span>
                </view>
            </view>
            <view class="broadcast" @click.stop style="padding-right: 40rpx;">
                <image mode="aspectFill" @click="play" :src="isPlay?'../static/icon/24gf-pauseCircle.png':'../static/icon/24gf-playCircle.png'"></image>
            </view>
            <view class="broadcast" @click.stop>
                <image mode="aspectFill" src="../static/icon/24gf-nextCircle.png" @click.stop="nextSong"></image>
            </view>
            <!-- <view class="text" @click.stop>
                <image mode="aspectFill" @click="IsText=!IsText" :src="IsText?'../static/icon/文件.png':'../static/icon/homeIcon/文件.png'"></image>
            </view> -->
            <!-- <view class="iconfont icon-xiayiqu101 text" @click.stop="nextSong"/> -->
        </view>
        <!-- 进度条 -->
        <view class="progressBar" @click.stop>
            <slider class="slider" max="100" :value="progress" activeColor="#D3AB58" block-size="12" disabled></slider>
        </view>
    </view>
</template>

<script>
const app = getApp()
import moment from 'moment'
import {getSongUrl,getSongDetail} from "../api/songs"
export default {
    name:'player',
    data() {
        return {
            IsBroadcast: false, //是否正在播放
            IsText: false, //是否显示文本,
            playClick:true,
            slider:{
               max:'100',
               value:'0',
            },
            progress: 0,
            //播放列表
            playList: [],
            playListDJ:[],
            indexDJ:'',
            songInfo: {},
            playListSongInfo:{},
            isPlay: false,
            pid: '',
            active: '',
        };
    },
    methods: {
        _getSongDetail(id){
            if (id) {
                getSongDetail(id).then(res => {
                    this.playList = app.globalData.playList,
                    this.songInfo = res.songs[0],
                    this.isPlay = app.globalData.state,
                    this.pid = app.globalData.pid,
                    this.active = app.globalData.active
                })
                this._playListSongInfo(id)
                this.playListDJ = app.globalData.playListDJ
                this.indexDJ = this.playListDJ.findIndex((item) => item.id == app.globalData.idDJ);
            }else{
                getSongDetail(app.globalData.id).then(res => {
                    this.playList = app.globalData.playList,
                    this.songInfo = res.songs[0],
                    this.isPlay = app.globalData.state,
                    this.pid = app.globalData.pid,
                    this.active = app.globalData.active
                })
                this._playListSongInfo(app.globalData.id)
                this.playListDJ = app.globalData.playListDJ
                this.indexDJ = this.playListDJ.findIndex((item) => item.id == app.globalData.idDJ);
            }
        },
        _playListSongInfo(id){
            if (app.globalData.playList) {
                this.playListSongInfo = app.globalData.playList.find(item => item.id == id)
                this.timeUpdate()
                console.log('playListSongInfo1',this.playListSongInfo);
            }
        },
        play() {
            this.isPlay = !this.isPlay
            if(this.isPlay) {
                app.globalData.backgroundAudioManager.play()
            } else {
                app.globalData.backgroundAudioManager.pause()
            }
        },
        nextSong() {
            let id = app.getSong('next')
            getSongDetail(id).then(res => {
                this.songInfo = res.songs[0]
                getSongUrl(id).then(result => {
                    console.log('result',result);
                    app.globalData.backgroundAudioManager = uni.getBackgroundAudioManager()
                    app.globalData.backgroundAudioManager.src = result.data[0].url
                    app.globalData.backgroundAudioManager.title = this.songInfo.name
                })
            })
        },
        goPlayer(){
            app.globalData.isSame = true
            app.globalData.isSameDJ = true
            if(this.active == '1') {
                console.log(123);
                uni.navigateTo({
                    url: '/pages/song-play/song-play?active=1&pid='+this.pid,
                })
            } else {
                console.log('321',this.active);
                uni.navigateTo({
                    url: '/pages/song-play/song-play?pid='+this.pid,
                })
            }
        },
        watchId(val){
            console.log('此刻的id',val)
            app.globalData.backgroundAudioManager = uni.getBackgroundAudioManager()
            this._getSongDetail(val)
            this.timeUpdate()
        },
        autoPlay(playClick,playProgress){
            this.slider.max = app.globalData.songTimeSeconds
            var that = this
            if (playClick) {
                playProgress = setInterval(function(){
                    if (that.playClick && that.slider.value < that.slider.max){
                        that.slider.value++
                        console.log(that.slider.value);
                    }else{
                        clearInterval(playProgress)
                    }
                }, 1000);
            }
        },
        timeUpdate(){
            /* app.globalData.backgroundAudioManager.onTimeUpdate((e)=> {
                let self = this
                let ct = moment(app.globalData.backgroundAudioManager.currentTime * 1000).format('mm:ss')
                if(ct !== self.ct) {
                    let progress = ((app.globalData.backgroundAudioManager.currentTime) / (self.songInfo.dt/1000))*100
                    self.ct = ct
                    this.progress = progress
                }
            })
            console.log('timeUpdate打印,是common-player'); */
        },
    },
    mounted() {
        if (app.globalData.isSame) {
            this.slider.value = app.globalData.slider.value
        }
        this.playListDJ = app.globalData.playListDJ
        this.indexDJ = this.playListDJ.findIndex((item) => item.id == app.globalData.idDJ);
        this._getSongDetail()
        app.watch(this.watchId,'id')
        app.globalData.backgroundAudioManager.onNext(() => {
            this.changeSong('next')
            this.timeUpdate()
        })
        app.globalData.backgroundAudioManager.onEnded(() => {
            this.nextSong()
            console.log('onEnded11111');
            // this.timeUpdate()
            // app.globalData.backgroundAudioManager.play()
        })
        app.globalData.backgroundAudioManager.onPlay(()=>{
            this.isPlay = true
            app.globalData.backgroundAudioManager.play()
        })
        app.globalData.backgroundAudioManager.onPause(()=>{
            this.isPlay = false
            app.globalData.backgroundAudioManager.pause()
        })
        app.globalData.backgroundAudioManager.onStop(()=>{
            this.isPlay = false
            app.globalData.backgroundAudioManager.stop()
            app.globalData.backgroundAudioManager.currentTime = 0
            app.globalData.backgroundAudioManager.duration = 0
        })
        /* app.globalData.backgroundAudioManager.onCanplay(()=>{
            this.timeUpdate()
        }) */
        //播放音乐
        // this.timeUpdate()
    }
}
</script>

<style lang="less">
.wx-slider-thumb {
    display: none;
}
.footer{
    width: 100vw;
    padding: 15rpx 0 60rpx;
    box-sizing: border-box;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    background-color: #F9F9F9;
    // z-index: 3;
    position: fixed;
    left: 0;
    top: 86vh;
    .playBar{
        width: 100%;
        height: 130rpx;
        padding: 0 30rpx;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        .radioAvatar{
            image{
                width: 75rpx;
                height: 75rpx;
                min-width: 75rpx;
                min-height: 75rpx;
                border-radius: 10rpx;
            }
        }
        .radioContent{
            height: 75%;
            display: flex;
            flex-flow: column nowrap;
            justify-content: space-around;
            flex-grow: 1;
            padding: 0 20rpx;
            .radioContentHeader{
                font-size: 27rpx;
                font-weight: 600;
            }
            .radioContentFooter{
                font-size: 23rpx;
                color: #D3AB58;
                background-clip: text;
            }
        }
        .broadcast{
            image{
                width:55rpx;
                height: 55rpx;
                min-width: 55rpx;
                min-height: 55rpx;
            }
        }
    }
    .progressBar{
        height: 30rpx;
        width: 100vw;
        display: flex;
        align-items: center;
        .slider{
            width: 100%;
            margin: 0;
            vertical-align: center;
        }
        .wx-slider-thumb {
            display: none;
        }
    }
}
</style>