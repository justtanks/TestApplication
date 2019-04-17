<!-- 审批他人申请的界面 -->
<template>
	<view>
		<view style="background-color: #FFFFFF;">
			<view style="height: 120upx;background-color:#FFFFFF; display: flex; align-items: center;">
				<view style="margin-top: 20upx; margin-left: 50upx; font-size: 25upx;  color:#555555;">
					申请时间：{{shentingtime}}&nbsp;&nbsp;&nbsp; 申请人：{{shenqingren}}
				</view>
			</view>
			<!-- 添加展示图片的位置 -->
			<view style="min-height: 0upx;display: flex;flex-direction: row; flex-wrap: wrap;margin-left: 25upx;margin-right: 25upx;">
				<!-- image 的网格列表 -->
				<view class="imagestyle-yulan" v-for="(image,index) in imageList" :key="index">
					<image style="width: 100%;height: 100%;" :src="image" :data-src="image" @tap="showbigimage"></image>
				</view>
				<!-- <view class="addimage" @click="addimage">
					<view style="font-size: 90upx;color:#CCCCCC ;">+</view>
				</view> -->
			  </view>
            
			<view class="timechoise" style="margin-top: 0upx; border: none;">
				<view style="font-size: 35upx;margin-left: 30upx;">同意</view>
				<switch style="margin-right: 20upx;" @change="switchchange" checked="isagree" />
			</view>
			<view v-if="isagree">
				<!-- 积分规则和细则 -->
				<view class="timechoise uni-list-cell-navigate uni-navigate-right" v-if="!haverull" @click="choiseRull('left')">
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
					<input style="line-height: 1; font-size: 35upx;" placeholder="请输入积分" type="number"  placeholder-style="color:#CCCCCC" maxlength="8" />
				</view>
				<view class="timechoise uni-list-cell-navigate uni-navigate-bottom" @click="show1('left')">
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
		<!-- 选择人员的drawer -->
		<uni-drawer :visible="showLeft" :mode="drawmode" @close="closeDrawer('left')">
			<!--  -->
			<view class="pupustyle">
				<view class="topcontent">
					<view class="topstyle">
						<view class="topstyle_choise" style="justify-content: flex-start;margin-left: 25upx;">取消</view>
						<view class="topstyle_choise" style="font-size: 33upx;">选择员工</view>
						<view class="topstyle_choise" style="justify-content: flex-end;margin-right: 25upx;" @click="showpup">完成</view>
					</view>
					<mSearch :show='false' @search="search($event,0)"></mSearch>
				</view>
		
				<view style="height: 180upx;"></view>
				<scroll-view style="height: 1020upx;" scroll-y="true">
					<checkbox-group @change="checkboxChange">
						<label class="listitem" v-for="(item,index) in 30" :key='index'>
							<view>
								<checkbox :value="helo" :checked="false" color="#007AFF" />
							</view>
							<view style="margin-left: 25upx;">
								<image src="../../../static/head_default.png" style="width: 75upx;height: 75upx;margin-right: 20upx;"></image>
							</view>
							<view style="margin-left: 30upx;">小明</view>
						</label>
		
					</checkbox-group>
				</scroll-view>
				<!-- 	<view class="buttonstyle popubottonbutton" @tap="popudown">
					确定
				</view> -->
			</view>
		</uni-drawer>
		
		<!-- 选择规则的drawer -->
		<uni-drawer :visible="showLeft1" :mode="drawmode" @close="closeDrawer2('left')">
			<!--  -->
			<view class="pupustyle_two">
				<view class="topcontent">
					<view style="position: fixed;width: 100%;background-color: #FFFFFF;min-height: 180upx;">
						<mSearch :show='false' @search="search($event,0)"></mSearch>
						<!-- 上面的目录导航条 -->
						<view style="height: 80upx;display: flex;flex-direction: row;justify-content: flex-start;align-items: center;padding-left: 25upx;">
							<view class="navtextstyle" v-for="(item,index) in barlist" :key="index" @click="baritemclick(index)">
								<view style="display: flex;flex-direction: row;justify-content: center;align-items: center; font-size: 35upx;">»</view>
								<view style="font-size: 30upx;margin-left: 5upx;">{{item}}</view>
							</view>
						</view>
					</view>
				</view>
				<view style="height: 180upx;"></view>
		
				<scroll-view style="height: 1030upx;" scroll-y="true">
		          <view style="width: 100%;">
		          	<view class="cadlist" :class="listitemstyle" v-for="(item,index) in formdata" :key="index" @click="clickitem(index)">
		          		<view style="font-size: 35upx;">{{item.value}}</view>
		          		<image class="tonextstyle" v-if="!item.last" src="../../../static/tonext.png"></image>
		          	</view>
		          	<!-- <uni-load-more :status="status" :contentText="contentText"></uni-load-more> -->
		          </view>
				</scroll-view>
			</view>
		
		</uni-drawer>
		
		<!-- 点击申请的按钮 -->
		<view class="bottonbutton" >
			<button style="background-color: #C8C7CC;" class="buttombuttonstyle"  hover-class="muhovercolor" @click="backlast">返回</button>
			<button style="background-color: #007AFF;" class="buttonstyle buttombuttonstyle" hover-class="muhovercolor" @click="addshenqing" >提交</button>
		</view>
	
	</view>
