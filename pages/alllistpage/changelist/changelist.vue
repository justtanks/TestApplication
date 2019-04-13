<!-- 测试使用一种规则的东西 -->
<template>
	<view>
		<view style="position: fixed; z-index: 99;width: 100%;background-color: #FFFFFF;min-height: 180upx;">
			<mSearch :show='false' @search="search($event,0)"></mSearch>
			<!-- 上面的目录导航条 -->
			<view style="height: 80upx;display: flex;flex-direction: row;justify-content: flex-start;align-items: center;padding-left: 25upx;">
				<view class="navtextstyle" v-for="(item,index) in barlist" :key="index" @click="baritemclick(index)">
					<view style="display: flex;flex-direction: row;justify-content: center;align-items: center; font-size: 35upx;">»</view>
					<view style="font-size: 30upx;margin-left: 5upx;">{{item}}</view>
				</view>
			</view>
		</view>
		<view style="height:185upx ;"></view>
		<view>
			<view style="width: 100%;">
				<view class="cadlist" :class="listitemstyle" v-for="(item,index) in formdata" :key="index" @click="clickitem(index)">
					<view style="font-size: 35upx;">{{item.value}}</view>
					<image class="tonextstyle" v-if="!item.last" src="../../../static/tonext.png"></image>
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
	import mydata from "../../../common/mydata.js"
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
				listitemstyle: "uni-navigate-right",

				// 模仿的数据
				formdata: mydata, //记录最初的数据
				itemdata: {},

				huanchong: [], // 建立缓冲的一个规则数组，通过数组最后一个来实现返回
				barlist: [], //建立一个导航条的文字的缓冲的数组
			};
		},
		onLoad: function() {
			_self = this;
			// 初始将缓冲的规则里面添加最初的一个
			this.huanchong.push(this.formdata)
			this.barlist.push('全部规则')
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
			clickitem: function(e) {
				// 条目的点击事件
				this.itemdata = this.formdata[e]
				if (this.itemdata.children != null) {
					this.formdata = this.itemdata.children
					this.huanchong.push(this.formdata)
					this.barlist.push(this.itemdata.value)
				}

			},
			baritemclick: function(e) {
				//点击导航条之后跳转到相应的目录
				// 				if (e === this.barlist.length - 1) {
				// 					return
				// 				}
				// 				this.formdata = this.huanchong[e]
				// 				this.barlist = this.barlist.slice(0, e + 1)
				// 				this.formdata = this.formdata.slice(0, e + 1)
			},

		},
		onBackPress: function(options) {
			
			if (options.from === 'navigateBack') {
				return false;
			}
			//返回上一个选择的父规则，如果是最后的规则，就推出界面
			if (this.huanchong.length >1) {
				this.huanchong.pop()
				this.barlist.pop()
				this.formdata = this.huanchong[this.huanchong.length - 1]
				return true
			} else {
				uni.showModal({
					title: '提示',
					content: '是否退出当前规则界面',
					confirmText: '退出',
					success: function(res) {
						if (res.confirm) {
							uni.navigateBack({
								delta: 1
							});
						} else if (res.cancel) {
                          
						}
					}
				});
			}
			return true
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
		min-height: 90upx;
		background-color: #FFFFFF;
		margin-top: 1upx;
		display: flex;
		flex-direction: row;
		padding-left: 40upx;
		padding-right: 35upx;
		justify-content: space-between;
		align-items: center;
	}

	.cadlist:active {
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
