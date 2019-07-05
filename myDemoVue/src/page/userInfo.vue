<template>
	<!-- <div style="background : url(static/beijing.JPG);background-size: 100% 100%;width: 100%;height: 100%;"> -->
		<el-form :model="dataForm" label-position="left" label-width="0px" class="demo-ruleForm login-container">
			<h3 class="title">登陆界面</h3>
			<el-form-item prop="account">
				<el-input type="text" v-model="dataForm.userName" auto-complete="off" placeholder="请输入账号"></el-input>
			</el-form-item>
			<el-form-item prop="checkPass">
				<el-input type="password" v-model="dataForm.password" auto-complete="off" placeholder="请输入密码"></el-input>
			</el-form-item>
			<el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
			<el-form-item style="width:100%;">
				<el-button type="primary" class="loginBtn" @click="dataFormSubmit()">登录
				</el-button>
			</el-form-item>
		</el-form>
		<!-- </div> -->
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
				},
				checked: true
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
	.login-container {
		-webkit-border-radius: 5px;
		border-radius: 5px;
		-moz-border-radius: 5px;
		background-clip: padding-box;
		margin: 180px auto;
		width: 350px;
		padding: 35px 35px 15px 35px;
		border: 1px solid #eaeaea;
		background: #2d3a4b;
		color: #fff;
	}

	.title {
		margin: 0px auto 40px auto;
		text-align: center;
	}

	.remember {
		margin: 0px 0px 35px 0px;
	}

	.loginBtn {
		width: 100%;
		font-size: 20px;
		letter-spacing: 10px;
	}

	.el-col {}
</style>