</template>

<script>
// 选择时间的选择
	// 添加上推的列表选择
	import mSearch from '../../../components/mehaotian-search/mehaotian-search.vue'
	import uniDrawer from '@/components/uni-drawer/uni-drawer.vue'
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	import mydata from "../../../common/mydata.js"
	export default {
	components: {
		mSearch,
		uniDrawer,
		uniLoadMore
	},
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
				xize:'奖励40',
				// 选择人员pop
				showLeft: false,
				showRigth: false,
				drawmode: 'right',
				// 模仿的数据
				showLeft1:false,
				formdata: mydata, //记录最初的数据
				itemdata: {},
				huanchong: [], // 建立缓冲的一个规则数组，通过数组最后一个来实现返回
				barlist: [], //建立一个导航条的文字的缓冲的数组
				// 关于图片展示
				imageList: [],
				
				
			};
		},
		onReady(){
			this.huanchong.push(this.formdata)
			this.barlist.push('全部规则')
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
			 
			choisexize:function(){
				
			},
			backlast:function(){
				uni.navigateBack({
					delta:1
				})
			},
			show1(e) {
				//展示第三个弹窗  选择人员
				if (e === 'left') {
					this.showLeft = true
					this.drawmode = 'left'
			
				} else {
					this.showRigth = true
					this.drawmode = 'right'
				}
			},
			choiseRull: function(e) {
				//展示规则的界面
				if (e === 'left') {
					console.log("showleft")
					this.showLeft1 = true
					this.drawmode = 'left'
			
				}
			},
			
			search(e, val) {
				// 搜索的方法
				console.log(e, val);
			},
			closeDrawer(e) {  //关闭第一个drawer
				if (e === 'left') {
					this.showLeft = false
				} else {
					this.showRigth = false
				}
			},
			//添加选择规则的界面
			clickitem: function(e) {
				// 条目的点击事件
				this.itemdata = this.formdata[e]
				if (this.itemdata.children != null) {
					this.formdata = this.itemdata.children
					this.huanchong.push(this.formdata)
					this.barlist.push(this.itemdata.value)
				}
			
			},
			showbigimage:function(e){
				var current = e.target.dataset.src
				uni.previewImage({
					current: current,
					urls: this.imageList
				})
			},
		},
		onBackPress() {
			// 后退的方法
			if (this.showRigth || this.showLeft) {
				// this.closeDrawer(this.drawmode)
				this.showLeft=false
				return true //return true 会把返回事件覆盖掉
			}
			// 关闭第二个抽屉，也就是规则的抽屉
			if(this.showLeft1){
				if (this.huanchong.length >1) {
					this.huanchong.pop()
					this.barlist.pop()
					this.formdata = this.huanchong[this.huanchong.length - 1]
					return true
				} else {
					this.showLeft1=false
					return true
				}
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
	/* 时间选择框的眼样式 */
	.pupustyle {
		width: 100%;
		display: flex;
		flex-direction: column;
	}
	
	.topcontent {
		width: 100%;
		position: fixed;
		z-index: 999999;
		min-height: 180;
		display: flex;
		flex-direction: column;
		background-color: #FFFFFF;
		border-bottom: #EBEBEB solid 1upx;
	}
	
	.topstyle {
		display: flex;
		flex-direction: row;
		align-items: center;
		min-height: 80upx;
	}
	
	.topstyle_choise {
		flex: 1;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}
	
	.listitem {
		height: 100upx;
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-left: 25upx;
		margin-right: 25upx;
		border-bottom: #EBEBEB solid 0.5upx;
	}
</style>
