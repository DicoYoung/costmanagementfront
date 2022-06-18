<template>
	<div>
		<div class="dc_filter">
			<el-input v-model="query.name" placeholder="请输入要查询的规则名称"></el-input>
			<el-button type="primary" plain icon="el-icon-search" @click="search">查询</el-button>
			<el-button type="primary" plain icon="el-icon-plus" @click='add'>添加</el-button>
			<div class="clear"></div>
		</div>
		<el-table :data="tableData.records" border>
			<el-table-column label="编号" prop="id"></el-table-column>
			<el-table-column label="分摊规则" prop="rulerName"></el-table-column>
			<el-table-column label="对应工序" prop="procedureId">
				<template slot-scope='scope'>
					<span v-for="role in procedure">
						<span v-if="role.value === scope.row.procedureId">{{role.label}}</span>
					</span>
				</template>
			</el-table-column>
			<el-table-column label="权重系数" prop="rulerFactor"></el-table-column>
			<el-table-column label="备注" prop="remarks"></el-table-column>
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
		name: 'Share',
		data() {
			const module = '/cm-share'
			return {
				url: {
					list: module + '/list',
					del: module + '/del'
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
				procedure: [{
					value: 9,
					label: '炼焦工序'
				}, {
					value: 10,
					label: '烧结球团工序'
				}, {
					value: 11,
					label: '炼铁工序'
				}, {
					value: 12,
					label: '炼钢工序'
				}, {
					value: 13,
					label: '轧钢工序'
				}, {
					value: 14,
					label: '辅助工序'
				}]
			}
		},
		created() {
			this.getTableData()
		},
		methods: {
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
		},
	}
</script>

<style>
</style>
