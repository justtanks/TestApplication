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
	.buttonstyle-gray{
		background-color:#D9D9D9;font-size: 36upx;
	}
	.buttonstyle-gray:active{
		background-color:#CCCCCC ;
	}
	/* 关闭图片加载的按钮 */
	.close-view{
	    text-align: center;line-height:14px;height: 16px;width: 16px;border-radius: 50%;background: #FF5053;color: #FFFFFF;position: absolute;top: -6px;right: -4px;font-size: 12px;
	}
	/* 预览图片的样式 */
	.imagestyle-yulan{
		width: 190upx;
		height: 190upx;
	   margin:20upx 20upx ;
	   position:relative;
	}
</style>
