<template>
	<div class="container">
		<el-tree ref="tree" node-key="id" :data="resources" :props="{ label: 'name', children: 'children' }"
			show-checkbox highlight-current default-expand-all :default-checked-keys="values"></el-tree>
		<el-button type="primary" plain size="small" style="margin-top: 10px" @click="save">保存</el-button>
		<el-button type="primary" style="margin-top: 10px" plain size="small" @click="back">返回</el-button>
	</div>
</template>

<script>
	export default {
		name: 'RoleResources',
		data() {
			const module = '/cm-role-resource'
			return {
				roleId: null,
				resources: [],
				values: [],
				last: [],
				url: {
					getData: module + '/getData',
					save: module + '/save',
				},
			}
		},
		created() {
			this.roleId = this.$route.query.roleId
			// console.log(this.roleId)
			this.getData()
		},
		methods: {
			getData() {
				this.get(this.url.getData, {
					roleId: this.roleId
				}, (response) => {
					this.resources = response.resources
					// console.log(response)
					for (let i = 0; i < response.values.length; i++) {
						if (response.last.indexOf(response.values[i]) !== -1) {
							this.values.push(response.values[i])
						}
					}
				})
			},
			save() {
				const resourceIds = this.$refs['tree']
					.getHalfCheckedKeys()
					.concat(this.$refs['tree'].getCheckedKeys())
				this.post(
					this.url.save, {
						roleId: this.roleId,
						resourceIds: resourceIds
					},
					() => {}
				)
			},
			back() {
				this.$router.push('/role')
			}
		},
	}
</script>

<style lang="less" scoped></style>
