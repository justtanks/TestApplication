<!-- 管理者的加扣分的报表 -->
<template>
	<view>
		<view class="biaobiaocontain">
			<view style="font-size: 35upx;">奖扣分情况</view>
			<view class="topcontain" style="border-bottom: #E5E5E5 1upx solid;">
				<view class="titlestyle">日期</view>
				<view class="titlestyle">已奖分/次数</view>
				<view class="titlestyle">已扣分/次数</view>
			</view>
			<view class="topcontain">
				<view class="titlestyle">今天</view>
				<view class="titlestyle">10/1</view>
				<view class="titlestyle">20/2</view>
			</view>
			<view class="topcontain">
				<view class="titlestyle">本周</view>
				<view class="titlestyle">50/20</view>
				<view class="titlestyle">30/10</view>
			</view>
			<view class="topcontain">
				<view class="titlestyle">本月</view>
				<view class="titlestyle">50/20</view>
				<view class="titlestyle">30/10</view>
			</view>
		</view>
		<view class="biaobiaocontain_1">
			<view @click="change" style="padding: 30upx 30upx 20upx 30upx;">本月奖扣分任务</view>
			<view class="qiun-charts" style="background-color: #E5FDC3;">
				<!--#ifdef H5 || MP-ALIPAY || MP-BAIDU || MP-TOUTIAO -->
				<canvas canvas-id="canvasColumn" id="canvasColumn" class="charts" style="background-color: #FFFFFF;" 
				:style="{'width':cWidth*pixelRatio+'px','height':cHeight*pixelRatio+'px', 'transform': 'scale('+(1/pixelRatio)+')'
				,'margin-left':-cWidth*(pixelRatio-1)/2+'px','margin-top':-cHeight*(pixelRatio-1)/2+'px'}"></canvas>
				<!--#endif-->
				<!--#ifdef MP-WEIXIN || APP-PLUS -->
				<canvas canvas-id="canvasColumn" id="canvasColumn" class="charts" style="background-color: #FFFFFF;"></canvas>
				<!--#endif-->
			</view>

		</view>
		<view class="biaobiaocontain" style="margin-top: 9upx;">
			<view>月度比例任务</view>
			<view class="qiun-charts">
				<!--#ifdef H5-->
				<canvas canvasId="canvasPie" class="charts" :style="{'width':cWidth*pixelRatio+'px','height':cHeight*pixelRatio+'px', 'transform': 'scale('+(1/pixelRatio)+')','margin-left':-cWidth*(pixelRatio-1)/2+'px','margin-top':-cHeight*(pixelRatio-1)/2+'px'}"></canvas>
				<!--#endif-->
				<!--#ifndef H5-->
				<canvas canvasId="canvasPie" class="charts"></canvas>
				<!--#endif-->
			</view>
		</view>
	</view>
</template>

<script>
	// 使用wxchart
	import wxCharts from '../../../components/wx-charts/wxcharts.js';

	var _self;
	var canvaColumn = null;
	var Data = {
		Column: {
			categories: ['第一周', '第二周', '第三周', '第四周'],
			series: [{
				name: '奖分',
				data: [15, 20, 45, 37],
				color: "#3CB371"
			}, {
				name: '扣分',
				data: [30, 40, 25, 14],
				color: "#CD6839"
			}]
		},
		Pie: {
			series: [{
				name: '加分',
				data: 50,
				color: "#3CB371"
			}, {
				name: '扣分',
				data: 30,
				color: "#CD6839"
			}]
		}
	};

	export default {
		components: {
               
		},
		data() {
			return {
				cWidth: '',
				cHeight: '',
				cWidth2: '', //横屏图表
				cHeight2: '', //横屏图表
				cWidth3: '', //圆弧进度图
				cHeight3: '', //圆弧进度图
				pixelRatio: 1


			}
		},
		onLoad() {
			_self = this;
			//#ifdef H5 || MP-ALIPAY || MP-BAIDU || MP-TOUTIAO
			uni.getSystemInfo({
				success: function(res) {
					if (res.pixelRatio > 1) {
						//正常这里给2就行，如果pixelRatio=3性能会降低一点
						//_self.pixelRatio =res.pixelRatio;
						_self.pixelRatio = 2;
					}
				}
			});
			//#endif
			this.cWidth = uni.upx2px(750);
			this.cHeight = uni.upx2px(500);
			this.cWidth2 = uni.upx2px(700);
			this.cHeight2 = uni.upx2px(1100);
			this.cWidth3 = uni.upx2px(250);
			this.cHeight3 = uni.upx2px(250);


		},
		onReady() {
			this.showColumn("canvasColumn", Data.Column);
			this.showPie("canvasPie", Data.Pie);
		},

		methods: {
			showColumn(canvasId, chartData) {
				canvaColumn = new wxCharts({
					canvasId: canvasId,
					type: 'column',
					legend: true,
					fontSize: 11,
					background: '#E5FDC3',
					pixelRatio: _self.pixelRatio,
					animation: true,
					categories: chartData.categories,
					series: chartData.series,
					xAxis: {
						disableGrid: true,
					},
					yAxis: {
						//disabled:true
					},
					dataLabel: true,
					width: _self.cWidth * _self.pixelRatio,
					height: _self.cHeight * _self.pixelRatio,
					extra: {
						column: {
							width: _self.cWidth * _self.pixelRatio * 0.45 / chartData.categories.length
						}
					}
				});

			},
			showPie(canvasId, chartData) {
				new wxCharts({
					canvasId: canvasId,
					type: 'pie',
					fontSize: 11,
					legend: true,
					background: '#FFFFFF',
					pixelRatio: _self.pixelRatio,
					series: chartData.series,
					animation: true,
					width: _self.cWidth * _self.pixelRatio,
					height: _self.cHeight * _self.pixelRatio,
					dataLabel: true,
				});
			},
			change: function() {
				Data.Column.categories = ['1', '2', '3', '4']
				Data.Pie.series[0].data = 100;
				this.showColumn("canvasColumn", Data.Column);
				this.showPie("canvasPie", Data.Pie);
			}
		}
	}
</script>

<style>
	page {
		background-color: #F1F1F3;
	}

	.biaobiaocontain {
		background: #FFFFFF;
		display: flex;
		margin-top: 10upx;
		padding: 30upx 30upx 20upx 30upx;
		flex-direction: column;
	}

	.topcontain {
		display: flex;
		padding-top: 20upx;
		padding-bottom: 20upx;
		flex-direction: row;
		background-color: #FFFFFF;
	}

	.titlestyle {
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 30upx;
		color: #666666;
	}

	.biaobiaocontain_1 {
		background: #FFFFFF;
		display: flex;
		margin-top: 10upx;
		flex-direction: column;
	}

	/* 通用样式 */
	.qiun-charts {
		width: 720upx;
		height: 500upx;
		background-color: #FFFFFF;
	}

	.charts {
		width: 720upx;
		height: 500upx;
		background-color: #FFFFFF;
	}

	.wrap {
		width: 95%;
		height: 300px;
	}
</style>
