<!--
放射源信息弹窗
-->
<template>
	<div class="fs-window fs-windows">
	    <el-main v-loading="fullscreenLoading" element-loading-background="rgba(255, 255, 255, 0.5)" element-loading-text="数据正在加载中">
			<!--输入框-->
			<el-tabs type="border-card"  v-model="activeName" @tab-click='getindex'>
				<el-tab-pane name="first" label="单位基本信息">
					<div class="fs_block">
						<div class="block">
							<div class="name">
								<span>单位名称：</span>
							</div>
							<div class="value">
								<input type="text" class="myinput" :disabled="disabledFlag" v-model="dw.unitName">
							</div>
						</div>
						<div class="block">
							<div class="name">
								<span>单位地址：</span>
							</div>
							<div class="value">
								<input type="text" class="myinput" :disabled="disabledFlag" v-model="dw.unitAddress">
							</div>
						</div>
						<div class="block">
							<div class="name">
								<span>证书编号：</span>
							</div>
							<div class="value">
								<input type="text" class="myinput" :disabled="disabledFlag" v-model="dw.fsLicenseNo">
							</div>
						</div>
						<div class="block">
							<div class="name">
								<span>法人：</span>
							</div>
							<div class="value">
								<input type="text" class="myinput" :disabled="disabledFlag" v-model="dw.legalPerson">
							</div>
						</div>
						<div class="block">
							<div class="name">
								<span>有效期至：</span>
							</div>
							<div class="value">
								<input type="text" class="myinput" :disabled="disabledFlag"  :value="!dw.periodValidity?'':dw.periodValidity.slice(0,10)">
							</div>
						</div>
						<div class="block">
						</div>
					</div>
				</el-tab-pane>
				<el-tab-pane  name="second" label="放射源基本信息" >
						<div class="el-tab">
							<el-table :data="fsy" style="width: 100%;" border height="100%">
								<el-table-column fixed type="index" :index="indexMethod" label="序号" width="50"></el-table-column>
								<el-table-column prop="unitName" label="单位名称" width="250"></el-table-column>
								<el-table-column prop="unitAddress" label="单位地址" width="250"></el-table-column>
								<el-table-column prop="legalPerson" label="法定代表人" width="100"></el-table-column>
								<el-table-column prop="legalPerPhone" label="法人联系电话" width="150"></el-table-column>
								<el-table-column prop="fsLicenseNo" label="证书编号" width="150"></el-table-column>
								<el-table-column prop="longitude" label="经度" width="100"></el-table-column>
								<el-table-column prop="latitude" label="纬度" width="100"></el-table-column>
								<el-table-column prop="radiatiotType" label="辐射源类型" width="100"></el-table-column>
								<el-table-column prop="totalApprovedActivity" label="批准的总活度" width="150"></el-table-column>
								<el-table-column prop="activitiesType" label="非密封活动种类" width="150"></el-table-column>
								<el-table-column prop="fsysealDegree" label="密封程度" width="170"></el-table-column>
								<el-table-column prop="activity" label="活度" width="150"></el-table-column>
								<el-table-column prop="totalNumber" label="总枚数" width="100"></el-table-column>
								<el-table-column prop="typeRange" label="种类和范围" width="150"></el-table-column>
								<el-table-column prop="administrativeDivision" label="行政区划" width="150"></el-table-column>
								<el-table-column prop="certificateType" label="证件类型" width="100"></el-table-column>
								<el-table-column prop="certificateNumber" label="证件号码" width="170"></el-table-column>
								<el-table-column prop="certifyingAuthority" label="发证机关" width="250"></el-table-column>
								<el-table-column prop="openingDate" :formatter="BasicRadioactiveSources" label="发证日期" width="150"></el-table-column>
								<el-table-column prop="periodValidity" :formatter="BasicRadioactiveSources" label="有效期至" width="150"></el-table-column>
								<el-table-column prop="licenceConditions" label="许可证条件" width="170"></el-table-column>
								<el-table-column prop="tyshxydm" label="统一社会信用代码" width="300"></el-table-column>
								<el-table-column prop="releaseDate" :formatter="BasicRadioactiveSources" label="出厂日期" width="150"></el-table-column>
								<el-table-column prop="releaseActivity" label="出厂活度" width="150"></el-table-column>
								<el-table-column prop="label" label="标号" width="100"></el-table-column>
								<el-table-column prop="encoding" label="编码" width="200"></el-table-column>
								<el-table-column prop="fsycategory" label="放射源类别" width="200"></el-table-column>
								<el-table-column prop="category" label="射线装置台账类别" width="150"></el-table-column>
								<el-table-column prop="purpose" label="射线装置台账用途" width="250"></el-table-column>
								<el-table-column prop="sourceTo" label="射线装置台账来源/去向" width="250"></el-table-column>
								<el-table-column prop="auditor" label="射线装置台账审核人" width="150"></el-table-column>
								<el-table-column prop="auditDate" :formatter="BasicRadioactiveSources" label="射线装置台账审核时间" width="170"></el-table-column>
								<el-table-column prop="fsytzremark" label="备注" width="100"></el-table-column>
							</el-table>
						</div>
				</el-tab-pane>
				<el-tab-pane name="third" label="非密封基本信息">
						<div class="el-tab">
							<el-table :data="fsy" style="width: 100%;" border height="100%">
								<el-table-column fixed type="index" :index="indexMethod" label="序号" width="50"></el-table-column>
								<el-table-column prop="unitName" label="单位名称" width="250"></el-table-column>
								<el-table-column prop="workplaceName" label="工作场所" width="250"></el-table-column>
								<el-table-column prop="unitAddress" label="单位地址" width="250"></el-table-column>
								<el-table-column prop="legalPerson" label="法定代表人" width="100"></el-table-column>
								<el-table-column prop="legalPerPhone" label="法人联系电话" width="150"></el-table-column>
								<el-table-column prop="fsLicenseNo" label="证书编号" width="150"></el-table-column>
								<el-table-column prop="equivalentMaximumOperand" label="日等效最大操作量" width="150"></el-table-column>
								<el-table-column prop="annualMaximum" label="年最大用量" width="100"></el-table-column>
								<el-table-column prop="activitiesType" label="非密封活动种类" width="150"></el-table-column>
								<el-table-column prop="matterType" label="非密封类型" width="100"></el-table-column>
								<el-table-column prop="fsysealDegree" label="密封程度" width="150"></el-table-column>
								<el-table-column prop="longitude" label="经度" width="100"></el-table-column>
								<el-table-column prop="latitude" label="纬度" width="100"></el-table-column>
								<el-table-column prop="typeRange" label="种类和范围" width="150"></el-table-column>
								<el-table-column prop="administrativeDivision" label="行政区划" width="250"></el-table-column>
								<el-table-column prop="certificateType" label="证件类型" width="100"></el-table-column>
								<el-table-column prop="certificateNumber" label="证件号码" width="200"></el-table-column>
								<el-table-column prop="certifyingAuthority" label="发证机关" width="250"></el-table-column>
								<el-table-column prop="openingDate" :formatter="NonSealedBasic" label="发证日期" width="150"></el-table-column>
								<el-table-column prop="periodValidity" :formatter="NonSealedBasic" label="有效期至" width="150"></el-table-column>
								<el-table-column prop="licenceConditions" label="许可证条件" width="150"></el-table-column>
								<el-table-column prop="tyshxydm" label="统一社会信用代码" width="250"></el-table-column>
								<el-table-column prop="industryCategory" label="行业类别" width="150"></el-table-column>
								<el-table-column prop="natureUnit" label="单位性质" width="150"></el-table-column>
								<el-table-column prop="typeApproval" label="审批类型" width="170"></el-table-column>
								<el-table-column prop="totalActivity" label="总活度" width="150"></el-table-column>
								<el-table-column prop="frequency" label="频次" width="150"></el-table-column>
								<el-table-column prop="purpose" label="射线装置台账用途" width="300"></el-table-column>
								<el-table-column prop="sourceTo" label="射线装置台账来源/去向" width="300"></el-table-column>
								<el-table-column prop="auditor" label="射线装置台账审核人" width="150"></el-table-column>
								<el-table-column prop="auditDate" :formatter="NonSealedBasic" label="射线装置台账审核时间" width="170"></el-table-column>
								<el-table-column prop="fmfremark" label="非密封备注" width="150"></el-table-column>
							</el-table>
						</div>
				</el-tab-pane>
				<el-tab-pane name="fourth" label="射线装置基本信息">
						<div class="el-tab">
							<el-table :data="fsy" style="width: 100%;" border height="100%">
								<el-table-column fixed type="index" :index="indexMethod" label="序号" width="50"></el-table-column>
								<el-table-column prop="unitName" label="单位名称" width="250"></el-table-column>
								<el-table-column prop="unitAddress" label="单位地址" width="250"></el-table-column>
								<el-table-column prop="legalPerson" label="法定代表人" width="100"></el-table-column>
								<el-table-column prop="legalPerPhone" label="法人联系电话" width="150"></el-table-column>
								<el-table-column prop="fsLicenseNo" label="证书编号" width="150"></el-table-column>
								<el-table-column prop="deviceName" label="射线装置名称" width="300"></el-table-column>
								<el-table-column prop="deviceCategory" label="射线装置类别" width="140"></el-table-column>
								<el-table-column prop="deviceNumber" label="射线装置数量" width="130"></el-table-column>
								<el-table-column prop="activitiesType" label="非密封活动种类" width="150"></el-table-column>
								<el-table-column prop="sxzzlongitude" label="经度" width="100"></el-table-column>
								<el-table-column prop="sxzzlatitude" label="纬度" width="100"></el-table-column>
								<el-table-column prop="typeRange" label="种类和范围" width="170"></el-table-column>
								<el-table-column prop="administrativeDivision" label="行政区划" width="250"></el-table-column>
								<el-table-column prop="certificateType" label="证件类型" width="150"></el-table-column>
								<el-table-column prop="certificateNumber" label="证件号码" width="250"></el-table-column>
								<el-table-column prop="certifyingAuthority" label="发证机关" width="250"></el-table-column>
								<el-table-column prop="openingDate" :formatter="rayDeviceBasic" label="发证日期" width="100"></el-table-column>
								<el-table-column prop="periodValidity" :formatter="rayDeviceBasic" label="有效期至" width="100"></el-table-column>
								<el-table-column prop="licenceConditions" label="许可证条件" width="100"></el-table-column>
								<el-table-column prop="tyshxydm" label="统一社会信用代码" width="200"></el-table-column>
								<el-table-column prop="industryCategory" label="行业类别" width="150"></el-table-column>
								<el-table-column prop="natureUnit" label="单位性质" width="150"></el-table-column>
								<el-table-column prop="typeApproval" label="审批类型" width="200"></el-table-column>
								<el-table-column prop="specificationsModels" label="规格型号" width="150"></el-table-column>
								<el-table-column prop="category" label="射线装置台账类别" width="150"></el-table-column>
								<el-table-column prop="purpose" label="射线装置台账用途" width="200"></el-table-column>
								<el-table-column prop="sourceTo" label="射线装置台账来源/去向" width="200"></el-table-column>
								<el-table-column prop="auditor" label="射线装置台账审核人" width="150"></el-table-column>
								<el-table-column prop="auditDate" :formatter="rayDeviceBasic" label="射线装置台账审核时间" width="170"></el-table-column>
								<el-table-column prop="fsytzremark" label="备注" width="130"></el-table-column>
							</el-table>
						</div>
				</el-tab-pane>
				<el-tab-pane  name="fifth " label="放射源台账信息">
						<div class="el-tab">
							<el-table :data="fsy" style="width: 100%;" border height="100%">
								<el-table-column fixed type="index" :index="indexMethod" label="序号" width="50"></el-table-column>
								<el-table-column prop="unitName" label="单位名称" width="250"></el-table-column>
								<el-table-column prop="workplaceName" label="工作场所" width="250"></el-table-column>
								<el-table-column prop="fsLicenseNo" label="证书编号" width="130"></el-table-column>
								<el-table-column prop="releaseDate" :formatter="RadioactiveSourceAccount" label="出厂日期" width="100"></el-table-column>
								<el-table-column prop="releaseActivity" label="出厂活度" width="150"></el-table-column>
								<el-table-column prop="label" label="标号" width="100"></el-table-column>
								<el-table-column prop="encoding" label="编码" width="200"></el-table-column>
								<el-table-column prop="category" label="射线装置台账类别" width="150"></el-table-column>
								<el-table-column prop="purpose" label="射线装置台账用途" width="250"></el-table-column>
								<el-table-column prop="sourceTo" label="射线装置台账来源/去向" width="200"></el-table-column>
								<el-table-column prop="auditor" label="射线装置台账审核人" width="150"></el-table-column>
								<el-table-column prop="auditDate" :formatter="RadioactiveSourceAccount" label="射线装置台账审核时间" width="170"></el-table-column>
							</el-table>
						</div>
				</el-tab-pane>
				<el-tab-pane name="sixth"  label="非密封台账信息">
						<div class="el-tab">
							<el-table :data="fsy" style="width: 100%;" border height="100%">
								<el-table-column fixed type="index" :index="indexMethod" label="序号" width="50"></el-table-column>
								<el-table-column prop="unitName" label="单位名称" width="296"></el-table-column>
								<el-table-column prop="fsLicenseNo" label="证书编号" width="200"></el-table-column>
								<el-table-column prop="totalActivity" label="总活度" width="200"></el-table-column>
								<el-table-column prop="frequency" label="频次" width="200"></el-table-column>
								<el-table-column prop="purpose" label="射线装置台账用途" width="300"></el-table-column>
								<el-table-column prop="sourceTo" label="射线装置台账来源/去向" width="300"></el-table-column>
								<el-table-column prop="auditor" label="射线装置台账审核人" width="150"></el-table-column>
								<el-table-column prop="auditDate" :formatter="NonSealedAccount" label="射线装置台账审核时间" width="170"></el-table-column>
							</el-table>
						</div>
				</el-tab-pane>
				<el-tab-pane  name="seventh" label="射线装置台账信息">
						<div class="el-tab">
							<el-table :data="fsy" style="width: 100%;" border height="100%">
								<el-table-column fixed type="index" :index="indexMethod" label="序号" width="50"></el-table-column>
								<el-table-column prop="unitName" label="单位名称" width="250"></el-table-column>
								<el-table-column prop="workplaceName" label="工作场所" width="250"></el-table-column>
								<el-table-column prop="deviceName" label="射线装置名称" width="250"></el-table-column>
								<el-table-column prop="fsLicenseNo" label="证书编号" width="150"></el-table-column>
								<el-table-column prop="specificationsModels" label="规格型号" width="150"></el-table-column>
								<el-table-column prop="category" label="射线装置台账类别" width="150"></el-table-column>
								<el-table-column prop="purpose" label="射线装置台账用途" width="300"></el-table-column>
								<el-table-column prop="sourceTo" label="射线装置台账来源/去向" width="300"></el-table-column>
								<el-table-column prop="auditor" label="射线装置台账审核人" width="150"></el-table-column>
								<el-table-column prop="auditDate" :formatter="rayDeviceAccount" label="射线装置台账审核时间" width="170"></el-table-column>
							</el-table>
						</div>
				</el-tab-pane>
			</el-tabs>
				<!--分页-->
			<panigation v-if="isShow" :page='page' :rows='rows' :total='total' :options="options" @changePage="toPage" @changeRows='toRows'
				@operatePage='optPage'></panigation>
		</el-main>		
	</div>
