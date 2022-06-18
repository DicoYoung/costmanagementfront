<template>
	<div>
		<span style="color: #D4C706;font-weight: 700;font-style: oblique;">未核算工序如下：</span>
		<el-divider></el-divider>
		<el-table :data="tableData" height="200" border style="width: 100%">
			<el-table-column label="编号" prop="id"></el-table-column>
			<el-table-column label="炉号" prop="jobId"></el-table-column>
			<el-table-column label="工序" prop="procedureId">
				<template slot-scope='scope'>
					<span v-for="role in procedure">
						<span v-if="role.id === scope.row.procedureId">{{role.name}}</span>
					</span>
				</template>
			</el-table-column>
			<el-table-column label="原料编号" prop="rawMaterial"></el-table-column>
			<el-table-column label="产品" prop="productId">
				<template slot-scope='scope'>
					<span v-for="role in product">
						<span v-if="role.id === scope.row.productId">{{role.name}}</span>
					</span>
				</template>
			</el-table-column>
			<el-table-column width="150px" label="操作">
				<template slot-scope="scope">
					<el-button type="primary" plain
						@click="begin(scope.row.jobId,scope.row.procedureId,scope.row.productId,scope.row.rawMaterial,scope.row.id)"
						size="mini">开始核算
					</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-divider></el-divider>
		<el-form ref="form" :model="form" label-width="80px">
			<el-form-item label="原料成本" style="color: #f7e706;font-weight: 700;font-style: oblique;">
				<el-tag v-model="form.rawCost" type="success" style="float: left;">
					成本数额为：{{this.form.rawCost}}
				</el-tag>
			</el-form-item>
			<el-form-item label="能源成本" style="color: #D4C706;font-weight: 700;font-style: oblique;">
				<el-select v-model="form.energyCost" placeholder="请选择能源" style="float: right;">
					<el-option v-for="item in energyCost" :key="item.id" :label="item.name" :value="item.id">
					</el-option>
				</el-select>
				<el-tag type="success" style="float: left;">成本数额为：{{this.form.energyCost}}</el-tag>
			</el-form-item>
			<el-form-item label="工序成本" style="color: #D4C706;font-weight: 700;font-style: oblique;">
				<el-tag v-model="form.procedureCost" type="success" style="float: left;">
					成本数额为：{{this.form.procedureCost}}
				</el-tag>
			</el-form-item>
			<el-form-item label="分摊成本" style="color: #D4C706;font-weight: 700;font-style: oblique;">
				<el-select v-model="form.shareCost" placeholder="请选择分摊规则" style="float: right;">
					<el-option v-for="item in shareCost" :key="item.id" :label="item.name" :value="item.id">
					</el-option>
				</el-select>
				<el-tag type="success" style="float: left;">分摊系数为：{{this.form.shareCost}}</el-tag>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" plain @click="finish" size="medium">完成核算</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	export default {
		name: 'Account',
		data() {
			const module = '/cm-account'
			return {
				url: {
					list: module + '/list',
					save: module + '/save',
					getProduct: '/cm-product/getProduct',
					getProcess: '/cm-process/getProcess',
					getByProcedure: '/cm-procedure-energy/getByProcedure',
					getProcedureCost: '/cm-cost-item/getProcedureCost',
					getShare: '/cm-share/getShare',
					getRawMaterial: '/cm-cost-item/getRawMaterial',
					endProcess: '/cm-process/endProcess'
				},
				processId: '',
				tableData: [],
				product: [],
				form: {
					jobId: '',
					procedureId: '',
					productId: '',
					rawCost: '',
					energyCost: '',
					procedureCost: '',
					shareCost: ''
				},
				energyCost: [],
				shareCost: [],
				procedure: [{
					id: 9,
					name: "炼焦工序"
				}, {
					id: 10,
					name: "烧结球团工序"
				}, {
					id: 11,
					name: "炼铁工序"
				}, {
					id: 12,
					name: "炼钢工序"
				}, {
					id: 13,
					name: "轧钢工序"
				}, {
					id: 14,
					name: "辅助工序"
				}]
			}
		},
		created() {
			this.getProduct()
			this.getProcess()
			// console.log(this.tableData)
		},
		methods: {
			sleep(d) {
				return new Promise((resolve) => setTimeout(resolve, d))
			},
			async test() {
				await this.sleep(1800)
				this.$router.go(0)
			},
			finish() {
				// console.log(this.form)
				this.post(this.url.save, this.form, response => {
					// console.log(response)
					// this.getProcess()
					this.test()
					// this.$router.go(0)
				})
				this.endProcess(this.processId)
			},
			endProcess(id) {
				console.log(id)
				this.post(this.url.endProcess, {
					id: id
				}, response => {
					console.log(response)
				})
			},
			getRawCost(procedureId, rawMaterial) {
				// console.log(procedureId)
				this.get(this.url.getRawMaterial, {
					procedureId: procedureId
				}, response => {
					// console.log(response)
					// console.log(rawMaterial)
					for (let key in response) {
						// console.log(response[key].id)
						if (response[key].id == rawMaterial) {
							// console.log(response[key].id)
							this.form.rawCost = response[key].remarks
						}
					}
				})
			},
			getEnergyCost(procedureId) {
				this.get(this.url.getByProcedure, {
					procedureId: procedureId
				}, response => {
					// console.log(response)
					for (let key in response) {
						this.energyCost.push({
							id: response[key].allCost,
							name: response[key].energyName
						})
					}
				})
			},
			getProcedureCost() {
				this.get(this.url.getProcedureCost, '', response => {
					// console.log(response)
					this.form.procedureCost = response
				})
			},
			getShareCost(procedureId) {
				this.get(this.url.getShare, {
					procedureId: procedureId
				}, response => {
					// console.log(response)
					for (let key in response) {
						this.shareCost.push({
							id: response[key].rulerFactor,
							name: response[key].rulerName
						})
					}
				})
			},
			getProcess() {
				this.get(this.url.getProcess, '', response => {
					// console.log(response)
					this.tableData = response
					// console.log(response)
				})
			},
			getProduct() {
				this.get(this.url.getProduct, '', response => {
					this.product = response
					// console.log(this.product)
					// id: 15~25
				})
			},
			begin(jobId, procedureId, productId, rawMaterial, id) {
				// console.log("begin: " + jobId + procedureId + productId)
				//先清除已有数据
				this.clearForm()
				//再获取
				this.form.jobId = jobId
				this.form.procedureId = procedureId
				this.form.productId = productId
				// console.log(procedureId)
				this.getEnergyCost(procedureId)
				this.getProcedureCost()
				this.getShareCost(procedureId)
				this.getRawCost(procedureId, rawMaterial)
				this.processId = id
			},
			clearForm() {
				this.form.jobId = '',
					this.form.procedureId = '',
					this.form.productId = '',
					this.form.rawCost = '',
					this.form.energyCost = '',
					this.form.procedureCost = '',
					this.form.shareCost = ''
			}
		}
	}
</script>

<style>
</style>
