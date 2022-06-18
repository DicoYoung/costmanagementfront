<template>
	<div>
		<el-tabs type="border-card">
			<el-tab-pane label="成本报表">
				<account></account>
			</el-tab-pane>
			<el-tab-pane label="在产品情况报表">
				<unfinish></unfinish>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
	export default {
		name: 'Report',
		components: {
			account: () => import('./account'),
			unfinish: () => import('./unfinish')
		}
	}
</script>

<style>
</style>
