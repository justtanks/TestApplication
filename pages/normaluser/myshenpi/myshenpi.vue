<!-- 审批他人申请的界面 -->
<template>
	<view>
		<view style="background-color: #FFFFFF;">
			<view style="height: 120upx;background-color:#FFFFFF; display: flex; align-items: center;">
				<view style="margin-top: 20upx; margin-left: 50upx; font-size: 25upx;  color:#555555;">
					申请时间：{{itemdata.add_time}}&nbsp;&nbsp;&nbsp; 申请人：{{itemdata.apply_user_name}}
				</view>
			</view>
			<!-- 添加展示图片的位置 -->
			<view style="min-height: 0upx;display: flex;flex-direction: row; flex-wrap: wrap;margin-left: 25upx;margin-right: 25upx;">
				<!-- image 的网格列表 -->
				<view class="imagestyle-yulan" v-for="(image,index) in imageList" :key="index">
					<image style="width: 100%;height: 100%;" :src="image" :data-src="image" @tap="showbigimage"></image>
				</view>
			</view>

			<view class="timechoise" style="margin-top: 0upx; border: none;">
				<view style="font-size: 35upx;margin-left: 30upx;">{{agreetext}}</view>
				<switch style="margin-right: 20upx;" @change="switchchange" checked="isagree" />
			</view>
			<view v-if="isagree">
				<!-- 积分规则和细则 -->
				<view class="timechoise uni-list-cell-navigate ">
					<view style="font-size: 30upx;margin-right: 50upx;margin-bottom: 15upx; color:#555555;">积分规则:{{itemdata.mark}}</view>
				</view>
				<view class="timechoise uni-list-cell-navigate ">
					<view style="font-size: 30upx;margin-right: 50upx;margin-bottom: 15upx; color:#555555;">审批对象:{{itemdata.benefit_user_name}}</view>
				</view>
				<view class="timechoise uni-list-cell-navigate " v-if="!haverull" @click="choisexize()">
					<view style="font-size: 35upx;">积分分类</view>
					<view style="font-size: 30upx;margin-right: 50upx; color:#555555;">{{itemdata.cate_name}}</view>
				</view>
				<view class="timechoise uni-list-cell-navigate " v-if="!haverull" @click="choisexize()">
					<view style="font-size: 35upx;">初审人</view>
					<view style="font-size: 30upx;margin-right: 50upx; color:#555555;">{{itemdata.pass_user_name1}}</view>
				</view>
				<view class="timechoise uni-list-cell-navigate " v-if="!haverull" @click="choisexize()">
					<view style="font-size: 35upx;">终审人</view>
					<view style="font-size: 30upx;margin-right: 50upx; color:#555555;">{{itemdata.pass_user_name2}}</view>
				</view>
				<view class="timechoise uni-list-cell-navigate uni-navigate-right">
					<view style="font-size: 35upx;">积分</view>
					<input style="line-height: 1; font-size: 35upx;" placeholder="请输入积分" :disabled="!inputenable" type="number"
					 placeholder-style="color:#CCCCCC" maxlength="8" :value="score" />
				</view>
				<view class="timechoise uni-list-cell-navigate" style="flex-direction: column;align-items: flex-start;">
					<view style="font-size: 35upx;">申请原因：</view>
					<view style="margin-top: 20upx; margin-left: 50upx; font-size: 25upx;  color:#555555;">
						{{itemdata.reason}}
					</view>
				</view>
			</view>
			<view v-else="">
				<textarea class="uni-input inputclass" placeholder-class="placeholdderclass" style="font-size: 35upx;"
				 show-confirm-bar="true" auto-height="true" placeholder="请填写不通过的原因(最多100字)" placeholder-style="color:#CCCCCC"
				 maxlength="100" v-model="refusereason" @input="inputholder2" />
				<view style="border-bottom: #F1F1F3 solid 0.5upx;">
				<view class="textnum">{{beizhunum}}</view>
				</view>
			</view>
		</view>
		
		
		
		<!-- 点击申请的按钮 -->
		<view class="bottonbutton" >
			<button style="background-color: #C8C7CC;" class="buttombuttonstyle"  hover-class="muhovercolor" @click="backlast">返回</button>
			<button style="background-color: #007AFF;" class="buttonstyle buttombuttonstyle" hover-class="muhovercolor" @click="addshenqing" >提交</button>
		</view>
	
	</view>
</template>

<script>
	import URL from '../../../common/url.js'
	var that
	export default {
	components: {

	},
	data() {
			return {
				 beizhunum:'0/100',
				isagree:'true',
				// 关于图片展示
				imageList: [],
				//传过来的数据
				itemdata: {},
				item:{},
				inputenable:false,
				score:0,
				agreetext:'同意',
				token:'',
				refusereason:'',
				length:0
			};
		},
		onReady(){
			// this.huanchong.push(this.formdata)
			// this.barlist.push('全部规则')
		},
	    onLoad:function(e){
					  that=this
					  this.token = uni.getStorageSync('token')
				  try{
				  	this.itemdata=JSON.parse(decodeURIComponent(e.itemList))
				   }catch(error){
				  this.itemdata=JSON.parse(e.itemList)
	             }
				 this.score=this.itemdata.score
				 if(this.itemdata.pass_step==2){
					 this.inputenable=true
				 }else{
					 this.inputenable=false
				 }
		},
		methods:{
			inputholder2:function(e){
				let length=this.refusereason.length;
				this.beizhunum=length+'/'+'100'
			},
			
			switchchange:function(e){
				//修改选项bar
				 this.isagree=e.target.value;
				 if(this.isagree){
					 this.agreetext='同意'
				 }else{
					  this.agreetext='驳回'
				 }
			},
			
			addshenqing:function(e){
				// 提交任务按钮
				uni.showLoading({})
				uni.request({
				   url:URL.shenpi,
				   data:{
					   token:that.token,
					   deviceType:'android',
					   id:that.itemdata.id,
					   score:that.score,
					   status:that.isagree?1:2,
					   refuseReason:that.isagree?null:that.refusereason
				   },
				   complete:function(e){
					   console.error(e.data)
				   	uni.hideLoading()
					uni.showToast({
						title:e.data.msg,
						duration:1000
					})
				   }
				})
			},
			
			backlast:function(){
				uni.navigateBack({
					delta:1
				})
			},
			showbigimage:function(e){
				var current = e.target.dataset.src
				uni.previewImage({
					current: current,
					urls: this.imageList
				})
			},
		},
		onBackPress() {
			// 后退的方法
			if (this.showRigth || this.showLeft) {
				// this.closeDrawer(this.drawmode)
				this.showLeft=false
				return true //return true 会把返回事件覆盖掉
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
			
		}
	}
</script>

<style>
	page{
		 background-color: #F1F1F3;
		 
	}
.inputclass{
		min-height: 150upx;
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
		min-height: 80upx;
		width: auto;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	     border-bottom: #EBEBEB solid 1upx;
	}

	.textnum{
		display: flex;flex-direction: row; justify-content: flex-end;margin-right: 25upx;color: #CCCCCC;
	}
	.bottonbutton{
		height: 100upx;width: 100%;  ;display: flex;flex-direction: row;
		background-color: #FFFFFF;
	}
	.buttombuttonstyle{
		color: #FFFFFF;font-size: 36upx;flex: 1;
		font-size: 35upx;
		margin: 10upx 20upx 10upx 20upx;
	}
	/* 时间选择框的眼样式 */
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
