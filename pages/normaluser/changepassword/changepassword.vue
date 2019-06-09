<!-- 修改密码界面 -->
<template>
	<view>
		<view style="height: 120upx;"></view>
		<view class="wrapstyle">
			<input class="passwordstyle" :class="{passwordstyle2:firstfocus}" placeholder="请输入旧密码" :focus="firstfocus" @focus="get1()"
			 password=true @blur="lost1()" v-model="lastword" />
		</view>

		<view class="wrapstyle">
			<input class="passwordstyle" placeholder="请输入新的密码" :focus=secondfocus @focus="get2()" :class="{passwordstyle2:secondfocus}"
			 password=true @blur="lost2()" v-model="newword1" />
		</view>
		<view class="wrapstyle">
			<input class="passwordstyle" placeholder="请再次输入新密码" :focus=thirdfocus @focus="get3()" :class="{passwordstyle2:thirdfocus}"
			 password=true @blur="lost3()" v-model="newword2" />
		</view>
		<button class="buttonstyle" style="width: 81%;margin-top: 120upx;font-size: 32upx;" 
		:loading="changeing" @click="showmodal">{{changeing?'修改中':'确认修改'}}</button>

	</view>
</template>

<script>
	import URL from '../../../common/url.js'
	var that
	export default {
		data() {
			return {
				firstfocus: true,
				secondfocus: false,
				thirdfocus: false,
				changeing: false,
				lastword: '',
				newword1: "",
				newword2: '',
				token:''
			}
		},
		onLoad:function(e){
			that=this
			this.token = uni.getStorageSync('token')
		},
		methods: {
			get1: function() {
				this.firstfocus = true
			},
			lost1: function() {
				this.firstfocus = false
			},
			get2: function() {
				this.secondfocus = true
			},
			lost2: function() {
				this.secondfocus = false
			},
			get3: function() {
				this.thirdfocus = true
			},
			lost3: function() {
				this.thirdfocus = false
			},
			showmodal:function(e){
				uni.showModal({
					title: '是否修改密码？',
					content: '修改成功会返回登陆界面重新登陆',
					confirmText: '确认修改',
					success: function(res) {
						if (res.confirm) {
							that.changepass()
						} else if (res.cancel) {
				          
						}
					}
				});
			},
			changepass: function(e) {
				this.changeing = true
				if (this.newword1 != this.newword2) {
					that.toast('重复密码不一样')
					return
				}
				uni.request({
					url:URL.changepass,
					data:{
						token:that.token,
						deviceType:'android',
						oldPassword:that.lastword,
						newPassword:that.newword1,
						rePassword:that.newword2
					},
					complete:function(e){
						this.changeing = true
						that.toast(e.data.msg)
						if(e.data.code==1){
							//清除缓存密码 跳转登陆界面
							uni.removeStorageSync('phone');
							uni.removeStorageSync('password');
							uni.removeStorageSync('token');
							uni.reLaunch({
								url:'../../login/login'
							})
							
						}
					}
				})
				
			},
			toast:function(msg){
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
		}
	}
</script>

<style>
	.passwordstyle {
		border-bottom: #BBBBBB 1upx solid;
		width: 80%;
		font-size: 35upx;
	}

	.passwordstyle2 {
		border-bottom: #1E90FF 1upx solid;
	}

	.wrapstyle {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		margin-top: 65upx;
	}
</style>
