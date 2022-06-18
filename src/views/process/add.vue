<template>
	<el-form ref="myform" :model="form" label-width="80px" :rules="rules">
		<el-form-item label="设备编号" prop="equipment">
			<el-select v-model="form.equipment" placeholder="请选择设备">
				<el-option v-for="item in equip" :key="Number(item.value)" :label="item.label"
					:value="Number(item.value)">
				</el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="班组编号" prop="team">
			<el-select v-model="form.team" placeholder="请选择班组">
				<el-option v-for="item in teams" :key="Number(item.value)" :label="item.label"
					:value="Number(item.value)">
				</el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="原料" prop="rawMaterial">
			<el-select v-model="form.rawMaterial" placeholder="请选择原料">
				<el-option v-for="item in material" :key="item.id" :label="item.name" :value="item.id">
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
		<el-form-item>
			<el-button type="primary" plain @click='save'>保存</el-button>
		</el-form-item>
	</el-form>
</template>

<script>
	export default {
		name: 'ProcessAdd',
		props: {
			id: {
				type: Number,
				default: null
			}
		},
		created() {
			// console.log("add dialog")
			// console.log(this.id)
			this.form.procedureId = this.id
			this.getMaterial(this.id)
			// if (this.id = null) {
			// 	console.log("edit->")
			// 	console.log(this.id)
			// 	this.url.save = '/cm-process/update'
			// 	this.getone()
			// }
		},
		data() {
			const module = '/cm-process'
			return {
				url: {
					save: module + '/add',
					getMaterial: '/cm-cost-item/getRawMaterial'
				},
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
				material: [],
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
