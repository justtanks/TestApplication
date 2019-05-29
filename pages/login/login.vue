<template>
	<view>
		<view class="uni-flex uni-row">
			<view class="uni-flex atcenter" style="width: 100%; height: 130upx;">
				<!-- <image style="width: 180upx; height: 200upx;" src="../../static/wel_icon.png"></image> -->

			</view>
		</view>
		<view class="uni-flex atcenter haveborder outstyle">
			<input class="inputstyle" placeholder="请输入手机号码" type="number" v-model="login.phone" />
		</view>
		<view class="uni-flex atcenter haveborder outstyle">
			<input class="inputstyle" placeholder="请输入密码" adjust-position="true" password="true" v-model="login.password" />
		</view>
		<view class="atcenter uni-flex ">
			<button :loading="login.loading" @tap="defaultHandlerLogin" class="buttonstyle buttonstylelogin">{{login.loading?'登陆中..':'登录'}}</button>
		</view>
		<view class="uni-flex" style="justify-content: flex-end;margin-top: 50upx;">
			<text style="color: #666666;margin-right: 60upx;font-size: 30upx;">忘记密码</text>
		</view>
	</view>
</template>

<script>
	import url1 from '../../common/url.js'
	var that
	export default {
		data() {
			return {
				login: {
					loading: false,
					phone: "18253485939",
					password: "111111"
				},
				result: {}
			};
		},
		onLoad: function() {
			that = this
			const phone = uni.getStorageSync('phone');
			const password = uni.getStorageSync('password')
			const token=uni.getStorageSync('token')
			if (token!=null&&token!=''&&token!=undefined) {
				this.login.phone = phone
				this.login.password = password
				// this.setusermsg(token)
				this.defaultHandlerLogin()
			}
		},
		methods: {
			defaultHandlerLogin: function() {
				this.login.loading = true;
				uni.request({
					url: url1.login,
					data: {
						user_login: that.login.phone,
						user_pass: that.login.password,
						device_type: 'android'
					},
					method: 'POST',
					complete: function(res) {
						that.login.loading = false;
						that.result = res.data
						if (that.result.code != 1) {
							uni.showToast({
								title: that.result.msg,
								duration: 1000
							})
							return
						}
						uni.setStorageSync('phone', that.login.phone)
						uni.setStorageSync('password', that.login.password)
						uni.setStorageSync('token',that.result.data.token)
						console.error(that.result.data.token)
						that.setusermsg(that.result.data.token)
						
					},
					fail: function(res) {
						that.login.loading = false;
						uni.showToast({
							title: '网络错误',
							duration: 1000
						})
					}
				})

			},
			setusermsg: function(token) {
                // 设置请求的用户信息到缓存
				uni.request({
					url:url1.getuserinfo,
					data:{
						token:token,
						deviceType:'android'
					},
					complete: (res) => {
						// var msg=res.data
						// console.error(JSON.stringify(res.data))
						uni.setStorageSync('usermsg',JSON.stringify(res.data))
						// 挑战到首页
							uni.switchTab({
							url: '../index/index',
							success: function() {
								//跳转到首页登录
						
							}
						})
					},
					fail: (res) => {
						console.log(res.data)
					}
				})
			}
		}
	}
</script>

<style>
	.atcenter {
		justify-content: center;
		align-items: center;
	}

	.haveborder {
		border: #B6B6B6 solid 1upx;
		border-radius: 20upx;
	}

	.outstyle {
		margin: 30upx 50upx 30upx 50upx;
		height: 90upx;
	}

	.buttonstylelogin {
		font-size: 35upx;
		width: 89%;
		margin-top: 130upx;
	}

	.inputstyle {
		width: 90%;
		height: 80%;
		font-size: 35upx;
	}

	/* .loginbtn button {
		height: 88rpx;
		width: 95%;
		line-height: 88rpx;
		color: #ffffff;
		font-size: 32rpx;
		border-radius: 44rpx;
		outline: 0;
		display: block;
		margin: 50upx;
		font-family: inherit;
		background: #007AFF;
		opacity: 0.8;
		margin-top: 120upx;
	}

	button:after {
		border: 2rpx solid #f2f2f2;
	}
 */
	/* 	.logoimg {
		width: 200rpx;
		height: 200rpx;
		border-radius: 50%;
	} */
</style>
