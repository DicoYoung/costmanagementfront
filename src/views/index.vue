<template>
	<div>
		<el-container class="wrap">
			<el-header>
				<Avatar></Avatar>
			</el-header>
			<el-container>
				<el-aside width="210px">
					<Menu></Menu>
				</el-aside>
				<el-main>
					<router-view></router-view>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script>
	import Menu from '@/components/menu'
	import Avatar from '@/components/avatar'
	export default {
		name: 'Index',
		data() {
			return {
				flag: 1
			}
		},
		created() {
			// this.getLog()
		},
		methods: {
			getLog() {
				if (this.$store.getters.GET_TOKEN === '' || this.$store.getters.GET_TOKEN === null) {
					console.log("token is null")
				} else {
					console.log("token is not null")
					this.flag = 0
				}
			},
			goLog() {
				console.log("去登录咯")
				this.$router.push('/login')
			}
		},
		components: {
			Menu,
			Avatar
		}
	}
</script>

<style scoped lang="less">
	@border: 2px solid #d4c706;
	@header: 60px;

	.wrap {
		height: 100vh;

		.el-aside {
			border-right: @border;
			background: linear-gradient(12deg, #101aa6, #a50cb3, #980831);
		}

		.el-header {
			border-bottom: @border;
			line-height: @header;
			background: linear-gradient(12deg, #1abdb2, #bf37c8, #3547be);
		}
		
		.el-main{
			background: linear-gradient(12deg, #4bb4b1, #7831cf);
		}
	}
</style>
