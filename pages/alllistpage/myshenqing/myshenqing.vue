<!-- 我的申请界面 -->
<template>
	<view>
		<view style="position: fixed; z-index: 99;width: 100%;">
			<view class="uni-flex uni-row">
				<view style="flex: 1;" class="topstle" :class="{border2text:isfirstbottom}" @click="firstclick">待审批</view>
				<view style="flex: 1;" class="topstle" :class="{border2text:issecondbottom}" @click="secondlick">已通过</view>
				<view style="flex: 1;" class="topstle" :class="{border2text:isthirdbottom}" @click="thirdclick">未通过</view>
			</view>
			<mSearch :show='false' @search="search($event,0)"></mSearch>
		</view>
		<view style="height:170upx ;"></view>
		<view >
			<view v-show="isfirstbottom" style="width: 100%;">
				<!-- 做一个列表   积分录入和积分申请，以及积分的状态都是后台给的状态，这里只是模拟-->
				<!-- 我的申请 申请待审批 -->
				<view class="cadlist-one">
					<view class="toptext-one">通过积分申请</view>
					<view style="display: flex;flex-direction: row;justify-content: space-between;">
						<view class="toptext-two">积分申请</view>
						<view class="fenshustyle">40分</view>
					</view>

					<view class="toptext-two">申请事由：由于什么什么 </view>
					<view style="display: flex; flex-direction: row;align-items: center;margin-top:5upx;">
						<view class="shenpistyle-one "> 审批人:</view>
						<view class="daishenpi">
							小明&nbsp;&nbsp;待审批</view>
					</view>
					<view style="display: flex;margin-top: 15upx;margin-left: 20upx;">
						<view shenpistyle-one>申请时间: 04月06日</view>
					</view>

					<view class="buttoncontainer">
						<view style="display: flex;flex-direction: row;">
							<button style="font-size: 25upx;margin-right: 20upx;" class="buttonstyle">删除</button>
							<button style="font-size: 25upx;" class="buttonstyle" @click="seeshenqing()">查看</button>
						</view>
					</view>
				</view>
				<uni-load-more :status="status1" :contentText="contentText"></uni-load-more>
			</view>
			<view v-show="issecondbottom" style="width: 100%;">
				<!-- 通过的申请 -->
				<view class="cadlist-one">
					<view class="toptext-one">通过积分申请</view>
					<view style="display: flex;flex-direction: row;justify-content: space-between;">
						<view class="toptext-two">积分申请</view>
						<view class="fenshustyle">40分</view>
					</view>

					<view class="toptext-two">申请事由：由于什么什么 </view>
					<view style="display: flex; flex-direction: row;align-items: center;margin-top:5upx;">
						<view class="shenpistyle-one "> 审批人:</view>
						<view class="daishenpi-tongguo">
							小明&nbsp;&nbsp;通过</view>
					</view>
					<view style="display: flex;margin-top: 15upx;margin-left: 20upx;">
						<view shenpistyle-one>申请时间: 04月06日</view>
					</view>

					<view class="buttoncontainer">
						<view style="display: flex;flex-direction: row;">
							<button style="font-size: 25upx;" class="buttonstyle">查看</button>
						</view>
					</view>
				</view>
				<uni-load-more :status="status2" :contentText="contentText"></uni-load-more>
			</view>
			<view v-show="isthirdbottom" style="width: 100%;">
				<!-- 驳回的申请 -->
				<view class="cadlist-one">
					<view class="toptext-one">通过积分申请</view>
					<view style="display: flex;flex-direction: row;justify-content: space-between;">
						<view class="toptext-two">积分申请</view>
						<view class="fenshustyle">40分</view>
					</view>

					<view class="toptext-two">申请事由：由于什么什么 </view>
					<view style="display: flex; flex-direction: row;align-items: center;margin-top:5upx;">
						<view class="shenpistyle-one "> 审批人:</view>
						<view class="daishenpi-bohui">
							小明&nbsp;&nbsp;驳回</view>
					</view>
					<view style="display: flex;margin-top: 15upx;margin-left: 20upx;">
						<view shenpistyle-one>申请时间: 04月06日</view>
					</view>

					<view class="buttoncontainer">
						<view style="display: flex;flex-direction: row;">
							<button style="font-size: 25upx;margin-right: 20upx;" class="buttonstyle">删除</button>
							<button style="font-size: 25upx;" class="buttonstyle">查看</button>
						</view>
					</view>
				</view>
				<uni-load-more :status="status3" :contentText="contentText"></uni-load-more>
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
				isfirstbottom: true,
				issecondbottom: false,
				isthirdbottom: false,
				items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
				// 显示当前界面
				jiemiannum: 1,
				type: 3,
				isluru: false,
				// 上推加载更多的
				status1: 'more',
				status2: 'loading',
				status3: 'noMore',
				status4: 'noMore',
				loadingText: '加载中...',
				// loadingType: 0, //定义加载方式 0---contentdown  1---contentrefresh 2---contentnomore
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
			//为了更加清楚的看到效果，添加了定时器
			console.log(_self.jiemiannum);
			console.log(_self.status1)

			switch (_self.jiemiannum) {
				case 1:
					_self.status1 = 'loading';
					console.log(_self.status1)
					break;
				case 2:
					_self.status2 = 'loading'
					break;
				case 3:
					_self.status3 = 'loading'
					break;

				default:
					break;
			}


		},
		methods: {
			firstclick: function(e) {
				_self.isfirstbottom = true;
				_self.issecondbottom = false;
				_self.isthirdbottom = false;

				_self.jiemiannum = 1;
			},
			secondlick: function(e) {
				_self.isfirstbottom = false;
				_self.issecondbottom = true;
				_self.isthirdbottom = false;

				_self.jiemiannum = 2;
			},
			thirdclick: function(e) {
				_self.isfirstbottom = false;
				_self.issecondbottom = false;
				_self.isthirdbottom = true;

				_self.jiemiannum = 3;
			},
			search(e, val) {
				// 搜索的方法
				console.log(e, val);
			},
			seeshenqing:function(e){
				uni.navigateTo({
					url:'../../normaluser/seeShenqing/seeShenqing'
				})
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

	
	.border2text {
		color: #007AFF;
		border-bottom-style: solid;
		border-bottom-color: #007AFF;
		border-bottom-width: 1upx;
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
</style>
