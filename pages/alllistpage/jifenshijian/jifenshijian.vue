<!-- 积分事件 界面  这个界面在普通员工中是在首页tab上的-->
<template>
	<view>
		<view style="position: fixed; z-index: 99;width: 100%;background-color: #FFFFFF;">
			<view class="topbar">
				<view class="toptext1 uni-list-cell-navigate uni-navigate-bottom">分类</view>
				<view class="toptext1 uni-list-cell-navigate uni-navigate-bottom">部门</view>
				<view class="toptext1 uni-list-cell-navigate uni-navigate-bottom">时间</view>
				<view style="flex: 1;"></view>
				<view style="flex: 1;"></view>
			</view>
			<mSearch :show='false' @search="search($event,0)"></mSearch>
		</view>
		<view style="height:160upx ;"></view>
		<view class="content">
			<view style="width: 100%;">
				<!-- 做一个列表   积分录入和积分申请，以及积分的状态都是后台给的状态，这里只是模拟-->
				<!-- 所有的任务 -->
				<view class="cadlist-one">
					<view class="toptext-one">积分事件的列表，标识现在有哪些积分事件正在发生</view>
					<view style="display: flex;flex-direction: row;justify-content: space-between;">
						<view class="toptext-two">绩效分/技术部</view>
						<view class="fenshustyle">40分</view>
					</view>

					<!-- <view class="toptext-two">备注:由于什么什么 </view> -->
					<view style="display: flex; flex-direction: row;align-items: center;margin-top:5upx;">
						<view class="shenpistyle-one "> 时间:1992-9-10</view>
					</view>
					<view class="thingstyle">
						<view class="shenpistyle-one ">对象：小明</view>
						<view class="shenpistyle-one" style="margin-right: 20upx;">操作人：小明</view>
					</view>
				</view>
				<uni-load-more :status="status" :contentText="contentText"></uni-load-more>
			</view>
		</view>
		<!-- </scroll-view> -->
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
				status: 'more',
				loadingText: '加载中...',
				contentText: {
					contentdown: '上拉显示更多',
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

	.content {
		/* 最外层的被scroll-veiw 包裹起来的，如果要实现外面的不一起滚动，就必须设置一个合适的固定高度 */
		/* 	height: 1100upx; */
		display: flex;
		justify-content: center;
		align-items: flex-start;
		text-align: center;

	}

	.cadlist {
		min-height: 250upx;
		background-color: #FFFFFF;
		margin-left: 10upx;
		margin-top: 10upx;
		margin-bottom: 10upx;
		margin-right: 10upx;
		display: flex;
		flex-direction: column;
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

	.toptext1 {
		display: flex;
		width: 15%;
		justify-content: center;
		align-items: center;
		font-size: 30upx;
	}

	.topbar {
		height: 60upx;
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-top: 10upx;
	}
</style>
