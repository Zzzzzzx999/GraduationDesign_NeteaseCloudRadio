import {getSongUrl,getSongLyric,getSonglist,getSongDetail,activeList} from "./service/songs";
import moment from 'moment'

const app = getApp()
let time = null
export const audio={
    data() {
        return {
            playClick:true,     //是否播放
            backgroundAudioManager: '',  //播放器
            speedNow:1,     //当前倍速
            audio:{
                // src:'http://m7.music.126.net/20230111231702/116fba259b39ecea7b63a54bfe2d8385/ymusic/obj/w5zDlMODwrDDiGjCn8Ky/2949327100/d639/cdf0/4d82/4c6377d52938fe3ffe5071a7ac202ece.mp3',
                src:'',
            },
            //播放进度控制
            progress: 0,
            ct: '00:00',
            dt: '00:00',
        }
    },
    onLoad(query) {
        if (query) {
            console.log('query',query);
            this._getSongUrl(query.id)
        }
        /* if (!app.globalData.backgroundAudioManager) {
            app.globalData.backgroundAudioManager = wx.getBackgroundAudioManager();
        } */
        this.audioSet(query.id)
    },
    onUnload() {
        if (app.globalData.backgroundAudioManager) {
            // app.globalData.backgroundAudioManager.destroy()
        }
    },
    methods: {
        _getSongUrl(id){
            getSongUrl(id).then(res=>{
                console.log('音乐详情',res);
                this.audio.src = res.data[0].url
            })
        },
        btnPlayAudio() {
            if (this.playClick) {
                app.globalData.backgroundAudioManager.play() // 播放
            }else{
                app.globalData.backgroundAudioManager.pause() // 暂停
            }
        },
        changePlayClick(){
            this.playClick = !this.playClick
            console.log('aa',app.globalData.backgroundAudioManager);
            if (this.playClick) {
                app.globalData.backgroundAudioManager.play() // 播放
            }else{
                app.globalData.backgroundAudioManager.pause() // 暂停
            }
            this.autoPlay(this.playClick)
            // clearInterval(playProgress)
        },
        // 调节倍速
        speedAudio(dataNow){
            this.speedNow = dataNow
            app.globalData.backgroundAudioManager.playbackRate = this.speedNow
        },
        audioSet(id){
            getSongUrl(id).then(res=>{
                console.log('音乐详情',res);
                app.globalData.backgroundAudioManager.title = '此时此刻'
                // app.globalData.backgroundAudioManager.autoplay = true
                // app.globalData.backgroundAudioManager.epname = '此时此刻'
                // app.globalData.backgroundAudioManager.singer = '许巍'
                app.globalData.backgroundAudioManager.coverImgUrl = 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000'
                // app.globalData.backgroundAudioManager.coverImgUrl = this.programsDetail[this.programsIndex]
                app.globalData.backgroundAudioManager.src = res.data[0].url
                this.audio.src = res.data[0].url
                console.log('src',app.globalData.backgroundAudioManager.src);
                app.globalData.backgroundAudioManager.onPlay((res) => {
                    console.log('onplay', res)
                })

            })
        }
    }
}

