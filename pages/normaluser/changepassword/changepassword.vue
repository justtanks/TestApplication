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
		:loading="changeing" @click="changepass">{{changeing?'修改中':'确认修改'}}</button>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				firstfocus: true,
				secondfocus: false,
				thirdfocus: false,
				changeing: false,
				lastword: '',
				newword1: "",
				newword2: ''
			}
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
			changepass: function(e) {
				this.changeing = true
				if (this.newword1 != this.newword2) {
					uni.showToast({
						title: '新旧密码不一样',
						duration: 1000,
						icon: "none",
						position: "bottom"
					})
				}
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
