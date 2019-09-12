<!--
放射源信息弹窗
-->
<template>
	<div class="fs-window fs-windows">
		<!--输入框-->
		<el-tabs type="border-card">
			<el-tab-pane label="单位基本信息">
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
							<input type="text" class="myinput" :disabled="disabledFlag" v-model="dw.periodValidity">
						</div>
					</div>
					<div class="block">
					</div>
				</div>

			</el-tab-pane>
			<el-tab-pane label="放射源台账信息">
				<div class="fs_block">
					<template>
						<div class="el-table">
							<el-table :data="fsytz" style="width: 100%">
								<el-table-column fixed type="index" label="序号" width="150">
								</el-table-column>
								<el-table-column prop="releaseDate" label="出厂日期" width="150">
								</el-table-column>
								<el-table-column prop="releaseActivity" label="出厂活度" width="120">
								</el-table-column>
								<el-table-column prop="label" label="标号" width="120">
								</el-table-column>
								<el-table-column prop="encoding" label="编码" width="120">
								</el-table-column>
								<el-table-column prop="category" label="射线装置台账类别" width="300">
								</el-table-column>
								<el-table-column prop="purpose" label="射线装置台账用途" width="120">
								</el-table-column>
								<el-table-column prop="sourceTo" label="射线装置台账来源/去向" width="150">
								</el-table-column>
								<el-table-column prop="auditor" label="射线装置台账审核人" width="120">
								</el-table-column>
								<el-table-column prop="auditDate" label="射线装置台账审核时间" width="120">
								</el-table-column>
								<el-table-column prop="unitName" label="单位名称" width="120">
								</el-table-column>
								<el-table-column prop="workplaceName" label="工作场所" width="300">
								</el-table-column>
								<el-table-column prop="fsLicenseNo" label="证书编号" width="120">
								</el-table-column>
							</el-table>
						</div>
					</template>
				</div>
			</el-tab-pane>
			<el-tab-pane label="射线装置基本信息">
				<div class="fs_block">
					<template v-for="(item,index) in sxzz[page1]">
						<div class="block" v-if="datasModel[index]" :key="index">
							<div class="name">
								<span>{{datasModel[index]}}</span>
							</div>
							<div class="value">
								<input type="text" class="myinput" disabled="true" v-model="sxzz[page1][index]">
							</div>
						</div>
					</template>
					<div class="block">
					</div>
					<el-pagination background layout="prev, pager, next" :page-size='1' @current-change="pageChange1" :total="sxzz.length">
					</el-pagination>
				</div>
			</el-tab-pane>
			<el-tab-pane label="非密封台账信息">
				<div class="fs_block">
					<template v-for="(item,index) in fmftz[page2]">
						<div class="block" v-if="datasModel[index]" :key="index">
							<div class="name">
								<span>{{datasModel[index]}}</span>
							</div>
							<div class="value">
								<input type="text" class="myinput" disabled="true" v-model="fmftz[page2][index]">
							</div>
						</div>
					</template>
					<el-pagination background layout="prev, pager, next" :page-size='1' @current-change="pageChange2" :total="fmftz.length">
					</el-pagination>
				</div>
			</el-tab-pane>
			<el-tab-pane label="射线装置台账信息">
				<div class="fs_block">
					<template v-for="(item,index) in sxzztz[page3]">
						<div class="block" v-if="datasModel[index]" :key="index">
							<div class="name">
								<span>{{datasModel[index]}}</span>
							</div>
							<div class="value">
								<input type="text" class="myinput" disabled="true" v-model="sxzztz[page3][index]">
							</div>
						</div>
					</template>
					<el-pagination background layout="prev, pager, next" :page-size='1' @current-change="pageChange3" :total="sxzztz.length">
					</el-pagination>
				</div>
			</el-tab-pane>
			<el-tab-pane label="放射源基本信息">
				<div class="fs_block">
					<template v-for="(item,index) in fsy[page4]">
						<div class="block" v-if="datasModel[index]" :key="index">
							<div class="name">
								<span>{{datasModel[index]}}</span>
							</div>
							<div class="value">
								<input type="text" class="myinput" disabled="true" v-model="fsy[page4][index]">
							</div>
						</div>
					</template>
					<el-pagination background layout="prev, pager, next" :page-size='1' @current-change="pageChange4" :total="fsy.length">
					</el-pagination>
				</div>
			</el-tab-pane>
			<el-tab-pane label="放射源基本信息">
				<div class="fs_block">
					<template v-for="(item,index) in fmf[page5]">
						<div class="block" v-if="datasModel[index]" :key="index">
							<div class="name">
								<span>{{datasModel[index]}}</span>
							</div>
							<div class="value">
								<input type="text" class="myinput" disabled="true" v-model="fmf[page5][index]">
							</div>
						</div>
					</template>
					<el-pagination background layout="prev, pager, next" :page-size='1' @current-change="pageChange5" :total="fmf.length">
					</el-pagination>
				</div>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
	// 引入子组件
	export default {
		name: 'app',
		data() {
			return {
				Interface: [],
				pkid: Date.parse(new Date()),
				page: 0,
				page1: 0,
				page2: 0,
				page3: 0,
				page4: 0,
				page5: 0,
				operateNum: 999, //操作类型 0查看详情 1修改
				disabledFlag: false,
				dw: {},
				fsytz: [], //放射源台账
				sxzz: [], //放射源台账
				fmftz: [], //非密封台账
				sxzztz: [], //射线装置台账
				fsy: [], //放射源
				fmf: [], //非密封
				datasModel: {
					activitiesType: "非密封活动种类：",
					activity: "活度：",
					administrativeDivision: "行政区划：",
					annualMaximum: "年最大用量：",
					auditDate: "射线装置台账审核时间：",
					auditor: "射线装置台账审核人：",
					category: "射线装置台账类别：",
					certificateNumber: "证件号码：",
					certificateType: "证件类型：",
					certifyingAuthority: "发证机关：",
					deviceCategory: "射线装置类别：",
					deviceName: "射线装置名称：",
					deviceNumber: "射线装置数量：",
					encoding: "编码：",
					equivalentMaximumOperand: "日等效最大操作量：",
					fmfnuclideName: "非密封核素名称：",
					fmfremark: "非密封备注：",
					fmftzauditDate: "非密封台账审核日期：",
					fmftzauditor: "非密封台账审核人：",
					fmftzpurpose: "非密封台账用途：",
					fmftzremark: "非密封台账备注：",
					fmftzsourceTo: "非密封台账来源/去向：",
					frequency: "频次：",
					fsLicenseNo: "证书编号：",
					fsyactivitiesType: "活动种类：",
					fsycategory: "放射源类别：",
					fsylatitude: "放射源纬度：",
					fsylongitude: "放射源经度：",
					fsynuclideName: "放射源核素名称：",
					fsyremarks: "放射源备注：",
					fsysealDegree: "密封程度：",
					fsytzauditDate: "审核日期：",
					fsytzauditor: "审核人：",
					fsytzcategory: "放射源台账类别：",
					fsytzpurpose: "放射源用途：",
					fsytzremark: "备注：",
					fsytzsourceTo: "来源/去向：",
					industryCategory: "行业类别：",
					label: "标号：",
					latitude: "纬度：",
					legalPerPhone: "法人联系电话：",
					legalPerson: "法定代表人：",
					licenceConditions: "许可证条件：",
					longitude: "经度：",
					matterType: "非密封类型：",
					name: "行政区划名称：",
					natureUnit: "单位性质：",
					openingDate: "发证日期：",
					periodValidity: "有效期至：",
					purpose: "射线装置台账用途：",
					radiatiotType: "辐射源类型：",
					releaseActivity: "出厂活度：",
					releaseDate: "出厂日期：",
					remarks: "备注：",
					responsible: "工作场所负责人：",
					sealDegree: "密封程度：",
					serialNumber: "序号：",
					sourceTo: "射线装置台账来源/去向：",
					specificationsModels: "规格型号：",
					sxzzactivitiesType: "射线装置活动种类：",
					sxzzlatitude: "射线装置纬度：",
					sxzzlongitude: "射线装置经度：",
					sxzzremarks: "射线装置备注：",
					totalActivity: "总活度：",
					totalApprovedActivity: "批准的总活度：",
					totalNumber: "总枚数：",
					typeApproval: "审批类型：",
					typeRange: "种类和范围：",
					tyshxydm: "统一社会信用代码：",
					unitAddress: "单位地址：",
					unitName: "单位名称：",
					workplaceName: "工作场所名：",
					workplaceSite: "工作场所地址："
				}
			};
		},
		mounted() {
			this.getDetailData();
			// this.lastInterface();
			//时间插件
			let _this = this;
			setTimeout(function() {
				layui.use("laydate", function() {
					var laydate = layui.laydate;
					//执行一个laydate实例
					laydate.render({
						elem: "#surface1", //指定元素
						type: "datetime",
						done: function(value) {
							_this.productTime = value;
						}
					});
				});
			}, 0);
		},
		methods: {
			// fixedHeight() {
			//                 // 适应 内容高度
			//                 let fs_window = document.querySelector('.fs-window');
			//                 let myIframe = window.parent.document;
			//                 if (fs_window.offsetHeight <= 458) {
			//                     window.frameElement.style.height = fs_window.offsetHeight + 'px';
			//                     myIframe.querySelector('.layui-layer-iframe').style.height = fs_window.offsetHeight + 42 + 'px';
			//                     myIframe.querySelector('.layui-layer-iframe').style.top = '50%';
			//                     myIframe.querySelector('.layui-layer-iframe').style.marginTop = -((fs_window.offsetHeight + 42) / 2) +
			//                         'px';
			//                 }
			//             },
			pageChange(val) {
				return (this.page = val - 1);
			},
			pageChange1(val) {
				return (this.page1 = val - 1);
			},
			pageChange2(val) {
				return (this.page2 = val - 1);
			},
			pageChange3(val) {
				return (this.page3 = val - 1);
			},
			pageChange4(val) {
				return (this.page4 = val - 1);
			},
			pageChange5(val) {
				return (this.page5 = val - 1);
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
								_this.fsytz = datas.fsytz;
								_this.sxzz = datas.sxzz;
								_this.fmftz = datas.fmftz;
								_this.sxzztz = datas.sxzztz;
								_this.fsy = datas.fsy;
								_this.fmf = datas.fmf;
								_this.dw = datas.dw[0];
							}
						});
				}
			}
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
	}
</style>
