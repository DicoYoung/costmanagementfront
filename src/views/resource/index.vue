<template>
	<div>
		<div class="dc-filter">
			<el-button type="primary" plain icon="el-icon-plus" style="float: left;" @click="add(0,1)">添加</el-button>
			<div class="clear"></div>
		</div>

		<el-table :data="tableData" row-key="id" border>
			<el-table-column label="编号" prop="id"></el-table-column>
			<el-table-column label="资源名" prop="name"></el-table-column>
			<el-table-column label="资源类别" prop="type"></el-table-column>
			<el-table-column label="前端地址" prop="frontUrl"></el-table-column>
			<el-table-column label="后端地址" prop="backUrl"></el-table-column>
			<el-table-column label="上级id" prop="parentId"></el-table-column>
			<el-table-column label="是否有下级" prop="haschildren">
				<template slot-scope='scope'>
					<span v-if="scope.row.haschildren === 1">有</span>
					<span v-else>无</span>
				</template>
			</el-table-column>
			<el-table-column width="235px" label="操作">
				<template slot-scope="scope">
					<template v-if="scope.row.active === 1">
						<template v-if="scope.row.haschildren === 1">
							<el-button type="primary" plain @click="add(scope.row.id)" size="mini">添加下级</el-button>
						</template>
						<el-button type="primary" plain @click="update(scope.row.id)" size="mini">修改</el-button>
						<el-button type="danger" plain @click="del(scope.row.id,0)" size="mini">删除</el-button>
					</template>
					<template v-else>
						<el-button type="danger" plain @click="del(scope.row.id,1)" size="mini">恢复到有效</el-button>
					</template>
				</template>
			</el-table-column>
		</el-table>
		<el-dialog width="450px" :title="dialog.title" :visible.sync="dialog.show" :close-on-click-modal="false">
			<component v-if="dialog.show" :is="dialog.component" :show.sync="dialog.show" :id="dialog.id"
				:parentId="dialog.parentId" @getTableData="getTableData"></component>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		name: 'ResourceList',
		data() {
			const module = '/cm-resource'
			return {
				tableData: [],
				url: {
					list: module + '/list',
					del: module + '/del'
				},
				dialog: {
					show: false,
					title: '',
					component: () => import('./edit'),
					id: null,
					parentId: null,
				}
			}
		},
		created() {
			this.getTableData()
		},
		methods: {
			getTableData() {
				this.get(this.url.list, this.query, response => {
					this.tableData = response
				})
			},
			add(parentId) {
				this.dialog.parentId = parentId
				this.dialog.id = null
				this.dialog.title = '添加资源',
					this.dialog.show = true
			},
			update(id) {
				this.dialog.parentId = null
				this.dialog.id = id
				this.dialog.title = '修改资源',
					this.dialog.show = true
			},
			del(id, active) {
				const txt = active === 0 ? '确定真的要删除该数据吗?' : '确定真的要将数据恢复到有效吗?'
				this.$confirm(txt, '提示', {
					type: 'warning'
				}).then(() => {
					this.post(this.url.del, {
						id: id,
						active: active
					}, () => {
						this.getTableData()
					})
				})
			},
		}
	}
</script>

<style>
</style>
