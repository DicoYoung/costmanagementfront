<template>
	<el-form ref="myform" :model="form" label-width="80px" :rules="rules">
		<el-form-item label="登录名" prop="loginName">
			<el-input v-model="form.loginName" :disabled="true"></el-input>
		</el-form-item>
		<el-form-item label="密码" prop="rawPassword">
			<el-input v-model="form.rawPassword" show-password></el-input>
		</el-form-item>
		<el-form-item>
			<el-button type="primary" plain @click='save'>保存</el-button>
		</el-form-item>
	</el-form>
</template>

<script>
	export default {
		name: 'UserEdit',
		props: {
			id: {
				type: Number,
				default: null
			}
		},
		created() {
			this.getone()
		},
		data() {
			const module = '/cm-user'
			return {
				url: {
					save: module + '/changePassword',
					getone: module + '/getone'
				},
				form: {
					loginName: '',
					rawPassword: ''
				},
				rules: {
					loginName: [{
							required: true,
							message: '请输入登录名',
							trigger: 'blur'
						},
						{
							min: 1,
							max: 20,
							message: '不能超过20个字符',
							trigger: 'blur'
						}
					],
					rawPassword: [{
						required: true,
						message: '请输入密码',
						trigger: 'blur'
					}]
				}
			}
		},
		methods: {
			save() {
				// 表单验证，$refs['表单名字'].validate((flag)
				this.$refs['myform'].validate((flag) => {
					if (flag) {
						// console.log(this.form)
						this.post(this.url.save, this.form, () => {
							this.$emit('update:show', false)
							this.$emit('getTableData')
						})
					}
				})
			},
			getone() {
				this.get(this.url.getone, {
					id: this.id
				}, response => {
					for (let key in this.form) {
						this.form[key] = response[key]
					}
					this.form.id = response.id
					// console.log(response)
				})
			}
		}
	}
</script>

<style>
</style>
