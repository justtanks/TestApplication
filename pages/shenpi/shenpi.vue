<!-- 审批界面 -->
<template>
	<view>
		<!-- 管理人员的界面 -->
		<view v-if="isnormal==1">
			<view style="position: fixed; z-index: 99;width: 100%;">
				<view class="uni-flex uni-row">
					<view style="flex: 1;" class="topstle" :class="{border2text:isfirstbottom}" @click="firstclick">全部</view>
					<view style="flex: 1;" class="topstle" :class="{border2text:issecondbottom}" @click="secondlick">待审批</view>
					<view style="flex: 1;" class="topstle" :class="{border2text:isthirdbottom}" @click="thirdclick">已审批</view>
					<!-- <view style="flex: 1;" class="topstle" :class="{border2text:isfourbottom}" @click="fourclick">未通过</view> -->
				</view>
				<!-- <mSearch :show='false' @search="search1($event,0)"></mSearch> -->
			</view>
			<view style="height:90upx ;"></view>
			<view class="content">
				<view v-show="isfirstbottom" style="width: 100%;">
					<!-- 做一个列表   积分录入和积分申请，以及积分的状态都是后台给的状态，这里只是模拟-->
					<!-- 全部的审批 -->
					<view class="cadlist-one" v-for="(item,index) in allshenpilist" :key="index">
						<view class="toptext-one">{{item.reason}}</view>
						<view style="display: flex;flex-direction: row;justify-content: space-between;">
							<view class="toptext-two">审批对象：{{item.benefit_user_name}}</view>
							<view class="fenshustyle">{{item.score}}分</view>
						</view>
						<view class="toptext-two" v-if="!isluru">申请类别：{{item.cate_name}} </view>
						<view style="display: flex; flex-direction: row;align-items: center;margin-top:5upx;">
							<view class="shenpistyle-one ">初审人：{{item.pass_user_name1}}&nbsp;&nbsp; 终审人：{{item.pass_user_name2}}</view>
							<!-- 实现三种样式的方式 -->
							<!-- <view class="daishenpi" v-if="loadtype==1">
								小明&nbsp;&nbsp;待审批</view>
							<view class="daishenpi-tongguo" v-if="loadtype==2">
								小明&nbsp;&nbsp;通过</view>
							<view class="daishenpi-bohui" v-if="loadtype==3">
								小明&nbsp;&nbsp;驳回</view> -->
						</view>
						<view style="display: flex;margin-top: 15upx;">
							<view class="shenpistyle-one">申请时间: {{item.datestr}}&nbsp;&nbsp;&nbsp; &nbsp;申请人:{{item.apply_user_name}}</view>
						</view>

						<view class="buttoncontainer">
							<view>
								<button style="font-size: 25upx;" class="buttonstyle">查看</button>
							</view>
						</view>
					</view>
					<uni-load-more :status="status1" :contentText="contentText"></uni-load-more>
				</view>
				<view v-show="issecondbottom" style="width: 100%;">
					<!-- 申请待通过的界面 -->
					<view class="cadlist-one" v-for="(item,index) in nodolist" :key="index">
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
							<view class="shenpistyle-one">申请时间: {{item.datestr}}&nbsp;&nbsp;&nbsp; &nbsp;申请人:{{item.apply_user_name}}</view>
						</view>

						<view class="buttoncontainer">
							<view>
								<button style="font-size: 25upx;" class="buttonstyle" @click="toshenpi()">去审批</button>
							</view>
						</view>
					</view>
					<uni-load-more :status="status2" :contentText="contentText"></uni-load-more>
				</view>
				<view v-show="isthirdbottom" style="width: 100%;">
					<!-- 已经通过的界面 -->
					<view class="cadlist-one" v-for="(item,index) in completelist" :key="index">
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
							<view class="shenpistyle-one">申请时间: {{item.datestr}}&nbsp;&nbsp;&nbsp; &nbsp;申请人:{{item.apply_user_name}}</view>
						</view>
					</view>
					<uni-load-more :status="status3" :contentText="contentText"></uni-load-more>
				</view>

			</view>
		</view>
		<!-- 下面使用户的界面 -->
		<view v-else="">
			<view style="position: fixed; z-index: 99;width: 100%;background-color: #FFFFFF;">
				<view class="topbar">
					<view class="topbaritem" @click="fenlei">
						<view class="toptext1 ">分类</view>
						<image class="tonextstyle" src="../../../static/tobottom.png"></image>
					</view>
					<view class="topbaritem" @click="bumen">
						<view class="toptext1 ">部门</view>
						<image class="tonextstyle" src="../../../static/tobottom.png"></image>
					</view>
					<view class="topbaritem" @click="shijian('date')">
						<view class="toptext1 ">时间</view>
						<image class="tonextstyle" src="../../../static/tobottom.png"></image>
					</view>
				</view>
				<mSearch :show='false' @search="search2($event,0)"></mSearch>
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
		</view>

		<mx-date-picker :show="showPicker" :type="type" :value="value" :show-seconds="true" @confirm="onSelected" @cancel="onSelected" />
	</view>
</template>

