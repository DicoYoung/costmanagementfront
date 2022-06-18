<template>
	<el-form ref="myform" :model="form" label-width="80px" :rules="rules">
		<el-form-item label="分摊规则" prop="rulerName">
			<el-input v-model="form.rulerName"></el-input>
		</el-form-item>
		<el-form-item label="对应工序" prop="procedureId">
			<el-select v-model="form.procedureId" placeholder="请选择工序">
				<el-option label="炼焦工序" value="9"></el-option>
				<el-option label="烧结球团工序" value="10"></el-option>
				<el-option label="炼铁工序" value="11"></el-option>
				<el-option label="炼钢工序" value="12"></el-option>
				<el-option label="轧钢工序" value="13"></el-option>
				<el-option label="辅助工序" value="14"></el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="权重系数" prop="rulerFactor">
			<el-input v-model="form.rulerFactor"></el-input>
		</el-form-item>
		<el-form-item label="备注" prop="remarks">
			<el-input v-model="form.remarks"></el-input>
		</el-form-item>
		<el-form-item>
			<el-button type="primary" plain @click='save'>保存</el-button>
		</el-form-item>
	</el-form>
</template>

<script>
	export default {
		name: 'ShareEdit',
		props: {
			id: {
				type: Number,
				default: null
			}
		},
		created() {
			if (this.id) {
				this.url.save = '/cm-share/update'
				this.getone()
			}
		},
		data() {
			const module = '/cm-share'
			return {
				url: {
					save: module + '/add',
					getone: module + '/getone',
					getProcedure: '/cm-process/getProcedure'
				},
				procedure: [],
				form: {
					rulerName: '',
					procedureId: '',
					rulerFactor: '',
					remarks: ''
				},
				rules: {
					rulerName: [{
						required: true,
						message: '请输入分摊规则名',
						trigger: 'blur'
					}],
					procedureId: [{
						required: true,
						message: '请选择人工序',
						trigger: 'blur'
					}],
					rulerFactor: [{
						required: true,
						message: '请输入因素',
						trigger: 'blur'
					}],
					remarks: [{
						required: true,
						message: '请输入备注',
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
						console.log(this.form)
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
			getProcedure() {
				this.get(this.url.getProcedure, '', response => {
					console.log(response)
					this.procedure = response
				})
			}
		}
	}
</script>

<style>
</style>
