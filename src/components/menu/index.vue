<template>
	<div>
		<el-menu :router="true" text-color="#fff">
			<!-- background-color="#545c64" text-color="#fff" -->
			<!-- <el-submenu v-for="item in menu" :key="item.id" :index="item.frontUrl"><template slot="title">
					{{ item.name }}
				</template>
				<el-menu-item v-for="child in item.children" :key="child.id" :index="child.frontUrl">{{ child.name }}
				</el-menu-item>
			</el-submenu> -->
			<el-submenu index="1">
				<template slot="title">
					<i class="el-icon-s-custom"></i>
					用户管理
				</template>
				<el-menu-item index="/user">
					<i class="el-icon-user"></i>
					用户管理
				</el-menu-item>
				<el-menu-item index="/password">
					<i class="el-icon-unlock"></i>
					密码管理
				</el-menu-item>
				<el-menu-item index="/role">
					<i class="el-icon-connection"></i>
					权限管理
				</el-menu-item>
				<el-menu-item index="/resource">
					<i class="el-icon-coin"></i>
					资源管理
				</el-menu-item>
			</el-submenu>
			<el-submenu index="2">
				<template slot="title">
					<i class="el-icon-notebook-1"></i>
					基础数据维护
				</template>
				<el-menu-item index="/costitem">
					<i class="el-icon-money"></i>
					成本科目
				</el-menu-item>
				<el-menu-item index="/share">
					<i class="el-icon-guide"></i>
					分摊规则
				</el-menu-item>
				<el-menu-item index="/product">
					<i class="el-icon-postcard"></i>
					标准产品数据
				</el-menu-item>
			</el-submenu>
			<el-submenu index="3">
				<template slot="title">
					<i class="el-icon-s-check"></i>
					厂务会计
				</template>
				<el-menu-item index="/plan">
					<i class="el-icon-trophy"></i>
					计划价格
				</el-menu-item>
				<el-menu-item index="/datafile">
					<i class="el-icon-folder-opened"></i>
					原始资料
				</el-menu-item>
				<el-menu-item index="/assess">
					<i class="el-icon-s-flag"></i>
					考核情况
				</el-menu-item>
			</el-submenu>
			<el-submenu index="4">
				<template slot="title">
					<i class="el-icon-chat-line-square"></i>
					过程跟踪
				</template>
				<el-menu-item index="/process">
					<i class="el-icon-video-camera-solid"></i>
					跟踪过程
				</el-menu-item>
				<el-menu-item index="/energy">
					<i class="el-icon-ship"></i>
					能源消耗
				</el-menu-item>
			</el-submenu>
			<el-submenu index="5">
				<template slot="title">
					<i class="el-icon-data-line"></i>
					成本核算
				</template>
				<el-menu-item index="/account">
					<i class="el-icon-edit"></i>
					核算成本
				</el-menu-item>
			</el-submenu>
			<el-submenu index="6">
				<template slot="title">
					<i class="el-icon-data-analysis"></i>
					成本分析
				</template>
				<el-menu-item index="/report">
					<i class="el-icon-notebook-2"></i>
					成本报表
				</el-menu-item>
			</el-submenu>
		</el-menu>
	</div>
</template>

<script>
	export default {
		name: 'Menu',
		data() {
			return {
				menu: [],
			}
		},
		created() {
			this.menu = this.$store.getters.GET_MENU
			// console.log(this.menu)
		}
	}
</script>

<style lang="less" scoped>
	// 鼠标悬停在子菜单选项上：
	/deep/.el-menu .el-menu-item:hover {
		outline: 0 !important;
		color: #61fbe4 !important;
		background: linear-gradient(12deg, #1928ff, #ec12ff, #ff0f53) !important;
	}

	// 鼠标悬停在主菜单选项上：
	/deep/.el-menu .el-menu-item.is-active {
		color: #9d8d11 !important;
		background: linear-gradient(11deg, #18ee09, #09eedf, #b50aee) !important;
	}

	// 主菜单常驻颜色
	.el-submenu {
		color: #fbe21d !important;
		background: linear-gradient(12deg, #101aa6, #980831) !important;
	}

	// 子菜单常驻颜色
	.el-submenu .el-menu-item {
		color: #fbe21d !important;
		background: linear-gradient(134deg, #383e87, #8c4093, #82374b) !important;
	}

	// 子菜单选中时颜色
	.el-submenu /deep/.el-submenu__title:hover {
		color: #ffff7f !important;
		background: linear-gradient(11deg, #18ee09, #09eedf, #b50aee) !important;
	}
</style>
