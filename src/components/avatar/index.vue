<template>
	<div class="dc_avatar">
		<el-button size="medium" type="text" style="color: #ffef07;" @click="backHome()">
			AVATAR钢铁企业成本管理系统AVATAR
		</el-button>
		<el-button class="right-btn" type="text" style="color: #40fcff" @click="exit()">
			退出登录
		</el-button>
	</div>
</template>

<script>
	export default {
		name: 'Avatar',
		data() {
			return {

			}
		},
		methods: {
			backHome() {
				this.$router.push('/')
			},
			async exit() {
				console.log("退出登录咯")
				this.$store.commit("resetState")
				this.$notify({
					type: 'success',
					message: '已经成功退出登录'
				})
				await this.sleep(500)
				this.$router.push('/login')

			},
			sleep(d) {
				return new Promise((resolve) => setTimeout(resolve, d))
			}
		}
	}
</script>

<style>
	.right-btn {
		float: right;
		height: 100%;
		line-height: 33px;
	}
</style>
