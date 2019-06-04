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
				<view class="titlestyle">{{todayadd}}</view>
				<view class="titlestyle">{{todaycut}}</view>
			</view>
			<view class="topcontain">
				<view class="titlestyle">本周</view>
				<view class="titlestyle">{{weekadd}}</view>
				<view class="titlestyle">{{weekcut}}</view>
			</view>
			<view class="topcontain">
				<view class="titlestyle">本月</view>
				<view class="titlestyle">{{mothadd}}</view>
				<view class="titlestyle">{{mothcut}}</view>
			</view>
		</view>
		<view class="biaobiaocontain_1">
			<view style="display: flex; flex-direction: row;justify-content: space-between;align-items: center;padding: 30upx 30upx 20upx 30upx;">
				<view @click="change">本月奖扣分任务</view>
				<button type="default" size="mini" style="margin-right: 0upx;" @click="choisedate()"> 选择时间</button>
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
		<!-- <popup-layer ref="popup" :direction="direction">
			<view class="pupustyle"> -->
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
		<!-- 		<view style="height: 20upx; background-color: #F1F1F3;margin-top: 150upx;"></view>
				<view style="display: flex;flex-direction: row; justify-content: space-between;">
					<view style="margin: 30upx 30upx;">
						时间
					</view>
					<view style="margin: 30upx;font-size: 28upx;">

					</view>
				</view>
				<view style="display: flex;flex-direction: row;margin-left: 40upx;margin-right: 40upx;">
					<view style="flex: 1;display: flex; justify-content: center;align-items: center;font-size: 32upx;" @click="choisetime('date',1)">{{begindate}}</view>
					<view style="flex: 1;display: flex;justify-content: center;align-items: center;">至</view>
					<view style="flex: 1;display: flex;justify-content: center;align-items: center;font-size: 32upx;" @click="choisetime('date',2)">{{enddate}}</view>
				</view>
				<view style="height: 20upx; background-color: #F1F1F3;margin-top: 50upx;"></view> -->
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
		<!-- 	<view class="buttonstyle popubottonbutton" @tap="popudown">
					确定
				</view>
			</view>
		</popup-layer> -->
		<!-- <mx-date-picker :show="showPicker" :type="type" :value="value" :show-seconds="true" @confirm="onSelected1" @cancel="onSelected1" /> -->

		<mpvue-picker :themeColor="themeColor" ref="mpvuePicker" :mode="mode" :deepLength="deepLength" :pickerValueDefault="pickerValueDefault"
		 @onConfirm="onConfirm" @onCancel="onCancel" :pickerValueArray="pickerValueArray"></mpvue-picker>

	</view>
</template>

