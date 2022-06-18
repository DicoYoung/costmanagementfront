<template>
	<el-form ref="myform" :model="form" label-width="80px" :rules="rules">
		<el-form-item label="文件名称" prop="name">
			<el-input v-model="form.name"></el-input>
		</el-form-item>
		<el-form-item>
			<el-button type="primary" plain @click='save'>保存</el-button>
		</el-form-item>
	</el-form>
</template>

<script>
	export default {
		name: 'DataFileUpdata',
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
			const module = '/cm-data-file'
			return {
				url: {
					save: module + '/update',
					getone: module + '/getone'
				},
				form: {
					name: ''
				},
				filelist: [],
				rules: {
					name: [{
							required: true,
							message: '请输入文件名',
							trigger: 'blur'
						},
						{
							min: 1,
							max: 20,
							message: '不能超过20个字符',
							trigger: 'blur'
						}
					],
					file: [{
						required: true,
						message: '请上传文件',
						trigger: 'blur'
					}]
				}
			}
		},
		methods: {
			save() {
				this.$refs['myform'].validate((flag) => {
					if (flag) {
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
					this.filelist.push({
						name: response.name,
						url: this.datafile(response.url)
					})
				})
			},
			changefile(file) {
				this.form.file = file.raw
			},
			removefile() {
				this.form.file = null
			}
		}
	}
</script>

<style>
</style>
