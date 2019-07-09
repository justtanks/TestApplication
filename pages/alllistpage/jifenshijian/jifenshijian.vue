<!-- 积分事件 界面  这个界面在普通员工中是在首页tab上的-->
<template>
	<view>
		<view style="position: fixed; z-index: 99;width: 100%;background-color: #FFFFFF;">
			<view class="topbar">
				<!-- <view class="topbaritem" @click="fenlei">
					<view class="toptext1 ">{{types}}</view>
					<image class="tonextstyle" src="../../../static/tobottom.png"></image>
				</view> -->
				<!-- <view class="topbaritem" @click="bumen">
					<view class="toptext1 ">部门</view>
					<image class="tonextstyle" src="../../../static/tobottom.png"></image>
				</view> -->
				<view class="topbaritem" @click="shijian('date')">
					<view class="toptext1 ">时间</view>
					<image class="tonextstyle" src="../../../static/tobottom.png"></image>
				</view>
			</view>
			<!-- <mSearch :show='false' @search="search($event,0)"></mSearch> -->
		</view>
		<view style="height:90upx ;"></view>
		<view>
			<view style="width: 100%;">
				
				<!-- 做一个列表   积分录入和积分申请，以及积分的状态都是后台给的状态，这里只是模拟-->
				<!-- 所有的任务 -->
				<view class="cadlist-one" v-for="(item,index) in jifenlist" :key="index">
					<view class="toptext-one">{{item.reason}}</view>
					<view style="display: flex;flex-direction: row;justify-content: space-between;">
						<view class="toptext-two">分类:{{item.cate_name}}</view>
						<view class="fenshustyle">{{item.score}}</view>
					</view>

					<view class="toptext-two">备注:{{item.mark}} </view>
					<view style="display: flex; flex-direction: row;align-items: center;margin-top:5upx;">
						<view class="shenpistyle-one ">申请时间:{{item.apply_time}}</view>
					</view>
					<view class="thingstyle">
						<view class="shenpistyle-one ">积分对象：{{item.benefit_user_name}}</view>
						<view class="shenpistyle-one" style="margin-right: 20upx;">操作人：{{item.apply_user_name}}</view>
					</view>
					<view style="display: flex; flex-direction: row;align-items: center;margin-top:5upx;margin-bottom: 10upx;">
						<view v-if="item.in==0" class="shenpistyle-one " style="color: #666666;">审批状态:{{item.info}}</view>
						<view v-else-if="item.in==1" class="shenpistyle-one " style="color: #09BB07;">审批状态:{{item.info}}</view>
						<view v-else="" class="shenpistyle-one " style="color: #CD0000;">审批状态:{{item.info}}</view>
					</view>
				</view>
				<uni-load-more :status="status" :contentText="contentText"></uni-load-more>
			</view>
		</view>
		<!-- </scroll-view> -->
		<mx-date-picker :show="showPicker" :type="type" :value="value" :show-seconds="true" @confirm="onSelected" @cancel="onSelected" />
	</view>
</template>

