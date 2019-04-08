<!-- 管理中心 -->
<template>
	<view>
		<view class="uni-flex uni-row controlcenter-row" style="margin-top: 70upx; flex-wrap: wrap;">
			<view class="controlbox" @click="mJifen()" hover-class="uni-list-cell-hover">
				<image src="../../static/jifenlogo.png" class="controlimage"></image>
				<view class="control-text">我的列表</view>
			</view>
			<view class="controlbox" @click="mPaiming" hover-class="uni-list-cell-hover">
				<image src="../../static/paiminglogo.png" class="controlimage"></image>
				<view class="control-text">积分排名</view>
			</view>
			<view class="controlbox" @click="mRenwu" hover-class="uni-list-cell-hover">
				<image src="../../static/renwulogo.png" class="controlimage"></image>
				<view class="control-text">我的任务</view>
			</view>
			<view class="controlbox" @click="mFaburenwu" hover-class="uni-list-cell-hover">
				<image src="../../static/faburenwu.png" class="controlimage"></image>
				<view class="control-text">发布任务</view>
			</view>
			<view class="controlbox" @click="mJifenluru" hover-class="uni-list-cell-hover">
				<image src="../../static/jifenluru.png" class="controlimage"></image>
				<view class="control-text">积分录入</view>
			</view>
			<view class="controlbox" @click="mWodeshenqing" hover-class="uni-list-cell-hover">
				<image src="../../static/wodeshenqing.png" class="controlimage"></image>
				<view class="control-text">我的申请</view>
			</view>
			<view class="controlbox" @click="mJifenguize" hover-class="uni-list-cell-hover">
				<image src="../../static/jifenguize.png" class="controlimage"></image>
				<view class="control-text">积分规则</view>
			</view>
			<view class="controlbox" @click="mJifenshijian" hover-class="uni-list-cell-hover">
				<image src="../../static/jifenshijian.png" class="controlimage"></image>
				<view class="control-text">积分事件</view>
			</view>
			<view class="controlbox" @click="mGonggao" hover-class="uni-list-cell-hover">
				<image src="../../static/gonggao.png" class="controlimage"></image>
				<view class="control-text">公告</view>
			</view>
		</view>
		
	</view>


</template>

<script>
	import MxDatePicker from '../../components/mx-datepicker/mx-datepicker.vue'
	export default {
		components: {
			MxDatePicker
		},
		data() {
			return {
				
			};
		},
		methods: {
			mJifen: function(type) {
				// 暂时跳转到列表
				uni.navigateTo({
					url:'../normaluser/mylistitem/mylistitem'
				})
				
				
			},
			mJifenguize: function(e) {
				uni.showToast({
					duration: 500,
					title: '规则'
				})
			},
			mJifenluru: function(e) {
				  uni.navigateTo({
				  	url: '../normaluser/jifenluru/jifenluru',
				  	success: res => {},
				  	fail: () => {},
				  	complete: () => {}
				  });
			},
			mJifenshijian: function(e) {
				 uni.navigateTo({
				 	url:'../alllistpage/jifenshijian/jifenshijian'
				 })
			},
			mFaburenwu: function(e) {
				  uni.navigateTo({
				 	url: '../normaluser/faburenwu/faburenwu',
				 	success: res => {},
				 	fail: () => {},
				 	complete: () => {}
				 });
			},
			mGonggao: function(e) {
				 uni.navigateTo({
				 	url: '../normaluser/seeShenqing/seeShenqing',
				 	success: res => {},
				 	fail: () => {},
				 	complete: () => {}
				 });
			},
			mWodeshenqing: function(e) {
				uni.navigateTo({
					url:'../alllistpage/myshenqing/myshenqing'
				})
			},
			mPaiming: function(e) {
				uni.navigateTo({
					url:"../normaluser/jifenpaiming/jifenpaiming"
				})
			},
			mRenwu: function(e) {
				 uni.navigateTo({
				 	url:'../alllistpage/myrenwu/myrenwu'
				 })
			}
		}
	}
</script>

<style>
	.controlimage {
		width: 80upx;
		height: 80upx;
		padding-top: 20upx;
	}

	.controlbox {
		width: 25%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
	}

	.control-text {
		font-size: 27upx;
		padding-bottom: 20upx;
		line-height: 1.8;
	}

	.controlcenter-row {
		margin-top: 14upx;
		margin-bottom: 14upx;
	}
</style>
