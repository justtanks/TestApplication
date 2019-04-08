<!-- 首页 -->
<template>
	<view>
		<!-- 顶部展示照片和总积分 -->
		<view class="uni-flex uni-row" style="justify-content: space-between;">
			<view class="uni-row uni-flex" style="align-items: center;margin: 20upx 25upx;">
				<image src="../../static/head_default.png" style="width: 80upx; height: 80upx;"></image>
				<view class="uni-flex uni-column" style="margin-left: 10upx;margin-top: 10upx;">
					<view style="font-size: 35upx;line-height: 1;">技术部小马</view>
					<view style="font-size: 25upx; color: #BBBBBB;">(公司员工)</view>
				</view>
			</view>
			<view class="uni-row uni-flex" style="align-items: center;">
				<view style="font-size: 40upx;">总积分</view>
				<view style="font-size: 40upx;margin-right: 25upx;margin-left: 10upx;">10000</view>
			</view>
		</view>
		<!-- 展示积分和排名 -->
		<view class="uni-flex uni-row secondrow-contain">
			<view class="seondrow" style="align-items: center;">
				<view class="bigfount">0</view>
				<view class="bottomfount">昨日积分</view>
			</view>
			<view class="seondrow" style="align-items: center;">
				<view class="bigfount">0</view>
				<view class="bottomfount">今日积分</view>
			</view>
			<view class="seondrow" style="align-items: center;">
				<view class="bigfount">0</view>
				<view class="bottomfount">部分排名</view>
			</view>
			<view class="seondrow" style="align-items: center;">
				<view class="bigfount">0</view>
				<view class="bottomfount">公司排名</view>
			</view>
		</view>
		<!-- 展示图标 标识 -->
		<view class="uni-flex uni-row contantmargin" style="justify-content: space-between;align-items: center; height: 70upx;">
			<view style="font-weight: bold;font-size: 25upx;margin-left: 20upx;">积分趋势</view>
			<view class="uni-flex uni-row" style="align-items: center;">
				<image src="../../static/lanse.png" class="chartmate"></image>
				<view class="bottomfount">奖分</view>
				<image src="../../static/huangse.png" class="chartmate"></image>
				<view class="bottomfount">扣分</view>
			</view>
		</view>
		<!-- 展示折线图 -->
		<view style="display: flex; flex-direction: column;">
			<view class="qiun-charts">
				<!--#ifdef H5-->
				<canvas canvasId="canvasLineA" class="charts" :style="{'width':cWidth*pixelRatio+'px','height':cHeight*pixelRatio+'px', 
			'transform': 'scale('+(1/pixelRatio)+')','margin-left':-cWidth*(pixelRatio-1)/2+'px','margin-top':-cHeight*(pixelRatio-1)/2+'px'}"
				 @touchstart="touchLineA"></canvas>
				<!--#endif-->
				<!--#ifndef H5-->
				<canvas canvasId="canvasLineA" class="charts" @touchstart="touchLineA"></canvas>
				<!--#endif-->
			</view>
		</view>
		<!-- 公告栏 -->
		<view class="gonggao uni-list-cell-navigate uni-navigate-right">
			<image style="width: 140upx;height: 70upx;" src="../../static/gonggao2.png"></image>
		</view>
		<view class="qiun-charts">
			<!--#ifdef H5-->
			<canvas canvasId="canvasPie" class="charts" :style="{'width':cWidth*pixelRatio+'px','height':cHeight*pixelRatio+'px', 'transform': 'scale('+(1/pixelRatio)+')','margin-left':-cWidth*(pixelRatio-1)/2+'px','margin-top':-cHeight*(pixelRatio-1)/2+'px'}"></canvas>
			<!--#endif-->
			<!--#ifndef H5-->
			<canvas canvasId="canvasPie" class="charts"></canvas>
			<!--#endif-->
		</view>
		<view style="height: 60upx;width: auto;margin: 20upx 45upx 120upx 45upx;">
			<button class="buttonstyle" @click="addshenqing">申请积分</button>
		</view>

	</view>
</template>

