<!-- 展示 使用横向引导页面 -->
<template>
	<view>
		<view style="position: fixed; z-index: 99;width: 100%;">
			<view class="uni-flex uni-row">
				<view style="flex: 1;" class="topstle" :class="{border2text:isfirstbottom}" @click="firstclick">进行中</view>
				<view style="flex: 1;" class="topstle" :class="{border2text:issecondbottom}" @click="secondlick">未开始</view>
				<view style="flex: 1;" class="topstle" :class="{border2text:isthirdbottom}" @click="thirdclick">已结束</view>
			</view>
			<mSearch :show='false' @search="search($event,0)"></mSearch>
		</view>
		<view style="height:170upx ;"></view>
		<!-- <scroll-view scroll-y="true" scroll-left="0"> -->
		<view class="content">
			<view v-show="isfirstbottom" style="width: 100%;">
				<!-- 第一个列表 积分录入 -->
				<view class="cadlist-one">
					<view class="toptext-one">这是第一个列表的改善 待审批积分录入</view>
					<view style="display: flex;flex-direction: row;justify-content: space-between;">
						<view class="toptext-two">积分录入</view>
						<view class="fenshustyle">40分</view>
					</view>
					<view style="display: flex; flex-direction: row;align-items: center;margin-top:5upx;">
						<view class="shenpistyle-one "> 审批人:</view>
						<!-- 实现三种样式的方式 -->
						<view class="daishenpi" v-if="type==1">
							小明&nbsp;&nbsp;待审批</view>
						<view class="daishenpi-tongguo" v-if="type==2">
							小明&nbsp;&nbsp;通过</view>
						<view class="daishenpi-bohui" v-if="type==3">
							小明&nbsp;&nbsp;驳回</view>
					</view>
					<view style="display: flex;margin-top: 15upx;margin-left: 20upx;">
						<view shenpistyle-one>申请时间: 04月06日&nbsp;&nbsp;&nbsp; &nbsp;申请人:张小孔</view>
					</view>

					<view class="buttoncontainer">
						<view>
							<button style="font-size: 25upx;" class="buttonstyle-gray">去审批</button>
						</view>
					</view>
				</view>
				<!-- 第三个列表  积分录入驳回-->
				<view class="cadlist-one">
					<view class="toptext-one">驳回积分录入</view>
					<view style="display: flex;flex-direction: row;justify-content: space-between;">
						<view class="toptext-two">积分录入</view>
						<view class="fenshustyle">40分</view>
					</view>
					<view style="display: flex; flex-direction: row;align-items: center;margin-top:5upx;">
						<view class="shenpistyle-one "> 审批人:</view>
						<view class="daishenpi-bohui">
							小明&nbsp;&nbsp;驳回</view>
					</view>
					<view style="display: flex;margin-top: 15upx;margin-left: 20upx;">
						<view shenpistyle-one>申请时间: 04月06日&nbsp;&nbsp;&nbsp; &nbsp;申请人:张小孔</view>
					</view>

					<view class="buttoncontainer">
						<view>
							<button style="font-size: 25upx;" class="buttonstyle">撤回</button>
						</view>
					</view>
				</view>
				<!-- 第四个列表 积分录入通过 -->
				<view class="cadlist-one">
					<view class="toptext-one">通过积分录入</view>
					<view style="display: flex;flex-direction: row;justify-content: space-between;">
						<view class="toptext-two">积分录入</view>
						<view class="fenshustyle">40分</view>
					</view>
					<view style="display: flex; flex-direction: row;align-items: center;margin-top:5upx;">
						<view class="shenpistyle-one "> 审批人:</view>
						<view class="daishenpi-tongguo">
							小明&nbsp;&nbsp;通过</view>
					</view>
					<view style="display: flex;margin-top: 15upx;margin-left: 20upx;">
						<view shenpistyle-one>申请时间: 04月06日&nbsp;&nbsp;&nbsp; &nbsp;申请人:张小孔</view>
					</view>

					<view class="buttoncontainer">
						<view>
							<button style="font-size: 25upx;" class="buttonstyle">撤回</button>
						</view>
					</view>
				</view>
				<!-- 第二个列表  积分申请-->
				<view class="cadlist-one">
					<view class="toptext-one">待审批积分申请</view>
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
						<view shenpistyle-one>申请时间: 04月06日&nbsp;&nbsp;&nbsp; &nbsp;申请人:张小孔</view>
					</view>

					<view class="buttoncontainer">
						<view>
							<button style="font-size: 25upx;" class="buttonstyle">去审批</button>
						</view>
					</view>
				</view>
				<!-- 第三个列表  积分申请驳回-->
				<view class="cadlist-one">
					<view class="toptext-one">驳回积分申请</view>
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
						<view shenpistyle-one>申请时间: 04月06日&nbsp;&nbsp;&nbsp; &nbsp;申请人:张小孔</view>
					</view>

					<view class="buttoncontainer">
						<view>
							<button style="font-size: 25upx;" class="buttonstyle">撤回</button>
						</view>
					</view>
				</view>
				<!-- 第四个列表 积分申请通过 -->
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
						<view shenpistyle-one>申请时间: 04月06日&nbsp;&nbsp;&nbsp; &nbsp;申请人:张小孔</view>
					</view>

					<view class="buttoncontainer">
						<view>
							<button style="font-size: 25upx;" class="buttonstyle">撤回</button>
						</view>
					</view>
				</view>

			</view>

			<view v-show="issecondbottom" style="width: 100%;">
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
							<button style="font-size: 25upx;" class="buttonstyle">查看</button>
						</view>
					</view>
				</view>
				<!-- 我的申请 申请通过 -->
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

				<!-- 我的申请 申请驳回 -->
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

				<!-- 我的任务-->
				<view class="cadlist-one">
					<view class="toptext-one">我发布的任务的内容</view>
					<view style="display: flex;flex-direction: row;justify-content: space-between;">
						<view class="toptext-two">我发布的任务</view>
						<view class="fenshustyle">40分</view>
					</view>

					<view class="toptext-two">备注:由于什么什么 </view>
					<view style="display: flex; flex-direction: row;align-items: center;margin-top:5upx;">
						<view class="shenpistyle-one "> 截止时间:1992-9-10</view>
					</view>
					<view style="display: flex;margin-top: 15upx;margin-left: 20upx;">
						<view shenpistyle-one>完成状态:未完成 &nbsp;&nbsp;负责人:小明 </view>
					</view>

					<view class="buttoncontainer">
						<view style="display: flex;flex-direction: row;">
							<button style="font-size: 25upx;margin-right: 20upx;" class="buttonstyle">修改</button>
							<button style="font-size: 25upx;" class="buttonstyle">查看</button>
						</view>
					</view>
				</view>
				<!-- 我领取的任务-->
				<view class="cadlist-one">
					<view class="toptext-one">我领取的任务的内容</view>
					<view style="display: flex;flex-direction: row;justify-content: space-between;">
						<view class="toptext-two">我领取的的任务</view>
						<view class="fenshustyle">40分</view>
					</view>

					<view class="toptext-two">备注:由于什么什么 </view>
					<view style="display: flex; flex-direction: row;align-items: center;margin-top:5upx;">
						<view class="shenpistyle-one "> 截止时间:1992-9-10</view>
					</view>
					<view style="display: flex;margin-top: 15upx;margin-left: 20upx;">
						<view shenpistyle-one>完成状态:未完成 &nbsp;&nbsp;发布人:小明吱吱 &nbsp;&nbsp;负责:小明吱吱</view>
					</view>

					<view class="buttoncontainer">
						<view style="display: flex;flex-direction: row;">
							<button style="font-size: 25upx;" class="buttonstyle">查看</button>
						</view>
					</view>
				</view>


			</view>
			<view v-show="isthirdbottom" style="width: 100%;">
				<!-- 积分事件的列表 -->

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


			</view>
		</view>
		<!-- </scroll-view> -->
	</view>
