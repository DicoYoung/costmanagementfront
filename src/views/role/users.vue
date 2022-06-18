<template>
	<div>
		<el-transfer v-model="form.userIds" :titles="['所有用户', '已选用户']" :data="users" :props="{
        key: 'id',
        label: 'trueName',
      }">
		</el-transfer>
		<el-button type="primary" style="margin-top: 10px" plain size="small" @click="save">保存</el-button>
		<el-button type="primary" style="margin-top: 10px" plain size="small" @click="back">返回</el-button>
	</div>
</template>

<script>
	export default {
		name: 'RoleUsers',
		data() {
			const module = '/cm-role-user'
			return {
				url: {
					getData: module + '/getData',
					save: module + '/save',
				},
				form: {
					roleId: '',
					userIds: [],
				},
				users: [],
			}
		},
		created() {
			this.form.roleId = this.$route.query.roleId
			this.getData()
		},
		methods: {
			getData() {
				this.get(this.url.getData, {
					roleId: this.form.roleId
				}, (response) => {
					this.users = response.users
					for (let i = 0; i < response.values.length; i++) {
						this.form.userIds.push(response.values[i].userId)
					}
				})
			},
			save() {
				this.post(this.url.save, this.form, () => {
					this.$router.push('/role')
				})
			},
			back() {
				this.$router.push('/role')
			}
		},
	}
</script>

<style lang="scss" scoped></style>
