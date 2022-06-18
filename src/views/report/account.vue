<template>
	<div>
		<div class="dc_filter">
			<el-select v-model="query.name" placeholder="请选择工序">
				<el-option label="炼焦工序" value="9"></el-option>
				<el-option label="烧结球团工序" value="10"></el-option>
				<el-option label="炼铁工序" value="11"></el-option>
				<el-option label="炼钢工序" value="12"></el-option>
				<el-option label="轧钢工序" value="13"></el-option>
				<el-option label="辅助工序" value="14"></el-option>
			</el-select>
			<el-button type="primary" plain icon="el-icon-search" @click="search">查询</el-button>
			<div class="clear"></div>
		</div>
		<el-table :data="tableData.records" border>
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
			<el-table-column label="原料成本" prop="rawCost"></el-table-column>
			<el-table-column label="能源成本" prop="energyCost"></el-table-column>
			<el-table-column label="工序成本" prop="procedureCost"></el-table-column>
			<el-table-column label="分摊成本" prop="shareCost"></el-table-column>
			<el-table-column label="炉号累计成本" prop="cumulativeCost"></el-table-column>
			<el-table-column label="完结时间" prop="finishTime"></el-table-column>
		</el-table>
		<el-pagination background :current-page.sync="query.pageNo" layout="prev, pager, next"
			:page-count="tableData.pages" @current-change="getTableData">
		</el-pagination>
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
					getProduct: '/cm-product/getProduct'
				},
				query: {
					pageNo: 1,
					pageSize: 9,
					name: ''
				},
				tableData: [],
				product: [],
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
			this.getTableData()
		},
		methods: {
			getTableData() {
				this.get(this.url.list, this.query, response => {
					this.tableData = response
				})
			},
			getProduct() {
				this.get(this.url.getProduct, '', response => {
					this.product = response
					// console.log(this.product)
					// id: 15~25
				})
			},
			search() {
				this.query.pageNo = 1
				// console.log(this.query.name)
				this.getTableData()
			},
			save() {
				this.$router.go(0)
			}
		}
	}
</script>

<style>
</style>