</template>

<script>
	var _self;
	import mSearch from '../../../components/mehaotian-search/mehaotian-search.vue'
	export default {
		components: {
			mSearch
		},
		data() {
			return {
				isfirstbottom: true,
				issecondbottom: false,
				isthirdbottom: false,
				items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
				type: 3,

			};
		},
		onLoad: function() {
			_self = this;
		},
		onBackPress: function() {
			// 覆盖之前的方法 return true
		},
		methods: {
			firstclick: function(e) {
				_self.isfirstbottom = true;
				_self.issecondbottom = false;
				_self.isthirdbottom = false;
			},
			secondlick: function(e) {
				_self.isfirstbottom = false;
				_self.issecondbottom = true;
				_self.isthirdbottom = false;
			},
			thirdclick: function(e) {
				_self.isfirstbottom = false;
				_self.issecondbottom = false;
				_self.isthirdbottom = true;
			},
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
	}

	.topstle {
		display: flex;
		font-size: 30upx;
		height: 75upx;
		justify-content: center;
		align-items: center;
		background-color: #FFFFFF;
		border-bottom-style: solid;
		border-bottom-color: #F1F1F3;
		border-bottom-width: 1upx;
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

	/* 第一个列表 待审批-积分录入 */
	.cadlist-one {
		min-height: 350upx;
		background-color: #FFFFFF;
		margin-left: 10upx;
		margin-top: 10upx;
		margin-bottom: 10upx;
		margin-right: 10upx;
		display: flex;
		flex-direction: column;
	}

	.toptext-one {
		display: flex;
		min-height: 50upx;
		font-size: 35upx;
		margin: 20upx 20upx 20upx 20upx;
		text-align: left;
	}

	.toptext-two {
		font-size: 29upx;
		margin-left: 20upx;
		margin-top: 0upx;
		text-align: left;
		color: #666666;
		line-height: 1.5;
	}

	.shenpistyle-one {
		font-size: 30upx;
		display: flex;
		margin-left: 20upx;
		justify-content: center;
		align-items: center;
		line-height: 1.8;
	}

	.daishenpi {
		border: #CCCCCC 1upx solid;
		border-radius: 3upx;
		font-size: 30upx;
		padding: 0upx 5upx 0upx 5upx;
		margin-left: 40upx;
		line-height: 1.8;
	}

	/* 审批驳回 */
	.daishenpi-bohui {
		border: #CD0000 1upx solid;
		border-radius: 3upx;
		font-size: 30upx;
		padding: 0upx 5upx 0upx 5upx;
		margin-left: 40upx;
		line-height: 1.8;
		color: #CD0000;

	}

	/* 审批通过 */
	.daishenpi-tongguo {
		border: #008B00 1upx solid;
		border-radius: 3upx;
		font-size: 30upx;
		padding: 0upx 5upx 0upx 5upx;
		margin-left: 40upx;
		line-height: 1.8;
		color: #008B00;
	}

	.buttoncontainer {
		display: flex;
		width: auto;
		height: 100%;
		margin: 20upx 20upx 20upx 20upx;
		flex-direction: row;
		justify-content: flex-end;
	}

	.fenshustyle {
		color: #007AFF;
		font-size: 40upx;
		margin-right: 30upx;
	}


	/*事件列表的样式  */
	.thingstyle {
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-top: 5upx;
		justify-content: space-between;
	}
</style>
