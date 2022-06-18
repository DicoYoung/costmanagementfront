<template>
	<div class="login_main">
		<div class="content" :style="{ transform: 'rotateY(' + r + 'deg)' }">
			<component :r.sync="r" :is="loginform"></component>
			<component :r.sync="r" :is="findpassword"></component>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Login',
		data() {
			return {
				r: 0,
			}
		},
		computed: {
			loginform() {
				return () => import('./loginForm')
			},
			findpassword() {
				return () => import('./findpassword')
			}
		},
		methods: {},
	}
</script>

<style lang="less" scoped>
	.login_main {
		height: 100vh;
		background: linear-gradient(12deg, #02cbee, #5502ee, #9702ee);
		display: flex;
		perspective: 1000px;

		.content {
			width: 500px;
			height: 300px;
			background: #ffffff;
			margin: auto;
			border-radius: 35px;
			position: relative;
			transform-style: preserve-3d;
			transition: 1s;
		}
	}
</style>
