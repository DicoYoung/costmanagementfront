<template>
	<el-form ref="myform" :model="form" label-width="80px" :rules="rules">
		<el-form-item label="计划名称" prop="planName">
			<el-input v-model="form.planName"></el-input>
		</el-form-item>
		<el-form-item label="对象类型" prop="objectType">
			<el-select v-model="form.objectType" placeholder="请选择">
				<el-option v-for="item in obj" :key="item.value" :label="item.label" :value="item.value">
				</el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="对象ID" prop="objectId">
			<el-select v-model="form.objectId" placeholder="请选择职位">
				<el-option v-for="item in product" :key="item.id" :label="item.name" :value="item.id">
				</el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="计划价格" prop="planPrice">
			<el-input v-model="form.planPrice"></el-input>
		</el-form-item>
		<el-form-item label="开始时间" prop="beginTime">
			<el-date-picker type="date" placeholder="选择日期" v-model="form.beginTime" style="width: 100%;"
				value-format="yyyy-MM-dd">
			</el-date-picker>
		</el-form-item>
		<el-form-item label="结束时间" prop="endTime">
			<el-date-picker type="date" placeholder="选择日期" v-model="form.endTime" style="width: 100%;"
				value-format="yyyy-MM-dd">
			</el-date-picker>
		</el-form-item>
		<el-form-item>
			<el-button type="primary" plain @click='save'>保存</el-button>
		</el-form-item>
	</el-form>
</template>

<script>
	export default {
		name: 'PlanEdit',
		props: {
			id: {
				type: Number,
				default: null
			}
		},
		created() {
			this.getProduct()
			if (this.id) {
				this.url.save = '/cm-plan/update'
				this.getone()
			}
		},
		data() {
			const module = '/cm-plan'
			return {
				url: {
					save: module + '/add',
					getone: module + '/getone',
					getProduct: '/cm-product/getProduct'
				},
				product: [],
				form: {
					planName: '',
					objectType: '',
					objectId: '',
					planPrice: '',
					beginTime: '',
					endTime: ''
				},
				obj: [{
					value: 0,
					label: '劳务'
				}, {
					value: 1,
					label: '产成品'
				}, {
					value: 2,
					label: '半成品'
				}, {
					value: 3,
					label: '物资'
				}],
				rules: {
					planName: [{
						required: true,
						message: '请输入分摊规则名',
						trigger: 'blur'
					}],
					objectType: [{
						required: true,
						message: '请选择人工序',
						trigger: 'blur'
					}],
					objectId: [{
						required: true,
						message: '请输入因素',
						trigger: 'blur'
					}],
					planPrice: [{
						required: true,
						message: '请输入备注',
						trigger: 'blur'
					}],
					beginTime: [{
						required: true,
						message: '请输入备注',
						trigger: 'blur'
					}],
					endTime: [{
						required: true,
						message: '请输入备注',
						trigger: 'blur'
					}]
				}
			}
		},
		methods: {
			getProduct() {
				this.get(this.url.getProduct, '', response => {
					this.product = response
					// console.log(this.product)
				})
			},
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
