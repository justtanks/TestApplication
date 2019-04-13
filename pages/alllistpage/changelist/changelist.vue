<!-- 测试使用一种规则的东西 -->
<template>
	<view>
		<view style="position: fixed; z-index: 99;width: 100%;background-color: #FFFFFF;min-height: 180upx;">
			<mSearch :show='false' @search="search($event,0)"></mSearch>
			<view style="height: 80upx;display: flex;flex-direction: row;justify-content: flex-start;align-items: center;">
				<view style="font-size: 30upx;margin-left: 25upx;">
					积分规则
				</view>
				<view class="navtextstyle">
					<view style="display: flex;flex-direction: row;justify-content: center;align-items: center; font-size: 35upx;">»</view>
					<view style="font-size: 30upx;margin-left: 5upx;">规则1</view>
				</view>
			</view>
		</view>
		<view style="height:185upx ;"></view>
		<view>
			<view style="width: 100%;">
				<view class="cadlist uni-list-cell-navigate" :class="listitemstyle" v-for="(item,index) in 10" :key="index" @click="clickitem(index)">
					<view style="font-size: 30upx;">一个规则的名称有多长</view>
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
				},
				listitemstyle:"uni-navigate-right"
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
			},
			clickitem:function(e){
				// 条目的点击事件
				this.listitemstyle=''
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
		min-height: 80upx;
		background-color: #FFFFFF;
		margin-top: 1upx;
		display: flex;
		flex-direction: row;
		padding-left: 35upx;
		padding-right: 35upx;
		justify-content: flex-start;
		align-items: center;
	}
	.cadlist:active{
		background-color: #EBEBEB;
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

	.navtextstyle {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		margin-left: 10upx;
		flex-wrap: nowrap;
	}
</style>
