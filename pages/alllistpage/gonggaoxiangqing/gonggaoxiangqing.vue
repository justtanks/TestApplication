<template>
	<view>
		<view>
			<web-view :webview-styles="webviewStyles" :src='url'></web-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url: '',
				webviewStyles: {
					progress: {
						color: '#FF3333'
					}
				}
			}
		},
		methods: {

		},
		onLoad: function(e) {
			this.url = e.web

		}
	}
</script>

<style>

</style>
