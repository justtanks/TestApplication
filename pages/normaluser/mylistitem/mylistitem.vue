<!-- 展示 使用横向引导页面 -->
<template>
	<view>
		<!-- 顶部展示条 -->
		<view style="width: 100%; position: fixed;z-index: 99;min-height: 180; display: flex;flex-direction: column;background-color: #FFFFFF;border-bottom: #EBEBEB solid 1upx;">
			<view class="topstyle">
				<view class="topstyle_choise" style="justify-content: flex-start;margin-left: 25upx;">取消</view>
				<view class="topstyle_choise" style="font-size: 33upx;">选择员工</view>
				<view class="topstyle_choise" style="justify-content: flex-end;margin-right: 25upx;" @click="showpup">完成</view>
			</view>
			<mSearch :show='false' @search="search($event,0)"></mSearch>
		</view>
		<!-- 中间空出的地方占位 -->
		<view style="height: 180upx;"></view>
		<!-- 列表 -->
		<scroll-view class="uni-center center-box" scroll-y="true">
			<checkbox-group @change="checkboxChange">
				<label class="listitem" v-for="(item,index) in 30" :key='index'>
					<view>
						<checkbox :value="helo" :checked="false" color="#007AFF" />
					</view>
					<view style="margin-left: 25upx;">
						<image src="../../../static/head_default.png" style="width: 75upx;height: 75upx;margin-right: 20upx;"></image>
					</view>
					<view style="margin-left: 30upx;">小明</view>
				</label>
			</checkbox-group>
		</scroll-view>
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
	import mSearch from '../../../components/mehaotian-search/mehaotian-search.vue'
	export default {
		components: {
			popupLayer,
			mSearch
		},
		data() {
			return {
				direction: 'left'
			};
		},
		methods: {
			showpup: function() {
				// 弹出弹窗
				// this.$refs.popup.show() // 弹出
				uni.redirectTo({
					url:'../jifenluru/jifenluru?name=hello'
				})
			},
			popudown: function() {
				this.$refs.popup.close()
			},
			checkboxChange: function(e) {
				console.log(e.target.value)
			},
			search(e, val) {
				// 搜索的方法
				console.log(e, val);
			}
		},
		onPullDownRefresh: function() {
			// 执行下拉刷新的方法
			setTimeout(function() {
				uni.stopPullDownRefresh()
			}, 1000)
		},
	}
</script>

<style>
	.topstyle {
		display: flex;
		flex-direction: row;
		align-items: center;
		min-height: 80upx;
	}

	.topstyle_choise {
		flex: 1;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.listitem {
		height: 100upx;
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-left: 25upx;
		margin-right: 25upx;
		border-bottom: #EBEBEB solid 0.5upx;
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
