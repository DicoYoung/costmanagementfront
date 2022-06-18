import Vue from 'vue'
import VueRouter from 'vue-router'
// js文件,并不能使用this.$store.getters得到store中的数据,需要先引用
import store from '../store'

Vue.use(VueRouter)

const routes = [{
		path: '/',
		name: 'Index',
		component: () => import('@/views'),
		children: [{
				path: '/user',
				name: 'UserList',
				component: () => import('@/views/user')
			},
			{
				path: '/password',
				name: 'Password',
				component: () => import('../views/password'),
			},
			{
				path: '/role',
				name: 'RoleList',
				component: () => import('../views/role'),
			},
			{
				path: '/roleusers',
				name: 'RoleUsers',
				component: () => import('../views/role/users'),
			},
			{
				path: '/roleresources',
				name: 'RoleResources',
				component: () => import('../views/role/resource'),
			},
			{
				path: '/resource',
				name: 'ResourceList',
				component: () => import('../views/resource'),
			},
			{
				path: '/costitem',
				name: 'CostItem',
				component: () => import('../views/costitem'),
			},
			{
				path: '/product',
				name: 'Product',
				component: () => import('../views/product'),
			},
			{
				path: '/datafile',
				name: 'Datafile',
				component: () => import('../views/datafile'),
			},
			{
				path: '/process',
				name: 'Process',
				component: () => import('../views/process'),
			},
			{
				path: '/account',
				name: 'Account',
				component: () => import('../views/account'),
			},
			{
				path: '/share',
				name: 'Share',
				component: () => import('../views/share'),
			},
			{
				path: '/plan',
				name: 'Plan',
				component: () => import('../views/plan'),
			},
			{
				path: '/assess',
				name: 'Assess',
				component: () => import('../views/assessment'),
			},
			{
				path: '/report',
				name: 'Report',
				component: () => import('../views/report'),
			},
			{
				path: '/energy',
				name: 'Energy',
				component: () => import('../views/energy'),
			}
		]
	},
	{
		path: '/login',
		name: 'Login',
		component: () => import('../views/login'),
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

// 调用路由过滤器
// 确定跳转地址之后，调用next进行跳转，否则页面会停在
// next调用之前，显示白页
router.beforeEach((to, from, next) => {
	if (to.path === '/login') {
		next()
		// 跳出beforeEach方法
		return
	}
	if (store.getters.GET_TOKEN) {
		next()
		return
	}
	next('/login')
})

export default router
