<template>
	<view>
		<view style="background-color: #FFFFFF;">
			<view class="timechoise" style="margin-top: 0upx; border: none;">
				<view style="font-size: 35upx;margin-left: 30upx;">固定任务</view>
				<switch style="margin-right: 20upx;" @change="switchchange" />
			</view>
			<view style="height: 80upx;background-color:#F1F1F3;">
				<view style="margin-top: 20upx; margin-left: 30upx; font-size: 25upx;">
					固定任务为每个周期固定自动分配任务
				</view>
			</view>
			<!-- 任务标题 -->
			<textarea class="uni-input inputclass" placeholder-class="placeholdderclass" style="font-size: 35upx;"
			 show-confirm-bar="true" auto-height="true" placeholder="任务标题" placeholder-style="color:#CCCCCC" maxlength="30"
			 v-model="inputresean" @input="inputholder" />
			<view style="border-bottom: #F1F1F3 solid 0.5upx;">
			<view class="textnum">{{textnum}}</view>
			</view>
			<!-- 任务备注 -->
			<textarea class="uni-input inputclass" placeholder-class="placeholdderclass" style="font-size: 35upx;"
			 show-confirm-bar="true" auto-height="true" placeholder="任务备注(选填)" placeholder-style="color:#CCCCCC" maxlength="30" v-model="beizhusean" @input="inputholder2" />
			 <view style="border-bottom: #F1F1F3 solid 0.5upx;">
			<view class="textnum">{{beizhunum}}</view>
			</view>
			<!-- 积分 -->
			<view class="timechoise uni-list-cell-navigate uni-navigate-right">
				<view style="font-size: 35upx;">积分</view>
				<input style="line-height: 1; font-size: 35upx;" placeholder="请输入积分"  placeholder-style="color:#CCCCCC" maxlength="8" />
			</view>
			<!-- 截至日期 -->
			<view class="timechoise uni-list-cell-navigate uni-navigate-right" v-if="!haverull" @click="choisetime('date')">
				<view style="font-size: 35upx;">截止日期</view>
				<view style="font-size: 30upx;margin-right: 50upx; color:#555555;">{{date}}</view>
			</view>
			<view class="timechoise uni-list-cell-navigate uni-navigate-right" v-if="!haverull" @click="choisetime('time')">
				<view style="font-size: 35upx;">截止时间</view>
				<view style="font-size: 30upx;margin-right: 50upx; color:#555555;">{{time}}</view>
			</view>
			<!-- 分配周期 -->
				<view class="timechoise uni-list-cell-navigate uni-navigate-bottom" v-else="" @click="choisezhouqi">
				<view style="font-size: 35upx;">分配周期</view>
				<view style="margin-right:20upx;color:#555555;">{{renwuzhouqi}}</view>
		 	    </view>
			
			<!-- 选择负责人 -->
			<view class="timechoise uni-list-cell-navigate uni-navigate-right" @click="show1('left')" >
				<view style="font-size: 35upx;">负责人</view>
			</view>
			<!-- 添加图片 -->
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
			<button class="buttonstyle" hover-class="muhovercolor" @tap="addshenqing" >提交任务</button>
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
		<mx-date-picker :show="showPicker" :type="type" :value="value" :show-seconds="true" @confirm="onSelected" @cancel="onSelected" />
	</view>
</template>

<script>
// 选择时间的选择
	import MxDatePicker from '../../../components/mx-datepicker/mx-datepicker.vue'
    import dateutll from '../../../common/util.js'
	import mSearch from '../../../components/mehaotian-search/mehaotian-search.vue'
	import uniDrawer from '@/components/uni-drawer/uni-drawer.vue'
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	export default {
		
	components: {
		MxDatePicker,
			mSearch,
		uniDrawer,
		uniLoadMore
		
	},
	data() {
			return {
				inputresean:'',
				beizhusean:'',
				haverull:false,
				textnum:'0/30',
				beizhunum:'0/30',
				// 时间选择器需要的数据
				showPicker: false,
				date: '2019/01/01',
				type: 'date',
				value: '',
				time: '15:00:12',
				//关于拍照和从相册选择图片
				imageList: [],
				// 				sourceTypeIndex: 2,
				// 				sourceType: ['拍照', '相册', '拍照或相册'],
				// 				sizeTypeIndex: 2,
				// 				sizeType: ['压缩', '原图', '压缩或原图'],
				countIndex: 8,
				count: [1, 2, 3, 4, 5, 6, 7, 8, 9],
				base64:'',
				// 分配周期
				renwuzhouqi:'每天',
				
				// 选择负责人
				showLeft: false,
				showRigth: false,
				drawmode: 'right',
				
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
			inputholder2:function(e){
				let length=this.beizhusean.length;
				this.beizhunum=length+'/'+'30'
			},
			switchchange:function(e){
				//修改选项bar
				 this.haverull=e.target.value;
			},
			choisetime:function(type){
				//弹出时间的选择框
				this.type = type;
				this.showPicker = true;
				this.value = this[type];
			},
			onSelected(e) {//选择
				this.showPicker = false;
				if(e) {
					this[this.type] = e.value; 
				}
			},
			addimage:function(){
				// 添加图片
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
				// 展示大图
				var current = e.target.dataset.src
				uni.previewImage({
					current: current,
					urls: this.imageList
				})
			},
			choisezhouqi:function(){
				// 添加任务周期
				let that =this;
				uni.showActionSheet({
					itemList: ['每天', '每周', '每月'],
						success: function (res) {
						var	renwulist=['每天', '每周', '每月'];
						that.renwuzhouqi=renwulist[res.tapIndex]
					},
					fail: function (res) {
					console.log(res.errMsg);
				}
				});
			},
			addshenqing:function(e){
				// 提交任务按钮
			},
			 close(e){
			    this.imageList.splice(e,1);
			},
			// 选择人员的弹层的方法
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
			
		},
		onBackPress:function(){
			if (this.showPicker) {
				this.showPicker = false
				return true
			}
			if(this.showLeft){
				this.showLeft=false
				return true
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
		font-size: 35upx;
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
	/* 选择人员的pop的样式 */
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
