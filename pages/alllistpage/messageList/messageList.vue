<!-- 公告列表 -->
<template>
	<view>
		<view style="position: fixed; z-index: 99;width: 100%;background-color: #FFFFFF;">
			<mSearch :show='false' @search="search($event,0)"></mSearch>
		</view>
		<view style="height:100upx ;"></view>
		<view>
			<view style="width: 100%;">
				<view class="cadlist">
					<view class="toptext-one">公告的列表，标识现在有哪些积分事件正在发生</view>
					<view class="toptext-two">由于什么什么 </view>
					<view style="display: flex; flex-direction: row;align-items: center;margin-top:5upx;">
						<view class="shenpistyle-one "> 发布时间:1992-9-10</view>
					</view>
				</view>
				<uni-load-more :status="status" :contentText="contentText"></uni-load-more>
			</view>
		</view>
	</view>
</template>

<script>
	var _self;
	import mSearch from '../../../components/mehaotian-search/mehaotian-search.vue'
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
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
				}
			};
		},
		onLoad: function() {
			_self = this;

		},
		onBackPress: function() {
			// 覆盖之前的方法 return true
		},
		onPullDownRefresh: function() {
			// 执行下拉刷新的方法
			setTimeout(function() {
				uni.stopPullDownRefresh()
			}, 1000)
		},
		onReachBottom: function() {
			//触底的时候请求数据，即为上拉加载更多
			_self.status = 'loading';
		},
		methods: {
			search(e, val) {
				// 搜索的方法
				console.log(e, val);
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

	.cadlist {
		min-height: 250upx;
		background-color: #FFFFFF;
		margin-top: 10upx;
		margin-bottom: 10upx;
		display: flex;
		flex-direction: column;
		padding-left: 40upx;
		padding-right: 40upx;
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
