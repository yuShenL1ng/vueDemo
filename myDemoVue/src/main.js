// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App'
import router from './router'
import websocket from 'vue-native-websocket'
import httpRequest from '@/utils/httpRequest'
import ECharts from 'vue-echarts/components/ECharts'
import 'echarts/lib/chart/line'
Vue.prototype.$http = httpRequest // ajax请求方法
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.component('chart', ECharts)
Vue.prototype.$websocket = websocket

new Vue({
	el: '#app',
	router,
	components: {
		App
	},
	template: '<App/>'
})
