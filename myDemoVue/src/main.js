// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App'
import router from './router'
import websocket from 'vue-native-websocket'
//main.js
/* import axios from 'axios'
import VueAxios from 'vue-axios' */
import httpRequest from '@/utils/httpRequest'
//Vue.use(VueAxios, axios)
//Vue.prototype.$axios = axios
//Vue.prototype.HOME = '/api'
Vue.prototype.$http = httpRequest // ajax请求方法
Vue.config.productionTip = false
/* eslint-disable no-new */
Vue.use(ElementUI);
Vue.prototype.$websocket = websocket

new Vue({
	el: '#app',
	router,
	components: {
		App
	},
	template: '<App/>'
})
