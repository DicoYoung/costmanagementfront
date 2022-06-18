<template>
	<el-form ref="myform" :model="form" label-width="80px" :rules="rules">
		<el-form-item label="工序号" prop="procedureId">
			<el-select v-model="form.procedureId" placeholder="请选择">
				<el-option v-for="item in procedure" :key="item.id" :label="item.name" :value="item.id">
				</el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="能源类型" prop="energyType">
			<el-input v-model="form.energyType"></el-input>
		</el-form-item>
		<el-form-item label="能源名称" prop="energyName">
			<el-input v-model="form.energyName"></el-input>
		</el-form-item>
		<el-form-item label="单价" prop="energyPrice">
			<el-input v-model="form.energyPrice"></el-input>
		</el-form-item>
		<el-form-item label="用量" prop="energyNumber">
			<el-input v-model="form.energyNumber"></el-input>
		</el-form-item>

		<el-form-item>
			<el-button type="primary" plain @click='save'>保存</el-button>
		</el-form-item>
	</el-form>
</template>

<script>
	export default {
		name: 'EnergyEdit',
		props: {
			id: {
				type: Number,
				default: null
			}
		},
		created() {
			if (this.id) {
				this.url.save = '/cm-procedure-energy/update'
				this.getone()
			}
		},
		data() {
			const module = '/cm-procedure-energy'
			return {
				url: {
					save: module + '/add',
					getone: module + '/getone'
				},
				product: [],
				form: {
					procedureId: '',
					energyType: '',
					energyName: '',
					energyPrice: '',
					energyNumber: ''
				},
				procedure: [{
					id: 9,
					name: '炼焦工序'
				}, {
					id: 10,
					name: '烧结球团工序'
				}, {
					id: 11,
					name: '炼铁工序'
				}, {
					id: 12,
					name: '炼钢工序'
				}, {
					id: 13,
					name: '轧钢工序'
				}, {
					id: 14,
					name: '辅助工序'
				}],
				rules: {
					procedureId: [{
						required: true,
						message: '请输入分摊规则名',
						trigger: 'blur'
					}],
					energyType: [{
						required: true,
						message: '请选择人工序',
						trigger: 'blur'
					}],
					energyName: [{
						required: true,
						message: '请输入因素',
						trigger: 'blur'
					}],
					energyPrice: [{
						required: true,
						message: '请输入备注',
						trigger: 'blur'
					}],
					energyNumber: [{
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
			}
		}
	}
</script>

<style>
</style>