<script>
	var _self;
	import mSearch from '../../components/mehaotian-search/mehaotian-search.vue'
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	import MxDatePicker from '../../components/mx-datepicker/mx-datepicker.vue'
	import dateutll from '../../common/util.js'
	import URL from '../../common/url.js'

	export default {
		components: {
			mSearch,
			uniLoadMore,
			MxDatePicker
		},
		data() {
			return {
				isnormal: 1, //是否是普通用户界面 1，不是
				isfirstbottom: true,
				issecondbottom: false,
				isthirdbottom: false,
				// isfourbottom: false,
				items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
				// 显示当前界面
				jiemiannum: 1,
				loadtype: 3,
				isluru: false,
				// 上推加载更多的
				status1: 'more',
				status2: 'more',
				status3: 'more',
				status: "more",
				loadingText: '加载中...',
				// loadingType: 0, //定义加载方式 0---contentdown  1---contentrefresh 2---contentnomore
				contentText: {
					contentdown: '上拉显示更多',
					contentrefresh: '正在加载...',
					contentnomore: '没有更多数据了'
				},
				// 时间控件的加载
				showPicker: false,
				date: '2019/01/01',
				type: 'date',
				value: '',
				usermsg: {}, //用户的信息对象
				token: '',
				page1: 1,
				page2: 1,
				page3: 1,
				allshenpilist: [],
				completelist: [],
				nodolist: []

			};
		},
		onLoad: function() {
			_self = this;
			this.token = uni.getStorageSync('token')
			this.changeTab()
			if (this.isnormal == 1) {
				// 管理人员的界面
				uni.showLoading({

				})
				this.getAllShenpiMsg()
				this.getnoneShenpi()
				this.getreadyShenpi()

			} else {
				// 普通用户界面

			}
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
			// // 执行下拉刷新的方法
			// setTimeout(function() {
			// 	uni.stopPullDownRefresh()
			// }, 1000)
			switch (_self.jiemiannum) {
				case 1:
					_self.page1 = 1
                     _self.allshenpilist=[]
					 this.getAllShenpiMsg()
					break;
				case 2:
					_self.page2 = 1
					_self.nodolist=[]
					this.getnoneShenpi()
					break;
				case 3:
					_self.page3 = 1
                    _self.completelist=[]
					this.getreadyShenpi()
					break;
				default:
					break

			}
		},
		onReachBottom: function() {
			//触底的时候请求数据，即为上拉加载更多
			//为了更加清楚的看到效果，添加了定时器

			switch (_self.jiemiannum) {
				case 1:
					_self.status1 = 'loading';
					_self.page1++
					this.getAllShenpiMsg()
					break;
				case 2:
					_self.status2 = 'loading'
					_self.page2++
					this.getnoneShenpi()
					break;
				case 3:
					_self.status3 = 'loading'
					_self.page3++
					this.getreadyShenpi()
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
				_self.isfourbottom = false;
				_self.jiemiannum = 1;
			},
			secondlick: function(e) {
				_self.isfirstbottom = false;
				_self.issecondbottom = true;
				_self.isthirdbottom = false;
				_self.isfourbottom = false;
				_self.jiemiannum = 2;
			},
			thirdclick: function(e) {
				_self.isfirstbottom = false;
				_self.issecondbottom = false;
				_self.isthirdbottom = true;
				_self.isfourbottom = false;
				_self.jiemiannum = 3;
			},
			search1(e, val) {
				// 搜索的方法
				console.log(e, val);
			},
			search2(e, val) {
				// 搜索的方法
				console.log(e, val);
			},
			changeTab() {
				uni.getStorage({
					//获取到登录时候传递到缓存中的用户信息字符串，并且解析成对象
					key: 'usermsg',
					success: function(res) {
						_self.usermsg = JSON.parse(res.data)
						if (_self.usermsg.data.user.job == 22) {
							// 是普通用户
							_self.isnormal = 2
							uni.setNavigationBarTitle({
								title: '积分事件'
							});
						} else {
							// 是管理用户
							_self.isnormal = 1
							uni.setNavigationBarTitle({
								title: '审批'
							});
						}
					}
				})

			},
			toshenpi: function(e) {
				uni.navigateTo({
					url: '../normaluser/myshenpi/myshenpi'
				})
			},
			fenlei: function(e) {
				uni.showActionSheet({
					itemList: ['列表1', '列表2', '列表3'],
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
				}
			},
			bumen: function(e) {
				uni.showActionSheet({
					itemList: ['部门1', '部门2', '部门3'],
					success: function(res) {

					}
				})
			},
			getAllShenpiMsg: function() {
				//获取所有的审批
				uni.request({
					url: URL.getshenpilist,
					data: {
						token: _self.token,
						deviceType: "android",
						type: 'all',
						page: _self.page1,
						pageSize: 15
					},

					complete: (e) => {
						_self.status1 = 'more'
						uni.hideLoading()
						uni.stopPullDownRefresh()
						if (e.data.code == '1') {
							if (e.data.data.applyList.length == 0) {
								_self.status1 = 'nomore'
								return
							}
							_self.allshenpilist = _self.allshenpilist.concat(e.data.data.applyList)
							for (let it of _self.allshenpilist) {
								let date = new Date(it.apply_time * 1000)
								it.datestr = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDay() + ' ' + date.getHours() + ':' +
									date.getMinutes()
							}


						} else {
							uni.showToast({
								title: '信息获取失败',
								duration: 1000
							})
						}
					}
				})
			},
			getnoneShenpi: function() {
				//获取到所有的未审批
				uni.request({
					url: URL.getshenpilist,
					data: {
						token: _self.token,
						deviceType: "android",
						type: 'apply',
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
							_self.nodolist = _self.nodolist.concat(e.data.data.applyList)

						} else {
							uni.showToast({
								title: '信息获取失败',
								duration: 1000
							})
						}
					}
				})

			},
			getreadyShenpi: function() {
				//获取到所有的已审批
				uni.request({
					url: URL.getshenpilist,
					data: {
						token: _self.token,
						deviceType: "android",
						type: 'done',
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
							_self.completelist = _self.completelist.concat(e.data.data.applyList)

						} else {
							uni.showToast({
								title: '信息获取失败',
								duration: 1000
							})
						}
					}
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