<script>
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	import wxCharts from '../../components/wx-charts/wxcharts.js'
	var _self;
	var canvaColumn = null;
	var canvaLineA = null;
	var canvaLineB = null;
	var canvaArea = null;
	var Data = {
		LineA: {
			categories: ['2012', '2013', '2014', '2015', '2016', '2017', '2018'],
			series: [{
				name: '奖分',
				data: [35, 20, 25, 37, 4, 20, 10]
			}, {
				name: '扣分',
				data: [70, 40, 65, 90, 44, 68, 20]
			}]
		},

		Pie: {
			series: [{
				name: '绩效',
				data: 50
			}, {
				name: '公共部分',
				data: 30
			}, {
				name: '规章制度',
				data: 20
			}, {
				name: '企业文化',
				data: 18
			}, {
				name: '能力分',
				data: 8
			}]
		}
	}
	export default {
		components: {
			uniLoadMore,
			wxCharts
		},
		data() {
			return {
				cWidth: '',
				cHeight: '',
				pixelRatio: 1
			}
		},
		onLoad() {
			_self = this;
			//#ifdef H5
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
            this.changeTab()

		},
		onReady() {
			this.showLineA("canvasLineA", Data.LineA);
			this.showPie("canvasPie", Data.Pie);
		},
		methods: {
			showLineA(canvasId, chartData) {
				canvaLineA = new wxCharts({
					canvasId: canvasId,
					type: 'line',
					fontSize: 11,
					legend: true,
					background: '#FFFFFF',
					pixelRatio: _self.pixelRatio,
					categories: chartData.categories,
					animation: true,
					series: chartData.series,
					xAxis: {
						disableGrid: true,
					},
					yAxis: {
						//disabled:true
					},
					width: _self.cWidth * _self.pixelRatio,
					height: _self.cHeight * _self.pixelRatio,
					dataLabel: true,
					dataPointShape: true,
					extra: {
						lineStyle: 'straight'
					},
				});

			},
			showLineB(canvasId, chartData) {
				canvaLineB = new wxCharts({
					canvasId: canvasId,
					type: 'line',
					fontSize: 11,
					legend: true,
					background: '#FFFFFF',
					pixelRatio: _self.pixelRatio,
					categories: chartData.categories,
					animation: true,
					series: chartData.series,
					xAxis: {
						disableGrid: true,
					},
					yAxis: {
						//disabled:true
					},
					width: _self.cWidth * _self.pixelRatio,
					height: _self.cHeight * _self.pixelRatio,
					dataLabel: true,
					dataPointShape: true,
					extra: {
						lineStyle: 'curve'
					},
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
			touchLineA(e) {
				canvaLineA.showToolTip(e, {
					format: function(item, category) {
						return category + ' ' + item.name + ':' + item.data
					}
				});
			},
			touchLineB(e) {
				canvaLineB.showToolTip(e, {
					format: function(item, category) {
						return category + ' ' + item.name + ':' + item.data
					}
				});
			},
			addshenqing: function() {
				uni.navigateTo({
					url: '../normaluser/addshenqing/addshenqing'
				})
			},
			changeTab() {
				console.log(1)
				uni.getStorage({
					key: "isnomaluser",
					success: function(res) {
						if (res.data == 1) {
							uni.setTabBarItem({
								index: 2,
								text: '审批',
							})
						} else {
							uni.setTabBarItem({
								index: 2,
								text: '积分事件'
							})
						}
					}
				})
			}

		},
		onPullDownRefresh: function() {
			// 执行下拉刷新的方法
			setTimeout(function() {
				uni.stopPullDownRefresh()
			}, 1000)
		}
	}
</script>

<style>
	.seondrow {
		display: flex;
		flex: 1;
		flex-direction: column;
	}

	.bigfount {
		font-size: 50upx;
		font-weight: bold;
		line-height: 1.2;
	}

	.bottomfount {
		color: #666666;
		font-size: 26upx;
	}

	.secondrow-contain {
		margin: 20upx 25upx 0upx 25upx;
		border-bottom: #EBEBEB solid 1upx;
		padding-bottom: 20upx;
	}

	.contantmargin {
		margin-left: 25upx;
		margin-right: 25upx;
	}

	.chartmate {
		width: 50upx;
		height: 50upx;
		margin-left: 10upx;
		margin-right: 10upx;
	}

	/* 折线图的样式 */
	.qiun-charts {
		width: 750upx;
		height: 500upx;
		background-color: #FFFFFF;
	}

	.charts {
		width: 750upx;
		height: 500upx;
		background-color: #FFFFFF;
	}

	.gonggao {
		width: auto;
		margin: 10upx 25upx 10upx 25upx;
		border-top: #EBEBEB solid 1upx;
		border-bottom: #EBEBEB solid 1upx;
		display: flex;
		height: 90upx;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
	}

	.muhovercolor {
		background-color: #0A98D5;
	}
</style>
