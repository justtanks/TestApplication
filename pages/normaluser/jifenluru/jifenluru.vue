<!-- 积分录入界面，没有实现具体的下一个点击 -->
<template>
	<view>

		<view style="background-color: #FFFFFF;">
			
			<view class="timechoise uni-list-cell-navigate uni-navigate-right" @click="show1('left')">
				<view style="font-size: 35upx;">选择人员</view>
			</view>
			<view class="timechoise uni-list-cell-navigate uni-navigate-right" @click="choisetime('date')">
				<view style="font-size: 35upx;">事件时间</view>
				<view style="font-size: 30upx;margin-right: 50upx; color:#555555;">{{date}}</view>
			</view>
			<view class="timechoise uni-list-cell-navigate uni-navigate-right" @click="choiseRull">
				<view style="font-size: 35upx;">选择规则</view>
			</view>
			<view class="timechoise uni-list-cell-navigate uni-navigate-right" @click="choiseperson">
				<view style="font-size: 35upx;">递交审批</view>
				<view style="font-size: 35upx;margin-right: 50upx;color:#555555 ;">选填</view>
			</view>
		</view>
         
		<view style="height: 150upx;width: 100%; position:fixed; bottom:0; display: flex; justify-content: center;align-items: center;">
			<view style="height: 45upx;width: 90%;">
				<button class="buttonstyle" hover-class="muhovercolor" @click="addshenqing">提交</button>
			</view>
		</view>
		
		<!-- 第三个drawer -->
		<uni-drawer :visible="showLeft" :mode="drawmode" @close="closeDrawer('left')">
			<!--  -->
			<view class="pupustyle">
				<view class="topcontent">
					<view class="topstyle">
						<view class="topstyle_choise" style="justify-content: flex-start;margin-left: 25upx;">取消</view>
						<view class="topstyle_choise" style="font-size: 33upx;">选择员工</view>
						<view class="topstyle_choise" style="justify-content: flex-end;margin-right: 25upx;" @click="showpup">完成</view>
					</view>
					<mSearch :show='false' @search="search($event,0)"></mSearch>
				</view>

				<view style="height: 180upx;"></view>
				<scroll-view style="height: 1020upx;" scroll-y="true">
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
			<!-- 	<view class="buttonstyle popubottonbutton" @tap="popudown">
					确定
				</view> -->
			</view>

		</uni-drawer>


		<!--  -->

		<mx-date-picker :show="showPicker" :type="type" :value="value" :show-seconds="true" @confirm="onSelected" @cancel="onSelected" />
		<mpvue-picker :themeColor="themeColor" ref="mpvuePicker" :mode="mode" :deepLength="deepLength" :pickerValueDefault="pickerValueDefault"
		 @onConfirm="onConfirm" @onCancel="onCancel" :pickerValueArray="pickerValueArray"></mpvue-picker>
	</view>
</template>

<script>
	// 选择时间的选择
	import MxDatePicker from '../../../components/mx-datepicker/mx-datepicker.vue'
	import dateutll from '../../../common/util.js'
	// 添加上推的列表选择
	import mpvuePicker from '../../../components/mpvue-picker/mpvuePicker.vue';
	import mSearch from '../../../components/mehaotian-search/mehaotian-search.vue'
	import uniDrawer from '@/components/uni-drawer/uni-drawer.vue'
	import cityData from '../../../common/city.data.js';
	export default {
		components: {
			MxDatePicker,
			mpvuePicker,
			mSearch,
			uniDrawer,
			

		},
		data() {
			return {
				// 第三个pop
				showLeft: false,
				showRigth: false,
				drawmode: 'right',
				
				// 时间选择器需要的数据
				showPicker: false,
				date: '2019/01/01',
				type: 'date',
				value: '',
				// 选择规则需要的列表 上推列表使用的
				pickerSingleArray: [],
				mulLinkageTwoPicker: cityData,
				cityPickerValueDefault: [0, 0, 1],
				themeColor: '#007AFF',
				pickerText: '',
				mode: '',
				deepLength: 1,
				pickerValueDefault: [0],
				pickerValueArray: [{
						'value': '01',
						'label': '产量积分'
					},
					{},
					{},
					{}
				]
			};
		},
		onReady() {
			this.date = dateutll.dateUtils.getNowFormatDate()
		},
		methods: {
			show1(e) {
				//展示第三个弹窗  选择人员
				if (e === 'left') {
					this.showLeft = true,
						this.drawmode = 'left'

				} else {
					this.showRigth = true
					this.drawmode = 'right'
				}
			},
			choisetime: function(type) {
				//弹出时间的选择框
				this.type = type;
				this.showPicker = true;
				this.value = this[type];
			},
			onSelected(e) { //选择
				this.showPicker = false;
				if (e) {
					this[this.type] = e.value;
				}
			},
			
			choiseRull: function() {
				this.pickerValueArray = this.mulLinkageTwoPicker;
				this.mode = 'multiLinkageSelector'
				this.deepLength = 2
				this.pickerValueDefault = [0, 0]
				this.$refs.mpvuePicker.show()
			},
			onCancel(e) {
				// 点击取消键
				console.log(e.name)
			},
			onConfirm(e) {
				this.pickerText = JSON.stringify(e)
				console.log(JSON.stringify(e))
			},

			search(e, val) {
				// 搜索的方法
				console.log(e, val);
			},
			closeDrawer(e) {
				if (e === 'left') {
					this.showLeft = false
				} else {
					this.showRigth = false
				}
			}
			
		},
		onShow: function() {

		},
		onBackPress() {
			if (this.showRigth || this.showLeft) {
				this.closeDrawer(this.drawmode)
				return true  //return true 会把返回事件覆盖掉
			}
		},
		onUnload() {
			if (this.$refs.mpvuePicker.showPicker) {
				this.$refs.mpvuePicker.pickerCancel()
			}

		}
	}
</script>

<style>
	page {
		background-color: #F1F1F3;
	}

	.pupustyle {
		width: 100%;
		display: flex;
		flex-direction: column;
	}

	.topcontent {
		width: 100%;
		position: fixed;
		z-index: 999999;
		min-height: 180;
		display: flex;
		flex-direction: column;
		background-color: #FFFFFF;
		border-bottom: #EBEBEB solid 1upx;
	}

	.timechoise {
		margin: 10upx 25upx;
		margin-right: 0upx;
		height: 80upx;
		width: auto;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		border-bottom: #EBEBEB solid 1upx;
	}

	.popubottonbutton {
		width: 100%;
		height: 80upx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

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
</style>
