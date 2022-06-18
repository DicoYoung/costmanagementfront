<template>
	<div>
		<!-- find\add func -->
		<div class="dc_filter">
			<el-input v-model="query.name" placeholder="请输入要查询的名称"></el-input>
			<el-button type="primary" plain icon="el-icon-search" @click="search">查询</el-button>
			<el-button type="primary" plain icon="el-icon-plus" @click='add'>添加</el-button>
			<div class="clear"></div>
		</div>
		<!-- table -->
		<el-table :data="tableData.records" border>
			<el-table-column label="编号" prop="id"></el-table-column>
			<el-table-column label="头像">
				<template slot-scope="scope">
					<el-image style="width: 80px;height: 80px;" :src="img(scope.row.icon)" fit="contain"></el-image>
				</template>
			</el-table-column>
			<el-table-column label="登录名" prop="loginName"></el-table-column>
			<el-table-column label="真实姓名" prop="trueName"></el-table-column>
			<el-table-column label="性别" prop="gender">
				<template slot-scope='scope'>
					<span v-if="scope.row.gender === 1">男</span>
					<span v-else>女</span>
				</template>
			</el-table-column>
			<el-table-column label="年龄" prop="age"></el-table-column>
			<el-table-column label="手机号" prop="phone"></el-table-column>
			<el-table-column label="家庭地址" prop="address"></el-table-column>
			<el-table-column label="邮箱" prop="email"></el-table-column>
			<el-table-column label="职位">
				<template slot-scope='scope'>
					<span v-for="role in roles">
						<span v-if="role.id === scope.row.type">{{role.name}}</span>
					</span>
				</template>
			</el-table-column>
			<el-table-column label="是否有效">
				<template slot-scope='scope'>
					<span v-if="scope.row.active === 1">有效</span>
					<span v-else>无效</span>
				</template>
			</el-table-column>
			<el-table-column width="150px" label="操作">
				<template slot-scope="scope">
					<template v-if="scope.row.active === 1">
						<el-button type="primary" plain @click="update(scope.row.id)" size="mini">修改</el-button>
						<el-button type="danger" plain @click="del(scope.row.id,0)" size="mini">删除</el-button>
					</template>
					<template v-else>
						<el-button type="danger" plain @click="del(scope.row.id,1)" size="mini">恢复</el-button>
					</template>
				</template>
			</el-table-column>
		</el-table>
		<!-- page next -->
		<el-pagination background :current-page.sync="query.pageNo" layout="prev, pager, next"
			:page-count="tableData.pages" @current-change="getTableData">
		</el-pagination>
		<!-- add diaglog -->
		<!-- ':visible.sync' for when you close dialog,the dialog window will be closed -->
		<!-- but if you don`t '.sync', the dialog window will not be closed -->
		<el-dialog width="450px" :title="userDialog.title" :visible.sync="userDialog.show"
			:close-on-click-modal="false">
			<!-- dynamic component -->
			<component v-if="userDialog.show" :is="userDialog.component" :show.sync="userDialog.show"
				:id="userDialog.id" @getTableData="getTableData"></component>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		name: "UserList",
		data() {
			const module = '/cm-user'
			return {
				roles: [],
				tableData: [],
				url: {
					list: module + '/list',
					del: module + '/del',
					role: '/cm-role/list'
				},
				query: {
					pageNo: 1,
					pageSize: 4,
					name: ''
				},
				userDialog: {
					show: false,
					title: '',
					component: () => import('./edit'),
					id: null
				}
			}
		},
		created() {
			this.getRole()
			this.getTableData()
		},
		methods: {
			getRole() {
				this.get(this.url.role, '', response => {
					this.roles = response
					// console.log(this.roles)
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
				this.userDialog.title = '添加用户'
			},
			update(id) {
				this.userDialog.id = id
				this.userDialog.show = true
				this.userDialog.title = '修改用户'
			},
			del(id, active) {
				const txt = active === 0 ? '确定真的要删除该数据吗？' : '确定真的要恢复该数据吗？'
				this.$confirm(txt, '提示', {
					type: 'warning'
				}).then(() => {
					// then 里表示点击确定后发生的，catch 表示点击取消后发生的
					this.post(this.url.del, {
						id: id,
						active: active
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
