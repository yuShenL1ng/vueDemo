<template>
	<div>
		<el-container style="height: 100%; border: 1px solid #eee">
			<el-aside width="200px" style="background-color: rgb(238, 241, 246)">
				<el-menu :default-openeds="['1', '3']">
					<el-submenu index="1">
						<template slot="title"><i class="el-icon-message"></i>导航一</template>
						<el-menu-item-group>
							<template slot="title">分组一</template>
							<el-menu-item index="1-1">
								<el-link type="primary" href="../#/demoIndex/heTongList">合同管理</el-link>
							</el-menu-item>
							<el-menu-item index="1-2">
								<el-link type="primary" href="../#/demoIndex/xiaoShou">销售管理</el-link>
							</el-menu-item>
						</el-menu-item-group>
						<el-menu-item-group title="分组2">
							<el-menu-item index="1-3">
								<el-link type="primary" href="../#/demoIndex/websocketDemo">聊天室</el-link>
								</el-menu-item>
						</el-menu-item-group>
						<el-submenu index="1-4">
							<template slot="title">选项4</template>
							<el-menu-item index="1-4-1">选项4-1</el-menu-item>
						</el-submenu>
					</el-submenu>
					<el-submenu index="2">
						<template slot="title"><i class="el-icon-menu"></i>导航二</template>
						<el-menu-item-group>
							<template slot="title">分组一</template>
							<el-menu-item index="2-1">选项1</el-menu-item>
							<el-menu-item index="2-2">选项2</el-menu-item>
						</el-menu-item-group>
						<el-menu-item-group title="分组2">
							<el-menu-item index="2-3">选项3</el-menu-item>
						</el-menu-item-group>
						<el-submenu index="2-4">
							<template slot="title">选项4</template>
							<el-menu-item index="2-4-1">选项4-1</el-menu-item>
						</el-submenu>
					</el-submenu>
					<el-submenu index="3">
						<template slot="title"><i class="el-icon-setting"></i>导航三</template>
						<el-menu-item-group>
							<template slot="title">分组一</template>
							<el-menu-item index="3-1">选项1</el-menu-item>
							<el-menu-item index="3-2">选项2</el-menu-item>
						</el-menu-item-group>
						<el-menu-item-group title="分组2">
							<el-menu-item index="3-3">选项3</el-menu-item>
						</el-menu-item-group>
						<el-submenu index="3-4">
							<template slot="title">选项4</template>
							<el-menu-item index="3-4-1">选项4-1</el-menu-item>
						</el-submenu>
					</el-submenu>
				</el-menu>
			</el-aside>

			<el-container>
				<el-header style="text-align: right; font-size: 12px">
					<el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" @select="handleSelect"
					 background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
						<el-menu-item index="1">处理中心</el-menu-item>
						<el-submenu index="2">
							<template slot="title">我的工作台</template>
							<el-menu-item index="2-1">选项1</el-menu-item>
							<el-menu-item index="2-2">选项2</el-menu-item>
							<el-menu-item index="2-3">选项3</el-menu-item>
							<el-submenu index="2-4">
								<template slot="title">选项4</template>
								<el-menu-item index="2-4-1">选项1</el-menu-item>
								<el-menu-item index="2-4-2">选项2</el-menu-item>
								<el-menu-item index="2-4-3">选项3</el-menu-item>
							</el-submenu>
						</el-submenu>
						<el-menu-item index="3" disabled>消息中心</el-menu-item>
						<el-menu-item index="4"><a href="../">返回首页</a></el-menu-item>
					</el-menu>
				</el-header>
				<!-- <el-tree :data="data" show-checkbox node-key="id" :default-expanded-keys="[2, 3]" :default-checked-keys="[5]"
				 :props="defaultProps">
				</el-tree> -->
				<router-view></router-view>
			</el-container>
		</el-container>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				activeIndex2: '1'
				/* 	data: [{
						id: 1,
						label: '一级 1',
						children: [{
							id: 4,
							label: '二级 1-1',
							children: [{
								id: 9,
								label: '三级 1-1-1'
							}, {
								id: 10,
								label: '三级 1-1-2'
							}]
						}]
					}, {
						id: 2,
						label: '一级 2',
						children: [{
							id: 5,
							label: '二级 2-1'
						}, {
							id: 6,
							label: '二级 2-2'
						}]
					}, {
						id: 3,
						label: '一级 3',
						children: [{
							id: 7,
							label: '二级 3-1'
						}, {
							id: 8,
							label: '二级 3-2'
						}]
					}],
					defaultProps: {
						children: 'children',
						label: 'label'
					} */
			};
		},
		methods: {
			handleSelect(key, keyPath) {
				console.log(key, keyPath);
			}
		}
	}
</script>

<style>
	.el-header {
		color: #333;
		line-height: 60px;
	}

	.el-aside {
		color: #333;
	}
</style>
