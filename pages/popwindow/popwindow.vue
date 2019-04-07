<template>
	<view class="mpvue-picker">
		<mSearch :mode="2" button="inside" @search="search($event)"></mSearch><strong></strong>
		<button type="default" @click="popuup">{{pickerText}}</button>
		<mpvue-picker :themeColor="themeColor" ref="mpvuePicker" :mode="mode" :deepLength="deepLength" :pickerValueDefault="pickerValueDefault"
		 @onConfirm="onConfirm" @onCancel="onCancel" :pickerValueArray="pickerValueArray"></mpvue-picker>
		<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValueDefault"
		 @onCancel="onCancel" @onConfirm="onConfirm"></mpvue-city-picker>

	</view>
</template>

<script>
	import mpvuePicker from '../../components/mpvue-picker/mpvuePicker.vue';
	import mpvueCityPicker from '../../components/mpvue-citypicker/mpvueCityPicker.vue'
	import cityData from '../../common/city.data.js'
	import mSearch from '../../components/m-search/m-search.vue'

	export default {
		components: {
			mpvuePicker,
			mpvueCityPicker,
			mSearch
		},
		data() {
			return {
				pickerSingleArray: [{
						label: '中国',
						value: 1
					},
					{
						label: '俄罗斯',
						value: 2
					},
					{
						label: '美国',
						value: 3
					},
					{
						label: '日本',
						value: 4
					}
				],
				mulLinkageTwoPicker: cityData,
				cityPickerValueDefault: [0, 0, 1],
				themeColor: '#007AFF',
				pickerText: 'hello',
				mode: '',
				deepLength: 1,
				pickerValueDefault: [0],
				pickerValueArray: [],
				ss: {}
			};
		},
		methods: {
			popuup: function() {
				this.pickerValueArray = this.pickerSingleArray
				this.mode = 'selector'
				this.deepLength = 1
				this.pickerValueDefault = [0]
				this.$refs.mpvuePicker.show()
			},
			onCancel(e) {
				// console.log(e)
			},
			onConfirm(e) {
				// this.ss = JSON.parse(e)
				console.log(e.label) //通过这种方式调用到map中的值
			},
			search(e, val) {
				this.screenName = e
				console.log('点击搜索')
			}
		}
	}
</script>

<style>

</style>
