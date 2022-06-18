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
			<el-table-column label="在产品名称" prop="unfinishedProductId">
				<template slot-scope='scope'>
					<span v-for="role in product">
						<span v-if="role.id === scope.row.unfinishedProductId">{{role.name}}</span>
					</span>
				</template>
			</el-table-column>
			<el-table-column label="在产品余额" prop="unfinishedProductNumber"></el-table-column>
			<el-table-column label="开始时间" prop="beginTime"></el-table-column>
			<el-table-column label="所属工序" prop="procedureId"></el-table-column>
			<el-table-column label="备注" prop="remarks"></el-table-column>
			<el-table-column label="是否有效" prop="isActive"></el-table-column>
		</el-table>
		<el-pagination background :current-page.sync="query.pageNo" layout="prev, pager, next"
			:page-count="tableData.pages" @current-change="getTableData">
		</el-pagination>
	</div>
</template>

<script>
	export default {
		name: 'Unfinish',
		data() {
			const module = '/cm-unfinished-product'
			return {
				url: {
					list: module + '/list',
					getProduct: '/cm-product/getProduct'
				},
				query: {
					pageNo: 1,
					pageSize: 5,
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
					name: "炼钢工序"
				}, {
					id: 12,
					name: "轧钢工序"
				}, {
					id: 13,
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
					// console.log(response.records)
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
				this.getTableData()
			},
			save() {

			}
		}
	}
</script>

<style>
</style>
