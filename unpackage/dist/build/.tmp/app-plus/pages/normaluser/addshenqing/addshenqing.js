(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/normaluser/addshenqing/addshenqing"],{"1a32":function(e,t,i){"use strict";var n=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("view",[i("view",{staticStyle:{"background-color":"#FFFFFF"}},[i("textarea",{directives:[{name:"model",rawName:"v-model",value:e.inputresean,expression:"inputresean"}],staticClass:"uni-input inputclass",staticStyle:{"font-size":"35rpx"},attrs:{"placeholder-class":"placeholdderclass","show-confirm-bar":"true","auto-height":"true",placeholder:"申请理由",maxlength:"30",eventid:"1948dd2e-0"},domProps:{value:e.inputresean},on:{input:[function(t){t.target.composing||(e.inputresean=t.target.value)},e.inputholder]}}),i("view",{staticClass:"textnum"},[e._v(e._s(e.textnum))]),i("view",{staticClass:"timechoise uni-list-cell-navigate uni-navigate-right",attrs:{eventid:"1948dd2e-1"},on:{click:function(t){e.choisetime("date")}}},[i("view",{staticStyle:{"font-size":"35rpx"}},[e._v("事件时间")]),i("view",{staticStyle:{"font-size":"30rpx","margin-right":"50rpx",color:"#555555"}},[e._v(e._s(e.date))])]),e._m(0),i("view",{staticClass:"timechoise uni-list-cell-navigate uni-navigate-bottom",attrs:{eventid:"1948dd2e-2"},on:{click:e.choiseperson}},[i("view",{staticStyle:{"font-size":"35rpx"}},[e._v("审批人")]),i("view",{staticStyle:{"font-size":"35rpx","margin-right":"50rpx",color:"#555555"}},[e._v(e._s(e.shenpiperson))])]),i("view",{staticClass:"timechoise"},[i("view",{staticStyle:{"font-size":"35rpx","margin-left":"30rpx"}},[e._v("指定积分规则")]),i("switch",{staticStyle:{"margin-right":"20rpx"},attrs:{eventid:"1948dd2e-3"},on:{change:e.switchchange}})]),e.haverull?i("view",{staticClass:"timechoise uni-list-cell-navigate uni-navigate-right"},[i("view",{staticStyle:{"font-size":"35rpx"}},[e._v("积分规则")])]):e._e(),i("view",{staticStyle:{"min-height":"200rpx",display:"flex","flex-direction":"row","flex-wrap":"wrap","margin-left":"25rpx","margin-right":"25rpx"}},[e._l(e.imageList,function(t,n){return i("view",{key:n,staticClass:"imagestyle-yulan"},[i("image",{staticStyle:{width:"100%",height:"100%"},attrs:{src:t,"data-src":t,eventid:"1948dd2e-4-"+n},on:{tap:e.showbigimage}}),i("view",{staticClass:"close-view",attrs:{eventid:"1948dd2e-5-"+n},on:{click:function(t){e.close(n)}}},[e._v("x")])])}),i("view",{staticClass:"uni-uploader__input-box"},[i("view",{staticClass:"uni-uploader__input",attrs:{eventid:"1948dd2e-6"},on:{tap:e.addimage}})])],2)]),i("view",{staticStyle:{height:"60rpx",width:"auto",margin:"20rpx 45rpx 120rpx 45rpx"}},[i("button",{staticClass:"buttonstyle",attrs:{eventid:"1948dd2e-7"},on:{click:e.addshenqing}},[e._v("提交申请")])],1),i("mx-date-picker",{attrs:{show:e.showPicker,type:e.type,value:e.value,"show-seconds":!0,eventid:"1948dd2e-8",mpcomid:"1948dd2e-0"},on:{confirm:e.onSelected,cancel:e.onSelected}}),i("mpvue-picker",{ref:"mpvuePicker",attrs:{themeColor:e.themeColor,mode:e.mode,deepLength:e.deepLength,pickerValueDefault:e.pickerValueDefault,pickerValueArray:e.pickerValueArray,eventid:"1948dd2e-9",mpcomid:"1948dd2e-1"},on:{onConfirm:e.onConfirm,onCancel:e.onCancel}})],1)},a=[function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("view",{staticClass:"timechoise uni-list-cell-navigate uni-navigate-right"},[i("view",{staticStyle:{"font-size":"35rpx"}},[e._v("证明人")]),i("input",{staticStyle:{"line-height":"1","font-size":"35rpx"},attrs:{placeholder:"请输入姓名,2-8个字符",maxlength:"8"}})])}];i.d(t,"a",function(){return n}),i.d(t,"b",function(){return a})},"38e6":function(e,t,i){},"9cee":function(e,t,i){"use strict";var n=i("38e6"),a=i.n(n);a.a},d40e:function(e,t,i){"use strict";i.r(t);var n=i("1a32"),a=i("efec");for(var s in a)"default"!==s&&function(e){i.d(t,e,function(){return a[e]})}(s);i("9cee");var r=i("2877"),c=Object(r["a"])(a["default"],n["a"],n["b"],!1,null,null,null);t["default"]=c.exports},e89d:function(e,t,i){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=c(i("14c5")),a=c(i("028f")),s=c(i("47d1")),r=i("efaa");function c(e){return e&&e.__esModule?e:{default:e}}function o(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}var l=o({components:{MxDatePicker:n.default,mpvuePicker:s.default},data:function(){return{pickerSingleArray:[{label:"中国",value:1},{label:"俄罗斯",value:2},{label:"美国",value:3},{label:"日本",value:4}],textnum:"0/30",inputresean:"",shenpiperson:"",haverull:!1,showPicker:!1,date:"2019/01/01",type:"date",value:"",themeColor:"#007AFF",pickerText:"",mode:"",deepLength:1,pickerValueDefault:[0],pickerValueArray:[],imageList:[],countIndex:8,count:[1,2,3,4,5,6,7,8,9],base64:""}},onReady:function(){this.date=a.default.dateUtils.getNowFormatDate()},onUnload:function(){this.imageList=[],this.countIndex=8},methods:{inputholder:function(e){var t=this.inputresean.length;this.textnum=t+"/30"},choisetime:function(e){this.type=e,this.showPicker=!0,this.value=this[e]},choiseperson:function(){this.pickerValueArray=this.pickerSingleArray,this.mode="selector",this.deepLength=1,this.pickerValueDefault=[0],this.$refs.mpvuePicker.show()},switchchange:function(e){this.haverull=e.target.value},addshenqing:function(){var e=this;(0,r.pathToBase64)(this.imageList[0]).then(function(t){console.log(t),e.base64=t}).catch(function(e){console.error(e)})},addimage:function(){var t=this;9!==this.imageList.length?e.chooseImage({sourceType:["camera","album"],sizeType:["compressed"],count:this.imageList.length+this.count[this.countIndex]>9?9-this.imageList.length:this.count[this.countIndex],success:function(e){t.imageList=t.imageList.concat(e.tempFilePaths)}}):e.showToast({title:"最多上传九张照片",mask:!1,duration:1500,icon:"none"})},showbigimage:function(t){var i=t.target.dataset.src;e.previewImage({current:i,urls:this.imageList})},onSelected:function(e){this.showPicker=!1,e&&(this[this.type]=e.value)},onCancel:function(e){console.log(e)},onConfirm:function(e){this.shenpiperson=e.label},close:function(e){this.imageList.splice(e,1)}},onBackPress:function(){if(this.$refs.mpvuePicker.showPicker)return this.$refs.mpvuePicker.pickerCancel(),!0}},"onUnload",function(){this.$refs.mpvuePicker.showPicker&&this.$refs.mpvuePicker.pickerCancel()});t.default=l}).call(this,i("6e42")["default"])},ee97:function(e,t,i){"use strict";i("7338");var n=s(i("b0ce")),a=s(i("d40e"));function s(e){return e&&e.__esModule?e:{default:e}}Page((0,n.default)(a.default))},efec:function(e,t,i){"use strict";i.r(t);var n=i("e89d"),a=i.n(n);for(var s in n)"default"!==s&&function(e){i.d(t,e,function(){return n[e]})}(s);t["default"]=a.a}},[["ee97","common/runtime","common/vendor"]]]);