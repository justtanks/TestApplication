<!-- 审批他人申请的界面 -->
<template>
	<view>
		<view style="background-color: #FFFFFF;">
			<view style="height: 120upx;background-color:#FFFFFF; display: flex; align-items: center;">
				<view style="margin-top: 20upx; margin-left: 50upx; font-size: 25upx;  color:#555555;">
					申请时间：{{shentingtime}}&nbsp;&nbsp;&nbsp; 申请人：{{shenqingren}}
				</view>
			</view>

			<view class="timechoise" style="margin-top: 0upx; border: none;">
				<view style="font-size: 35upx;margin-left: 30upx;">同意</view>
				<switch style="margin-right: 20upx;" @change="switchchange" checked="isagree" />
			</view>
			<view v-if="isagree">
				<!-- 积分规则和细则 -->
				<view class="timechoise uni-list-cell-navigate uni-navigate-right" v-if="!haverull" @click="choiseguize()">
					<view style="font-size: 35upx;">积分规则</view>
					<view style="font-size: 30upx;margin-right: 50upx; color:#555555;">{{zuize}}</view>
				</view>
				<view class="timechoise uni-list-cell-navigate uni-navigate-right" v-if="!haverull" @click="choisexize()">
					<view style="font-size: 35upx;">选择细则</view>
					<view style="font-size: 30upx;margin-right: 50upx; color:#555555;">{{xize}}</view>
				</view>
				<!-- 积分 -->
				<view class="timechoise uni-list-cell-navigate uni-navigate-right">
					<view style="font-size: 35upx;">积分</view>
					<input style="line-height: 1; font-size: 35upx;" placeholder="请输入积分" placeholder-style="color:#CCCCCC" maxlength="8" />
				</view>
				<view class="timechoise uni-list-cell-navigate uni-navigate-bottom" @click="choiseperson">
					<view style="font-size: 35upx;">递交审批</view>
					<view style="font-size: 35upx;margin-right: 50upx;color:#555555 ;">{{shenpiperson}}</view>
				</view>
			</view>
			<view v-else="">
				<textarea class="uni-input inputclass" placeholder-class="placeholdderclass" style="font-size: 35upx;"
				 show-confirm-bar="true" auto-height="true" placeholder="请填写不通过的原因(最多100字)" placeholder-style="color:#CCCCCC"
				 maxlength="100" v-model="beizhusean" @input="inputholder2" />
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
// 选择时间的选择
	
	export default {
	
	data() {
			return {
				 
				beizhusean:'',
				beizhunum:'0/100',
				isagree:'true',
			 
				// 申请时间 申请人
				shentingtime:'2012-2-2',
				shenqingren:'小明',
				// 规则细则
				guize:'提升学历',
				xize:'奖励40'
				
			};
		},
		onReady(){
			
		},
		onUnload() {
					
				},
		methods:{
			inputholder2:function(e){
				let length=this.beizhusean.length;
				this.beizhunum=length+'/'+'30'
			},
			
			switchchange:function(e){
				//修改选项bar
				 this.isagree=e.target.value;
			},
			
			addshenqing:function(e){
				// 提交任务按钮
			},
			choiseguize:function(){
				
			},
			choisexize:function(){
				
			},
			choiseperson:function(){
				
			},
			backlast:function(){
				uni.navigateBack({
					delta:1
				})
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
		height: 80upx;
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
		height: 100upx;width: 100%; position: fixed;bottom: 0;display: flex;flex-direction: row;
		background-color: #FFFFFF;
		 
	}
	.buttombuttonstyle{
		color: #FFFFFF;font-size: 36upx;flex: 1;
		font-size: 35upx;
		margin: 10upx 20upx 10upx 20upx;
	}
</style>
