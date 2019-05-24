<!-- 积分录入界面，没有实现具体的下一个点击 -->
<template>
	<view>

		<view style="background-color: #FFFFFF;">
			<textarea class="uni-input inputclass" placeholder-class="placeholdderclass" style="font-size: 35upx;line-height: 1;"
			 show-confirm-bar="true" auto-height="true" placeholder="申请理由" maxlength="30" v-model="inputresean" @input="inputholder" />
			<view class="textnum">{{textnum}}</view>

			<view class="timechoise uni-list-cell-navigate uni-navigate-right" @click="show1('left')">
				<view style="font-size: 35upx;">选择人员</view>
			</view>
			<view class="timechoise uni-list-cell-navigate uni-navigate-right" @click="choisetime('date')">
				<view style="font-size: 35upx;">事件时间</view>
				<view style="font-size: 30upx;margin-right: 50upx; color:#555555;">{{date}}</view>
			</view>
			<view class="timechoise uni-list-cell-navigate uni-navigate-bottom" @click="choisefenlei">
				<view style="font-size: 35upx;">积分分类</view>
				<view style="font-size: 35upx;margin-right: 50upx;color:#555555 ;">{{fenlei}}</view>
			</view>
			<view class="timechoise uni-list-cell-navigate uni-navigate-right" @click="choiseRull('left')">
				<view style="font-size: 35upx;">选择规则</view>
			</view>
			<view class="timechoise" v-show="showrulltext">
				<view style="font-size: 35upx;margin-top: 10upx;margin-bottom: 10upx;">{{rulltext}}</view>
			</view>
			<view class="timechoise uni-list-cell-navigate uni-navigate-right" @click="dijiaoshenpi('left')">
				<view style="font-size: 35upx;">递交审批</view>
				<view style="font-size: 35upx;margin-right: 50upx;color:#555555 ;">选填</view>
			</view>
			<!-- 积分 -->
			<view class="timechoise uni-list-cell-navigate uni-navigate-right">
				<view style="font-size: 35upx;">积分</view>
				<input style="line-height: 1; font-size: 35upx;" placeholder="请输入积分"  placeholder-style="color:#CCCCCC" maxlength="8" />
			</view>
		</view>

		<view style="height: 150upx;width: 100%; display: flex; justify-content: center;align-items: center;">
			<view style="height: 45upx;width: 90%;">
				<button class="buttonstyle" hover-class="muhovercolor" @click="addshenqing">提交</button>
			</view>
		</view>

		<!-- 选择人员的drawer -->
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
		
		<!-- 递交审批选择人员的drawer -->
		<uni-drawer :visible="showLeft3" :mode="drawmode" @close="closeDrawer('left')">
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
		

		<!-- 选择规则的drawer -->
		<uni-drawer :visible="showLeft1" :mode="drawmode" @close="closeDrawer2('left')">
			<!--  -->
			<view class="pupustyle_two">
				<view class="topcontent">
					<view style="position: fixed;width: 100%;background-color: #FFFFFF;min-height: 90upx;">
						<!-- <mSearch :show='false' @search="search($event,0)"></mSearch> -->
						<!-- 上面的目录导航条 -->
						<view style="height: 80upx;display: flex;flex-direction: row;justify-content: flex-start;align-items: center;padding-left: 25upx;">
							<view class="navtextstyle" v-for="(item,index) in barlist" :key="index" @click="baritemclick(index)">
								<view style="display: flex;flex-direction: row;justify-content: center;align-items: center; font-size: 35upx;">»</view>
								<view style="font-size: 30upx;margin-left: 5upx;">{{item}}</view>
							</view>
						</view>
					</view>
				</view>
				<view style="height: 95upx;"></view>

				<scroll-view style="height: 1030upx;" scroll-y="true">
                  <view style="width: 100%;">
                  	<view class="cadlist" :class="listitemstyle" v-for="(item,index) in formdata" :key="index" @click="clickitem(index)">
                  		<view style="font-size: 35upx;margin-top: 10upx;margin-bottom: 10upx;">{{item.value}}</view>
                  		<image class="tonextstyle" v-if="!item.last" src="../../../static/tonext.png"></image>
                  	</view>
                  	<!-- <uni-load-more :status="status" :contentText="contentText"></uni-load-more> -->
                  </view>
				</scroll-view>
			</view>

		</uni-drawer>
		<mx-date-picker :show="showPicker" :type="type" :value="value" :show-seconds="true" @confirm="onSelected" @cancel="onSelected" />
		<mpvue-picker :themeColor="themeColor" ref="mpvuePicker" :mode="mode" :deepLength="deepLength" :pickerValueDefault="pickerValueDefault"
		 @onConfirm="onConfirm" @onCancel="onCancel" :pickerValueArray="pickerValueArray"></mpvue-picker>
	</view>
</template>

