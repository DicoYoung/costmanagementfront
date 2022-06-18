<template>
	<el-form ref="myform" :model="form" label-width="80px" :rules="rules">
		<el-form-item label="登录名" prop="loginName">
			<el-input v-model="form.loginName"></el-input>
		</el-form-item>
		<el-form-item label="真实姓名" prop="trueName">
			<el-input v-model="form.trueName"></el-input>
		</el-form-item>
		<el-form-item v-if="!this.id" label="密码" prop="rawPassword">
			<el-input v-model="form.rawPassword" show-password></el-input>
		</el-form-item>
		<el-form-item label="手机号" prop="phone">
			<el-input v-model="form.phone"></el-input>
		</el-form-item>
		<el-form-item label="邮箱" prop="email">
			<el-input v-model="form.email"></el-input>
		</el-form-item>
		<el-form-item label="年龄" prop="age">
			<el-input v-model="form.age"></el-input>
		</el-form-item>
		<el-form-item label="性别" prop="gender">
			<el-select v-model="form.gender" placeholder="请选择性别">
				<el-option v-for="item in genders" :key="Number(item.value)" :label="item.label"
					:value="Number(item.value)">
				</el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="地址" prop="address">
			<el-input v-model="form.address"></el-input>
		</el-form-item>
		<el-form-item label="类型" prop="type">
			<el-select v-model="form.type" placeholder="请选择职位">
				<el-option v-for="item in types" :key="item.id" :label="item.name" :value="item.id">
				</el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="头像" prop="file">
			<el-upload :file-list="filelist" action="http://www.abc.com" list-type="picture-card" :auto-upload="false"
				:limit="1" :on-change="changefile" :on-remove="removefile">
				<i class="el-icon-plus"></i>
			</el-upload>
		</el-form-item>
		<el-form-item>
			<el-button type="primary" plain @click='save'>保存</el-button>
		</el-form-item>
	</el-form>
</template>

<script>
	export default {
		name: 'UserEdit',
		props: {
			id: {
				type: Number,
				default: null
			}
		},
		created() {
			// console.log("here")
			// console.log(this.form)
			this.getRole()
			if (this.id) {
				this.url.save = '/cm-user/update'
				this.getone()
			} else {
				this.rules.file.push({
					required: true,
					message: '请上传头像',
					trigger: 'blur'
				})
			}
		},
		data() {
			const module = '/cm-user'
			return {
				url: {
					save: module + '/add',
					getone: module + '/getone',
					role: '/cm-role/list'
				},
				genders: [{
					value: '1',
					label: '男'
				}, {
					value: '0',
					label: '女'
				}],
				types: [],
				form: {
					loginName: '',
					trueName: '',
					rawPassword: '',
					phone: '',
					email: '',
					age: '',
					gender: '',
					address: '',
					type: '',
					file: null
				},
				filelist: [],
				rules: {
					loginName: [{
							required: true,
							message: '请输入登录名',
							trigger: 'blur'
						},
						{
							min: 1,
							max: 20,
							message: '不能超过20个字符',
							trigger: 'blur'
						}
					],
					trueName: [{
							required: true,
							message: '请输入真实姓名',
							trigger: 'blur'
						},
						{
							min: 1,
							max: 20,
							message: '不能超过20个字符',
							trigger: 'blur'
						}
					],
					rawPassword: [{
						required: true,
						message: '请输入密码',
						trigger: 'blur'
					}],
					phone: [{
							required: true,
							message: '请输入手机号',
							trigger: 'blur'
						},
						{
							pattern: /^1([38][0-9]|4[5-9]|5[0-3,5-9]|66|7[0-8]|9[89])[0-9]{8}$/,
							message: '请输入正确的手机号',
							trigger: 'blur'
						}
					],
					email: [{
							required: true,
							message: '请输入邮箱',
							trigger: 'blur'
						},
						{
							min: 1,
							max: 50,
							message: '不能超过50个字符',
							trigger: 'blur'
						},
						{
							type: 'email',
							message: '请输入正确的邮箱',
							trigger: 'blur'
						}
					],
					age: [{
							required: true,
							message: '请输入年龄',
							trigger: 'blur'
						},
						{
							pattern: /^[1-9]\d*$/,
							message: '请输入合法年龄',
							trigger: 'blur'

						}
					],
					gender: [{
						required: true,
						message: '请选择性别',
						trigger: 'blur'
					}],
					address: [{
						required: true,
						message: '请输入地址',
						trigger: 'blur'
					}],
					type: [{
						required: true,
						message: '请选择职位',
						trigger: 'blur'
					}],
					file: []
				}
			}
		},
		methods: {
			save() {
				// 表单验证，$refs['表单名字'].validate((flag)
				this.$refs['myform'].validate((flag) => {
					if (flag) {
						console.log(this.form)
						this.post(this.url.save, this.form, () => {
							this.$emit('update:show', false)
							this.$emit('getTableData')
						})
					}
				})
			},
			getone() {
				this.get(this.url.getone, {
					id: this.id
				}, response => {
					for (let key in this.form) {
						this.form[key] = response[key]
					}
					this.form.id = response.id
					this.filelist.push({
						name: response.icon,
						url: this.img(response.icon)
					})
				})
			},
			changefile(file) {
				this.form.file = file.raw
			},
			removefile() {
				this.form.file = null
			},
			getRole() {
				this.get(this.url.role, '', response => {
					// console.log(response)
					this.types = response
				})
			}
		}
	}
</script>

<style>
</style>
