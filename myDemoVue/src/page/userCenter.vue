<template>
	<div>
		<p>这是个人中心</p>
		<router-link to="/userCenter/userInfo">用户信息</router-link>
		<router-link to="/userCenter/text">练习</router-link>
		<router-link to="/">返回首页</router-link>
		<router-view></router-view>
	</div>
</template>

<script>
	export default {
		data() {
			return {

			};
		}
	}
</script>

<style>
</style>
