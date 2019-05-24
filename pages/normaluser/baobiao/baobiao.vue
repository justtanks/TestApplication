<!-- 管理者的加扣分的报表    奖扣统计-->
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
			<view style="display: flex; flex-direction: row;justify-content: space-between;align-items: center;padding: 30upx 30upx 20upx 30upx;">
				<view @click="change">本月奖扣分任务</view>
				<button type="default" size="mini" style="margin-right: 0upx;" @click="showpup"> 选择时间</button>
			</view>

			<view class="qiun-charts" style="background-color: #E5FDC3;">
				<!--#ifdef H5 || MP-ALIPAY || MP-BAIDU || MP-TOUTIAO -->
				<canvas canvas-id="canvasColumn" id="canvasColumn" class="charts" style="background-color: #FFFFFF;" :style="{'width':cWidth*pixelRatio+'px','height':cHeight*pixelRatio+'px', 'transform': 'scale('+(1/pixelRatio)+')'
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

		<!-- 弹出层使用 -->
		<popup-layer ref="popup" :direction="direction">
			<view class="pupustyle">
				<!-- 	<view style="margin: 30upx 30upx;font-size: 28upx;">
					技术类型（单选）
				</view>
				<view style="display: flex;flex-direction: row;justify-content: flex-start;">
					<button class="popbutton" :class="{popbutton_choise:allpeople}" @click="quanyuanpaiming">全员排名</button>
					<button class="popbutton" :class="{popbutton_choise:!allpeople}" @click="zhiweipaiming">职位排名</button>
				</view>
				<view style="height: 20upx; background-color: #F1F1F3;margin-top: 30upx;"></view>
				<view style="margin: 30upx 30upx;font-size: 28upx;">
					人员范围
				</view>
				<view style="display: flex;flex-direction: row;justify-content: flex-start;">
					<button class="popbutton" :class="{popbutton_choise:containcontrol}" @click="contain">包含管理者</button>
					<button class="popbutton" :class="{popbutton_choise:!containcontrol}" @click="containnot">不包含管理者</button>
				</view>
				<view style="height: 20upx; background-color: #F1F1F3;margin-top: 30upx;"></view> -->
					<view style="height: 20upx; background-color: #F1F1F3;margin-top: 150upx;"></view>
				<view style="display: flex;flex-direction: row; justify-content: space-between;">
					<view style="margin: 30upx 30upx;">
						时间
					</view>
					<view style="margin: 30upx;font-size: 28upx;">
 
					</view>
				</view>
				<view style="display: flex;flex-direction: row;margin-left: 40upx;margin-right: 40upx;" >
					<view style="flex: 1;display: flex; justify-content: center;align-items: center;font-size: 32upx;" @click="choisetime('date',1)">{{begindate}}</view>
					<view style="flex: 1;display: flex;justify-content: center;align-items: center;">至</view>
					<view style="flex: 1;display: flex;justify-content: center;align-items: center;font-size: 32upx;" @click="choisetime('date',2)">{{enddate}}</view>
				</view>
				<view style="height: 20upx; background-color: #F1F1F3;margin-top: 50upx;"></view>
				<!-- <view style="margin: 30upx 30upx;font-size: 28upx;">
					积分分类 (多选)
				</view>
				<view style="display: flex;flex-direction: row;justify-content: flex-start;flex-wrap: wrap;margin-left: 25upx;margin-right: 25upx;">
					<button class="popbutton1" :class="{popbutton_choise:gonggong}" @click="gonggong1()">公共部分</button>
					<button class="popbutton1" :class="{popbutton_choise:wenhua}" @click="qiyewenhua1()">企业文化</button>
					<button class="popbutton1" :class="{popbutton_choise:jixiao}" @click="jixiao1()">绩效</button>
					<button class="popbutton1" :class="{popbutton_choise:guizhang}" @click="guizhang1()">规章制度</button>
					<button class="popbutton1" :class="{popbutton_choise:nengli}" @click="nengli1()">能力</button>
					<button class="popbutton1" :class="{popbutton_choise:kaoqin}" @click="kaoqin1()">考勤</button>
				</view>
 -->
				<!-- 最后的确定按钮 -->
				<view class="buttonstyle popubottonbutton" @tap="popudown">
					确定
				</view>
			</view>
		</popup-layer>
		<mx-date-picker :show="showPicker" :type="type" :value="value" :show-seconds="true" @confirm="onSelected1" @cancel="onSelected1" />
	</view>
</template>

<script>
	// 使用wxchart
	import wxCharts from '../../../components/wx-charts/wxcharts.js';
	import MxDatePicker from '../../../components/mx-datepicker/mx-datepicker.vue'
	import dateutll from '../../../common/util.js'

	import popupLayer from '../../../components/popup-layer/popup-layer.vue';

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
			popupLayer,
			MxDatePicker
		},
		data() {
			return {
				cWidth: '',
				cHeight: '',
				cWidth2: '', //横屏图表
				cHeight2: '', //横屏图表
				cWidth3: '', //圆弧进度图
				cHeight3: '', //圆弧进度图
				pixelRatio: 1,
				// 时间选择的框
				direction: 'left',
				// 时间选择器需要的数据
				showPicker: false,
				date: '2019/01/01',
				type: 'date',
				value: '',
				begindate: '2019/01/01',
				enddate: '2019/01/01',
				datety:'' //是开始时间1 结束时间2


			}
		},
		onReady() {
			this.date = dateutll.dateUtils.getNowFormatDate()
			this.begindate = dateutll.dateUtils.getNowFormatDate()
			this.enddate = dateutll.dateUtils.getNowFormatDate()
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
			},
			// shijian: function(type) {
			// 	//弹出时间的选择框
			// 	this.type = type;
			// 	this.showPicker = true;
			// 	this.value = this[type];
			// },
			// onSelected(e) { //选择时间的picker
			// 	this.showPicker = false;
			// 	if (e) {
			// 		this[this.type] = e.value;
			// 	}
			// },
			showpup: function() {
				// 弹出弹窗
				this.$refs.popup.show() // 弹出
				this.showpop = true
			},
			popudown: function() {
				this.$refs.popup.close()
				this.showpop = false
			},
			choisetime(type,datetype) {
				//弹出时间的选择框
				this.datety=datetype
				this.type = type;
				this.showPicker = true;
				this.value = this[type];
			},
			onSelected1(e) { //选择时间后
				this.showPicker = false;
				if (e) {
					console.log(this.datety)
					if(this.datety==1){
						this.begindate=e.value
					}else{
						this.enddate=e.value
					}
				}
			},
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

	/* pop 上的控件的样式 */
	.pupustyle {
		width: 580upx;
		display: flex;
		flex-direction: column;
		overflow: auto;
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

	.popbutton {
		font-size: 25upx;
		color: #666666;
		display: flex;
		margin-left: 30upx;
		margin-right: 15upx;
	}

	.popbutton1 {
		font-size: 25upx;
		color: #666666;
		display: flex;
		margin-left: 15upx;
		margin-right: 15upx;
		margin-top: 15upx;

	}

	.popbutton_choise {
		background: #007AFF;
		color: #FFFFFF;
	}

	.paimingimage {
		width: 40upx;
		height: 40upx;

	}

	.paimingcontain {
		flex: 1;
		display: flex;
		flex-direction: row;
		justify-content: center;
	}
</style>
