<template>
	<div>
		<el-button type="primary">
			<router-link to="/">首页</router-link>
		</el-button>
		<el-button type="success">
			<router-link to="/userInfo">登陆</router-link>
		</el-button>
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
	.el-row {
		margin-bottom: 20px;

		&:last-child {
			margin-bottom: 0;
		}
	}

	.el-col {
		border-radius: 4px;
	}

	.bg-purple-dark {
		background: #99a9bf;
	}

	.grid-content {
		border-radius: 4px;
		min-height: 36px;
	}
</style>