</template>
<script>
	// 引入子组件
	import panigation from "./../component/panigation";
	export default {
		name: 'app',
		data() {
			return {
				url:'',
				isShow:false,
				activeName: 'first',
				Interface: [],
				page: 1,
				rows: 10,
				total: 0,
				flag:2,
				options: [{
						text: "10",
						value: "10"
					},
					{
						text: "20",
						value: "20"
					},
					{
						text: "50",
						value: "50"
					},
					{
						text: "100",
						value: "100"
					}
				],
				pkid: Date.parse(new Date()),
				operateNum: 999, //操作类型 0查看详情 1修改
				disabledFlag: false,
				fullscreenLoading:false,
				dw: {},
				fsy: [], //放射源  //非密封 //射线装置台账 //非密封台账 //放射源台账 //放射源台账
			};
		},
		components: {
			panigation
		},
		mounted() {
			this.getDetailData();
		},
		watch: {
			page: function(newval, oldval) {
				this.page == "" ? this.total : this.getpage();
			},
			rows: function(newval, oldval) {
				this.page = 1; //改变行数，重置页数
				console.log(newval)
				this.getpage();
			}
		},
		methods: {
			// 表格序号
			indexMethod(index) {
				return index + 1;
			},
			// 放射源基本
			BasicRadioactiveSources(row, column) {
				return row.releaseDate.slice(0, 10); //出厂日期
				return row.auditDate.slice(0, 10); //审查日期
				return row.openingDate.slice(0, 10); //发证日期
				return row.periodValidity.slice(0, 10); //有效期
			},
			// 非密封基本
			NonSealedBasic(row, column) {
				return row.auditDate.slice(0, 10); //审查日期
				return row.openingDate.slice(0, 10); //发证日期
				return row.periodValidity.slice(0, 10); //有效期
			},
			// 射线基本
			rayDeviceBasic(row, column) {
				return row.auditDate.slice(0, 10); //审查日期
				return row.openingDate.slice(0, 10); //发证日期
				return row.periodValidity.slice(0, 10); //有效期
			},
			// 放射源台账
			RadioactiveSourceAccount(row, column) {
				return row.releaseDate.slice(0, 10);//出厂日期
				return row.auditDate.slice(0, 10); //审查日期
			},
			// 非密封台账
			NonSealedAccount(row, column) {
				return row.auditDate.slice(0, 10);
			},
			// 射线台账
			rayDeviceAccount(row, column) {
				return row.auditDate.slice(0, 10);
			},
			cancle() {
				this.closeIframe();
			},
			closeIframe() {
				this.frameIndex = parent.layer.getFrameIndex(window.name); //得到当前iframe层的索引
				parent.layer.close(this.frameIndex); //再执行关闭
			},
			showToggle: function(item) {
				item.isSubShow = !item.isSubShow;
			},
			// 获取上一个接口数据
			lastInterface() {
				let _this = this;
				_this.$http
					.get(`${_this.baseurl}WorkplaceInfo/listJson`)
					.then(function(res) {
						if (res.status == 200 || res.data.status == 1)
							_this.Interface = res.data.data;
					})
			},
			getDetailData() {
				// this.fixedHeight(); //适应高度
                 
				// 操作 operateNum0详情 1修改
				let id = this.$route.params.id;
				let _this = this;
				_this.fullscreenLoading = true;
				if (id !== 'save') { // 不是新增
					this.operateNum = JSON.parse(sessionStorage.getItem('operateNum')); // 操作类型 0详情 1修改
					id = id + '';
					if (this.operateNum === 0) { //0详情
						this.disabledFlag = true;
					} else { // 修改
						this.disabledFlag = false;
					}
					this.$http({
							method: 'get',
							url: `${this.baseurl}unitInfo/dwxxtj/${id}`
						})
						.then(function(res) {
							if (res.status === 200 && res.data.status === '1') {
								let datas = res.data.data.maplist;
								// _this.fsytz = datas.fsytz;
								// _this.sxzz = datas.sxzz;
								// _this.fmftz = datas.fmftz;
								// _this.sxzztz = datas.sxzztz;
								// _this.fsy = datas.fsy;
								// _this.fmf = datas.fmf;
								_this.dw = datas.dw[0];
							}
							_this.fullscreenLoading = false;
						});
				}
			},


			toRows(rows) {
				// 子组件panigation 触发改变rows
				this.rows = rows;
			},
			toPage(page) {
				// 子组件panigation 触发改变page
				this.page = page;
			},
			optPage(opt) {
				//翻页
				if (opt === 1) {
					// opt = 1 下一页
					this.page < this.total ? this.page++ : (this.page = this.total);
				} else if (opt === 0) {
					// opt = 0 上一页
					this.page > 1 ? this.page-- : (this.page = 1);
				}
			},
            getpage(index){
				 let _this = this;
				if(index == '1'){
                _this.url = 'rediationsource/listPageJson';
				}else if(index == '2'){
				_this.url = 'NontightInfo/listPageJson';
				}else if(index == '3'){
				_this.url = 'radialdevice/listPageJson';
				}else if(index == '4'){
				_this.url = 'RadioactivesourceledgerInfo/listPageJson';
				}else if(index == '5'){
				_this.url = 'NontightbookInfo/listPageJson';
				}else if(index == '6'){
				_this.url = 'RadialdevicebookInfo/listPageJson';
				}											
                let temData = {
							page: _this.page,
							rows: _this.rows,
							flag: _this.flag,
							unitid:_this.$route.params.id,		
						}
						_this.$http({
								method: 'get',
								url: `${_this.baseurl}`+_this.url,
								params: temData
						})
							.then(function(res) {
								if (res.status === 200 && res.data.status === '1') {
									_this.fsy = res.data.data.rows;
									_this.total = res.data.data.total;
							}
							_this.fullscreenLoading = false;
						});
			},
			getindex(tab, event){
				     this.fullscreenLoading = true;
					if(tab.index == '1' || tab.index == '2' ||tab.index == '3' || tab.index == '4'|| tab.index == '5'||tab.index == '6'){
						this.isShow = true;
						this.getpage(tab.index);
					}else{
						this.isShow = false;
						this.getDetailData();
					}
				
			},
		}
	}
</script>
<style scoped>
	.name {
		width: 146px;
	}

	.radio input[type="radio"]:checked+div {
		/*当radiuo被选中时，把input下边的div标签的背景图片替换掉*/
		background: url(../../assets/images/duigou.png) no-repeat;
	}

	.warp-weft {
		line-height: 25px;
	}

	.fs-window .value {
		width: 100px;
	}

	.remark .name {
		width: 100px;
	}

	.value .el-input__inner {
		margin: 0px !important;
		width: calc(100% - 0px) !important;
	}

	.window_title {
		width: 100%;
		font-weight: bold;
		margin: 20px 0 10px;
	}

	.fs_block {
		display: flex;
		flex-wrap: wrap;
		width: 100%;
		max-height: 500px;
		overflow: auto;
		border: 1px solid #eee;
		margin: 10px 0;
	}

	.el-pagination {
		width: 100%;
		margin: 10px;
	}

	.el-tabs--border-card {
		width: 100%;
		height: calc(100% - 50px);
	}
</style>
