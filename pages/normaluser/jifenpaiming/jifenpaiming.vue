<!-- 积分排名界面 -->
<template>
	<view>
		<!-- 顶部展示条 -->
		<view class="topstyle">
			<view style="margin-left: 25upx;">全员排名</view>
			<view style="margin-right: 25upx;" @click="showpup">筛选</view>
		</view>
		<!-- 中间空出的地方占位 -->
		<view style="height: 100upx;"></view>
		<!-- 列表 -->
		<view class="listitem" v-for="(item,index) in 30" :key='index'>
			<view class="paimingnum">1</view>
			<view class='paiminimg'>
				<image src="../../../static/head_default.png" style="width: 75upx;height: 75upx;margin-right: 20upx;"></image>
			</view>
			<view class="paimingname">小明</view>
			<view class="paimingfenshu">
				100
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
	</view>
</template>

<script>
	import popupLayer from '../../../components/popup-layer/popup-layer.vue';
	export default {
		components: {
			popupLayer
		},
		data() {
			return {
				direction: 'left'
			};
		},
		methods: {
			showpup: function() {
				// 弹出弹窗
				this.$refs.popup.show() // 弹出
			},
			popudown:function(){
				this.$refs.popup.close()
			}
		}
	}
</script>

<style>
	.topstyle {
		position: fixed;
		width: 100%;
		z-index: 99;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		height: 80upx;
		border-bottom: #EBEBEB solid 1upx;
		background: #FFFFFF;

	}

	.listitem {
		height: 100upx;
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-left: 25upx;
		margin-right: 25upx;
	}

	.paimingnum {
		flex: 1;
		display: flex;
		flex-direction: row;
		justify-content: center;
		font-size: 32upx;
	}

	.paiminimg {
		display: flex;
		flex-direction: row;
		flex: 1;
		align-content: center;
		justify-content: flex-end;
	}

	.paimingname {
		flex: 1;
		justify-content: flex-start;
		margin-left: 20upx;
		font-size: 32upx;
	}

	.paimingfenshu {
		flex: 1;
		display: flex;
		flex-direction: row;
		align-content: center;
		justify-content: flex-end;
		margin-right: 20upx;
		font-size: 36upx;
		color: #007AFF;
	}

	.pupustyle {
		width: 580upx;
		display: flex;
		flex-direction: column;
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
