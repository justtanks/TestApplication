<!-- 积分录入界面，没有实现具体的下一个点击 -->
<template>
	<view>

		<view style="background-color: #FFFFFF;">
			<textarea class="uni-input inputclass" placeholder-class="placeholdderclass" style="font-size: 35upx;line-height: 1;"
			 show-confirm-bar="true" auto-height="true" placeholder="请填写加减分理由" maxlength="30" v-model="inputresean" @input="inputholder" />
			<view class="textnum">{{textnum}}</view>

			<view class="timechoise uni-list-cell-navigate uni-navigate-right" @click="getalluser()">
				<view style="font-size: 35upx;">选择人员</view>
			</view>
			<view class="timechoise" v-show="showalluser">
				<view style="font-size: 35upx;margin-top: 10upx;margin-bottom: 10upx;margin-left: 25upx;margin-right: 25upx;color:#B6B6B6;">{{choiseduserName}}</view>
			</view>
			<view class="timechoise uni-list-cell-navigate uni-navigate-right" @click="choisetime('date')">
				<view style="font-size: 35upx;">录入日期</view>
				<view style="font-size: 30upx;margin-right: 50upx; color:#555555;">{{date}}</view>
			</view>
			<view class="timechoise uni-list-cell-navigate uni-navigate-right" @click="choisetime('time')">
				<view style="font-size: 35upx;">录入时间</view>
				<view style="font-size: 30upx;margin-right: 50upx; color:#555555;">{{time}}</view>
			</view>
			
			<view class="timechoise uni-list-cell-navigate uni-navigate-bottom" @click="choisefenlei">
				<view style="font-size: 35upx;">积分分类</view>
				<view style="font-size: 35upx;margin-right: 50upx;color:#555555 ;">{{fenlei}}</view>
			</view>
			<view class="timechoise uni-list-cell-navigate uni-navigate-right" @click="choiseRull('left')">
				<view style="font-size: 35upx;">选择规则</view>
			</view>
			<view class="timechoise" v-show="showrulltext">
				<view style="font-size: 35upx;margin-top: 10upx;margin-bottom: 10upx;margin-left: 25upx;margin-right: 25upx;color:#B6B6B6;">{{rulltext}}</view>
			</view>
			<!-- 积分 -->
			<view class="timechoise uni-list-cell-navigate uni-navigate-right">
				<view style="font-size: 35upx;">积分</view>
				<input style="line-height: 1; font-size: 35upx;" placeholder="请输入积分"   placeholder-style="color:#CCCCCC" maxlength="8" v-model="score" />
			</view>
			<view class="timechoise uni-list-cell-navigate uni-navigate-right" @click="choisechushen">
				<view style="font-size: 35upx;">选择初审人</view>
				<view style="font-size: 35upx;margin-right: 50upx;color:#555555 ;">{{chushen}}</view>
			</view>
			<view class="timechoise uni-list-cell-navigate uni-navigate-right" @click="choisezhongshen">
				<view style="font-size: 35upx;">选择终审人</view>
				<view style="font-size: 35upx;margin-right: 50upx;color:#555555 ;">{{zhongshen}}</view>
			</view>
			
		</view>

		<view style="height: 150upx;width: 100%; display: flex; justify-content: center;align-items: center;">
			<view style="height: 45upx;width: 90%;">
				<button class="buttonstyle" hover-class="muhovercolor" @click="addshenqing">提交</button>
			</view>
		</view>

		<!-- 选择人员的drawer -->
		<uni-drawer :visible="showLeft" :mode="drawmode" @close="closeDrawer('left')">
			<!--  -->
			<view class="pupustyle">
				<view class="topcontent">
					<view class="topstyle">
						<view class="topstyle_choise" style="justify-content: flex-start;margin-left: 25upx;" @click="cancelChoise">取消</view>
						<view class="topstyle_choise" style="font-size: 33upx;">选择员工</view>
						<view class="topstyle_choise" style="justify-content: flex-end;margin-right: 25upx;" @click="completeChoise">完成</view>
					</view>
					<!-- <mSearch :show='false' @search="search($event,0)"></mSearch> -->
				</view>

				<view style="height: 95upx;"></view>
					<scroll-view style="height: 1020upx;" scroll-y="true" v-if="showlist">
				    <view style="width: 100%;">
				  	<view class="cadlist" :class="listitemstyle" v-for="(item,index) in alluser" :key="index" @click="choisezhu(item)">
				  		<view style="font-size: 35upx;margin-top: 10upx;margin-bottom: 10upx;">{{item.name}}</view>
				  		<image class="tonextstyle"  src="../../../static/tonext.png"></image>
				  	</view>
				  </view>
				</scroll-view>
				
				<scroll-view style="height: 1020upx;" scroll-y="true" v-else="" >
					<checkbox-group @change="checkboxChange">
						<label class="listitem"  v-for="(item,index) in xiaozuuser" :key='index'>

							<view>
								<checkbox :value="item.id" :checked="item.ischeck" color="#007AFF" />
							</view>
							<view style="margin-left: 25upx;">
								<image src="../../../static/head_default.png" style="width: 75upx;height: 75upx;margin-right: 20upx;"></image>
							</view>
							<view style="margin-left: 30upx;">{{item.user_nickname}}</view>
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
					<view style="position: fixed;width: 100%;background-color: #FFFFFF;min-height: 90upx;">
						<!-- <mSearch :show='false' @search="search($event,0)"></mSearch> -->
						<!-- 上面的目录导航条 -->
						<view style="height: 80upx;display: flex;flex-direction: row;justify-content: flex-start;align-items: center;padding-left: 25upx;">
							<view class="navtextstyle" v-for="(item,index) in barlist" :key="index" @click="baritemclick(index)">
								<view style="display: flex;flex-direction: row;justify-content: center;align-items: center; font-size: 35upx;">»</view>
								<view style="font-size: 30upx;margin-left: 5upx;">{{item}}</view>
							</view>
						</view>
					</view>
				</view>
				<view style="height: 95upx;"></view>

				<scroll-view style="height: 1030upx;" scroll-y="true">
                  <view style="width: 100%;">
                  	<view class="cadlist" :class="listitemstyle" v-for="(item,index) in formdata" :key="index" @click="clickitem(index)">
                  		<view style="font-size: 35upx;margin-top: 10upx;margin-bottom: 10upx;">{{item.value}}</view>
                  		<image class="tonextstyle" v-if="!item.last" src="../../../static/tonext.png"></image>
                  	</view>
                  </view>
				</scroll-view>
			</view>

		</uni-drawer>
		<!-- 选择初审人的drawer -->
		<popup-layer ref="popup" :direction="direction">
			<view class="pupustyle" style="width: 500upx;">
		
				<view class="uni-list">
					<radio-group @change="radioChange">
						<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in guanlirenyuan" :key="item.id" 
						style="justify-content: flex-start;display: flex;">
							<view>
								<radio :value="item.id+':'+item.user_nickname" />
							</view>
							<view>{{item.user_nickname}}</view>
						</label>
					</radio-group>
				</view>
		           
			</view>
		</popup-layer>
		
		<!-- 选择终审人的pop -->
		<popup-layer ref="popup1" :direction="direction">
			<view class="pupustyle" style="width: 500upx;">
		
				<view class="uni-list">
					<radio-group @change="radioChange1">
						<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in zhongshenrenyuan" :key="item.id" 
						style="justify-content: flex-start;display: flex;">
							<view>
								<radio :value="item.id+':'+item.user_nickname" />
							</view>
							<view>{{item.user_nickname}}</view>
						</label>
					</radio-group>
				</view>
		           
			</view>
		</popup-layer>
		
		
		
		<mx-date-picker :show="showPicker" :type="type" :value="value" :show-seconds="true" @confirm="onSelected" @cancel="onSelected" />
		<mpvue-picker :themeColor="themeColor" ref="mpvuePicker" :mode="mode" :deepLength="deepLength" :pickerValueDefault="pickerValueDefault"
		 @onConfirm="onConfirm" @onCancel="onCancel" :pickerValueArray="pickerValueArray"></mpvue-picker>
	</view>
