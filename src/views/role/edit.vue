<template>
	<div style="text-align: left;margin: 10px">
		<el-form ref="userForm" :model="form" label-width="80px" :rules="rules">
			<el-form-item label="角色名" prop="name">
				<el-input v-model="form.name"></el-input>
			</el-form-item>
			<el-form-item style="text-align: right">
				<el-button type="primary" plain @click="save">保存</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	export default {
		name: 'RoleEdit',
		props: {
			id: {
				type: Number,
				default: null,
			},
		},
		created() {
			if (this.id >= 0) {
				// console.log("edit:id:" + this.id)
				this.url.save = '/cm-role/update'
				this.getOne()
			}
		},
		data() {
			const baseUrl = '/cm-role'
			return {
				url: {
					save: baseUrl + '/add',
					getone: baseUrl + '/getone',
				},
				form: {
					name: '',
				},
				rules: {
					name: [{
							required: true,
							message: '请输入角色名',
							trigger: 'blur'
						},
						{
							min: 1,
							max: 10,
							message: '不能超过10个字符',
							trigger: 'blur'
						},
					],
				},
			}
		},
		methods: {
			save() {
				this.$refs['userForm'].validate((flag) => {
					if (flag) {
						this.post(this.url.save, this.form, () => {
							this.$emit('update:show', false)
							this.$emit('getTableData')
						})
					}
				})
			},
			getOne() {
				this.get(this.url.getone, {
					id: this.id
				}, (response) => {
					for (let key in this.form) {
						this.form[key] = response[key]
					}
					this.form.id = response.id
				})
			},
		},
	}
</script>

<style scoped></style>
