<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<script>
	export default {
		name: 'app'
	}
</script>

<style lang="less">
	* {
		margin: 0;
		padding: 0;
	}

	html {
		font-family: "微软雅黑";
		font-size: 16px;
	}

	.dc_filter {
		margin-bottom: 10px;

		.el-input {
			width: auto;
			margin-right: 10px;
		}
	}

	.clear {
		clear: both;
	}
</style>
