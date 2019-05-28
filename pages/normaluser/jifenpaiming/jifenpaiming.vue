<!-- 积分排名界面 -->
<template>
	<view>
		<!-- 顶部展示条 -->
		<view class="topstyle">
			<view style="margin-left: 25upx;">{{targetpaiming}}</view>
			<view style="margin-right: 25upx;" @click="showpup">筛选</view>
		</view>
		<!-- 中间空出的地方占位 -->
		<view style="height: 100upx;"></view>
		<!-- 列表 -->
		<view class="listitem" v-for="(item,index) in 30" :key='index'>
			<view class="paimingcontain">
				<image class="paimingimage" v-if="index==0" src="../../../static/first.png"></image>
				<image class="paimingimage" v-else-if="index==1" src="../../../static/second.png"></image>
				<image class="paimingimage" v-else-if="index==2" src="../../../static/third.png"></image>
				<view class="paimingnum" v-else="">{{index+1}}</view>
			</view>
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
				<!-- <view style="margin: 30upx 30upx;font-size: 28upx;">
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
				<view style="height: 20upx; background-color: #F1F1F3;margin-top: 30upx;"></view>
				<view style="display: flex;flex-direction: row; justify-content: space-between;">
					<view style="margin: 30upx 30upx;">
						时间
					</view>
					<view style="margin: 30upx;font-size: 28upx;">
						重置
					</view>
				</view>
				<view style="display: flex;flex-direction: row;margin-left: 40upx;margin-right: 40upx;" @click="choisetime('date')">
					<view style="flex: 1;display: flex; justify-content: center;align-items: center;font-size: 32upx;">{{date}}</view>
					<view style="flex: 1;display: flex;justify-content: center;align-items: center;">至</view>
					<view style="flex: 1;display: flex;justify-content: center;align-items: center;font-size: 32upx;">2019-2-1</view>
				</view>
				<view style="height: 20upx; background-color: #F1F1F3;margin-top: 50upx;"></view>
				<view style="margin: 30upx 30upx;font-size: 28upx;">
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

				<view class="uni-list">
					<radio-group @change="radioChange">
						<view style="margin: 25upx 25upx 25upx;"> 积分排名</view>
						<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in items" :key="item.value" style="justify-content: flex-start;display: flex;">
							<view>
								<radio :value="item.value" :checked="index === current" />
							</view>
							<view>{{item.name}}</view>
						</label>
						<!-- 	<view> 管理人员排名</view>
						<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in items_guanli" :key="item.value" style="justify-content: flex-start;display: flex;">
							<view>
								<radio :value="item.value" :checked="index === current" />
							</view>
							<view>{{item.name}}</view>
						</label> -->
					</radio-group>
				</view>


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
	import popupLayer from '../../../components/popup-layer/popup-layer.vue';
	// 选择时间的选择
	import MxDatePicker from '../../../components/mx-datepicker/mx-datepicker.vue'
	import dateutll from '../../../common/util.js'
	var _self;
	export default {
		components: {
			popupLayer,
			MxDatePicker
		},
		data() {
			return {
				direction: 'left',
				allpeople: true, //选择筛选所有人
				containcontrol: true, //包含管理者的筛选
				gonggong: false,
				wenhua: false,
				jixiao: false,
				guizhang: false,
				nengli: false,
				kaoqin: false,

				// 时间控件
				date: '2019/01/01',
				type: 'date',
				value: '',
				showPicker: false,
				showpop: false,
				items: [{
						value: '1',
						name: '月度积分排名'
					},
					{
						value: '2',
						name: '年度排名',
						checked: 'true'
					},
					{
						value: '3',
						name: '累计积分排名'
					},
					{
						value: '4',
						name: '班组积分排名'
					},
					{
						value: '5',
						name: '副总排名'
					},
					{
						value: '6',
						name: '机长排名'
					},
					{
						value: '7',
						name: '班长排名',
						checked: 'true'
					},
					{
						value: '8',
						name: '主任排名'
					},
					{
						value: '9',
						name: '部长排名'
					}
				],
				targetpaiming:'月度积分排名',
				current: 0,
				
			};
		},
		onLoad() {
			_self = this
		},
		onReady() {
			this.date = dateutll.dateUtils.getNowFormatDate()
		},
		methods: {

			showpup: function() {
				// 弹出弹窗
				this.$refs.popup.show() // 弹出
				this.showpop = true
			},
			popudown: function() {
				this.$refs.popup.close()
				this.showpop = false
			},
// 			quanyuanpaiming: function() {
// 				_self.allpeople = true;
// 				_self.zhiwei = false
// 			},
// 			zhiweipaiming: function() {
// 				_self.allpeople = false;
// 				_self.zhiwei = true
// 			},
// 			contain: function() {
// 				_self.containcontrol = true
// 			},
// 			containnot: function() {
// 				_self.containcontrol = false
// 			},
// 			gonggong1() {
// 				if (this.gonggong)
// 					this.gonggong = false
// 				else
// 					this.gonggong = true
// 			},
// 			qiyewenhua1() {
// 				if (this.wenhua)
// 					this.wenhua = false
// 				else
// 					this.wenhua = true
// 			},
// 			jixiao1() {
// 				if (this.jixiao)
// 					this.jixiao = false
// 				else
// 					this.jixiao = true
// 			},
// 			guizhang1() {
// 				if (this.guizhang)
// 					this.guizhang = false
// 				else
// 					this.guizhang = true
// 			},
// 			nengli1() {
// 				if (this.nengli)
// 					this.nengli = false
// 				else
// 					this.nengli = true
// 			},
// 			kaoqin1() {
// 				if (this.kaoqin)
// 					this.kaoqin = false
// 				else
// 					this.kaoqin = true
// 			},
// 			choisetime(type) {
// 				//弹出时间的选择框
// 				this.type = type;
// 				this.showPicker = true;
// 				this.value = this[type];
// 			},
// 			onSelected1(e) { //选择时间后
// 				this.showPicker = false;
// 				if (e) {
// 					this[this.type] = e.value;
// 				}
// 			},
			// 
			radioChange: function(evt) {
				for (let i = 0; i < this.items.length; i++) {
					if (this.items[i].value === evt.target.value) {
						this.current = i;
						this.targetpaiming=this.items[i].name
						break;
					}
				}
				// this.targetpaiming=evt.target.name
			}
		

	},
	onPullDownRefresh: function() {
			// 执行下拉刷新的方法
			setTimeout(function() {
				uni.stopPullDownRefresh()
			}, 1000)
		},
		onBackPress: function() {
			if (this.showPicker) {
				this.showPicker = false;
				return true
			}
			if (this.showpop) {
				this.$refs.popup.close()
				this.showpop = false
				return true
			}
		}

	}
</script>

<style>
	.topstyle {
		position: fixed;
		width: 100%;
		z-index: 7;
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
