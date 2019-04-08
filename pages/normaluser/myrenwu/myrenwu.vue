<!-- 查看任务 -->
<template>
	<view>
		<view class="cadstyle" style="margin-top: 0upx;">
			<view class="toptext1">这是第一个列表的改善 待审批积分录入</view>
			<view class="toptext3">这是第一个列表的改善 待审批积分录入</view>
			<view class="toptext3">截至时间：&nbsp;&nbsp;&nbsp; &nbsp; 是否完成：</view>
			<view class="toptext3">奖分：1</view>
			<view style="display: flex;margin-top: 15upx;">
				<view class="shenpistyle-one" style="color: #666666;">发布时间: 04月06日&nbsp;&nbsp;&nbsp; &nbsp;发布人:张小孔</view>
			</view>
			<view style="display: flex;margin-top: 15upx;">
				<view class="shenpistyle-one" style="color: #666666;">领取人:张小孔</view>
			</view>
			<view style="display: flex;flex-direction: row; flex-wrap: wrap;margin-left: 25upx;margin-right: 25upx;">
				<!-- image 的网格列表 -->
				<view class="imagestyle-yulan" v-for="(image,index) in imageList" :key="index">
					<image style="width: 100%;height: 100%;" :src="image" :data-src="image" @tap="showbigimage"></image>
				</view>
			</view>
		</view>

	</view>
</template>
<script>
	export default {
		components: {

		},
		data() {
			return {

			}
		},
		methods: {
			showbigimage: function(e) {
				// 展示大图
				var current = e.target.dataset.src
				uni.previewImage({
					current: current,
					urls: this.imageList
				})
			},
		}
	}
</script>
<style>
	page {
		background-color: #EBEBEB;
	}

	.cadstyle {
		padding-bottom: 50upx;
		background: #FFFFFF;


	}

	.shenpistyle {
		font-size: 25upx;
		display: flex;
		margin-left: 20upx;
		justify-content: center;
		align-items: center;
	}

	.toptext1 {
		display: flex;
		min-height: 50upx;
		font-size: 35upx;
		padding: 20upx 20upx 20upx 20upx;
		text-align: left;
	}

	.toptext3 {
		display: flex;
		min-height: 50upx;
		font-size: 30upx;
		padding: 10upx 20upx 10upx 20upx;
		text-align: left;
	}
</style>
