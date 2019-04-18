<!-- “我的”界面 -->
<template>
	<view>
		<view class="bg_list uni-flex uni-row" style="height:160upx;width: 100%;margin-top: 20upx;justify-content: space-between;align-items: center;">
			<view style="display: flex;flex-direction: row;margin-left: 30upx;" @click="changepic">
				<image src="../../static/head_default.png" style="width: 120upx;height: 120upx;"></image>
				<view style="display: flex;flex-direction: column;margin-left: 20upx;">
					<view style="font-size: 35upx;">姓名</view>
					<view style="font-size: 25upx;margin-top: 35upx;">技术部</view>
				</view>
			</view>
			<image src="../../static/tonext.png" class="tonextstyle" style="margin-right: 30upx;"></image>
		</view>
		<view class="mine_list" style="margin-top: 20upx;" @click="changename">
			<view class="mine_textstyle">姓名</view>
			<view class="leftstyle">
				<view style="margin-right: 20upx;color: #555555;">稍微</view>
				<image src="../../static/tonext.png" class="tonextstyle" style="visibility: hidden;"></image>
			</view>
		</view>
		<view class="mine_list" @click="changesex">
			<view class="mine_textstyle">性别</view>
			<view class="leftstyle">
				<view style="margin-right: 20upx;color: #555555;">{{usersex}}</view>
				<image src="../../static/tobottom.png" class="tonextstyle"></image>
			</view>
		</view>
		<view class="mine_list">
			<view class="mine_textstyle">工号</view>
			<view class="leftstyle">
				<view style="margin-right: 20upx;color: #555555;">100000003</view>
				<image src="../../static/tobottom.png" class="tonextstyle" style="visibility: hidden;"></image>
			</view>
		</view>
		<view class="mine_list">
			<view class="mine_textstyle">电话</view>
			<view class="leftstyle">
				<view style="margin-right: 20upx;color: #555555;">13556533356</view>
				<image src="../../static/tobottom.png" class="tonextstyle" style="visibility: hidden;"></image>
			</view>
		</view>
		<view class="mine_list" @click="changepass">
			<view class="mine_textstyle">密码</view>
			<view class="leftstyle">
				<view style="margin-right: 20upx;color: #555555;">修改密码</view>
				<image src="../../static/tonext.png" class="tonextstyle"></image>
			</view>
		</view>
		<button style="margin: 25upx 25upx 25upx 25upx;" @click="quit" type="warn">退出账号</button>
	</view>
</template>

<script>
	var _that
	export default {
		data() {
			return {
                usersex:"男",
				sexlist:['男','女'],
				
			};
		},
		onLoad:function(){
			_that=this
		},
		methods:{
			changepicZ:function(){
				//修改图片界面跳转  或者弹出pop
			},
			changename:function(){
				//修改姓名
			},
			changesex:function(){
				//修改性别
				uni.showActionSheet({
					itemList:_that.sexlist,
					success:function(e){
						_that.usersex=_that.sexlist[e.tapIndex]
					}
				})
			},
			changepass:function(){
				//修改密码
			},
			quit:function(){
				//退出账号
				uni.showModal({
					title:'退出当前账号',
					showCancel:true,
					confirmText:'退出',
				    cancelText:'取消',
					content:'是否退出当前账号并返回登录界面',
					confirmColor:"#ff0000",
					success:function(e){
						if(e.confirm){
							//点击退出后 消除跳转到登录界面
							uni.reLaunch({
								url:'../login/login'
							})
						}
						if(e.cancel){
							
						}
						
					}
				})
			}
			
		}
	}
</script>

<style>
	page {
		background-color: #F1F1F3;
	}

	.bg_list {
		background-color: #FFFFFF;
	}

	.mine_list {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		min-height: 100upx;
		background-color: #FFFFFF;
		margin-bottom: 1upx;
	}

	.mine_textstyle {
		font-size: 35upx;
		margin-left: 25upx;
	}

	.leftstyle {
		margin-right: 25upx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}
</style>
