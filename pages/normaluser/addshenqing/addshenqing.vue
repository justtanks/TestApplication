<!-- 添加申请界面 -->
<template>
	<view>
		<view style="background-color: #FFFFFF;">
			<textarea class="uni-input inputclass" placeholder-class="placeholdderclass" style="font-size: 35upx;"
			 show-confirm-bar="true" auto-height="true" placeholder="申请理由" maxlength="30" v-model="inputresean" @input="inputholder" />
			<view class="textnum">{{textnum}}</view>
		<!-- 选择时间 -->
		<view class="timechoise uni-list-cell-navigate uni-navigate-right" @click="choisetime('date')">
			<view style="font-size: 35upx;">事件时间</view>
			<view style="font-size: 30upx;margin-right: 50upx; color:#555555;">{{date}}</view>
		</view>
		<view class="timechoise uni-list-cell-navigate uni-navigate-right">
			<view style="font-size: 35upx;">证明人</view>
			<input style="line-height: 1; font-size: 35upx;" placeholder="请输入姓名,2-8个字符" maxlength="8" />
		</view>
		<view class="timechoise uni-list-cell-navigate uni-navigate-bottom" @click="choiseperson">
			<view style="font-size: 35upx;">审批人</view>
			<view style="font-size: 35upx;margin-right: 50upx;color:#555555 ;">{{shenpiperson}}</view>
		</view>
		<view class="timechoise" >
			<view style="font-size: 35upx;margin-left: 30upx;">指定积分规则</view>
			<switch style="margin-right: 20upx;" @change="switchchange" />
		</view>
		<view class="timechoise uni-list-cell-navigate uni-navigate-right" v-if="haverull" >
			<view style="font-size: 35upx;">积分规则</view>
			
		</view>
		<!-- 上传图片的按钮和操作 -->
		<view style="min-height: 200upx;display: flex;flex-direction: row; flex-wrap: wrap;margin-left: 25upx;margin-right: 25upx;">
			<!-- image 的网格列表 -->
			<view class="imagestyle-yulan" v-for="(image,index) in imageList" :key="index">
				<image style="width: 100%;height: 100%;" :src="image" :data-src="image" @tap="showbigimage"></image>
				 <view class="close-view" @click="close(index)">x</view>
			</view>
			 <view class="uni-uploader__input-box"  >
				<view class="uni-uploader__input" @tap="addimage"></view>
			</view>
			<!-- <view class="addimage" @click="addimage">
				<view style="font-size: 90upx;color:#CCCCCC ;">+</view>
			</view> -->
		  </view>
	   </view>
		<!-- 点击申请的按钮 -->
		<view style="height: 60upx;width: auto;margin: 20upx 45upx 120upx 45upx;" >
			<button  class="buttonstyle"   @click="addshenqing" >提交申请</button>
		</view>
		<!-- 分别是时间选择控件，和列表选择控件 -->
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
	// 添加图片转换组件
	import { pathToBase64, base64ToPath } from '../../../components/image-tools/index.js'
	export default {
		components: {
			MxDatePicker,
			mpvuePicker
		},
		data() {
			return {
				pickerSingleArray: [{
						label: '中国',
						value: 1
					},
					{
						label: '俄罗斯',
						value: 2
					},
					{
						label: '美国',
						value: 3
					},
					{
						label: '日本',
						value: 4
					}
				],
				'textnum':'0/30',
				'inputresean':'',
				'shenpiperson':'',
				'haverull':false,
				// 时间选择器需要的数据
				showPicker: false,
				date: '2019/01/01',
				type: 'date',
				value: '',
				//关于选择联系人的值
				themeColor: '#007AFF',
				pickerText: '',
				mode: '',
				deepLength: 1,
				pickerValueDefault: [0],
				pickerValueArray: [],
				//关于拍照和从相册选择图片
				imageList: [],
// 				sourceTypeIndex: 2,
// 				sourceType: ['拍照', '相册', '拍照或相册'],
// 				sizeTypeIndex: 2,
// 				sizeType: ['压缩', '原图', '压缩或原图'],
				countIndex: 8,
				count: [1, 2, 3, 4, 5, 6, 7, 8, 9],
				
				base64:''
			};
		},
		onReady(){
			this.date=dateutll.dateUtils.getNowFormatDate()
		},
		onUnload() {
			this.imageList = [],
// 				this.sourceTypeIndex = 2,
// 				this.sourceType = ['拍照', '相册', '拍照或相册'],
// 				this.sizeTypeIndex = 2,
// 				this.sizeType = ['压缩', '原图', '压缩或原图'],
				this.countIndex = 8;
		},
		methods:{
			inputholder:function(e){
				let length=this.inputresean.length;
				this.textnum=length+'/'+'30'
			},
			choisetime:function(type){
				//弹出时间的选择框
				this.type = type;
				this.showPicker = true;
				this.value = this[type];
			},
			choiseperson:function(){
				// 选择审批人
				this.pickerValueArray = this.pickerSingleArray
				this.mode = 'selector'
				this.deepLength = 1
				this.pickerValueDefault = [0]
				this.$refs.mpvuePicker.show()
				
			},
			switchchange:function(e){
				 this.haverull=e.target.value;
			},
			addshenqing:function(){
				//添加上传图片  转化为base64 字符串的方法  这里是单个的转化为base64的方法
				 pathToBase64(this.imageList[0])
							.then(base64 => {
								console.log(base64)
								this.base64 = base64
							})
							.catch(error => {
								console.error(error)
							})
 
			},
			addimage:function(){
				if (this.imageList.length === 9) {
					 uni.showToast({
					 	title: '最多上传九张照片',
					 	mask: false,
					 	duration: 1500,
						icon:"none"
					 });
					 return
				}
				uni.chooseImage({
					sourceType: ['camera', 'album'],
					sizeType: ['compressed'],
					count: this.imageList.length + this.count[this.countIndex] > 9 ? 9 - this.imageList.length : this.count[this.countIndex],
					success: (res) => {
						this.imageList = this.imageList.concat(res.tempFilePaths);
					}
				})
				
			},
			showbigimage:function(e){
				var current = e.target.dataset.src
				uni.previewImage({
					current: current,
					urls: this.imageList
				})
			},
			onSelected(e) {//选择时间后
				this.showPicker = false;
				if(e) {
					this[this.type] = e.value; 
				}
			},
			// 点击选择负责人的列表的展示时的确认
			onCancel(e) {
				console.log(e)
			},
			onConfirm(e) {
				 this.shenpiperson=e.label;
			},
			 close(e){
			    this.imageList.splice(e,1);
			},
			 
		},
		 onBackPress() {
		  if (this.$refs.mpvuePicker.showPicker) {
		  	this.$refs.mpvuePicker.pickerCancel();
		    return true;
		  }
		  if (this.showPicker) {
		  	this.showPicker = false
		  	return true
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
	page{
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
		font-size: 30upx;
		align-items: center;
		 line-height: 1;
	}
	.timechoise{
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
	.addimage{
		width: 190upx;
		height: 190upx;
		border: #CCCCCC solid 1upx;
		display: flex;
		flex-direction: column;
	     justify-content: center;
		align-items: center;
	    margin:20upx 0upx ;
		
	}

	.textnum{
		display: flex;flex-direction: row; justify-content: flex-end;margin-right: 25upx;color: #CCCCCC;
	}
	
</style>
