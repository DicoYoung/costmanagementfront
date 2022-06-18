<template>
	<div>
		<div class="dc-filter">
			<el-select v-model="process" placeholder="请选择工序">
				<el-option label="炼焦工序" value="9"></el-option>
				<el-option label="烧结球团工序" value="10"></el-option>
				<el-option label="炼铁工序" value="11"></el-option>
				<el-option label="炼钢工序" value="12"></el-option>
				<el-option label="轧钢工序" value="13"></el-option>
				<el-option label="辅助工序" value="14"></el-option>
			</el-select>
			<el-button type="primary" plain icon="el-icon-search" @click="getTableData">查询</el-button>
			<el-button type="primary" plain icon="el-icon-plus" @click='add' style="float: right;">添加</el-button>
			<div class="clear"></div>
		</div>
		<div>---</div>
		<el-table ref="multipleTable" :data="tableData" height="200" border style="width: 100%">
			<el-table-column type="selection" width="55"></el-table-column>
			<el-table-column label="编号" prop="id"></el-table-column>
			<el-table-column label="作业编号" prop="jobId"></el-table-column>
			<el-table-column label="工序编号" prop="procedureId"></el-table-column>
			<el-table-column label="设备编号" prop="equipment">
				<template slot-scope='scope'>
					<span v-for="role in equip">
						<span v-if="role.value === scope.row.equipment">{{role.label}}</span>
					</span>
				</template>
			</el-table-column>
			<el-table-column label="班组编号" prop="team">
				<template slot-scope='scope'>
					<span v-for="role in teams">
						<span v-if="role.value === scope.row.team">{{role.label}}</span>
					</span>
				</template>
			</el-table-column>
			<el-table-column label="原料" prop="rawMaterial">
				<template slot-scope='scope'>
					<span v-for="role in material">
						<span v-if="role.id === Number(scope.row.rawMaterial)">{{role.name}}</span>
					</span>
				</template>
			</el-table-column>
			<el-table-column label="用量" prop="rawNumber"></el-table-column>
			<el-table-column label="开始时间" prop="beginTime"></el-table-column>
		</el-table>
		<div>---</div>
		<div>
			<el-button type="primary" plain icon="el-icon-edit" @click="edit">编辑</el-button>
			<el-button type="primary" plain icon="el-icon-finished" @click='finish'>完成</el-button>
		</div>
		<div>---</div>
		<el-table ref="multipleTableDone" :data="tableDataDone" height="200" border style="width: 100%">
			<el-table-column type="selection" width="55"></el-table-column>
			<el-table-column label="编号" prop="id"></el-table-column>
			<el-table-column label="作业编号" prop="jobId"></el-table-column>
			<el-table-column label="工序编号" prop="procedureId"></el-table-column>
			<el-table-column label="设备编号" prop="equipment">
				<template slot-scope='scope'>
					<span v-for="role in equip">
						<span v-if="role.value === scope.row.equipment">{{role.label}}</span>
					</span>
				</template>
			</el-table-column>
			<el-table-column label="班组编号" prop="team">
				<template slot-scope='scope'>
					<span v-for="role in teams">
						<span v-if="role.value === scope.row.team">{{role.label}}</span>
					</span>
				</template>
			</el-table-column>
			<el-table-column label="产品" prop="productId">
				<template slot-scope='scope'>
					<span v-for="role in product">
						<span v-if="role.id === scope.row.productId">{{role.name}}</span>
					</span>
				</template>
			</el-table-column>
			<el-table-column label="产品产量" prop="productNumber"></el-table-column>
			<el-table-column label="开始时间" prop="beginTime"></el-table-column>
			<el-table-column label="结束时间" prop="endTime"></el-table-column>
		</el-table>
		<div>---</div>
		<div>
			<el-button type="primary" plain icon="el-icon-back" @click='back'>退回</el-button>
			<el-button type="primary" plain icon="el-icon-right" @click="next">下一步</el-button>
		</div>
		<el-dialog width="450px" :title="userDialog.title" :visible.sync="userDialog.show"
			:close-on-click-modal="false">
			<component v-if="userDialog.show" :is="userDialog.component" :show.sync="userDialog.show"
				:id="userDialog.id" @getTableData="getTableData"></component>
		</el-dialog>
		<el-dialog width="450px" :title="editDialog.title" :visible.sync="editDialog.show"
			:close-on-click-modal="false">
			<component v-if="editDialog.show" :is="editDialog.component" :show.sync="editDialog.show"
				:id="editDialog.id" @getTableData="getTableData"></component>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		name: "Process",
		data() {
			const module = '/cm-process'
			return {
				url: {
					list: module + '/list',
					finish: module + '/finish',
					next: module + '/next',
					back: module + '/back',
					getMaterial: '/cm-cost-item/getRawMaterial',
					getProduct: '/cm-product/getProduct'
				},
				process: '',
				tableData: [],
				multipleTable: [],
				tableDataDone: [],
				multipleTableDone: [],
				userDialog: {
					show: false,
					title: '',
					component: () => import('./add'),
					id: null
				},
				editDialog: {
					show: false,
					title: '',
					component: () => import('./edit'),
					id: null
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
				// {
				// 	value: '0',
				// 	label: '原料#1'
				// }, {
				// 	value: '1',
				// 	label: '原料#2'
				// }
				product: []
			}
		},
		created() {
			// console.log("process:" + this.process)
			this.getProduct()
		},
		methods: {
			getTableData() {
				// console.log(this.process)
				this.get(this.url.list, {
					process: this.process
				}, response => {
					// this.tableData = response
					// console.log(response[0])
					this.tableData = response[0]
					// console.log(response[1])
					this.tableDataDone = response[1]
				})
				this.getMaterial()
				// this.getProduct()
			},
			getMaterial() {
				// console.log("process: " + this.process)
				// console.log(this.url.getMaterial)
				this.get(this.url.getMaterial, {
					procedureId: this.process
				}, response => {
					// console.log(response)
					this.material = response
				})

			},
			getProduct() {
				// console.log("come!Product")
				// console.log("process: " + this.process)
				this.get(this.url.getProduct, '', response => {
					this.product = response
					// console.log(this.product)
					// id: 15~25
				})
			},
			add() {
				// console.log("add:")
				if (this.process === '') {
					console.log("null")
					this.$notify({
						title: '提醒',
						message: '请选择工序',
						type: 'warning'
					});
				} else {
					this.userDialog.id = Number(this.process)
					this.userDialog.show = true
					this.userDialog.title = '添加新作业'
				}
			},
			edit() {
				// console.log("edit")
				// console.log(this.$refs.multipleTable.selection[0].id)
				this.editDialog.id = this.$refs.multipleTable.selection[0].id
				this.editDialog.show = true
				this.editDialog.title = '编辑作业'
			},
			finish() {
				// console.log("finish")
				// console.log(this.$refs.multipleTable.selection[0])
				if (this.$refs.multipleTable.selection[0].productId === 0) {
					console.log("编辑产品")
					this.$notify({
						title: '提醒',
						message: '请编辑生产的产品',
						type: 'warning'
					});
				} else {
					this.post(this.url.finish,
						this.$refs.multipleTable.selection[0], () => {
							this.getTableData()
						})
				}
			},
			next() {
				// console.log("next")
				this.post(this.url.next,
					this.$refs.multipleTableDone.selection[0], () => {
						this.getTableData()
					})
			},
			back() {
				// console.log("back")
				this.post(this.url.back,
					this.$refs.multipleTableDone.selection[0], () => {
						this.getTableData()
					})
			}
		}
	}
</script>

<style>
</style>
