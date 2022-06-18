<template>
	<div>
		<div class="dc_filter">
			<el-input v-model="query.name" placeholder="请输入要查询的计划名称"></el-input>
			<el-button type="primary" plain icon="el-icon-search" @click="search">查询</el-button>
			<el-button type="primary" plain icon="el-icon-plus" @click='add'>添加</el-button>
			<div class="clear"></div>
		</div>
		<el-table :data="tableData.records" border>
			<el-table-column label="编号" prop="id"></el-table-column>
			<el-table-column label="计划名称" prop="planName"></el-table-column>
			<el-table-column label="对象类型" prop="objectType">
				<template slot-scope='scope'>
					<span v-for="role in obj">
						<span v-if="role.value === scope.row.objectType">{{role.label}}</span>
					</span>
				</template>
			</el-table-column>
			<el-table-column label="对象名称" prop="objectId">
				<template slot-scope='scope'>
					<span v-for="role in product">
						<span v-if="role.id === scope.row.objectId">{{role.name}}</span>
					</span>
				</template>
			</el-table-column>
			<el-table-column label="计划价格" prop="planPrice"></el-table-column>
			<el-table-column label="开始时间" prop="beginTime"></el-table-column>
			<el-table-column label="结束时间" prop="endTime"></el-table-column>
			<el-table-column label="是否有效" prop="isActive">
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

		<el-pagination background :current-page.sync="query.pageNo" layout="prev, pager, next"
			:page-count="tableData.pages" @current-change="getTableData">
		</el-pagination>

		<el-dialog width="450px" :title="userDialog.title" :visible.sync="userDialog.show"
			:close-on-click-modal="false">
			<component v-if="userDialog.show" :is="userDialog.component" :show.sync="userDialog.show"
				:id="userDialog.id" @getTableData="getTableData"></component>
		</el-dialog>

	</div>
</template>

<script>
	export default {
		name: 'Plan',
		data() {
			const module = '/cm-plan'
			return {
				url: {
					list: module + '/list',
					del: module + '/del',
					getProduct: '/cm-product/getProduct'
				},
				tableData: [],
				query: {
					pageNo: 1,
					pageSize: 10,
					name: ''
				},
				userDialog: {
					show: false,
					title: '',
					component: () => import('./edit'),
					id: null
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
				product: []
			}
		},
		created() {
			this.getTableData()
			this.getProduct()
		},
		methods: {
			getProduct() {
				this.get(this.url.getProduct, '', response => {
					this.product = response
					// console.log(this.product)
				})
			},
			getTableData() {
				this.get(this.url.list, this.query, response => {
					this.tableData = response
					// console.log(this.tableData.records)
				})
			},
			add() {
				this.userDialog.id = null
				this.userDialog.show = true
				this.userDialog.title = '添加'
			},
			update(id) {
				this.userDialog.id = id
				this.userDialog.show = true
				this.userDialog.title = '修改'
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
			search() {
				this.query.pageNo = 1
				this.getTableData()
			}
		}
	}
</script>

<style>
</style>
