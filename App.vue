<script>
	export default {
		onLaunch: function() {
			 
		},
		onShow: function() {
			 
		},
		onHide: function() {
			 
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import './common/uni.css';

	.buttonstyle {
		background-color: #007AFF;
		color: #FFFFFF;
		font-size: 36upx;
	}

	.buttonstyle:active {
		background-color: #1E90FF;
	}

	.buttonstyle-gray {
		background-color: #D9D9D9;
		font-size: 36upx;
	}

	.buttonstyle-gray:active {
		background-color: #CCCCCC;
	}

	/* 关闭图片加载的按钮 */
	.close-view {
		text-align: center;
		line-height: 14px;
		height: 16px;
		width: 16px;
		border-radius: 50%;
		background: #FF5053;
		color: #FFFFFF;
		position: absolute;
		top: -6px;
		right: -4px;
		font-size: 12px;
	}

	/* 预览图片的样式 */
	.imagestyle-yulan {
		width: 190upx;
		height: 190upx;
		margin: 20upx 20upx;
		position: relative;
	}

	/* 第一个列表 待审批-积分录入 */
	.cadlist-one {
		min-height: 350upx;
		background-color: #FFFFFF;
		margin-left: 10upx;
		margin-top: 10upx;
		margin-bottom: 10upx;
		margin-right: 10upx;
		display: flex;
		flex-direction: column;
	}

	.toptext-one {
		display: flex;
		min-height: 50upx;
		font-size: 35upx;
		margin: 20upx 20upx 20upx 20upx;
		text-align: left;
	}

	.toptext-two {
		font-size: 29upx;
		margin-left: 20upx;
		margin-top: 0upx;
		text-align: left;
		color: #666666;
		line-height: 1.5;
	}

	.shenpistyle-one {
		font-size: 30upx;
		display: flex;
		margin-left: 20upx;
		justify-content: center;
		align-items: center;
		line-height: 1.8;
	}

	.daishenpi {
		border: #CCCCCC 1upx solid;
		border-radius: 3upx;
		font-size: 30upx;
		padding: 0upx 5upx 0upx 5upx;
		margin-left: 40upx;
		line-height: 1.8;
	}

	/* 审批驳回 */
	.daishenpi-bohui {
		border: #CD0000 1upx solid;
		border-radius: 3upx;
		font-size: 30upx;
		padding: 0upx 5upx 0upx 5upx;
		margin-left: 40upx;
		line-height: 1.8;
		color: #CD0000;

	}

	/* 审批通过 */
	.daishenpi-tongguo {
		border: #008B00 1upx solid;
		border-radius: 3upx;
		font-size: 30upx;
		padding: 0upx 5upx 0upx 5upx;
		margin-left: 40upx;
		line-height: 1.8;
		color: #008B00;
	}

	.buttoncontainer {
		display: flex;
		width: auto;
		height: 100%;
		margin: 20upx 20upx 20upx 20upx;
		flex-direction: row;
		justify-content: flex-end;
	}

	.fenshustyle {
		color: #007AFF;
		font-size: 40upx;
		margin-right: 30upx;
	}


	/*事件列表的样式  */
	.thingstyle {
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-top: 5upx;
		justify-content: space-between;
	}

	/* 顶部的导航条文字样式 */
	.topstle {
		display: flex;
		font-size: 35upx;
		height: 80upx;
		justify-content: center;
		align-items: center;
		background-color: #FFFFFF;
		border-bottom-style: solid;
		border-bottom-color: #F1F1F3;
		border-bottom-width: 1upx;
	}

	::-webkit-scrollbar {
		width: 0;
		height: 0;
		color: transparent;
	}
	/* 导航条右指的大小 */
	.tonextstyle{
		width: 25upx;
		height: 25upx;
	}
	/* 选择规则的样式  所有选择规则的界面样式都是这个*/
	.cadlist {
		min-height: 90upx;
		background-color: #FFFFFF;
		margin-top: 1upx;
		display: flex;
		flex-direction: row;
		padding-left: 40upx;
		padding-right: 35upx;
		justify-content: space-between;
		align-items: center;
	}
	
	.cadlist:active {
		background-color: #EBEBEB;
	}
	
	.toptext {
		display: flex;
		min-height: 30upx;
		font-size: 28upx;
		margin: 20upx 20upx 20upx 20upx;
		text-align: left;
	}
	
	.shenpistyle {
		font-size: 25upx;
		display: flex;
		margin-left: 20upx;
		justify-content: center;
		align-items: center;
	}
	
	.border3text {
		display: flex;
		border: #777777 1upx solid;
		justify-content: center;
		align-items: center;
		padding-left: 30upx;
		padding-right: 30upx;
		margin-top: 20upx;
	}
	
	.navtextstyle {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		margin-left: 10upx;
		flex-wrap: nowrap;
	}
	.pupustyle_two{
		width: 100%;
		display: flex;
		flex-direction: column;
		background-color:#EBEBEB ;
		
	}
</style>