<script>
	var _self;
	import mSearch from '../../../components/mehaotian-search/mehaotian-search.vue'
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	import MxDatePicker from '../../../components/mx-datepicker/mx-datepicker.vue'
	import dateutll from '../../../common/util.js'
	import URL from '../../../common/url.js'
	export default {
		components: {
			mSearch,
			uniLoadMore,
			MxDatePicker
		},
		data() {
			return {
				items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
				// 上推加载更多的
				status: 'more',
				loadingText: '加载中...',
				contentText: {
					contentdown: '↑上拉显示更多',
					contentrefresh: '正在加载...',
					contentnomore: '没有更多数据了'
				},
				// 时间选择器需要的数据
				showPicker: false,
				date: '2019/01/01',
				type: 'date',
				value: '',
				page1: 1,
				token: '',
				model:0  ,//0 是普通状态，  1是 时间选择状态
				time:'',
				jifenlist:[],
				types:"全部"

			};
		},
		onLoad: function() {
			_self = this;
			this.token = uni.getStorageSync('token')
			uni.showLoading({

			})
			this.getallmessge(0)

		},
		onReady() {
			this.date = dateutll.dateUtils.getNowFormatDate()
		},
		onBackPress: function() {
			// 覆盖之前的方法 return true
			if (this.showPicker) {
				this.showPicker = false
				return true
			}
		},
		onPullDownRefresh: function() {
			// 执行下拉刷新的方法
			this.model=0
			this.jifenlist = []
			_self.page1 = 1
			this.getallmessge()
           

		},
		onReachBottom: function() {
			//触底的时候请求数据，即为上拉加载更多
			_self.status = 'loading';
			_self.page1++
			if(this.model==0)
			this.getallmessge()
			else
			this.getallmessageoftime(this.time)
		},
		methods: {
			search(e, val) {
				// 搜索的方法
			},
			fenlei: function(e) {
				uni.showActionSheet({
					itemList: ['全部', '待审批', '已通过','未通过'],
					success: function(res) {
                       
					}
				})
			},
			shijian: function(type) {
				//弹出时间的选择框
				this.type = type;
				this.showPicker = true;
				this.value = this[type];
			},
			onSelected(e) { //选择时间的picker
				this.showPicker = false;
				if (e) {
					this[this.type] = e.value;
					this.time = e.value.replace(/\//g, '-')
				}
				//选择时间之后，将所有列表清空，然后传入时间，下拉刷新后，时间为默认
				console.error(this.time)
				_self.jifenlist=[]
				this.model=1
				this.getallmessageoftime(this.time)
				uni.showLoading({
					title:'正在获取数据'
				})
				
			},
			bumen: function(e) {
				uni.showActionSheet({
					itemList: ['部门1', '部门2', '部门3'],
					success: function(res) {
                         
					}
				})
			},
			getallmessge: function() {
				//获取所有的积分事件列表
				uni.request({
					url: URL.jifenlist,
					data: {
						token: _self.token,
						deviceType: "android",
						page: _self.page1,
						pageSize: 15,
						type:'all'
					},
					complete: (e) => {
						_self.status = 'more'
						uni.hideLoading()
						uni.stopPullDownRefresh()
						if (e.data.code == '1') {
							if (e.data.data.scoreList.length == 0 || e.data.data.scoreList == null) {
								_self.status = 'nomore'
								return
							}
							let datalist=e.data.data.scoreList
							for(let da of datalist){
								if(da.pass_status1==0){
									da.info='初审审核中'
									da.in=0
								}else if(da.pass_status1==1){
									if(da.pass_status2==0){
										da.info='初审通过，终审审核中'
										da.in=0
									}else if(da.pass_status2==1){
										
										if(da.status==0){
											da.info='终审通过，管理员审核中'
											da.in=0
										}else if(da.status==1){
											da.info='管理员审核通过，积分录入成功'
											da.in=1
										}else{
											da.info='管理员审核未通过'
											da.in=2
										}
										
									}else{
										da.info='终审未通过'
										da.in=2
									}
									
								}else{
									da.info='初审未通过'
									da.in=2
								}
							}
							_self.jifenlist = _self.jifenlist.concat(datalist)
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
			getallmessageoftime:function(time){
				uni.request({
					url: URL.jifenlist,
					data: {
						token: _self.token,
						deviceType: "android",
						page: _self.page1,
						pageSize: 15,
						applyTime:time,
						type:'all'
					},
				
					complete: (e) => {
						console.error(e.data)
						_self.status = 'more'
						uni.hideLoading()
						uni.stopPullDownRefresh()
						if (e.data.code == '1') {
							if (e.data.data.scoreList.length == 0 || e.data.data.scoreList == null) {
								_self.status = 'nomore'
								return
							}
							let datalist=e.data.data.scoreList
							for(let da of datalist){
								if(da.pass_status1==0){
									da.info='初审审核中'
									da.in=0
								}else if(da.pass_status1==1){
									if(da.pass_status2==0){
										da.info='初审通过，终审审核中'
										da.in=0
									}else if(da.pass_status2==1){
										
										if(status==0){
											da.info='终审通过，管理员审核中'
											da.in=0
										}else if(status==1){
											da.info='管理员审核通过，积分录入成功'
											da.in=1
										}else{
											da.info='管理员审核未通过'
											da.in=2
										}
										
									}else{
										da.info='终审未通过'
										da.in=2
									}
									
								}else{
									da.info='初审未通过'
									da.in=2
								}
							}
							_self.jifenlist = _self.jifenlist.concat(datalist)
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
		font-size: 30upx;
		margin-right: 10upx;
	}

	.topbar {
		height: 60upx;
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-top: 10upx;
	}

	.topbaritem {
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-left: 25upx;
	}
</style>
