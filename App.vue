<script>
	export default {
		onLaunch: function () {
			console.log('App Launch')
		},
		onShow: function () {
			console.log('App Show')
		},
		onHide: function () {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import './common/uni.css';
	.buttonstyle{
		background-color: #007AFF;color: #FFFFFF;font-size: 36upx;
	}
	.buttonstyle:active{
		background-color:#1E90FF;
	}
</style>
