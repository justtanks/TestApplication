<template>
	<view>
		<view class="wrap">
			<mpvue-echarts :echarts="echarts" :onInit="initChart" />
		</view>
	</view>
</template>

<script>
	//使用echart
	import * as echarts from '../../../components/echarts/echarts.min.js';
	import mpvueEcharts from '../../../components/mpvue-echarts/src/echarts.vue';

	var option = {
		title: {},
		tooltip: { //设置弹出框  
			trigger: 'axis',//item  axis
			axisPointer: { // 坐标轴指示器，坐标轴触发有效
				type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
			}
			
		},
		legend: {
			data: ['2011年', '2012年'],
			bottom: "-10",
			show: false
		},
		grid: {
			left: '4%',
			right: '4%',
			bottom: '5%',
			containLabel: true
		},
		xAxis: {
			show: true,
			type: 'category',
			data: ['巴西', '印尼', '美国', '印度', '中国', '世界'],
			axisLine: {
				show: false
			},
			axisTick: {
				show: false
			}
		},
		yAxis: {
			show: false, //设置坐标轴不可见
			type: 'value',
			boundaryGap: false,
			axisLabel: {
				inside: true //设置文字标签朝内，这样就没有对外的距离 
			}
		},
		series: [{
				name: '2011年',
				type: 'bar',
				barGap: '0',
				/*多个并排柱子设置柱子之间的间距  几个同样的之间的距离,如果设成零,颜色并列*/
				barCategoryGap: '20%',
				/*多个并排柱子设置柱子之间的间距 几个不同数值的之间的距离,**/
				data: [18111, 23111, 29111, 104111, 131111, 631111],
				color: ['#007AFF']
			},
			{
				barGap: '0',
				/*多个并排柱子设置柱子之间的间距  几个同样的之间的距离,如果设成零,颜色并列*/
				barCategoryGap: '20%',
				/*多个并排柱子设置柱子之间的间距 几个不同数值的之间的距离,**/
				name: '2012年',
				type: 'bar',
				data: [111119, 211113, 111131, 111112, 111113, 111168],
				color: ['#CD8500']
			}
		]
	}

	export default {
		data() {
			return {
				echarts: echarts

			}
		},
		components: {
			mpvueEcharts
		},
		methods: {
			initChart: function(canvas, width, height) {

				let chart = echarts.init(canvas, null, {
					width: width,
					height: height
				})
				canvas.setChart(chart)
				chart.setOption(option)
				return chart
			}
		},
		onShareAppMessage() {}
	}
</script>

<style scoped>
	.wrap {
		width: 100%;
		height: 350px;
		overflow: hidden;
	}
</style>
