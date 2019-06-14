	<!-- 我的申请 申请待审批 -->
<template>
	<view>
		<view style="width: 100%;">
			<!-- 做一个列表   积分录入和积分申请，以及积分的状态都是后台给的状态，这里只是模拟-->
			<!-- 我的申请 申请待审批 -->
			<view class="cadlist-one">
				<view class="toptext-one">{{item.reason}}</view>
				<view class="toptext-two" style="border-bottom: 1upx #CCCCCC solid;">规则备注：{{item.mark}} </view>
				<view style="display: flex;flex-direction: row;justify-content: space-between;">
					<view class="toptext-two">审批对象：{{item.benefit_user_name}}</view>
					<view class="fenshustyle">{{item.score}}分</view>
				</view>
				<view class="toptext-two">申请类别：{{item.cate_name}} </view>
				<view style="display: flex; flex-direction: row;align-items: center;margin-top:5upx;">
					<view class="shenpistyle-one ">初审人：{{item.pass_user_name1}}&nbsp;&nbsp; 终审人：{{item.pass_user_name2}}</view>
				</view>
				<view class="toptext-two">初审状态：{{chushenstatus}} </view>
				<view class="toptext-two">终审状态：{{zhongshenstatus}} </view>
				<view class="toptext-two">管理员审核状态：{{guanliyuanstatus}} </view>
				<view class="toptext-two" style="color: #DD524D;" v-if="refuseReason!=null">拒绝原因：{{refuseReason}} </view>
				<view style="display: flex;margin-top: 15upx;">
					<view class="shenpistyle-one">申请时间: {{item.apply_time}}&nbsp;&nbsp;&nbsp; &nbsp;申请人:{{item.apply_user_name}}</view>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	import URL from '../../../common/url.js'
	var that
	export default {
		data() {
			return {
				item: {},
				chushenstatus: '',
				zhongshenstatus: '',
				guanliyuanstatus: '',
				refuseReason:''
			}
		},
		onLoad: function(e) {
			that = this
			this.token = uni.getStorageSync('token')
			try {
				this.item = JSON.parse(decodeURIComponent(e.itemdata))
			} catch (error) {
				this.item = JSON.parse(e.itemdata)
			}
			if (this.item.pass_status1 == 0) {
				this.chushenstatus = '审核中'
			} else if (this.item.pass_status1 == 1) {
				this.chushenstatus = '已通过'
			} else {
				this.chushenstatus = '已拒绝'
			}

			if (this.item.pass_status2 == 0) {
				this.zhongshenstatus = '审核中'
			} else if (this.item.pass_status2 == 1) {
				this.zhongshenstatus = '已通过'
			} else {
				this.zhongshenstatus = '已拒绝'
			}

			if (this.item.status == 0) {
				this.guanliyuanstatus = '审核中'
			} else if (this.item.status == 1) {
				this.guanliyuanstatus = '已通过'
			} else {
				this.guanliyuanstatus = '已拒绝'
			}
			if(this.item.refuse_reason1!=null){
				this.refuseReason=this.item.refuse_reason1
			}else if(this.item.refuse_reason2!=null){
				this.refuseReason=this.item.refuse_reason2
			}else if(this.item.refuse_reason!=null){
				this.refuseReason=this.item.refuse_reason
			}else{
				this.refuseReason=null
			}
			
			if (this.item.status == 0) {
				this.guanliyuanstatus = '审核中'
			} else if (this.item.status == 1) {
				this.guanliyuanstatus = '已通过'
				this.refuseReason=null
			} else {
				this.guanliyuanstatus = '已拒绝'
			}


		},
		methods: {

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
