<template>
	<el-main>
		<h2>当前用户{{user}}</h2>
		<h1>在线人数{{count}}人</h1>
		<div>
			在线人员:
			<el-select v-model="selectList" filterable  placeholder="在线人员" value-key="id">
				<el-option key="0" label="所有人" value=""></el-option>
				<el-option v-for="item in nameList" :key="item.id" :label="item.label" :value="item"></el-option>
			</el-select>
		</div>
		<div v-html="data"></div>
		<input type="text" v-model="text">
		<el-button @click="send()">发送消息</el-button>
		<br>
		<el-button @click="closeWebSocket()">退出房间</el-button>
		<el-button @click="emptyMessage()">清空消息</el-button>
		<br>
		<!-- <socketOne ref="websocketOne"></socketOne> -->
	</el-main>
</template>

<script>
	/* import websocketOne from '@/components/websocketOne' */
	export default {
		name: "WebSocket",
		components: {
			//'socketOne': websocketOne
		},
		data() {
			return {
				text: '',
				data: '',
				websocket: null,
				user: sessionStorage.getItem("name"),
				count: 0,
				nameList: [],
				selectList :''
			}
		},
		mounted() {
			if ('WebSocket' in window) {
				this.websocket = new WebSocket('ws://192.168.1.7:8181/websocket/' + this.user)
				this.initWebSocket()
			} else {
				alert('当前浏览器 Not support websocket')
			}
			//this.getMyWebsocket();
		},
		beforeDestroy() {
			this.onbeforeunload()
		},
		methods: {
			initWebSocket() {
				//连接错误
				this.websocket.onerror = this.setErrorMessage

				// //连接成功
				this.websocket.onopen = this.setOnopenMessage

				//收到消息的回调
				this.websocket.onmessage = this.setOnmessageMessage

				//连接关闭的回调
				this.websocket.onclose = this.setOncloseMessage

				//监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
				window.onbeforeunload = this.onbeforeunload
			},
			setErrorMessage() {
				this.data = "WebSocket连接发生错误" + '   状态码：' + this.websocket.readyState;
			},
			setOnopenMessage() {
				this.data = "聊天室连接成功<br/>";
			},
			setOnmessageMessage(event) {
				debugger
				 let userInfo = JSON.parse(event.data);
				 if(userInfo.isLogin == 0){
					 this.data += '欢迎：' + userInfo.fromUser + "来到聊天室<br/>";
				 }else if(userInfo.isLogin == 1){
					 if(userInfo.type == 0){
						 this.data += userInfo.fromUser+"发布了广播:"+userInfo.msg+ "<br/>";
					 }else{
						 this.data += userInfo.fromUser+"对"+userInfo.toUser+"悄悄的说:"+userInfo.msg+ "<br/>";
					 }
				 }
				this.count = userInfo.countAll;
				this.nameList = userInfo.nameList;
			},
			setOncloseMessage() {
				this.data = "WebSocket连接关闭" + '   状态码：' + this.websocket.readyState;
			},
			onbeforeunload() {
				this.closeWebSocket();
			},

			//websocket发送消息
			send() {
				//this.websocket.send(this.text)
				debugger
				var message = this.text
				var toUser = this.selectList.label
				var socketMsg = {
					msg: message,
					toUser: toUser,
					fromUser:sessionStorage.getItem("name")
				};
				if (toUser == undefined || toUser == '' || toUser == '所有人') {
					//群聊.
					socketMsg.type = 0;
				} else {
					//单聊.
					socketMsg.type = 1;
				}
				this.websocket.send(JSON.stringify(socketMsg));
				this.text = ''
			},
			closeWebSocket() {
				this.websocket.close()
			},
			emptyMessage() {
				this.data = '';
			},
			getMyWebsocket() {
				this.$http({
					url: this.$http.adornUrl('MyWebsocket/getMyWebsocket.action'),
					method: 'post',
					data: this.$http.adornData({})
				}).then(({
					data
				}) => {
					if (data != '') {
						this.count = data.count
						this.nameList = data.nameList
					}
				})
			}
			/* websocketOpenOne(name) {
				this.$nextTick(() => {
					this.$refs.websocketOne.init(name)
				})
			} */
		}
	}
</script>

<style>

</style>
