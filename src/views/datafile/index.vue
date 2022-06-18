<template>
	<div>
		<div class="dc_filter">
			<el-input v-model="query.name" placeholder="请输入要查询的名称"></el-input>
			<el-button type="primary" plain icon="el-icon-search" @click="search">查询</el-button>
			<el-button type="primary" plain icon="el-icon-upload" @click='add'>上传</el-button>
			<div class="clear"></div>
		</div>
		<el-table :data="tableData.records" border>
			<el-table-column label="编号" prop="id"></el-table-column>
			<el-table-column label="文件名称" prop="name"></el-table-column>
			<el-table-column label="类型" prop="suffix"></el-table-column>
			<el-table-column label="大小" prop="size"></el-table-column>
			<el-table-column label="MD5" prop="md5"></el-table-column>
			<el-table-column label="URL" prop="url"></el-table-column>
			<el-table-column label="修改时间" prop="time"></el-table-column>
			<el-table-column width="150px" label="操作">
				<template slot-scope="scope">
					<template>
						<el-button type="primary" plain @click="update(scope.row.id)" size="mini">修改文件名</el-button>
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
		<el-dialog width="450px" :title="fileDialog.title" :visible.sync="fileDialog.show"
			:close-on-click-modal="false">
			<component v-if="fileDialog.show" :is="fileDialog.component" :show.sync="fileDialog.show"
				:id="fileDialog.id" @getTableData="getTableData"></component>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		name: "Datafile",
		data() {
			const module = '/cm-data-file'
			return {
				url: {
					list: module + '/list'
				},
				tableData: [],
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
				},
				fileDialog: {
					show: false,
					title: '',
					component: () => import('./update'),
					id: null
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
			add() {
				this.userDialog.id = null
				this.userDialog.show = true
				this.userDialog.title = '添加文件'
			},
			update(id) {
				this.fileDialog.id = id
				this.fileDialog.show = true
				this.fileDialog.title = '修改文件'
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
