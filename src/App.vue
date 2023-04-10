<script>
// import {audio} from './mixin'
import {getDetail,getProgram} from "./api/djprogram";
	export default {
		// mixins:[audio],
		onLaunch: function() {
			let isLogin = !!(wx.getStorageSync('cookies')) && !!(wx.getStorageSync('userInfo'))
			this.globalData.isLogin = isLogin
			this.globalData.backgroundAudioManager = wx.getBackgroundAudioManager();
			if(!isLogin) {
				uni.navigateTo({
					url: '/pages/login/login'
				})
			}
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		/* methods: {
			goPlayPage(rid){
				getProgram(rid).then(res=>{
					console.log('节目详情',res)
					wx.navigateTo({url:'/pages/playPage?id='+res.programs[1].mainSong.id})
				})
			}
		}, */
		methods:{
			addSong(id) {
				if(this.globalData.id && this.globalData.id == id) {
					this.globalData.isSame = true
					// this.globalData.isSameDJ = true
					console.log('isSame = true');
				} else {
					this.globalData.isSame = false
					// console.log('this.globalData.id',this.globalData.id);
					// console.log('id',id);
					console.log('isSame = false');
					this.globalData.backgroundAudioManager = {}
					this.globalData.id = id
				}
			},
			addDJ(dj) {
				this.globalData.playListDJ = dj
			},
			playList(arr) {
				if (this.globalData.playList && this.globalData.playList[0].id == arr[0].id) {
					this.globalData.isSameDJ = true
					console.log('执行了isSameDJ = true');
				}else {
					this.globalData.isSameDJ = false
					console.log('执行了isSameDJ = false');
					this.globalData.playList = arr
				}
			},
			getSong(type) {
				if(this.globalData.playList.length > 1) {
					if(type == 'next') {
						this.globalData.index >= this.globalData.playList.length -1? this.globalData.index = 0: this.globalData.index ++
					} else if(type == 'pre'){
						// this.globalData.index <= 0?this.globalData.index = this.globalData.playList.length -1: this.globalData.index --
						this.globalData.index--
					}else{
						this.globalData.index = this.globalData.index
					}
				} else {
					this.globalData.index = 0
				}
				console.log('this.globalData.playList',this.globalData.playList);
				console.log('this.globalData.index',this.globalData.index);
				let id = this.globalData.playList[this.globalData.index].id
				this.globalData.id = id
				console.log('ididiididiidid',id);
				return id
			},
			getImageSrc(base64String){
				// 将 base64 编码字符串转换为二进制数据
				const byteString = atob(base64String.split(',')[1]);
				const arrayBuffer = new ArrayBuffer(byteString.length);
				const uint8Array = new Uint8Array(arrayBuffer);
				for (let i = 0; i < byteString.length; i++) {
					uint8Array[i] = byteString.charCodeAt(i);
				}
				// 创建 Blob 对象
				const blob = new Blob([uint8Array], { type: 'image/png' });
				// 使用 URL.createObjectURL() 方法生成图片的访问地址
				const imageUrl = URL.createObjectURL(blob);
				// 返回图片的访问地址
				return imageUrl;
			},
			goPlayPage(rid){
				getProgram(rid).then(res=>{
					console.log('节目详情',res)
					// wx.navigateTo({url:'/pages/playPage?id='+res.programs[0].mainSong.id})
					wx.navigateTo({url:'/pages/playPage?id='+res.programs[0].mainSong.id})
					this.globalData.programsDetail = res.programs
				})
			},
			changePrograms(index){
				wx.navigateTo({url:'/pages/playPage?id='+this.globalData.programsDetail[index].mainSong.id})
			},
			watch(method,istr){
                var obj=this.globalData
                console.log('obj',obj)
                Object.defineProperty(obj,istr,{
					configurable:true,
					enumerable:true,
					set:function(value){
						/* console.log('that',that);
						console.log('this',this); */
						// console.log('this.pid',this.pid);
						setTimeout(() => {
							/* console.log('app.globalData.id',obj.id);
							console.log('value',value); */
							if (obj.id != value) {
								this._consumerGoodsStatus=value
								method(value)
							}
						}, 20);
					},
					get:function(value){
						return this._consumerGoodsStatus
					}
				})
			}
		},
		globalData:{
			// 播放列表
			songTimeSeconds:'',
			playProgress:null,
			programsDetail:[], //节目详情
			previousId:'', //上条音乐id
			currentDT:[], //当前电台目录
			programsIndex:0, 
			slider:{
               max:'100',
               value:'0',
            },
			//是否登陆
			isLogin: false,
			// 播放列表
			playList: null,
			index: 0,
			state: false,
			isSame: false,
			isSameDJ: false,
			id: null,
			pid: '',
			active: '',
			backgroundAudioManager:{},
			showAudio: false,
			playListDJ:[],
			idDJ:'',
		}
	}
</script>

<style>
	@import './static/iconfont/iconfont.css';
	/*每个页面公共css */
	page {
	  height: 100%;
	  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
	  box-sizing: border-box;
	}
	view {
	  box-sizing: border-box;
	  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
	}
	.topBar {
	  display: flex;
	  justify-content: space-between;
	  position: fixed;
	  top: 0;
	  width: 100%;
	  height: 130rpx;
	  left: 0;
	  font-size: 34rpx;
	  line-height: 165rpx;
	  color: #fff;
	  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
	  z-index: 99;
	}
	
	/* 自定义navigation */
	.topBar .songName {
	  flex: 1;
	  overflow:hidden;
	  text-align: center;
	}
	.topBar .back{
	  width: 195rpx;
	  text-align: left;
	  padding: 0 20rpx;
	  box-sizing: border-box;
	}
	
	/* 全局播放器 */
	.audio {
	  position: absolute;
	  bottom: 0;
	  left: 0;
	  width: 100%;
	  z-index: 88;
	}
	player{
        height: 200rpx;
    }

</style>
