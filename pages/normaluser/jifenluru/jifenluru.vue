<!-- 积分录入界面，没有实现具体的下一个点击 -->
<template>
	<view>
		<view style="background-color: #FFFFFF;">
			<view class="timechoise uni-list-cell-navigate uni-navigate-right" @click="showpup">
				<view style="font-size: 35upx;">选择人员</view>
			</view>
			<view class="timechoise uni-list-cell-navigate uni-navigate-right" @click="choisetime('date')">
				<view style="font-size: 35upx;">事件时间</view>
				<view style="font-size: 30upx;margin-right: 50upx; color:#555555;">{{date}}</view>
			</view>
			<view class="timechoise uni-list-cell-navigate uni-navigate-right">
				<view style="font-size: 35upx;">选择规则</view>
			</view>
			<view class="timechoise uni-list-cell-navigate uni-navigate-right" @click="choiseperson">
				<view style="font-size: 35upx;">递交审批</view>
				<view style="font-size: 35upx;margin-right: 50upx;color:#555555 ;">选填</view>
			</view>
		</view>
		<view style="height: 150upx;width: 100%; position:fixed; bottom:0; display: flex; justify-content: center;align-items: center;">
			<view style="height: 50upx;width: 85%;">
				<button class="buttonstyle" hover-class="muhovercolor" @click="addshenqing">提交</button>
			</view>
		</view>
		<!-- 弹出层使用 -->
		<popup-layer ref="popup" :direction="direction">
			<view class="pupustyle">
				<view class="buttonstyle popubottonbutton" @tap="popudown">
					确定
				</view>
			</view>
		</popup-layer>
		<mx-date-picker :show="showPicker" :type="type" :value="value" :show-seconds="true" @confirm="onSelected" @cancel="onSelected" />
	</view>
</template>

<script>
	// 选择时间的选择
	import MxDatePicker from '../../../components/mx-datepicker/mx-datepicker.vue'
	import dateutll from '../../../common/util.js'
	import popupLayer from '../../../components/popup-layer/popup-layer.vue';
	export default {
		components: {
			MxDatePicker,
			popupLayer
		},
		data() {
			return {
				direction: 'left',
				// 时间选择器需要的数据
				showPicker: false,
				date: '2019/01/01',
				type: 'date',
				value: '',
			};
		},
		onReady() {
			this.date = dateutll.dateUtils.getNowFormatDate()
		},
		methods: {
			choisetime: function(type) {
				//弹出时间的选择框
				this.type = type;
				this.showPicker = true;
				this.value = this[type];
			},
			onSelected(e) { //选择
				this.showPicker = false;
				if (e) {
					this[this.type] = e.value;
				}
			},
			showpup: function() {
				// 弹出弹窗
				this.$refs.popup.show() // 弹出
			},
			popudown:function(){
				this.$refs.popup.close()
			}
		},
	}
</script>

<style>
	page {
		background-color: #F1F1F3;
	}
	.pupustyle {
		width: 750upx;
		display: flex;
		flex-direction: column;
	}

	.timechoise {
		margin: 10upx 25upx;
		margin-right: 0upx;
		height: 80upx;
		width: auto;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		border-bottom: #EBEBEB solid 1upx;
	}
	.popubottonbutton {
		position: fixed;
		bottom: 1upx;
		width: 100%;
		height: 80upx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
</style>
 