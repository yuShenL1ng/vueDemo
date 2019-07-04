<template>
	<el-main>
		<el-button @click="dialogFormVisible = true">新增合同</el-button>
		<el-button @click="getContractInfoDemoList()">查询合同</el-button>
		<el-table :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)" highlight-current-row>
			<el-table-column type="index" width="50">
			</el-table-column>
			<el-table-column label="操作" width="150">
				<template slot-scope="scope">
					<el-button type="primary" icon="el-icon-edit" circle @click="handleEdit(scope.$index, scope.row)"></el-button>
					<el-button type="danger" icon="el-icon-delete" circle @click="handleDelete(scope.$index, scope.row)"></el-button>
				</template>
			</el-table-column>
			<el-table-column label="合同名称" width="180">
				<template slot-scope="scope">
					<span style="margin-left: 10px">{{ scope.row.hName }}</span>
				</template>
			</el-table-column>
			<el-table-column label="合同状态" width="180">
				<template slot-scope="scope">
					<span style="margin-left: 10px">{{ scope.row.hType }}</span>
				</template>
			</el-table-column>
			<el-table-column label="创建时间" width="180">
				<template slot-scope="scope">
					<span style="margin-left: 10px">{{ scope.row.hDate }}</span>
				</template>
			</el-table-column>
		</el-table>

		<div class="block" style="margin-top:15px;">
			<el-pagination align='center' @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
			 :page-sizes="[5,10,20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="tableData.length">
			</el-pagination>
		</div>

		<el-dialog title="新增合同" :visible.sync="dialogFormVisible">
			<el-form :model="form">
				<el-form-item label="合同名称" :label-width="formLabelWidth">
					<el-input v-model="form.name" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="合同状态" :label-width="formLabelWidth">
					<el-select v-model="form.region" filterable placeholder="请选择合同状态" value-key="id">
						<el-option v-for="item in form.options" :key="item.id" :label="item.label" :value="item"></el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="add()">提 交</el-button>
			</div>
		</el-dialog>


		<el-dialog title="修改合同" :visible.sync="dialogFormUpdate">
			<el-form :model="form">
				<el-form-item label="合同名称" :label-width="formLabelWidth">
					<el-input v-model="form.name" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="合同状态" :label-width="formLabelWidth">
					<el-select v-model="form.region" filterable placeholder="请选择合同状态" value-key="id">
						<el-option v-for="item in form.options" :key="item.id" :label="item.label" :value="item"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label-width="formLabelWidth" v-for="(domain, index) in form.domains" :label="'域名' + index" :key="domain.key"
				 :prop="'domains.' + index + '.value'" :rules="{
					required: true, message: '域名不能为空', trigger: 'blur'
				}">
					<el-input v-model="domain.value"></el-input>
					<el-button @click.prevent="removeDomain(domain)">删除</el-button>
				</el-form-item>
				<el-button @click="addDomain">新增域名</el-button>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormUpdate = false">取 消</el-button>
				<el-button type="primary" @click="update()">修 改</el-button>
			</div>
		</el-dialog>
	</el-main>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					name: '',
					options: [{
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
					domains: [{
						value: ''
					}],
					email: ''
				},
				tableData: [],
				id: -1,
				currentPage: 1, // 当前页码
				pageSize: 5, // 每页的数据条数
				dialogFormVisible: false,
				dialogFormUpdate: false,
				formLabelWidth: '120px'
			};
		},
		mounted() {
			this.getContractInfoDemoList()
		},
		methods: {
			add() {
				this.form.name = ''
				this.$http({
					url: this.$http.adornUrl('ContractInfoDemo/add.action'),
					method: 'post',
					data: this.$http.adornData({
						'hName': this.form.name,
						'hType': this.form.region.id
					})
				}).then(({
					data
				}) => {
					if (data != 0) {
						this.dialogFormVisible = false;
						this.$notify({
							title: '成功',
							message: '合同信息添加成功',
							type: 'success'
						});
						this.getContractInfoDemoList();
					} else {
						alert('操作失败')
					}
				})
			},
			handleSizeChange(val) {
				this.currentPage = 1;
				this.pageSize = val;
			},
			handleCurrentChange(val) {
				this.currentPage = val;
			},
			handleEdit(index, row) {
				this.dialogFormUpdate = true;
				this.form.name = row.hName
				this.form.region = this.form.options[row.hType]
				this.id = row.id
			},
			update() {
				this.$http({
					url: this.$http.adornUrl('ContractInfoDemo/update.action'),
					method: 'post',
					data: this.$http.adornData({
						'hName': this.form.name,
						'hType': this.form.region.id,
						'id': this.id
					})
				}).then(({
					data
				}) => {
					if (data > 0) {
						this.dialogFormUpdate = false;
						this.$notify({
							title: '成功',
							message: '合同信息修改成功',
							type: 'success'
						});
						this.id = -1
						this.getContractInfoDemoList();
					} else {
						alert('操作失败')
					}
				})
			},
			handleDelete(index, row) {
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$http({
						url: this.$http.adornUrl('ContractInfoDemo/delete.action'),
						method: 'post',
						data: this.$http.adornData({
							'id': row.id
						})
					}).then(({
						data
					}) => {
						if (data > 0) {
							this.$notify({
								title: '成功',
								message: '合同信息删除成功',
								type: 'success'
							});
							this.getContractInfoDemoList();
						} else {
							alert('操作失败')
						}
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});

			},
			getContractInfoDemoList() {
				this.$http({
					url: this.$http.adornUrl('ContractInfoDemo/getContractInfoDemoList.action'),
					method: 'post',
					data: this.$http.adornData({})
				}).then(({
					data
				}) => {
					if (data != '') {
						this.tableData = data
					}
				})
			},
			removeDomain(item) {
				var index = this.form.domains.indexOf(item)
				if (index !== -1) {
					this.form.domains.splice(index, 1)
				}
			},
			addDomain() {
				this.form.domains.push({
					value: '',
					key: Date.now()
				});
			}
		},
	}
</script>

<style>

</style>
