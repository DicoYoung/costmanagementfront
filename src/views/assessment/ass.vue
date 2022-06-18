<template>
	<el-form ref="myform" :model="form" label-width="80px" :rules="rules">
		<el-form-item label="计划ID" prop="planId">
			<el-tag type="success" style="float: left;">{{this.form.planId}}</el-tag>
		</el-form-item>
		<el-form-item label="计划价格" prop="planPrice">
			<el-tag type="success" style="float: left;">{{this.form.planPrice}}</el-tag>
		</el-form-item>
		<el-form-item label="实际花费" prop="actualCost">
			<el-tag type="success" style="float: left;">{{this.form.actualCost}}</el-tag>
		</el-form-item>
		<el-form-item label="差额" prop="difference">
			<el-tag type="success" style="float: left;">{{this.form.difference}}</el-tag>
			<el-button style="float: right;" @click="getDifference()">计算</el-button>
		</el-form-item>
		<el-form-item label="评价" prop="evaluate">
			<el-rate v-model="form.evaluate" show-text :change="changeRate()"></el-rate>
		</el-form-item>
		<el-form-item label="评价人" prop="evaluateUser">
			<el-input v-model="form.evaluateUser"></el-input>
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
				this.getone(this.id)
			}
		},
		data() {
			const module = '/cm-assessment'
			return {
				url: {
					save: module + '/add',
					getone: '/cm-plan/getByProduct',
					getAccount: '/cm-account/getOne',
					delUnAss: module + '/delUnAss'
				},
				product: [],
				form: {
					planId: '',
					planPrice: '',
					actualCost: '',
					difference: '',
					evaluate: 0,
					evaluateUser: ''
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
						this.get(this.url.delUnAss, {
							id: this.id
						}, response => {
							console.log(response)
						})
					}
				})
			},
			getone(id) {
				this.get(this.url.getone, {
					id: id
				}, response => {
					// console.log(response)
					this.form.planId = response.id
					this.form.planPrice = response.planPrice
				})
				this.get(this.url.getAccount, {
					id: id
				}, response => {
					// console.log(response)
					this.form.actualCost = response.cumulativeCost
				})
			},
			getDifference() {
				// console.log(this.form.actualCost)
				// console.log(this.form.planPrice)
				// console.log(this.form.planPrice - this.form.actualCost)
				this.form.difference = (this.form.planPrice - this.form.actualCost)
			},
			changeRate() {
				// console.log(this.form.evaluate)
			}
		}
	}
</script>

<style>
</style>
