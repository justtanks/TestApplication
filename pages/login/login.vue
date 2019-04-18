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
	export default {
		data() {
			return {
				login: {
					loading: false,
					phone: "",
					password: ""
				},
			};
		},
		methods: {
			defaultHandlerLogin: function() {
				this.login.loading = true;
				setTimeout((e => {
					this.login.loading = false;
					// 					 uni.navigateTo({
					// 					 	url:"../normaluser/myrenwu/myrenwu"
					// 					 })
					// 默认的通过之后 不同的人有不同的值
					if (this.login.phone == 1) {

						uni.setStorage({
							key: 'isnomaluser',
							data: 1,
							success: function() {
								console.log('1success');
							}
						})
					} else {
						uni.setStorage({
							key: 'isnomaluser',
							data: 2,
							success: function() {
								console.log('2success');
							}
						})
					}
					uni.switchTab({
						url: '../index/index',

						success: function() {
							//这里记住账号密码 然后自动登录

						}
					})

				}), 1500);

			},
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
