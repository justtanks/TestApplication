<!-- 公告列表 -->
<template>
	<view>
		<view style="position: fixed; z-index: 99;width: 100%;background-color: #FFFFFF;">
			<!-- <mSearch :show='false' @search="search($event,0)"></mSearch> -->
		</view>
		<!-- <view style="height:100upx ;"></view> -->
		<view>
			<view style="width: 100%;" >
				<view class="cadlist_1 uni-list-cell-navigate <uni-navigate-right></uni-navigate-right>" v-for="(item,index) in msglist" :key="index" @click="toweb(item.url)">
					<view class="toptext-one">{{item.post_title}}</view>
					<view class="toptext-two">{{item.post_content }}</view>
					<view style="display: flex; flex-direction: row;align-items: center;margin-top:5upx;">
						<view class="shenpistyle-one "> 发布时间:{{item.published_time}}</view>
					</view>
				</view>
				<!-- <uni-load-more :status="status" :contentText="contentText"></uni-load-more> -->
			</view>
		</view>
	</view>
</template>

<script>
	var _self;
	import mSearch from '../../../components/mehaotian-search/mehaotian-search.vue'
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	import URL from '../../../common/url.js'
	
	export default {
		components: {
			mSearch,
			uniLoadMore
		},
		data() {
			return {
				items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
				// 上推加载更多的
				status: 'nomore',
				loadingText: '加载中...',
				contentText: {
					contentdown: '↑上拉显示更多',
					contentrefresh: '正在加载...',
					contentnomore: '没有更多数据了'
				},
				token:'',
				msglist:[],
				
			};
		},
		onLoad: function() {
			_self = this;
			this.token = uni.getStorageSync('token')
			_self.getlist()

		},
		onBackPress: function() {
			// 覆盖之前的方法 return true
		},
		onPullDownRefresh: function() {
			// 执行下拉刷新的方法
			this.getlist()
		},
		onReachBottom: function() {
			//触底的时候请求数据，即为上拉加载更多
			_self.status = 'loading';
		},
		methods: {
			search(e, val) {
				// 搜索的方法
				
			},
			getlist:function(){
				uni.showLoading({})
				uni.request({
					url:URL.getnotice,
					data:{
						token:_self.token,
						deviceType:'android'
					},
					complete:function(e){
						uni.hideLoading()
						uni.stopPullDownRefresh()
						if(e.data.code==1){
							_self.toast(e.data.msg)
							let list=e.data.data.notice
							for(let it of list){
								let dat=new Date(it.published_time*1000)
								it.published_time=dat.getFullYear()+'-'+dat.getMonth()+'-'+dat.getDay()
							}
							console.error(JSON.stringify(list))
							_self.msglist=list
							
							
						}else{
							_self.toast(e.data.msg)
						}
					},
					fail:function(e){
						_self.toast('网络错误')
					}
				})
				
			},
			toweb:function(e){
				uni.navigateTo({
					url:'../gonggaoxiangqing/gonggaoxiangqing?web='+e
				})
			},
			toast:function(msg){
				// #ifdef APP-PLUS
				plus.nativeUI.toast(msg);
				// #endif
				//#ifdef MP-WEIXIN
				uni.showToast({
					title: msg,
					duration: 1000,
					icon: 'none',
					position: 'bottom'
				})
				// #endif
				
			}
		}
	}
</script>

<style>
	page {
		background-color: #EBEBEB;
		/* 	height: 100%; */
		line-height: 1.5;
	}

	.cadlist_1 {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
		min-height: 180upx;
		background-color: #FFFFFF;
		margin-top: 10upx;
		margin-bottom: 10upx;
		padding-left: 25upx;
		padding-right: 25upx;
	}
	.cadlist_1:active{
		background-color: #CCCCCC;
	}

	.toptext {
		display: flex;
		min-height: 30upx;
		font-size: 28upx;
		margin: 20upx 20upx 20upx 20upx;
		text-align: left;
	}

	.shenpistyle {
		font-size: 25upx;
		display: flex;
		margin-left: 20upx;
		justify-content: center;
		align-items: center;
	}

	.border3text {
		display: flex;
		border: #777777 1upx solid;
		justify-content: center;
		align-items: center;
		padding-left: 30upx;
		padding-right: 30upx;
		margin-top: 20upx;
	}
</style>
