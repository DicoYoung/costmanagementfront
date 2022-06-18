<template>
	<div>
		<span style="color: #D4C706;font-weight: 700;">待评价:</span>
		<el-divider></el-divider>

		<!-- 核算表，即未评价表 -->
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
			<el-table-column label="产品" prop="productId">
				<template slot-scope='scope'>
					<span v-for="role in product">
						<span v-if="role.id === scope.row.productId">{{role.name}}</span>
					</span>
				</template>
			</el-table-column>
			<el-table-column label="实际花费" prop="cumulativeCost"></el-table-column>
			<el-table-column width="150px" label="操作">
				<template slot-scope='scope'>
					<el-button type="primary" plain @click="add(scope.row.id)" size="mini">开始评价</el-button>
				</template>
			</el-table-column>
		</el-table>

		<el-divider></el-divider>
		<span style="color: #D4C706;font-weight: 700;">已评价:</span>
		<el-divider></el-divider>

		<!-- 评价表 -->
		<el-table :data="tableDataAss" height="200" border style="width: 100%">
			<el-table-column label="编号" prop="id"></el-table-column>
			<el-table-column label="计划ID" prop="planId"></el-table-column>
			<el-table-column label="计划价格" prop="planPrice"></el-table-column>
			<el-table-column label="实际花费" prop="actualCost"></el-table-column>
			<el-table-column label="差额" prop="difference"></el-table-column>
			<el-table-column label="评价" prop="evaluate">
				<template slot-scope='scope'>
					<el-rate disabled v-model="scope.row.evaluate"></el-rate>
				</template>
			</el-table-column>
			<el-table-column label="评价时间" prop="evaluateTime"></el-table-column>
			<el-table-column label="评价人" prop="evaluateUser"></el-table-column>
			<el-table-column label="是否有效">
				<template slot-scope='scope'>
					<span v-if="scope.row.isActive === 1">有效</span>
					<span v-else>无效</span>
				</template>
			</el-table-column>
			<el-table-column width="150px" label="操作">
				<template slot-scope="scope">
					<template v-if="scope.row.isActive === 1">
						<el-button type="primary" plain @click="update(scope.row.id)" size="mini">修改</el-button>
						<el-button type="danger" plain @click="del(scope.row.id,0)" size="mini">删除</el-button>
					</template>
					<template v-else>
						<el-button type="danger" plain @click="del(scope.row.id,1)" size="mini">恢复</el-button>
					</template>
				</template>
			</el-table-column>
		</el-table>

		<el-dialog width="450px" :title="userDialog.title" :visible.sync="userDialog.show"
			:close-on-click-modal="false">
			<component v-if="userDialog.show" :is="userDialog.component" :show.sync="userDialog.show"
				:id="userDialog.id" @getTableData="getTableData"></component>
		</el-dialog>
		<el-dialog width="450px" :title="evaDialog.title" :visible.sync="evaDialog.show" :close-on-click-modal="false">
			<component v-if="evaDialog.show" :is="evaDialog.component" :show.sync="evaDialog.show" :id="evaDialog.id"
				@getTableData="getTableData"></component>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		name: 'Assess',
		data() {
			const module = '/cm-assessment'
			return {
				url: {
					list: module + '/listNoPage',
					getUnAssess: module + '/getUnAssess',
					getProduct: '/cm-product/getProduct',
					del: module + '/del'
				},
				product: [],
				tableData: [],
				tableDataAss: [],
				userDialog: {
					show: false,
					title: '',
					component: () => import('./edit'),
					id: null
				},
				evaDialog: {
					show: false,
					title: '',
					component: () => import('./ass'),
					id: null
				},
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
			this.getTableData()
		},
		methods: {
			getTableData() {
				this.getProduct()
				this.getUnAssess()
				this.getAss()
			},
			getUnAssess() {
				this.get(this.url.getUnAssess, '', response => {
					// console.log(response)
					this.tableData = response
				})
			},
			getAss() {
				this.get(this.url.list, '', response => {
					// console.log(response)
					this.tableDataAss = response
					// console.log(response)
				})
			},
			add(id) {
				this.evaDialog.id = id
				this.evaDialog.show = true
				this.evaDialog.title = '进行评价'
			},
			update(id) {
				this.userDialog.id = id
				this.userDialog.show = true
				this.userDialog.title = '修改评价'
			},
			del(id, isActive) {
				const txt = isActive === 0 ? '确定真的要删除该数据吗？' : '确定真的要恢复该数据吗？'
				this.$confirm(txt, '提示', {
					type: 'warning'
				}).then(() => {
					// then 里表示点击确定后发生的，catch 表示点击取消后发生的
					this.post(this.url.del, {
						id: id,
						isActive: isActive
					}, () => {
						this.getTableData()
					})
				})
			},
			getProduct() {
				this.get(this.url.getProduct, '', response => {
					this.product = response
					// console.log(this.product)
					// id: 15~25
				})
			}
		}
	}
</script>

<style>
</style>
