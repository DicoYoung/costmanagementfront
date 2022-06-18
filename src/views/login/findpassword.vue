<template>
	<div class="findpassword">
		<h1 class="title">找回密码</h1>
		<el-form :model="form" label-width="100px">
			<el-form-item label="登录名">
				<el-input v-model="form.username"></el-input>
				<el-button plain @click="gologin">获取验证码</el-button>
			</el-form-item>
			<el-form-item label="验证码">
				<el-input v-model="form.code" style="width:329px"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" plain size="small" @click="gologin">确定</el-button>
				<el-button style="float:right;margin-right:22px" plain size="small" @click="gologin">重新登录</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	export default {
		name: '',
		data() {
			return {
				form: {
					username: '',
					code: '',
				},
			}
		},
		methods: {
			gologin() {
				this.$emit('update:r', 0)
			},
		},
	}
</script>

<style lang="less" scoped>
	.findpassword {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		transform: rotateY(180deg) translateZ(1px);

		.title {
			text-align: center;
			height: 100px;
			line-height: 100px;
		}

		.el-form {
			width: 90%;

			.el-input {
				width: auto;
				margin-right: 10px;
			}
		}
	}
</style>
