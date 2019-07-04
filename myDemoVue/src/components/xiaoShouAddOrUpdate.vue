<template>
	<el-dialog :title="!xiaoshouFrom.id ? '新增' : '修改'" :visible.sync="visible">
		<el-form :model="xiaoshouFrom">
			<el-form-item label="订单名称" :label-width="formLabelWidth">
				<el-input v-model="xiaoshouFrom.name" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="订单状态" :label-width="formLabelWidth">
				<el-select v-model="xiaoshouFrom.region" filterable placeholder="请选择订单状态" value-key="id">
					<el-option v-for="item in xiaoshouFrom.options" :key="item.id" :label="item.label" :value="item"></el-option>
				</el-select>
			</el-form-item>
		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button @click="visible = false">取 消</el-button>
			<el-button type="primary" @click="add()">提 交</el-button>
		</div>
	</el-dialog>
</template>
<script>
	export default {
		data() {
			return {
				xiaoshouFrom: {
					name: '',
					options:  [{
							id: 0,
							label: '待分配'
						},
						{
							id: 1,
							label: '执行中'
						},
						{
							id: 2,
							label: '已完成'
						},
						{
							id: 3,
							label: '停用'
						},
						{
							id: 4,
							label: '已变更'
						}
					],
					id: 0
				},
				formLabelWidth: '120px',
				visible: false
			};
		},
		methods: {
			init(row) {
				this.visible = true
				if (row) {
					this.xiaoshouFrom.id = row.id;
					this.xiaoshouFrom.name = row.dName;
					this.form.region.id = row.dType
				}else{
					this.xiaoshouFrom.id = 0
				}
			},
			add() {
				this.$http({
					url: this.$http.adornUrl(`/SalesorderDemo/${!this.xiaoshouFrom.id ? 'add.action' : 'update.action'}`),
					method: 'post',
					data: this.$http.adornData({
						'id': this.xiaoshouFrom.id || undefined,
						'dName': this.xiaoshouFrom.name,
						'dType': this.xiaoshouFrom.region.id,
					})
				}).then(({
					data
				}) => {
					if (data > 0) {
						this.visible = false;
						this.$notify({
							title: '成功',
							message: '合同信息修改成功',
							type: 'success'
						});
						this.$emit('refreshDataList')
					} else {
						alert('操作失败')
					}
				})
			}
		},
	}
</script>

<style>

</style>
