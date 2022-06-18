<template>
	<div class="loginform_main">
		<h1 class="title">欢迎登录</h1>
		<el-form :model="form" label-width="100px">
			<el-form-item label="登录名">
				<el-input v-model="form.username"></el-input>
			</el-form-item>
			<el-form-item label="密码">
				<el-input v-model="form.password" show-password></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" plain size="small" @click="login">登录</el-button>
				<el-button style="float:right" plain size="small" @click="gofind">找回密码</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	export default {
		name: 'loginForm',
		data() {
			return {
				url: {
					login: '/cm-user/login',
				},
				form: {
					username: '',
					password: '',
				},
			}
		},
		methods: {
			gofind() {
				this.$emit('update:r', 180)
			},
			login() {
				this.post(this.url.login, this.form, (response) => {
					this.$store.commit('SET_TOKEN', response.token)
					this.$store.commit('SET_MENU', response.frontUrl)
					this.$router.push('/')
				})
			},
		},
	}
</script>

<style lang="less" scoped>
	.loginform_main {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		transform: translateZ(1px);

		.title {
			text-align: center;
			height: 100px;
			line-height: 100px;
		}

		.el-form {
			width: 90%;
		}
	}
</style>