<script>
	// 使用wxchart
	import wxCharts from '../../../components/wx-charts/wxcharts.js';
	// import MxDatePicker from '../../../components/mx-datepicker/mx-datepicker.vue'
	import dateutll from '../../../common/util.js'
	import mpvuePicker from '../../../components/mpvue-picker/mpvuePicker.vue';
	import popupLayer from '../../../components/popup-layer/popup-layer.vue';
	import URL from '../../../common/url.js'


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
			mpvuePicker
			// MxDatePicker
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
				themeColor: '#007AFF',
				pickerText: '',
				mode: '',
				deepLength: 1,
				pickerValueDefault: [0],
				pickerValueArray: [],
				// 时间选择器需要的数据
				showPicker: false,
				date: '',
				type: 'date',
				value: '',
				begindate: '',
				enddate: '',
				datety: '', //是开始时间1 结束时间2
				//图表对象
				colomn: {},
				piedata: {},
				//网络获取的对象
				scoreData: {},
				chartData: {},
				token: '',
				pickerSingleArray: [{
						label: '一月',
						value: 1
					},
					{
						label: '二月',
						value: 2
					},
					{
						label: '三月',
						value: 3
					},
					{
						label: '四月',
						value: 4
					},
					{
						label: '五月',
						value: 5
					},
					{
						label: '六月',
						value: 6
					},
					{
						label: '七月',
						value: 7
					},
					{
						label: '八月',
						value: 8
					},
					{
						label: '九月',
						value: 9
					},
					{
						label: '十月',
						value: 10
					},
					{
						label: '十一月',
						value: 11
					},
					{
						label: '十二月',
						value: 12
					}
				],
				todayadd: '',
				todaycut: '',
				weekadd: '',
				weekcut: '',
				mothadd: '',
				mothcut: '',
				Column: {
					categories: ['第一周', '第二周', '第三周', '第四周'],
					series: [{
						name: '奖分',
						data: [],
						color: "#3CB371"
					}, {
						name: '扣分',
						data: [],
						color: "#CD6839"
					}]
				},
				Pie: {
					series: [{
						name: '加分',
						data: 0,
						color: "#3CB371"
					}, {
						name: '扣分',
						data: 0,
						color: "#CD6839"
					}]
				}



			}
		},
		onLoad() {
			_self = this;
			this.token = uni.getStorageSync('token')
			this.date = dateutll.dateUtils.getNowFormatDate()
			this.begindate = this.date
			this.enddate = this.date
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
			//获取网络数据

			this.getScore()
			this.getchartdata()


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
				// Data.Column.categories = ['1', '2', '3', '4']
				// Data.Pie.series[0].data = 100;
				this.showColumn("canvasColumn", Data.Column);
				this.showPie("canvasPie", Data.Pie);
			},
			onCancel(e) {
				console.log(e)
			},
			onConfirm(e) {
				var month = e.value[0]
				var da = new Date()
				this.date = da.getFullYear() + '-' + month + '-' + '1'
				_self.Column.series[0].data=[]
				_self.Column.series[1].data=[]
				this.getchartdata()

			},
			toast: function(msg) {
				// #ifdef APP-PLUS
				plus.nativeUI.toast(msg);
				// #endif
				//#ifdef MP-WEIXIN
				uni.showToast({
					title: msg,
					duration: 1000,
					icon: 'none',
					position: 'bottom'
				})
				// #endif	
			},
			getScore: function(e) {
				//获取到加减分情况
				uni.showLoading({

				})
				uni.request({
					url: URL.scoremsg,
					data: {
						token: _self.token,
						deviceType: 'android'
					},
					complete: function(e) {
						uni.hideLoading()
						_self.scoreData = e.data
						if (e.data.code == 1) {
							console.error(e.data.data.dayResultPlus)
							let toadd = _self.scoreData.data.dayResultPlus
							let tocut = _self.scoreData.data.dayResultMinus
							let weadd = _self.scoreData.data.weekResultPlus
							let wecut = _self.scoreData.data.weekResultMinus
							let moadd = _self.scoreData.data.monthResultPlus
							let mocut = _self.scoreData.data.monthResultMinus


							if (toadd.count == 0) toadd.score = 0
							if (tocut.count == 0) tocut.score = 0
							if (weadd.count == 0) weadd.score = 0
							if (wecut.count == 0) wecut.score = 0
							if (moadd.count == 0) moadd.score = 0
							if (mocut.count == 0) mocut.score = 0

							_self.todayadd = toadd.count + '/' + toadd.score
							_self.todaycut = tocut.count + '/' + tocut.score
							_self.weekadd = weadd.count + '/' + weadd.score
							_self.weekcut = wecut.count + '/' + wecut.score
							_self.mothadd = moadd.count + '/' + moadd.score
							_self.mothcut = mocut.count + '/' + mocut.score

						} else {
							_self.toast(e.data.msg)
						}

					}
				})

			},
			getchartdata: function(e) {
				//获取到柱状图和饼图的数据
				console.error(_self.date)
				uni.showLoading({

				})
				uni.request({
					url: URL.charmsg,
					data: {
						token: _self.token,
						deviceType: 'android',
						applyTime: _self.date
					},
					complete: function(e) {
						console.error(JSON.stringify(e.data))
						uni.hideLoading()
						_self.chartData = e.data
						if (e.data.code == 1) {
                           let bardata=e.data.data.bar
						   for(let s of bardata)
						   {
							   _self.Column.series[0].data.push(parseInt(s.plus))
							   _self.Column.series[1].data.push(parseInt(s.minus))
						   }
						   if(bardata.length==5){
							   _self.Column.categories.push('第五周')
						   }
						   
						   let piedata=e.data.data.pie
						   for(let a of piedata){
							   if(a.name=='加分'){
								   _self.Pie.series[0].data=parseInt(a.data)
							   }else{
								   _self.Pie.series[1].data=parseInt(a.data)
							   }
						   }
						   
						   _self.showColumn("canvasColumn", _self.Column);
						   _self.showPie("canvasPie", _self.Pie);

						} else {
							_self.toast(e.data.msg)
						}

					}
				})

			},
			choisedate: function() {
				// 选择审批人
				this.pickerValueArray = this.pickerSingleArray
				this.mode = 'selector'
				this.deepLength = 1
				this.pickerValueDefault = [0]
				this.$refs.mpvuePicker.show()

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
