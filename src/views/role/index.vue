<template>
	<div class="index">
		<div class="dc_filter">
			<!-- <el-input class="special" v-model="query.name" placeholder="请输入角色名"></el-input>
			<el-button type="primary" plain icon="el-icon-search" @click="search">查询</el-button> -->
			<el-button size="medium" type="primary" plain icon="el-icon-plus" style="float: left" @click="add">添加角色
			</el-button>
			<div class="clear"></div>
		</div>
		<el-table :data="tableData" border style="width: 100%">
			<el-table-column label="编号" prop="id"></el-table-column>
			<el-table-column label="角色名" prop="name"></el-table-column>
			<el-table-column align="center">
				<template slot-scope="scope">
					<el-button size="small" plain type="primary" @click="users(scope.row.id)">关联用户</el-button>
					<el-button size="small" plain type="primary" @click="resources(scope.row.id)">关联资源</el-button>
				</template>
			</el-table-column>
			<el-table-column label="是否有效" prop="active">
				<template slot-scope="scope">
					<span v-if="scope.row.active === 1">有效</span>
					<span v-else>无效</span>
				</template>
			</el-table-column>
			<el-table-column width="200px" align="center" label="操作">
				<template slot-scope="scope" style="text-align: center">
					<template v-if="scope.row.active === 1">
						<el-button type="primary" plain @click="chg(scope.row.id)" size="small">修改</el-button>
						<el-button type="danger" plain @click="del(scope.row.id, 0)" size="small">删除</el-button>
					</template>
					<template v-else>
						<el-button type="primary" plain @click="del(scope.row.id, 1)" size="small">恢复角色状态</el-button>
					</template>
				</template>
			</el-table-column>
		</el-table>
		<div class="position">
			<el-dialog width="550px" :title="userDialog.title" :visible.sync="userDialog.show">
				<RoleEdit v-if="userDialog.show" :show.sync="userDialog.show" @getTableData="getTableData"
					:id="userDialog.id"></RoleEdit>
			</el-dialog>
		</div>
	</div>
</template>

<script>
	import RoleEdit from './edit'

	export default {
		name: 'RoleList',
		data() {
			const baseUrl = '/cm-role'
			return {
				tableData: [],
				query: {
					name: '',
				},
				url: {
					list: baseUrl + '/list',
					delete: baseUrl + '/del',
				},
				userDialog: {
					title: '',
					show: false,
					id: null,
				},
			}
		},
		created() {
			this.getTableData()
		},
		methods: {
			getTableData() {
				this.get(this.url.list, this.query, (response) => {
					this.tableData = response
					// console.log("here")
				})
			},
			// search() {
			// 	this.query.pageNo = 1
			// 	this.getTableData()
			// },
			add() {
				this.userDialog.id = null
				this.userDialog.title = '添加角色'
				this.userDialog.show = true
			},
			chg(id) {
				// console.log(id)
				this.userDialog.id = id
				this.userDialog.show = true
				this.userDialog.title = '修改角色'
			},
			del(id, active) {
				const text =
					active === 0 ? '确定真的要删除该数据吗?' : '确定真的要恢复该数据吗?'
				this.$confirm(text, '提示', {
					type: 'warning'
				}).then(() => {
					this.post(this.url.delete, {
						id: id,
						active: active
					}, () => {
						this.getTableData()
					})
				})
			},
			users(roleId) {
				this.$router.push({
					path: '/roleusers',
					query: {
						roleId: roleId,
					},
				})
			},
			resources(roleId) {
				this.$router.push({
					path: '/roleresources',
					query: {
						roleId: roleId,
					},
				})
			},
		},
		components: {
			RoleEdit,
		},
	}
</script>

<style scoped>
	.position {
		margin-top: 10px;
		text-align: center;
	}
</style>
