<!-- 展示 使用横向引导页面 -->
<template>
	<view >
		<view class="uni-flex uni-row" style="position: fixed; z-index: 99;width: 100%;" >
			<view style="flex: 1;" class="topstle" :class="{border2text:isfirstbottom}" @click="firstclick">进行中</view>
			<view style="flex: 1;" class="topstle" :class="{border2text:issecondbottom}" @click="secondlick">未开始</view>
			<view style="flex: 1;" class="topstle" :class="{border2text:isthirdbottom}" @click="thirdclick">已结束</view>
		</view>
		<!-- <scroll-view scroll-y="true" scroll-left="0"> -->
		<view class="content">
			<view v-show="isfirstbottom" style="width: 100%;margin-top: 70upx;">
				<!-- 做一个列表 -->
				<view class="cadlist" v-for="item in items" :key='item'>
					<view class="toptext">公共部分临时分，提升学历，支撑，每sssss次加分加到了什么地方呢 </view>
					<view style="font-size: 20upx; margin-left: 20upx;margin-top: 0upx;text-align: left;">积分录入</view>
					<view style="display: flex; flex-direction: row;align-items: center;">
						<view class="shenpistyle"> 审批人:</view>
						<view style="border: #CCCCCC 1upx solid; font-size: 25upx;padding: 0upx 5upx 0upx 5upx;margin-left: 20upx;">
							小明待审批</view>  
					</view>
					<view style="display: flex; border-top: #D9D9D9 solid 0.5upx;margin: 20upx 20upx 20upx 20upx; justify-content: flex-end; align-items: center;">
						<view class="border3text">去审批</view>
					</view>
				</view>
				
			</view>
            
			<view v-show="issecondbottom" style="width: 100%;">
				选项卡2的内容
				<!-- 做一个列表 -->
			</view>
			<view v-show="isthirdbottom" style="width: 100%;">
				选项卡3的内容
				<!-- 做一个列表 -->
			</view>
		</view>
		<!-- </scroll-view> -->
	</view>
</template>

<script>
	var _self;
	export default {

		data() {
			return {
				isfirstbottom: true,
				issecondbottom: false,
				isthirdbottom: false,
				items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
			};
		},
		onLoad: function() {
			_self = this;
		} ,
		onBackPress:function(){
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
</style>
