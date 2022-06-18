<template>
	<el-form ref="myform" :model="form" label-width="80px" :rules="rules">
		<el-form-item label="文件名称" prop="name">
			<el-input v-model="form.name"></el-input>
		</el-form-item>
		<el-form-item label="文件" prop="file">
			<el-upload :file-list="filelist" action="http://www.abc.com" :auto-upload="false" :limit="1"
				:on-change="changefile" :on-remove="removefile">
				<i class="el-icon-plus"></i>
			</el-upload>
		</el-form-item>
		<el-form-item>
			<el-button type="primary" plain @click='save'>保存</el-button>
		</el-form-item>
	</el-form>
</template>

<script>
	export default {
		name: 'DataFileEdit',
		props: {
			id: {
				type: Number,
				default: null
			}
		},
		created() {

		},
		data() {
			const module = '/cm-data-file'
			return {
				url: {
					save: module + '/add'
				},
				form: {
					name: '',
					file: null
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
