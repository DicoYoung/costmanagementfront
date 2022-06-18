"use strict";

import Vue from 'vue';
import axios from "axios";
import {
	Notification,
	Loading
} from 'element-ui';
import store from '@/store'
import qs from 'qs'

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
	baseURL: "http://localhost:8081"
	// baseURL: process.env.baseURL || process.env.apiUrl || ""
	// timeout: 60 * 1000, // Timeout
	// withCredentials: true, // Check cross-site Access-Control
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
	function(config) {
		// Do something before request is sent
		if (store.getters.GET_TOKEN) {
			config.headers['token'] = store.getters.GET_TOKEN
		}
		config.paramsSerializer = (params) => {
			return qs.stringify(params, {
				arrayFormat: 'repeat'
			})
		}
		return config;
	},
	function(error) {
		// Do something with request error
		return Promise.reject(error);
	}
);

// Add a response interceptor
_axios.interceptors.response.use(
	function(response) {
		// Do something with response data
		return response;
	},
	function(error) {
		// Do something with response error
		return Promise.reject(error);
	}
);

// function(a,b) 相当于 (a,b) =>
const request = (url, method, params, callback) => {
	const dcloading = Loading.service({
		text: '加载中...',
		background: 'rgba(255,255,255,0.7)'
	})

	const dcconfig = {
		url: url,
		method: method
	}
	if (method === 'get') {
		dcconfig.params = params
	} else {
		const formData = new FormData()
		for (let key in params) {
			if (params[key] instanceof Array) {
				for (let i = 0; i < params[key].length; i++) {
					formData.append(key, params[key][i])
				}
			} else {
				formData.append(key, params[key])
			}
		}
		dcconfig.data = formData
	}
	_axios.request(dcconfig).then(response => {
		if (response.data.code === 200) {
			// give it to 'callback',then you can do anything you want to do
			callback(response.data)
		} else {
			Notification.error({
				title: '错误',
				message: response.data.message
			})
		}
	}).catch(error => {
		Notification.error({
			title: '错误',
			message: error
		})
	}).finally(() => {
		dcloading.close()
	})
}

// 定义自己的变量
Vue.prototype.axios = _axios
Vue.prototype.request = request
Vue.prototype.get = (url, params, callback) => {
	request(url, 'get', params, response => {
		callback(response.obj)
	})
}
Vue.prototype.post = (url, params, callback) => {
	request(url, 'post', params, response => {
		Notification.success({
			title: '成功',
			message: response.message
		})
		callback(response.obj)
	})
}

// Plugin.install = function(Vue, options) {
// 	Vue.axios = _axios;
// 	window.axios = _axios;
// 	Object.defineProperties(Vue.prototype, {
// 		axios: {
// 			get() {
// 				return _axios;
// 			}
// 		},
// 		$axios: {
// 			get() {
// 				return _axios;
// 			}
// 		},
// 	});
// };

// Vue.use(Plugin)

// export default Plugin;
