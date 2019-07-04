<template>
	<div>
		<p>用户登陆</p>
		<form model="dataForm">
			用户名<input v-model="dataForm.userName" placeholder="帐号" />
			密码<input v-model="dataForm.password" placeholder="密码" />
		</form>
		<button @click="dataFormSubmit()">登陆</button>
		<router-link to="/">返回首页</router-link>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				dataForm: {
					userName: '',
					password: '',
					uuid: '',
				},
				dataRule: {
					userName: [{
						required: true,
						message: '帐号不能为空',
						trigger: 'blur'
					}],
					password: [{
						required: true,
						message: '密码不能为空',
						trigger: 'blur'
					}]
				}
			}
		},
		methods: {
			dataFormSubmit() {
				this.$http({
					url: this.$http.adornUrl('login/login.action'),
					method: 'post',
					data: this.$http.adornData({
						'username': this.dataForm.userName,
						'password': this.dataForm.password,
						'uuid': this.dataForm.uuid
					})
				}).then(({
					data
				}) => {
					debugger;
					if (data.code != 'error') {
						// this.$cookie.set('token', data.token)
						sessionStorage.setItem("name", this.dataForm.userName);
						this.$router.replace({
							name: 'demoIndex'
						})
					} else {
						alert('账号或者密码错误')
					}
				})
			}
		}
	}
</script>

<style>

</style>
