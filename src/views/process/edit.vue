<template>
	<el-form ref="myform" :model="form" label-width="80px" :rules="rules">
		<el-form-item label="设备编号" prop="equipment">
			<el-select v-model="form.equipment" placeholder="请选择设备">
				<el-option v-for="item in equip" :key="item.value" :label="item.label" :value="item.value">
				</el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="班组编号" prop="team">
			<el-select v-model="form.team" placeholder="请选择班组">
				<el-option v-for="item in teams" :key="item.value" :label="item.label" :value="item.value">
				</el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="原料" prop="rawMaterial">
			<el-select v-model="form.rawMaterial" placeholder="请选择原料">
				<el-option v-for="item in material" :key="item.id.toString()" :label="item.name"
					:value="item.id.toString()">
				</el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="用量" prop="rawNumber">
			<el-input v-model="form.rawNumber"></el-input>
		</el-form-item>
		<el-form-item label="开始时间" prop="beginTime">
			<el-date-picker type="date" placeholder="选择日期" v-model="form.beginTime" style="width: 100%;"
				value-format="yyyy-MM-dd">
			</el-date-picker>
		</el-form-item>
		<el-form-item label="产品" prop="productId">
			<el-select v-model="form.productId" placeholder="请选择产品">
				<el-option v-for="item in product" :key="item.id" :label="item.name" :value="item.id">
				</el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="产量" prop="productNumber">
			<el-input v-model="form.productNumber"></el-input>
		</el-form-item>
		<el-form-item>
			<el-button type="primary" plain @click='save'>保存</el-button>
		</el-form-item>
	</el-form>
</template>

<script>
	export default {
		name: 'ProcessEdit',
		props: {
			id: {
				type: Number,
				default: null
			}
		},
		created() {
			// console.log(this.id)
			if (this.id) {
				// console.log("edit->" + this.id)
				this.getProductById(this.id)
				// this.getMaterial(this.id)
				this.getone()
			}
		},
		data() {
			const module = '/cm-process'
			return {
				url: {
					save: module + '/update',
					getone: module + '/getone',
					getProductById: '/cm-product/getProductById',
					getMaterial: '/cm-cost-item/getRawMaterial'
				},
				product: [],
				material: [],
				equip: [{
					value: '0',
					label: '高炉#1'
				}, {
					value: '1',
					label: '高炉#2'
				}, {
					value: '2',
					label: 'LF炉#1'
				}, {
					value: '3',
					label: 'LF炉#2'
				}, {
					value: '4',
					label: '电炉#1'
				}, {
					value: '5',
					label: '电炉#2'
				}],
				teams: [{
					value: '0',
					label: '小队#1'
				}, {
					value: '1',
					label: '小队#2'
				}, {
					value: '2',
					label: '小队#3'
				}, {
					value: '3',
					label: '小队#4'
				}, {
					value: '4',
					label: '小队#5'
				}, {
					value: '5',
					label: '小队#6'
				}],
				form: {
					jobId: '',
					procedureId: '',
					equipment: '',
					team: '',
					rawMaterial: '',
					rawNumber: '',
					productId: '',
					productNumber: '',
					beginTime: '',
					endTime: ''
				},
				rules: {
					equipment: [{
						required: true,
						message: '请选择设备',
						trigger: 'blur'
					}],
					team: [{
						required: true,
						message: '请选择班组',
						trigger: 'blur'
					}],
					rawMaterial: [{
						required: true,
						message: '请选择原材料',
						trigger: 'blur'
					}],
					rawNumber: [{
						required: true,
						message: '请输入消耗用量',
						trigger: 'blur'
					}],
					beginTime: [{
						required: true,
						message: '请输入开始时间',
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
					// console.log(response)
					this.getMaterial(response.procedureId)
					for (let key in this.form) {
						this.form[key] = response[key]
					}
					this.form.id = response.id
					// this.form.rawMaterial = response.rawMaterial.toString()
				})
			},
			getProductById(id) {
				// console.log("come!Product")
				// console.log("process: " + this.process)
				this.get(this.url.getProductById, {
					id: id
				}, response => {
					this.product = response
					// console.log(this.product)
					// id: 15~25
				})
			},
			getMaterial(id) {
				// console.log("process: " + this.process)
				// console.log(this.url.getMaterial)
				this.get(this.url.getMaterial, {
					procedureId: id
				}, response => {
					// console.log(response)
					this.material = response
				})
			}
		}
	}
</script>

<style>
</style>
