<!-- 添加头像的图片 -->
<template>
	<view>
		<view style="display: flex; flex-direction: row; justify-content: center;align-items: center;">
			<view  style="border-radius: 50%;overflow: hidden;height: 200upx; width: 200upx;margin-top: 100upx;" @click="choiseimage()">
				<image :src=headimage style='width: 200upx;height: 200upx;'></image>
			</view>
		</view>
	
		<view class="atcenter uni-flex ">
			<button :loading="posting" @tap="defaultHandlerLogin" class="buttonstyle buttonstylelogin">{{posting?'上传中..':'上传头像'}}</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
                  posting:false,
				  defaultimaga:'../../../static/head_default.png',
				  headimage:'',
				  imageList:[]
				  
			}
		},
		onLoad:function(){
			this.headimage=this.defaultimaga
		},
		methods: {
          defaultHandlerLogin:function(){
			  if(this.headimage==this.defaultimaga){
				  uni.showToast({
				  	icon:"none",
					title:'请点击头像选择图片',
					duration:1000
				  })
			  }
			  this.posting=true
			  
		  },
		  choiseimage:function(){
			 if(this.imageList.length>0){
				 this.imageList=[]
			 }
			  //点击选择图片
			  uni.chooseImage({
			  	sourceType: ['camera', 'album'],
			  	sizeType: ['compressed'],
			  	count: 1,
			  	success: (res) => {
			  		this.imageList = this.imageList.concat(res.tempFilePaths);
					this.headimage=this.imageList[0]
					
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

	.buttonstylelogin {
		font-size: 35upx;
		width: 89%;
		margin-top: 130upx;
	}
</style>
