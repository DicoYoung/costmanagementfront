<template>
	<el-form ref="myform" :model="form" label-width="80px" :rules="rules">
		<el-form-item label="具体评分" prop="loginName">
			<el-rate v-model="form.evaluate" show-text :change="changeRate()"></el-rate>
		</el-form-item>
		<el-form-item>
			<el-button type="primary" plain @click='save'>保存</el-button>
		</el-form-item>
	</el-form>
</template>

<script>
	export default {
		name: 'AssEdit',
		props: {
			id: {
				type: Number,
				default: null
			}
		},
		created() {
			// console.log(this.id)
			if (this.id) {
				this.url.save = '/cm-assessment/update'
				this.getone()
			}
		},
		data() {
			const module = '/cm-assessment'
			return {
				url: {
					save: module + '/update',
					getone: module + '/getone'
				},
				product: [],
				form: {
					evaluate: 0
				},
				rules: {
					evaluate: [{
						required: true,
						message: '请选择',
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
				})
			},
			changeRate() {
				// console.log(this.form.evaluate)
			}
		}
	}
</script>

<style>
</style>