</template>

<script>
	// 选择时间的选择
	import MxDatePicker from '../../../components/mx-datepicker/mx-datepicker.vue'
	import mpvuePicker from '../../../components/mpvue-picker/mpvuePicker.vue';
	import dateutll from '../../../common/util.js'
	// 添加上推的列表选择
	import mSearch from '../../../components/mehaotian-search/mehaotian-search.vue'
	import uniDrawer from '@/components/uni-drawer/uni-drawer.vue'
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	import mydata from "../../../common/mydata.js"
	import url1 from '../../../common/url.js'
	import popupLayer from '../../../components/popup-layer/popup-layer.vue';
	 
	var _self;
	export default {
		components: {
			MxDatePicker,
			mSearch,
			uniDrawer,
			mpvuePicker,
			uniLoadMore,
			popupLayer

		},
		data() {
			return {
				fenlei:'',
				fenleiid:0,
				// 第三个pop
				showLeft: false,
				showRigth: false,
				drawmode: 'right',

				// 时间选择器需要的数据
				showPicker: false,
				date: '2019-01-01',
				type: 'date',
				time: '00:00:00',
				value: '',
				// 文字项
				'textnum':'0/30',
				'inputresean':'',


				// 模仿的数据
				showLeft1:false,
				formdata: mydata, //记录最初的数据
				itemdata: {},
				huanchong: [], // 建立缓冲的一个规则数组，通过数组最后一个来实现返回
				barlist: [], //建立一个导航条的文字的缓冲的数组
				
				// 递交审批
				showLeft3:false,
				
				//关于选择分类弹窗
				themeColor: '#007AFF',
				pickerText: '',
				mode: '',
				deepLength: 1,
				pickerValueDefault: [0],
				pickerValueArray: [],
				// 规则文本
				rulltext:'',
				showrulltext:false,
				// 弹框id  1规则  2  初审人  3 终审人
				'popid':1,
				chushen:'',
				chushenid:0,
				zhongshen:'',
				zhongshenid:0,
				
			    token:'',
				score:0 ,//输入的积分
				//分类的列表类
				liebie:[],
				//管理人员列表
				guanli:[],
				//终审人员列表
				zhongshenlist:[],
				alluser:[],  //所有的人员
				xiaozuuser:[], //小组的人员  每次选择都会变化
				allman:[],          //搜索使用的人员，当前不再使用这个变量
				checkeduser:[],
				//用逗号分隔的选择人的字符串
				choiseduserid:'',
				// 选择的名称
				choiseduserName:'',
				showalluser:false,//是否显示所有的选择的人员的名字的显示框
				
				showlist:true  ,//是否显示的是小组
				allid:[],//选择的用户的id
				// 选择初审人的界面
				direction: 'left',
				showpop: false,
				guanlirenyuan:[],
				zhongshenrenyuan:[],
				
			};
		},
		onReady() {
			this.date = dateutll.dateUtils.getNowFormatDate()
			var  ts=new Date() 
			this.time=ts.getHours()+':'+ts.getMinutes()+':'+ts.getSeconds()
			
		},
		onLoad() {
				_self = this;
			this.token=uni.getStorageSync('token')
		},
		methods: {
			inputholder:function(e){
				let length=this.inputresean.length;
				this.textnum=length+'/'+'30'
			},
			show1() {
				//展示第三个弹窗  选择人员
				this.showLeft = true
				this.drawmode = 'left'
			},
			dijiaoshenpi:function(e){
				if (e === 'left') {
					this.showLeft3 = true
					this.drawmode = 'left'
				
				} else {
					 
				}
			},
			choisetime: function(type) {
				//弹出时间的选择框
				this.type = type;
				this.showPicker = true;
				this.value = this[type];
			},
			onSelected(e) { //选择时间的picker
				this.showPicker = false;
				if (e) {
					this[this.type] = e.value.replace(/\//g, '-')
				}
			},
			choiseRull: function(e) {
				//展示规则的界面
				if (e === 'left') {
					this.showLeft1 = true
					this.drawmode = 'left'
				}
			},
			search(e, val) {
				// 搜索的方法
				 var allusertemp=new Array;
				if(e===''){
					 this.alluser=this.allman
				}else{
					for(let us of this.alluser){
					     if(us.user_nickname.indexOf(e)==-1){
							 us.isshow=false
						 }else{
							  allusertemp.push(us)
						 }
					}
					 this.alluser=allusertemp
				}
				
			},
			closeDrawer(e) {  //关闭第一个drawer
				if (e === 'left') {
					this.showLeft = false
				} else {
					this.showRigth = false
				}
			},
			closeDrawer2(e) { //关闭第二个drawder
				if (e === 'left') {
					this.showLeft1 = false
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
				}else{
					this.showrulltext=true
					this.rulltext=this.itemdata.value
					this.showLeft1=false
				}

			},
			baritemclick: function(e) {
				
			},
			choisefenlei:function(){
				// 选择分类
				this.popid=1
				this.getfenlei()
			},
			choisechushen:function(e){
				//选择初审人
				this.popid=2
				this.getguali()
			},
			choisezhongshen:function(e){
				//选择终审人
					this.popid=3
					this.getzhongshen()
			},
			onCancel(e) {
				
			},
			onConfirm(e) {
				     
					if(this.popid==1){
						this.fenlei=e.label
						this.fenleiid= e.value[0]
					}else if(this.popid==2){
						 this.chushen=e.label;
						 this.chushenid= e.value[0]
					}else{
						this.zhongshen=e.label
						this.zhongshenid= e.value[0]
					}
			},
			showpoplist:function(list){
				//展示分类 初审人  终审人的上推列表
				this.pickerValueArray = list
				this.mode = 'selector'
				this.deepLength = 1
				this.pickerValueDefault = [0]
				this.$refs.mpvuePicker.show()
			},
			getguali:function(e){
				//获取到管理人员并且展示列表
				// if(_self.guanli.length!=0){
				// 	this.showpoplist( _self.guanli)
				// 	return
				// }
				if(_self.guanlirenyuan.length!=0){
					_self.showpup()
					return
				}
				uni.showLoading({
					title: '加载中'
				});
				uni.request({
					url:url1.getguali,
					data:{
						token:_self.token,
						deviceType:'android'
					},
					complete: (e) => {
						uni.hideLoading()
						if(e.data.code!=1){
							uni.showToast({
								title:e.data.msg,
								duration:1000
							})
							return
						}
						// var val=e.data.data.leaderList
						// console.error(JSON.stringify(_self.guanlirenyuan))
						// for(let ls of val){
						// 	 var person={label:ls.user_nickname, value:ls.id};
						// 	 _self.guanli.push(person)
						// }
						// this.showpoplist( _self.guanli)  
							_self.guanlirenyuan=e.data.data.leaderList
						_self.showpup()
					}
				})
			},
			getzhongshen:function(e){
				//获取到终审人员并且展示列表
				_self.zhongshenlist=[]
				if(_self.score==0){
					_self.toast('请填写积分')
					return
				}
				uni.showLoading({
					title: '加载中'
				});
				uni.request({
					url:url1.getzhongshen,
					data:{
						token:_self.token,
						score:_self.score,
						deviceType:'android',
						
					},
					complete: (e) => {
						uni.hideLoading()
						if(e.data.code!=1){
							_self.toast(e.data.msg)
							return
						}
						// var val=e.data.data.leaderList
						// for(let ls of val){
						// 	 var person={label:ls.user_nickname, value:ls.id};
						// 	 _self.zhongshenlist.push(person)
						// }
						// this.showpoplist( _self.zhongshenlist)
						_self.zhongshenrenyuan=e.data.data.leaderList
						_self.showpup1()
						
						
					},
					fail: function(res) {
						// #ifdef APP-PLUS
						plus.nativeUI.toast("网络错误");
						// #endif
						//#ifdef MP-WEIXIN
						uni.showToast({
							title: '网络错误',
							duration: 1000,
							icon: 'none',
							position: 'bottom'
						})
						// #endif
						
					}
				})
			},
			getalluser:function(showC){
				//获取到所有人员并且展示列表
				if(_self.alluser.length>0){
					_self.show1()
					return
				}
				uni.showLoading({
					title: '加载中'
				});
				uni.request({
					url:url1.getalluser,
					data:{
						token:_self.token,
						deviceType:'android'
					},
					complete: (e) => {
						uni.hideLoading()
						if(e.data.code!=1){
							_self.toast(e.data.msg)
							return
						}
						//解析用户数据
						_self.alluser=e.data.data.userList
						// _self.allman=_self.alluser
						// for(let it of _self.alluser){
						// 	it.ischeck=false
						// 	 
						// }
						_self.show1()
					},
					fail: function(res) {
						_self.toast('网络错误')
					}
				})
			},
			getfenlei:function(e){
				//获取到所有的分类
				if(_self.liebie.length!=0){
					this.showpoplist( _self.liebie)
					return
				}
				uni.showLoading({
					title: '加载中'
				});
				uni.request({
					url:url1.getfenlei,
					data:{
						token:_self.token,
						deviceType:'android'
					},
					complete: (e) => {
						uni.hideLoading()
						if(e.data.code!=1){
							uni.showToast({
								title:e.data.msg,
								duration:1000,
								icon:'none'
							})
							return
						}
						var val=e.data.data.cateList
						for(let ls of val){
							 var person={label:ls.name, value:ls.id};
							 _self.liebie.push(person)
						}
					    this.showpoplist(_self.liebie)
					},
					fail: function(res) {
						// #ifdef APP-PLUS
						plus.nativeUI.toast("网络错误");
						// #endif
						//#ifdef MP-WEIXIN
						uni.showToast({
							title: '网络错误',
							duration: 1000,
							icon: 'none',
							position: 'bottom'
						})
						// #endif
						
					}
				})
			},
			completeChoise:function(){
				//选择人员点击完成按钮
				this.choiseduserName=''
				this.allid=[]
				
				for(let la of this.alluser){
					if(la.member==null){
						continue
					}
					for(let as of la.member){
						if( as.ischeck==true){
							this.choiseduserName+=as.user_nickname+','
							this.allid.push(as.id)
						}
					}
				}
				
				if(this.allid.length==0){
					this.toast('未选择人员')
					return
				}
				
				if(this.choiseduserName.length>0){
					this.showalluser=true
				}else{
					this.showalluser=false
				}
					
				this.choiseduserid=this.allid.join(',')
				this.showLeft=false
				this.showlist=true
			},
			cancelChoise:function(){
				// 选择人员点击取消按钮
				this.showLeft=false
			},
			checkboxChange: function (e) {
				//checkbox的选中状态
				this.checkeduser=e.target.value
				for(let us of this.xiaozuuser){
					if(this.checkeduser.indexOf(us.id+'')!=-1){
						us.ischeck=true
					}else{
						us.ischeck=false
					}
				}
			
            },
			addshenqing:function(e){
				console.error(isNaN(this.score))
				//添加申请
				if(this.fenleiid==0){
					_self.toast('选择分类')
					return
				}
				if(this.chushenid==0)
				{
					_self.toast('选择初审人')
					return
				}
				if(this.zhongshenid==0){
					_self.toast('选择终审人')
					return
				}
				if(this.choiseduserName.length==0){
						_self.toast('请选择加分人')
					return
				}
				 if(isNaN(this.score)){
					 _self.toast('积分格式不对,请填写数字')
					 return
				 }
				if(this.score==0){
						_self.toast('请选择加减分数')
					return
				}
				
// 				if(this.rulltext==''){
// 						_self.toast('请选择规则')
// 					return
// 				}
				if(this.inputresean==''){
					_self.toast('请填写加减分原因')
					return
				}
				uni.showLoading({
					title:'积分上传中。。'
				})
				uni.request({
					url:url1.inputjifen,
					data:{
						token:_self.token,
						deviceType:'android',
						cate:_self.fenleiid,
						reason:_self.inputresean,
						mark:_self.rulltext,
						benefit_user:_self.choiseduserid,
						pass_user1:_self.chushenid,
						pass_user2:_self.zhongshenid,
						apply_time:_self.date+' '+_self.time,
						score:_self.score
					},
					method:"POST",
					complete: (e) => {
						uni.hideLoading()
						if(e.data.code==1){
							_self.toast(e.data.msg)
							uni.navigateBack({
								delta:1
							})
						}else{
							_self.toast(e.data.msg)
						}
						
					},
					
					fail: function(res) {
					// #ifdef APP-PLUS
					plus.nativeUI.toast("网络错误");
					// #endif
					//#ifdef MP-WEIXIN
					uni.showToast({
						title: '网络错误',
						duration: 1000,
						icon: 'none',
						position: 'bottom'
					})
					// #endif
					
					}
				})
				
			},
			choisezhu:function(e){
				//选择小组
				_self.xiaozuuser=e.member
				_self.showlist=false
				
			},
			showpup: function() {
				// 弹出弹窗
				this.$refs.popup.show() // 弹出
				this.showpop = true
			},
			popudown: function() {
				this.$refs.popup.close()
				this.showpop = false
				// this.getPaiming()
			},
			// 终审的弹窗的弹出
			showpup1: function() {
				// 弹出弹窗
				this.$refs.popup1.show() // 弹出
			},
			// 终审的弹窗的消失
			popudown1: function() {
				this.$refs.popup1.close()
			},
			// 初审的单选组的变化
			radioChange: function(evt) {
				let str=evt.target.value.split(":")
				_self.chushenid=str[0]
				_self.chushen=str[1]
				_self.popudown()
				
			},
			// 终身的单选组变化
			radioChange1: function(evt) {
				let str=evt.target.value.split(":")
				_self.zhongshenid=str[0]
				_self.zhongshen=str[1]
				_self.popudown1()
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
			


		},

		onBackPress() {
			if(!this.showlist){
				this.showlist=true
				return true
			}
				// 后退的方法
			if (this.showRigth || this.showLeft) {
				// this.closeDrawer(this.drawmode)
				this.showLeft=false
				return true //return true 会把返回事件覆盖掉
			}
			if (this.showPicker) {
				this.showPicker = false
				return true
			}
			if(this.showLeft){
				this.showLeft=false
				return true
			}
			if(this.showLeft3){
				this.showLeft3=false
				return true
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
			
		},
		onUnload() {
		
		},
		onShow:function(){
			// 初始将缓冲的规则里面添加最初的一个
			this.huanchong.push(this.formdata)
			this.barlist.push('全部规则')
		}
	}
</script>

<style>
	page {
		background-color: #F1F1F3;
	}
	.inputclass{
		min-height: 60upx;
		margin-left: 25upx;
		margin-right: 25upx;
		line-height: 1;
	}
	.placeholdderclass
	{
		font-size: 35upx;
		align-items: center;
		 line-height: 1;
	}

	.pupustyle {
		width: 100%;
		display: flex;
		flex-direction: column;
		background: #EEEEEE;
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

	.timechoise {
		margin: 10upx 25upx;
		margin-right: 0upx;
		min-height: 80upx;
		width: auto;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		border-bottom: #EBEBEB solid 1upx;
	}

	.popubottonbutton {
		width: 100%;
		height: 80upx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
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
		padding-left:25upx;
		padding-right: 25upx;
		border-bottom: #EBEBEB solid 0.5upx;
		background: #FFFFFF;
	}
	.textnum{
		display: flex;flex-direction: row; justify-content: flex-end;margin-right: 25upx;color: #CCCCCC;
	}

</style>
