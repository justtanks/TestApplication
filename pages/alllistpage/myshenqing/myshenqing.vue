<!-- 我的申请界面 -->
<template>
	<view>
		<view style="position: fixed; z-index: 99;width: 100%;">
			<view class="uni-flex uni-row">
				<view style="flex: 1;" class="topstle" :class="{border2text:isfirstbottom}" @click="firstclick">待审批</view>
				<view style="flex: 1;" class="topstle" :class="{border2text:issecondbottom}" @click="secondlick">已通过</view>
				<view style="flex: 1;" class="topstle" :class="{border2text:isthirdbottom}" @click="thirdclick">未通过</view>
			</view>
			<!-- <mSearch :show='false' @search="search($event,0)"></mSearch> -->
		</view>
		<view style="height:90upx ;"></view>
		<view>
			<view v-show="isfirstbottom" style="width: 100%;">
				<!-- 做一个列表   积分录入和积分申请，以及积分的状态都是后台给的状态，这里只是模拟-->
				<!-- 我的申请 申请待审批 -->
				<view class="cadlist-one" v-for="(item,index) in notshenpi" :key="index">
					<view class="toptext-one">{{item.reason}}</view>
					<view style="display: flex;flex-direction: row;justify-content: space-between;">
						<view class="toptext-two">审批对象：{{item.benefit_user_name}}</view>
						<view class="fenshustyle">{{item.score}}分</view>
					</view>
					<view class="toptext-two" v-if="!isluru">申请类别：{{item.cate_name}} </view>
					<view style="display: flex; flex-direction: row;align-items: center;margin-top:5upx;">
						<view class="shenpistyle-one ">初审人：{{item.pass_user_name1}}&nbsp;&nbsp; 终审人：{{item.pass_user_name2}}</view>
					</view>
					<view style="display: flex;margin-top: 15upx;">
						<view class="shenpistyle-one">申请时间: {{item.apply_time}}&nbsp;&nbsp;&nbsp; &nbsp;申请人:{{item.apply_user_name}}</view>
					</view>

					<view class="buttoncontainer">
						<view>
						<button style="font-size: 25upx;" class="buttonstyle" @click="toshenpi(item)">查看</button>
						</view>
					</view>
				</view>

				<uni-load-more :status="status1" :contentText="contentText"></uni-load-more>
			</view>

			<view v-show="issecondbottom" style="width: 100%;">
				<!-- 通过的申请 -->
				<view class="cadlist-one" v-for="(item,index) in allreadyshenpi" :key="index">
					<view class="toptext-one">{{item.reason}}</view>
					<view style="display: flex;flex-direction: row;justify-content: space-between;">
						<view class="toptext-two">审批对象：{{item.benefit_user_name}}</view>
						<view class="fenshustyle">{{item.score}}分</view>
					</view>
					<view class="toptext-two" v-if="!isluru">申请类别：{{item.cate_name}} </view>
					<view style="display: flex; flex-direction: row;align-items: center;margin-top:5upx;">
						<view class="shenpistyle-one ">初审人：{{item.pass_user_name1}}&nbsp;&nbsp; 终审人：{{item.pass_user_name2}}</view>
					</view>
					<view style="display: flex;margin-top: 15upx;">
						<view class="shenpistyle-one">申请时间: {{item.apply_time}}&nbsp;&nbsp;&nbsp; &nbsp;申请人:{{item.apply_user_name}}</view>
					</view>

					<view class="buttoncontainer">
						<view>
							<button style="font-size: 25upx;" class="buttonstyle" @click="toshenpi(item)">查看</button>
						</view>
					</view>
				</view>


				<uni-load-more :status="status2" :contentText="contentText"></uni-load-more>
			</view>
			<view v-show="isthirdbottom" style="width: 100%;">
				<view class="cadlist-one" v-for="(item,index) in refuseshenpi" :key="index">
					<view class="toptext-one">{{item.reason}}</view>
					<view style="display: flex;flex-direction: row;justify-content: space-between;">
						<view class="toptext-two">审批对象：{{item.benefit_user_name}}</view>
						<view class="fenshustyle">{{item.score}}分</view>
					</view>
					<view class="toptext-two" v-if="!isluru">申请类别：{{item.cate_name}} </view>
					<view style="display: flex; flex-direction: row;align-items: center;margin-top:5upx;">
						<view class="shenpistyle-one ">初审人：{{item.pass_user_name1}}&nbsp;&nbsp; 终审人：{{item.pass_user_name2}}</view>
					</view>
					<view style="display: flex;margin-top: 15upx;">
						<view class="shenpistyle-one">申请时间: {{item.apply_time}}&nbsp;&nbsp;&nbsp; &nbsp;申请人:{{item.apply_user_name}}</view>
					</view>
					<view class="buttoncontainer">
						<view>
							<button style="font-size: 25upx;" class="buttonstyle" @click="toshenpi(item)">查看</button>
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
	import URL from '../../../common/url.js'
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
				isluru: false,
				// 上推加载更多的
				status1: 'more',
				status2: 'more',
				status3: 'more',
				loadingText: '加载中...',
				// loadingType: 0, //定义加载方式 0---contentdown  1---contentrefresh 2---contentnomore
				contentText: {
					contentdown: '上拉显示更多',
					contentrefresh: '正在加载...',
					contentnomore: '没有更多数据了'
				},
				token: '',
				page1: 1,
				page2: 1,
				page3: 1,
				notshenpi: [], //所有的申请的列表
				allreadyshenpi: [], //申请通过的列表
				refuseshenpi: [], //申请驳回的列表

			};
		},
		onLoad: function() {
			_self = this;
			this.token = uni.getStorageSync('token')
			uni.showLoading({

			})
			this.getnotShenpiMsg()
			this.getReadyShenpi()
			this.getrefuseShenpi()

		},
		onBackPress: function() {

		},
		onPullDownRefresh: function() {
			switch (_self.jiemiannum) {
				case 1:
					_self.page1 = 1
					_self.notshenpi = []
					this.getnotShenpiMsg()
					break;
				case 2:
					_self.page2 = 1
					_self.allreadyshenpi = []
					this.getReadyShenpi()
					break;
				case 3:
					_self.page3 = 1
					_self.refuseshenpi = []
					this.getrefuseShenpi()
					break;
				default:
					break

			}
		},
		onReachBottom: function() {
			//触底的时候请求数据，即为上拉加载更多
			//为了更加清楚的看到效果，添加了定
			switch (_self.jiemiannum) {
				case 1:
					_self.status1 = 'loading';
					_self.page1++
					this.getnotShenpiMsg()
					break;
				case 2:
					_self.status2 = 'loading'
					_self.page2++
					this.getReadyShenpi()
					break;
				case 3:
					_self.status3 = 'loading'
					_self.page3++
					this.getrefuseShenpi()
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
			seeshenqing: function(e) {
				uni.navigateTo({
					url: '../../normaluser/seeShenqing/seeShenqing'
				})
			},
			getnotShenpiMsg: function() {
				//获取所有的审批
				uni.request({
					url: URL.myshenpi,
					data: {
						token: _self.token,
						deviceType: "android",
						type: 'apply',
						page: _self.page1,
						pageSize: 15
					},

					complete: (e) => {
						console.error(JSON.stringify(e.data))
						_self.status1 = 'more'
						uni.hideLoading()
						uni.stopPullDownRefresh()
						if (e.data.code == '1') {
							if (e.data.data.applyList.length == 0) {
								_self.status1 = 'nomore'
								return
							}
							_self.notshenpi = _self.notshenpi.concat(e.data.data.applyList)
						} else {
							_self.toast(e.data.msg)
						}
					},
					fail: function(res) {
						_self.toast('网络错误')
						
					}
				})
			},
			getReadyShenpi: function() {
				//获取到所有的未审批
				uni.request({
					url: URL.myshenpi,
					data: {
						token: _self.token,
						deviceType: "android",
						type: 'pass',
						page: _self.page2,
						pageSize: 15
					},

					complete: (e) => {
						_self.status2 = 'more'
						uni.hideLoading()
						uni.stopPullDownRefresh()
						if (e.data.code == '1') {
							if (e.data.data.applyList.length == 0) {
								_self.status2 = 'nomore'
								return
							}
							_self.allreadyshenpi = _self.allreadyshenpi.concat(e.data.data.applyList)

						} else {
							_self.toast(e.data.msg)
						}
					},
					fail: function(res) {
						_self.toast('网络错误')
					}
				})

			},
			getrefuseShenpi: function() {
				//获取到所有的已审批
				uni.request({
					url: URL.myshenpi,
					data: {
						token: _self.token,
						deviceType: "android",
						type: 'refuse',
						page: _self.page3,
						pageSize: 15
					},

					complete: (e) => {
						_self.status3 = 'more'
						uni.hideLoading()
						uni.stopPullDownRefresh()
						if (e.data.code == '1') {
							if (e.data.data.applyList.length == 0) {
								_self.status3 = 'nomore'
								return
							}
							_self.refuseshenpi = _self.refuseshenpi.concat(e.data.data.applyList)

						} else {
							_self.toast(e.data.msg)
						}
					},
					fail: function(res) {
						// #ifdef APP-PLUS
						plus.nativeUI.toast("网络错误");
						// #endif
						//#ifdef MP-WEIXIN
						uni.showToast({
							title: '网络错误',
							duration: 1000,
							icon: 'none',
							position: 'bottom'
						})
						// #endif
						
					}
				})
			},
			toshenpi: function(e) {
				//跳转到我的申请的详情
				uni.navigateTo({
					url:'../../normaluser/shenpixiangqing/shenpixiangqing?itemdata='+encodeURIComponent(JSON.stringify(e))
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
