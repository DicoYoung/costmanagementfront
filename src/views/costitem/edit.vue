<template>
	<div>
		<el-form ref="myform" :model="form" label-width="100px" :rules="rules">
			<el-form-item label="成本科目名" prop="name">
				<el-input v-model="form.name"></el-input>
			</el-form-item>
			<el-form-item label="类别" prop="type">
				<el-input v-model="form.type"></el-input>
			</el-form-item>
			<el-form-item label="上级id" prop="parentId">
				<el-input v-model="form.parentId"></el-input>
			</el-form-item>
			<el-form-item label="是否有下级" prop="hasChild">
				<el-select v-model="form.hasChild" placeholder="请选择">
					<el-option v-for="item in next" :key="Number(item.value)" :label="item.label"
						:value="Number(item.value)">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="备注" prop="remarks">
				<el-input v-model="form.remarks"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" plain @click="save">保存</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	export default {
		name: 'ItemEdit',
		props: {
			id: {
				type: Number,
				default: null
			},
			parentId: {
				type: Number,
				default: null
			},
		},
		created() {
			if (this.id) {
				this.getone()
			} else {
				this.form.parentId = this.parentId

			}
		},
		data() {
			const module = '/cm-cost-item'
			return {
				url: {
					add: module + '/add',
					getone: module + '/getone',
					update: module + '/update'
				},
				next: [{
					value: '1',
					label: '有'
				}, {
					value: '0',
					label: '无'
				}],
				form: {
					name: '',
					parentId: null,
					type: '',
					hasChild: '',
					remarks: ''
				},
				rules: {
					name: [{
							required: true,
							message: '请输入资源名',
							trigger: 'blur'
						},
						{
							min: 1,
							max: 10,
							message: '不能超过10个字符',
							trigger: 'blur'
						}
					],
					type: [{
							required: true,
							message: '请输入资源类别',
							trigger: 'blur'
						},

					],
					parentId: [{
						required: true,
						message: '请输入上级',
						trigger: 'blur'
					}, ],
					hasChild: [{
							required: true,
							message: '请输入下级',
							trigger: 'blur'
						},

					]
				}
			}
		},
		methods: {
			save() {
				this.$refs['myform'].validate((flag) => {
					if (flag) {
						this.post(this.id ? this.url.update : this.url.add, this.form, () => {
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
			}
		}
	}
</script>

<style>
</style>