export const abc={
    data() {
        return {
            h: '',
            pid: '',
            //播放列表
            playList: [],
            isShow: false,
            songInfo: {},
            index:'',
            isPlay: true,
            musicSrc: '',
            //播放进度控制
            progress: 0,
            ct: '00:00',
            dt: '00:00',
            // 播放进度跳转
            width: 0,
            offsetLeft: 0,
            // 循环播放
            circleType: 'icon-xunhuan', 
            //歌词
            lyric: [],
            marginTop: 0,
            currentIndex: 0,
        }
    },
    onLoad(option) {
        this.h = uni.getSystemInfoSync().statusBarHeight
        this.pid = option.pid || ''
        if(option.active == '1') {
            this.circleType = 'icon-B'
        }
        if(app.globalData.isSame) {
            if(app.globalData.backgroundAudioManager.src && app.globalData.backgroundAudioManager.title) {
                getSongDetail(app.globalData.id).then(res => {
                    this.dt = moment(res.songs[0].dt).format('mm:ss')
                    this.songInfo = res.songs[0]
                    this.playList = app.globalData.playList
                })
                app.globalData.backgroundAudioManager.play()
            } else {
                getSongDetail(app.globalData.id).then(res => {
                    this.dt = moment(res.songs[0].dt).format('mm:ss')
                    this.songInfo = res.songs[0]
                    this.playList = app.globalData.playList
                    this._getUrl(app.globalData.id)
                })
            }
        } else {
            app.globalData.backgroundAudioManager = uni.getBackgroundAudioManager()
            getSongDetail(app.globalData.id).then(res => {
                this.dt = moment(res.songs[0].dt).format('mm:ss')
                this.songInfo = res.songs[0]
                this.playList = app.globalData.playList
                this._getUrl(app.globalData.id)
            })
        }
        // 获取歌词
        this._getSongLyric(app.globalData.id)
        app.globalData.backgroundAudioManager.onPrev(() => {
            this.changeSong('pre')
        })
        app.globalData.backgroundAudioManager.onNext(() => {
            this.changeSong('next')
        })
        app.globalData.backgroundAudioManager.onEnded(() => {
            this.circlePlay()
        })
        app.globalData.backgroundAudioManager.onPlay(()=>{
            this.isPlay =true
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
        //播放音乐
        app.globalData.backgroundAudioManager.onTimeUpdate((e)=> {
            let self = this
            let ct = moment(app.globalData.backgroundAudioManager.currentTime * 1000).format('mm:ss')
            let index = 1
            if(self.currentIndex >= index) {
                self.marginTop = (self.currentIndex - index) * 28
            }
            if(ct !== self.ct) {
                let progress = ((app.globalData.backgroundAudioManager.currentTime) / (self.songInfo.dt/1000))*100
                self.ct = ct
                this.progress = progress
                if(self.lyric.length !== 0 && self.songInfo.fee !== 1) {
                    self.lyricProgressUpdate()
                }
            }
        })
        //拿到进度条的宽度
        let obj = wx.createSelectorQuery()
        obj.select('.progress-line').boundingClientRect((rec) => {
            this.offsetLeft = rec.left,
            this.width = rec.width
        })
        obj.exec()
    },
    
    methods: {
        backTo() {
            uni.navigateBack()
        },
        //获取歌词
        _getSongLyric(id) {
            getSongLyric(id).then(res => {
                if(res.lrc && res.lrc.lyric) {
                    this.lyric = this.sliceNull(this.parseLyric(res.lrc.lyric))
                }
            })
        },
        //歌词处理
        parseLyric(text) {
            let result = []
            let lines = text.split('\n')
            let pattern = /\[\d{2}:\d{2}.\d+\]/g
            if(!pattern.test(lines[0])) {
                lines = lines.slice(1);
            }
            lines[lines.length - 1].length === 0 && lines.pop();
            lines.forEach((ele, index, arr) => {
                var time = ele.match(pattern)
                var value = ele.replace(pattern, '');
                time.forEach((e,i,a) => {
                    var t = e.slice(1, -1).split(':');
                    result.push([parseInt(t[0], 10) * 60 + parseFloat(t[1]), value]);
                })
            })
            result.sort(function (a, b) {
                return a[0] - b[0];
            });
            return result;
        },
        sliceNull(lrc) {
            var result = []
            for (var i = 0; i < lrc.length; i++) {
                if (lrc[i][1] == "") {
                } else {
                    result.push(lrc[i]);
                }
            }
            return result
        },
        //歌词进度更新处理
        lyricProgressUpdate() {
            let self = this
            if(self.currentIndex != self.lyric.length - 1) {
                for(let j = self.currentIndex; j< self.lyric.length - 1; j++) {
                    if(self.currentIndex == self.lyric.length - 2) {
                        if (parseFloat(app.globalData.backgroundAudioManager.currentTime + 1) > parseFloat(self.lyric[self.lyric.length - 1][0])) {
                            self.currentIndex = self.lyric.length - 1
                            return;
                        }
                    } else {
                        if (parseFloat(app.globalData.backgroundAudioManager.currentTime + 1) >= parseFloat(self.lyric[j][0]) && parseFloat(app.globalData.backgroundAudioManager.currentTime + 1) < parseFloat(self.lyric[j + 1][0])) {
                            self.currentIndex = j
                            return;
                        }
                    }
                }
            }
        },
        _getUrl(id) {
            getSongUrl(id).then(res => {
                const musicSrc = res.data[0].url
                if(musicSrc) {
                    this.musicSrc = musicSrc
                    app.globalData.backgroundAudioManager = uni.getBackgroundAudioManager()
                    // app.globalData.backgroundAudioManager = uni.createInnerAudioContext()
                    app.globalData.backgroundAudioManager.autoplay = true
                    app.globalData.backgroundAudioManager.coverImgUrl = this.songInfo.al.picUrl
                    app.globalData.backgroundAudioManager.title = this.songInfo.name
                    app.globalData.backgroundAudioManager.src = this.musicSrc
                    app.globalData.backgroundAudioManager.play()
                } else {
                    this.musicSrc = ''
                    time = setTimeout(() => {
                        this.changeSong('next')
                    }, 3000)
                }
            })
        },
        circlePlay() {
            if(this.circleType == 'icon-xunhuan' || this.circleType == 'icon-B') {
                this.changeSong('next')
            } else {
                app.globalData.backgroundAudioManager.src = this.musicSrc
                app.globalData.backgroundAudioManager.title = this.songInfo.name
            }
        },
        play() {
            this.isPlay = !this.isPlay
            this.musicControl(this.isPlay)
        },
        musicControl(isPlay) {
            if(isPlay) {
                if(app.globalData.backgroundAudioManager.src) {
                    app.globalData.backgroundAudioManager.play()
                } else {
                    app.globalData.backgroundAudioManager.src = this.musicSrc
                    app.globalData.backgroundAudioManager.title = this.songInfo.name
                }
            } else {
                app.globalData.backgroundAudioManager.pause()
            }
        },
        //切换歌曲播放模式
        changeCircleType() {
            if(this.circleType == 'icon-xunhuan') {
                var circleType= 'icon-xunhuan1'
            } else if(this.circleType == 'icon-xunhuan1') {
                if(this.pid) {
                    var circleType= 'icon-B'
                    activeList(this.pid,this.songInfo.id).then(res => {
                        this.playList = res.data
                        app.globalData.index = -1
                        app.playList(this.playList)
                    })
                } else {
                    var circleType= 'icon-xunhuan'
                }
            } else {
                var circleType = 'icon-xunhuan'
                getSonglist(this.pid).then(res => {
                    const songList = res.playlist
                    let ids = []
                    songList.trackIds.forEach(ele => {
                        ids.push(ele.id)
                    })
                    ids = ids.join(',')
                    getSongDetail(ids).then(t => {
                        this.playList = t.songs
                        app.globalData.index = -1
                        app.playList(this.playList)
                    })
                })
            }
            this.circleType = circleType
        },
        //切换歌曲
        changeSong(type) {
            clearTimeout(time)
            getSongDetail(app.getSong(type)).then(res => {
                this.getSongInfo(res.songs[0])
            })
        },
        //歌曲播放函数
        async getSongInfo(info) {
            await this._getSongLyric(info.id)
            await this._getUrl(info.id)
                this.dt = moment(info.dt).format( 'mm:ss')
                this.songInfo = info
                this.marginTop = 0
                this.currentIndex = 0
                this.lyric = []
        },
        switchSong (e) {
            let type = e.currentTarget.id 
            this.changeSong(type)
        },
        // 点击改变进度条
        changeProgress(e) {
            let self = this
            let current = e.changedTouches[0].pageX - this.offsetLeft
            if(current > 0 && current < this.width) {
                let progress = current / this.width
                let currentTime = app.globalData.backgroundAudioManager.duration * progress
                for(let i = 0; i < self.lyric.length - 1; i++) {
                    if(currentTime >= parseFloat(self.lyric[i][0]) && currentTime < parseFloat(self.lyric[i + 1][0])) {
                        self.currentIndex = i,
                        self.progress= progress * 100,
                        self.isPlay= true
                        break
                    }
                }
                app.globalData.backgroundAudioManager.seek(currentTime)
                app.globalData.backgroundAudioManager.play()
            }
        },
    
        // 播放列表
        openList() {
            this.isShow = true
            this.index = app.globalData.index > 4? app.globalData.index-4:0
        },
        closeList() {
            this.isShow = false
        },
        // 选择某一首歌
        chooseSong(e) {
            app.globalData.index = e.currentTarget.id
            let id = e.currentTarget.dataset.info
            getSongDetail(id).then(res => {
                this.getSongInfo(res.songs[0])
            })
        },
    },
    onShow: function() {
        this.marginTop = 0
        this.currentIndex = 0
    },
    onUnload: function() {
        if(this.circleType == 'icon-B') {
            app.globalData.active = '1'
        } else {
            app.globalData.active = '0'
        }
        app.globalData.pid = this.pid
        app.globalData.state = this.isPlay
        app.globalData.id = this.songInfo.id
    }
}