<script>
	// 选择时间的选择
	import MxDatePicker from '../../../components/mx-datepicker/mx-datepicker.vue'
	import mpvuePicker from '../../../components/mpvue-picker/mpvuePicker.vue';
	import dateutll from '../../../common/util.js'
	// 添加上推的列表选择
	import mSearch from '../../../components/mehaotian-search/mehaotian-search.vue'
	import uniDrawer from '@/components/uni-drawer/uni-drawer.vue'
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	import mydata from "../../../common/mydata.js"

	var _self;
	export default {
		components: {
			MxDatePicker,
			mSearch,
			uniDrawer,
			mpvuePicker,
			uniLoadMore

		},
		data() {
			return {
				guizearray:[
					{
							label: '加班类',
							value: 1
						},
						{
							label: '值班类',
							value: 2
						},
						{
							label: '客户表扬',
							value: 3
						},
						{
							label: '节能增效类',
							value: 4
						},
						{
							label: '建议类',
							value: 5
						},
						{
							label: '效率提升',
							value: 6
						},
						{
							label: '质量管理类',
							value: 7
						},
						{
							label: '安全管理类',
							value: 8
						},
						{
							label: '设备管理类',
							value: 9
						},
						{
							label: '其他类',
							value: 10
						},
						{
							label: '积极主动类',
							value: 11
						}
				],
				fenlei:'',
				// 第三个pop
				showLeft: false,
				showRigth: false,
				drawmode: 'right',

				// 时间选择器需要的数据
				showPicker: false,
				date: '2019/01/01',
				type: 'date',
				value: '',
				// 文字项
				'textnum':'0/30',
				'inputresean':'',


				// 模仿的数据
				showLeft1:false,
				formdata: mydata, //记录最初的数据
				itemdata: {},
				huanchong: [], // 建立缓冲的一个规则数组，通过数组最后一个来实现返回
				barlist: [], //建立一个导航条的文字的缓冲的数组
				
				// 递交审批
				showLeft3:false,
				
				//关于选择分类弹窗
				themeColor: '#007AFF',
				pickerText: '',
				mode: '',
				deepLength: 1,
				pickerValueDefault: [0],
				pickerValueArray: [],
				// 规则文本
				rulltext:'',
				showrulltext:false
			};
		},
		onReady() {
			this.date = dateutll.dateUtils.getNowFormatDate()
		},
		methods: {
			inputholder:function(e){
				let length=this.inputresean.length;
				this.textnum=length+'/'+'30'
			},
			show1(e) {
				//展示第三个弹窗  选择人员
				if (e === 'left') {
					this.showLeft = true
					this.drawmode = 'left'

				} else {
					this.showRigth = true
					this.drawmode = 'right'
				}
			},
			dijiaoshenpi:function(e){
				if (e === 'left') {
					this.showLeft3 = true
					this.drawmode = 'left'
				
				} else {
					 
				}
			},
			choisetime: function(type) {
				//弹出时间的选择框
				this.type = type;
				this.showPicker = true;
				this.value = this[type];
			},
			onSelected(e) { //选择时间的picker
				this.showPicker = false;
				if (e) {
					this[this.type] = e.value;
				}
			},
			onLoad: function() {
				_self = this;
			},

			choiseRull: function(e) {
				//展示规则的界面
				if (e === 'left') {
					console.log("showleft")
					this.showLeft1 = true
					this.drawmode = 'left'

				}
			},
			
			search(e, val) {
				// 搜索的方法
				console.log(e, val);
			},
			closeDrawer(e) {  //关闭第一个drawer
				if (e === 'left') {
					this.showLeft = false
				} else {
					this.showRigth = false
				}
			},
			closeDrawer2(e) { //关闭第二个drawder
				if (e === 'left') {
					this.showLeft1 = false
				} else {
					this.showRigth = false
				}
			},
			//添加选择规则的界面
			clickitem: function(e) {
				// 条目的点击事件
				this.itemdata = this.formdata[e]
				if (this.itemdata.children != null) {
					this.formdata = this.itemdata.children
					this.huanchong.push(this.formdata)
					this.barlist.push(this.itemdata.value)
				}else{
					this.showrulltext=true
					this.rulltext=this.itemdata.value
					this.showLeft1=false
				}

			},
			baritemclick: function(e) {
				
			},
			choisefenlei:function(){
				// 选择分类
				this.pickerValueArray = this.guizearray
				this.mode = 'selector'
				this.deepLength = 1
				this.pickerValueDefault = [0]
				this.$refs.mpvuePicker.show()
			},
			onCancel(e) {
				console.log(e)
			},
			onConfirm(e) {
					this.fenlei=e.label
			}


		},

		onBackPress() {
			// 后退的方法
			if (this.showRigth || this.showLeft) {
				// this.closeDrawer(this.drawmode)
				this.showLeft=false
				return true //return true 会把返回事件覆盖掉
			}
			if (this.showPicker) {
				this.showPicker = false
				return true
			}
			if(this.showLeft){
				this.showLeft=false
				return true
			}
			if(this.showLeft3){
				this.showLeft3=false
				return true
			}
			// 关闭第二个抽屉，也就是规则的抽屉
			if(this.showLeft1){
				if (this.huanchong.length >1) {
					this.huanchong.pop()
					this.barlist.pop()
					this.formdata = this.huanchong[this.huanchong.length - 1]
					return true
				} else {
					this.showLeft1=false
					return true
				}
			}
			
		},
		onUnload() {
		
		},
		onShow:function(){
			// 初始将缓冲的规则里面添加最初的一个
			this.huanchong.push(this.formdata)
			this.barlist.push('全部规则')
		}
	}
</script>

<style>
	page {
		background-color: #F1F1F3;
	}
	.inputclass{
		min-height: 60upx;
		margin-left: 25upx;
		margin-right: 25upx;
		line-height: 1;
	}
	.placeholdderclass
	{
		font-size: 35upx;
		align-items: center;
		 line-height: 1;
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
		min-height: 80upx;
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
	.textnum{
		display: flex;flex-direction: row; justify-content: flex-end;margin-right: 25upx;color: #CCCCCC;
	}

</style>
