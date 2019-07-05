<template>
	<el-col :span="12">
		<div>
			<el-button type="primary">
				<router-link to="/">首页</router-link>
			</el-button>
			<el-button type="success">
				<router-link to="/userInfo">登陆</router-link>
			</el-button>
			<router-view></router-view>
		</div>
	</el-col>
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
	.el-col {
		border-radius: 4px;
	}

</style>
