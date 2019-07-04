<template>
	<el-dialog title="私聊" :visible.sync="visible">
		<input type="text" v-model="textOne">
		<el-button @click="sendOne()">向{{nameOne}}发送消息</el-button>
		<el-button @click="visible = false">关 闭</el-button>
	</el-dialog>
</template>

<script>
	import websocketDemo from '@/page/websocketDemo'
	export default {
		data() {
			return {
				nameOne:'',
				visible: false,
				textOne:''
			};
		},
		extends: websocketDemo,
		methods: {
			init(name) {
				this.visible = true
				this.nameOne  = name
			}
		},
	}
</script>

<style>

</style>
