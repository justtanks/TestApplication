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
		<button type="default" size="mini" style="margin-left: 20upx;" @click="choisezhiwei()" v-if="showzhiwei">{{zhiwei}}</button>
		<!-- 列表 -->
		<view class="listitem" v-for="(item,index) in rankList" :key='index'>
			<view class="paimingcontain">
				<image class="paimingimage" v-if="index==0" src="../../../static/first.png"></image>
				<image class="paimingimage" v-else-if="index==1" src="../../../static/second.png"></image>
				<image class="paimingimage" v-else-if="index==2" src="../../../static/third.png"></image>
				<view class="paimingnum" v-else="">{{index+1}}</view>
			</view>
			<view class='paiminimg'>
				<image src="../../../static/head_default.png" style="width: 75upx;height: 75upx;margin-right: 20upx;"></image>
			</view>
			<view class="paimingname" @click="clickitem(item)">{{item.user_nickname}}</view>
			<view class="paimingfenshu">
				{{item.score}}
			</view>
		</view>
		<!-- 弹出层使用 -->
		<popup-layer ref="popup" :direction="direction">
			<view class="pupustyle">

				<view class="uni-list">
					<radio-group @change="radioChange">
						<view style="margin: 25upx 25upx 25upx;"> 积分排名</view>
						<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in items" :key="item.value" style="justify-content: flex-start;display: flex;">
							<view>
								<radio :value="item.value" :checked="index === current" />
							</view>
							<view>{{item.name}}</view>
						</label>
					</radio-group>
				</view>


				<!-- 最后的确定按钮 -->
				<!-- <view class="buttonstyle popubottonbutton" @tap="popudown">
					确定
				</view> -->
			</view>
		</popup-layer>
		<mx-date-picker :show="showPicker" :type="type" :value="value" :show-seconds="true" @confirm="onSelected1" @cancel="onSelected1" />

		<mpvue-picker :themeColor="themeColor" ref="mpvuePicker" :mode="mode" :deepLength="deepLength" :pickerValueDefault="pickerValueDefault"
		 @onConfirm="onConfirm" @onCancel="onCancel" :pickerValueArray="pickerValueArray"></mpvue-picker>
	</view>
</template>

<script>
	import popupLayer from '../../../components/popup-layer/popup-layer.vue';
	// 选择时间的选择
	import MxDatePicker from '../../../components/mx-datepicker/mx-datepicker.vue'
	import dateutll from '../../../common/util.js'
	import URL from '../../../common/url.js'
	import mpvuePicker from '../../../components/mpvue-picker/mpvuePicker.vue';

	var _self;
	export default {
		components: {
			popupLayer,
			mpvuePicker,
			MxDatePicker

		},
		data() {
			return {
				direction: 'left',
				showPicker: false,
				showpop: false,
				items: [{
						value: '1',
						name: '月度积分排名',
						type: 'month'
					},
					{
						value: '2',
						name: '年度排名',
						checked: 'true',
						type: 'year'
					},
					{
						value: '3',
						name: '累计积分排名',
						type: 'all'
					},
					// {
					// 	value: '5',
					// 	name: '副总排名',
					// 	type: 'fuzong'
					// },
					// {
					// 	value: '6',
					// 	name: '机长排名',
					// 	type: 'jizhang'
					// },
					// {
					// 	value: '7',
					// 	name: '班长排名',
					// 	type: 'banzhang'
					// },
					// {
					// 	value: '8',
					// 	name: '主任排名',
					// 	type: 'zhuren'
					// },
					// {
					// 	value: '9',
					// 	name: '部长排名',
					// 	type: 'buzhan'
					// },
					{
						value: '10',
						name: '小组排名',
						type: 'group'
					}
				],
				pickerSingleArray: [{
						label: '机长',
						key: 'jizhang',
						value:'jizhang'
					},
					{
						label: '班长',
						key: 'banzhang',
						value: 'banzhang'
					},
					{
						label: '主任',
						key: 'zhuren',
						value:'zhuren'
					},
					{
						label: '部长',
						key: 'buzhang',
						value: 'buzhang'
					},
					{
						label: '副总',
						key: 'fuzong',
						value: 'fuzong'
					},
					{
						label: '员工',
						key: 'yuangong',
						value: 'yuangong'
					}
				],
				targetpaiming: '月度积分排名',
				current: 0,
				token: '',
				type: 'month',
				rankList: [],
				zhiwei: '全部',
				showzhiwei: true,
				job: '',
				themeColor: '#007AFF',
				pickerText: '',
				mode: '',
				deepLength: 1,
				pickerValueDefault: [0],
				pickerValueArray: [],

			};
		},
		onLoad() {
			_self = this
			this.token = uni.getStorageSync('token')
			this.getPaiming()
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
				// this.getPaiming()
			},
			radioChange: function(evt) {
				for (let i = 0; i < this.items.length; i++) {
					if (this.items[i].value === evt.target.value) {
						this.current = i;
						this.targetpaiming = this.items[i].name
						this.type = this.items[i].type
						if (this.type == 'month' || this.type == 'year' || this.type == 'all') {
							this.showzhiwei = true
						} else {
							this.showzhiwei = false
						}
						this.$refs.popup.close()
						this.showpop = false
						this.getPaiming()
						this.job = ''
						this.zhiwei = '全部'
						// if (this.showzhiwei == true && this.job == '') {
						// 	this.getPaiming()
						// } else {
						// 	this.getPaimingbyjob()
						// }

						break;
					}
				}
				// this.targetpaiming=evt.target.name
			},
			getPaiming: function(e) {
				uni.showLoading({

				})
				uni.request({
					url: URL.getpaiming,
					data: {
						token: _self.token,
						deviceType: 'android',
						type: _self.type
					},
					complete: function(e) {
						uni.hideLoading()
						uni.stopPullDownRefresh()
						_self.toast(e.data.msg)
						if (e.data.code == 1) {
							_self.rankList = e.data.data.rank
						} else {

						}
					}
				})
			},
			getPaimingbyjob: function(e) {
				uni.showLoading({

				})
				uni.request({
					url: URL.getpaiming,
					data: {
						token: _self.token,
						deviceType: 'android',
						type: _self.type,
						job: _self.job

					},
					complete: function(e) {
						uni.hideLoading()
						uni.stopPullDownRefresh()
						_self.toast(e.data.msg)
						if (e.data.code == 1) {
							_self.rankList = e.data.data.rank
						} else {

						}
					}
				})
			},
			choisezhiwei:function(){
				// 选择审批人
				this.pickerValueArray = this.pickerSingleArray
				this.mode = 'selector'
				this.deepLength = 1
				this.pickerValueDefault = [0]
				this.$refs.mpvuePicker.show()
				
			},
			onCancel(e) {
				console.log(e)
			},
			onConfirm(e) {
				this.job = e.value[0];
				this.zhiwei = e.label
				this.getPaimingbyjob()
			},

			clickitem: function(e) {

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
			}


		},
		onPullDownRefresh: function() {
			// 执行下拉刷新的方法
			this.getPaiming()
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
