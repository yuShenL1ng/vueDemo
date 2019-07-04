<template>
	<el-main>
		<chart ref="chart1" :options="orgOptions" :auto-resize="true"></chart>
	</el-main>
</template>

<script>
	export default {
		name: 'ehcarDemo',
		data() {
			return {
				orgOptions: {},
			}
		},
		mounted() {
			this.orgOptions = {
				xAxis: {
					type: 'category',
					data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
				},
				yAxis: {
					type: 'value'
				},
				series: [{
					name:'',
					data: [820, 932, 901, 934, 1290, 1330, 1320],
					type: 'line',
					smooth: true
				}]
			}
		}
	}
</script>

<style>
</style>
