<!--
放射源信息
-->
<template>
	<!--右-->
	<div class="fs-right">
		<!--输入框-->
		<div class="input-box">
			<div class="input-group">
				<span class="input-group-addon">有效期开始时间：</span>
				<i class="el-input__icon el-icon-date"></i>
				<input type="text" class="form-control" placeholder="--请选择出厂日期--" v-model='zsgcValue1' id="zsgcValue1">
			</div>
			<div class="input-group">
				<span class="input-group-addon">有效期结束时间：</span>
				<i class="el-input__icon el-icon-date"></i>
				<input type="text" class="form-control" placeholder="--请选择出厂日期--" v-model='zsgcValue2' id="zsgcValue2">
			</div>
			<div class="input-group">
				<span class="input-group-addon">发证开始日期：</span>
				<i class="el-input__icon el-icon-date"></i>
				<input type="text" class="form-control" placeholder="--请选择出厂日期--" v-model='zsgcValue3' id="zsgcValue3">
			</div>
			<div class="input-group">
				<span class="input-group-addon">发证结束日期：</span>
				<i class="el-input__icon el-icon-date"></i>
				<input type="text" class="form-control" placeholder="--请选择出厂日期--" v-model='zsgcValue4' id="zsgcValue4">
			</div>
			<div class="input-group">
			</div>
			<!--按钮-->
			<div class="input-group">
				<span class="btn_content btn_query" @click="getpage()">
					<i class="iconfont icon-chaxun2"></i>
					<span>查询</span>
				</span>
				<span class="btn_content btn_empty" @click='empty()' id="empty">
					<i class="iconfont icon-xunhuan"></i>
					<span>清空</span>
				</span>
			</div>
		</div>
		<!-- echarts -->
		<el-main v-loading="fullscreenLoading" element-loading-background="rgba(255, 255, 255, 0.5)" element-loading-text="数据正在加载中">
			<div id="map">
				<div id="echart1"></div>
				<div id="echart2"></div>
				<div id="echart3"></div>
				<div id="echart4"></div>
			</div>
			<!--表格内容-->
			<table class="table table-bordered">
				<thead>
					<tr>
						<th scope="col">序号</th>
						<th scope="col">单位名称</th>
						<th scope="col">单位地址</th>
						<th scope="col" width='70px'>法人</th>
						<th scope="col" width='150px'>证书编号</th>
						<th scope="col" width='90px'>有效期至</th>
						<th scope="col" width='90px'>发证日期</th>
						<th scope="col" width='70px'>行政区域</th>
						<th scope="col">行业类别</th>
						<th scope="col" width='120px'>单位性质</th>
						<th scope="col" width='70px'>审批类型</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(item,index) of items" :key='index'>
						<td v-if="page == 1 || page == ''">{{index+1}}</td>
						<td v-else-if="rows == 10">{{index+1+(10*(page-1))}}</td>
						<td v-else-if="rows == 20">{{index+1+(20*(page-1))}}</td>
						<td v-else-if="rows == 50">{{index+1+(50*(page-1))}}</td>
						<td v-else-if="rows == 100">{{index+1+(100*(page-1))}}</td>
						<td :title="item.UNIT_NAME">{{item.UNIT_NAME}}</td>
						<td :title="item.UNIT_ADDRESS">{{item.UNIT_ADDRESS}}</td>
						<td :title="item.LEGAL_PERSON" width='70px'>{{item.LEGAL_PERSON}}</td>
						<td :title="item.FS_LICENSE_NO" width='150px'>{{item.FS_LICENSE_NO}}</td>
						<td :title="item.PERIOD_VALIDITY" width='90px'>{{item.PERIOD_VALIDITY | time}}</td>
						<td :title="item.OPENING_DATE" width='90px'>{{item.OPENING_DATE | time}}</td>
						<td :title="item.NAME" width='70px'>{{item.NAME}}</td>
						<td :title="item.INDUSTRY_CATEGORY">{{item.INDUSTRY_CATEGORY}}</td>
						<td :title="item.NATURE_UNIT" width='120px'>{{item.NATURE_UNIT}}</td>
						<td :title="item.TYPE_APPROVAL" width='70px'>{{item.TYPE_APPROVAL}}</td>
					</tr>
				</tbody>
			</table>
		</el-main>
		<!--分页-->
		<!-- <panigation :page='page' :rows='rows' :total='total' :options="options" @changePage="toPage" @changeRows='toRows' @operatePage='optPage'></panigation> -->
	</div>
</template>

<script>
	// 引入子组件
	import panigation from "./../component/panigation";
	export default {
		name: "app",
		data() {
			return {
				items: [],
				fullscreenLoading: false,
				zsgcValue1: "",
				zsgcValue2: "",
				zsgcValue3: "",
				zsgcValue4: "",
				pkid: 0,
				page: 1,
				rows: 10,
				total: 0,
				myoption: {},
				myCharts1: null,
				myCharts2: null,
				myCharts3: null,
				myCharts4: null,
				Charts1: null,
				Charts2: null,
				Charts3: null,
				Charts4: null,
				option: {},
				option1: {},
				option2: {},
				option3: {},
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
				]
			};
		},
		mounted() {
			this.getpage();
			this.tableResize(); // 初始化计算table等高度
			this.resizeCall(); // 监听resize
			this.initecharts1(); // echarts
			this.initecharts2(); // echarts
			this.initecharts3(); // echarts
			this.initecharts4(); // echarts
			var _this = this;
			setTimeout(function() {
				layui.use("laydate", function() {
					var $ = layui.$;
					var laydate = layui.laydate;
					var nowTime = new Date().valueOf();
					var max = null;
					//执行一个laydate实例
					var start = laydate.render({
						elem: "#zsgcValue1",
						type: "date",
						btns: ['confirm'],
						done: function(value, date) {
							// endMax = end.config.max;
							end.config.min = date;
							end.config.min.month = date.month - 1;
							_this.zsgcValue1 = value;
						}
					});
					var end = laydate.render({
						elem: "#zsgcValue2",
						type: "date",
						btns: ['confirm'],
						done: function(value, date) {
							if ($.trim(value) == '') {
								var curDate = new Date();
								date = {
									'date': curDate.getpage(),
									'month': curDate.getMonth() + 1,
									'year': curDate.getFullYear()
								};
							}
							start.config.max = date;
							start.config.max.month = date.month - 1;
							_this.zsgcValue2 = value;
						}
					});
					var startTime = laydate.render({
						elem: "#zsgcValue3",
						type: "date",
						btns: ['confirm'],
						done: function(value, date) {
							// endMax = end.config.max;
							endTime.config.min = date;
							endTime.config.min.month = date.month - 1;
							_this.zsgcValue3 = value;
						}
					});
					var endTime = laydate.render({
						elem: "#zsgcValue4",
						type: "date",
						btns: ['confirm'],
						done: function(value, date) {
							if ($.trim(value) == '') {
								var curDate = new Date();
								date = {
									'date': curDate.getpage(),
									'month': curDate.getMonth() + 1,
									'year': curDate.getFullYear()
								};
							}
							startTime.config.max = date;
							startTime.config.max.month = date.month - 1;
							_this.zsgcValue4 = value;
						}
					});
					var empty = document.getElementById('empty');
					empty.onclick = function() {
						end.config.min = '1900-1-1';
						start.config.max = end.config.max;
						endTime.config.min = '1900-1-1';
						startTime.config.max = endTime.config.max;
					}
				});
			}, 0);
		},
		components: {
			panigation
		},
		watch: {
			page: function(newval, oldval) {
				this.page == "" ? this.total : this.getpage();
			},
			rows: function(newval, oldval) {
				this.page = 1; //改变行数，重置页数
				this.getpage();
			}
		},
		methods: {
			//echarts

			initecharts1() {
				this.myCharts1 = echarts.init(document.getElementById("echart1"));
				this.option = {
					title: {
						text: "行政区域统计图",
						x: "center"
					},
					tooltip: {
						trigger: "item",
						formatter: "{a} <br/>{b} : {c} ({d}%)"
					},
					legend: {
						orient: "vertical",
						left: "left",
						data: []
					},
					series: [{
						name: "访问来源",
						type: "pie",
						radius: "55%",
						center: ["60%", "60%"],
						data: [

						],
						itemStyle: {
							emphasis: {
								shadowBlur: 10,
								shadowOffsetX: 0,
								shadowColor: "rgba(0, 0, 0, 0.5)"
							}
						}
					}]
				};
				this.myCharts1.setOption(this.option);
			},
			initecharts2() {
				this.myCharts2 = echarts.init(document.getElementById("echart2"));
				this.option1 = {
					title: {
						text: "单位性质统计图",
						x: "center"
					},
					tooltip: {
						trigger: "item",
						formatter: "{a} <br/>{b} : {c} ({d}%)"
					},
					legend: {
						orient: "vertical",
						left: "left",
						data: []
					},
					series: [{
						name: "访问来源",
						type: "pie",
						radius: "55%",
						center: ["60%", "60%"],
						data: [

						],
						itemStyle: {
							emphasis: {
								shadowBlur: 10,
								shadowOffsetX: 0,
								shadowColor: "rgba(0, 0, 0, 0.5)"
							}
						}
					}]
				};
				this.myCharts2.setOption(this.option1);
			},
			initecharts3() {
				this.myCharts3 = echarts.init(document.getElementById("echart3"));
				this.option2 = {
					title: {
						text: "审批类型统计图",
						x: "center"
					},
					tooltip: {
						trigger: "item",
						formatter: "{a} <br/>{b} : {c} ({d}%)"
					},
					legend: {
						orient: "vertical",
						left: "left",
						data: []
					},
					series: [{
						name: "访问来源",
						type: "pie",
						radius: "55%",
						center: ["60%", "60%"],
						data: [],
						itemStyle: {
							emphasis: {
								shadowBlur: 10,
								shadowOffsetX: 0,
								shadowColor: "rgba(0, 0, 0, 0.5)"
							}
						}
					}]
				};
				this.myCharts3.setOption(this.option2);
			},
			initecharts4() {
				this.myCharts4 = echarts.init(document.getElementById("echart4"));
				this.option3 = {
					title: {
						text: "行业类别统计图",
						x: "center"
					},
					tooltip: {
						trigger: "item",
						formatter: "{a} <br/>{b} : {c} ({d}%)"
					},
					legend: {
						orient: "vertical",
						left: "left",
						data: [],
					},
					series: [{
						name: "访问来源",
						type: "pie",
						radius: "55%",
						center: ["60%", "60%"],
						data: [],
						itemStyle: {
							emphasis: {
								shadowBlur: 10,
								shadowOffsetX: 0,
								shadowColor: "rgba(0, 0, 0, 0.5)"
							}
						}
					}]
				};
				this.myCharts4.setOption(this.option3);
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
			getpage() {
				// 按页获取数据
				this.fullscreenLoading = true;
				let _this = this;
				let temData = {
					startTime: this.zsgcValue1,
					endTime: this.zsgcValue2,
					fzstartTime: this.zsgcValue3,
					fzendTime: this.zsgcValue4,
					page: this.page,
					rows: this.rows
				};
				setTimeout(() => {
					_this
						.$http({
							method: "get",
							url: `${_this.baseurl}unitInfo/dwtj`,
							params: temData
						})
						.then(function(res) {
							if (res.status == 200)
								_this.option.series[0].data = [];
							_this.items = res.data.data.map.biao;
							//echarts
							_this.Charts1 = res.data.data.map.xzqh;
							_this.Charts1.map(function(item) {
								_this.option.legend.data.push(item.NAME);
								var nums = {};
								nums.value = item.NUM;
								nums.name = item.NAME;
								_this.option.series[0].data.push(nums);

							})
							_this.myCharts1.setOption(_this.option);
							//echarts1
							_this.Charts2 = res.data.data.map.dwxz;
							_this.option1.series[0].data = [];
							_this.Charts2.map(function(item) {
								_this.option1.legend.data.push(item.NATURE_UNIT);
								var nums = {};
								nums.value = item.NUM;
								nums.name = item.NATURE_UNIT;
								_this.option1.series[0].data.push(nums);
							})
							_this.myCharts2.setOption(_this.option1);
							//echarts2
							_this.Charts3 = res.data.data.map.splx;
							_this.option2.series[0].data = [];
							_this.Charts3.map(function(item) {
								_this.option2.legend.data.push(item.TYPE_APPROVAL);
								var nums = {};
								nums.value = item.NUM;
								nums.name = item.TYPE_APPROVAL;
								_this.option2.series[0].data.push(nums);

							})
							_this.myCharts3.setOption(_this.option2);
							//echarts3
							_this.Charts4 = res.data.data.map.hylb;
							_this.option3.series[0].data = [];
							_this.Charts4.map(function(item) {
								_this.option3.legend.data.push(item.INDUSTRY_CATEGORY);
								var nums = {};
								nums.value = item.NUM;
								nums.name = item.INDUSTRY_CATEGORY;
								_this.option3.series[0].data.push(nums);

							})
							_this.myCharts4.setOption(_this.option3);
							_this.fullscreenLoading = false;
						})
						.catch(function(err) {
							console.log(err);
							setTimeout(() => {
								layer.msg('数据加载异常！！！', {
									icon: 2
								});
								_this.fullscreenLoading = false;
							}, 5000);
						});
				}, 500);
			},
			// 查询
			select() {
				this.fullscreenLoading = true;
				let _this = this;
				let temData = {
					startTime: this.zsgcValue1,
					endTime: this.zsgcValue2,
					fzstartTime: this.zsgcValue3,
					fzendTime: this.zsgcValue4,
					page: this.page,
					rows: this.rows,
					flag: this.flag
				};
				setTimeout(() => {
					_this
						.$http({
							method: "get",
							url: `${_this.baseurl}unitInfo/dwtj`,
							params: temData
						})
						.then(function(res) {
							if (res.status === 200) {
								_this.items = res.data.data.rows;
								_this.total = res.data.data.total;
								_this.Charts1 = res.data.data.map.xzqh;
								console.log('ec1', _this.Charts1)
								_this.Charts2 = res.data.data.map.dwxz;
								_this.Charts3 = res.data.data.map.splx;
								_this.Charts4 = res.data.data.map.hylb;
							}
							_this.fullscreenLoading = false;
						})
						.catch(function(err) {
							console.log(err);
							setTimeout(() => {
								layer.msg('查询失败！！！', {
									icon: 2
								});
								_this.fullscreenLoading = false;
							}, 5000);
						});
				}, 500);
			},

			// 清空
			empty() {
				(this.zsgcValue1 = ""),
				(this.zsgcValue2 = ""),
				(this.zsgcValue3 = ""),
				(this.zsgcValue4 = "")
				this.getpage();
			},
			// 新增
			update() {
				let _this = this;
				let id = "save";
				let layerIndex = layer.open({
					type: 2,
					title: "新增",
					maxmin: true,
					resize: false,
					// anim: [parseInt(6 * Math.random())],
					area: ["75%", "70%"],
					content: ["#/StatisticalAnalysisWD/" + id],
					success: function(layero, index) {
						layero.find(".layui-layer-min").remove();
						layer.full(index);
					},
					end: function() {
						_this.getpage();
					}
				});
				sessionStorage.setItem("layerIndex", JSON.stringify(layerIndex));
			},
			// 查看
			SeeOrModify(id, num) {
				let _this = this;
				sessionStorage.setItem("operateNum", JSON.stringify(num));
				let title = "";
				if (!num) {
					title = "详情";
				} else {
					title = "修改";
				}
				let layerIndex = layer.open({
					type: 2,
					title: title,
					maxmin: true,
					// anim: [parseInt(6 * Math.random())],
					resize: false,
					area: ["75%", "70%"],
					content: "#/StatisticalAnalysisWD/" + id,
					success: function(layero, index) {
						layero.find(".layui-layer-min").remove();
					},
					// btn:['确认','取消'],
					end: function() {
						if (num) {
							_this.getpage();
						}
					}
				});
			},
			// 删除
			deleted(item) {
				let _this = this;
				let id = item.pkid;
				layer.confirm(
					"删除操作不可恢复，确定要删除该业务数据吗？", {
						icon: 2,
						title: "警告",
						btn: ["确定", "取消"]
					},
					function(index) {
						_this
							.$http({
								method: "post",
								url: _this.baseurl + "rediationsource/delete/" + id
							})
							.then(function(res) {
								_this.getpage();
							})
							.catch(function(err) {
								console.log("err", err);
							});
						layer.msg("删除成功");
					},
					function(index) {
						layer.msg("取消删除");
					}
				);
			},
			// 自适应高度
			tableResize() {
				let contentRight = document.querySelector(".content"); // content-right
				let tableRight = document.querySelector(".fs-right"); // fs-right
				let inputBox = document.querySelector(".input-box"); // input-box
				let tableBox = document.querySelector(".table-bordered"); // panigation
				let map = document.querySelector("#map"); // map

				if (!contentRight) return;
				if (!tableRight) return;
				if (!inputBox) return;
				if (!tableBox) return;

				let tableHeight =
					tableRight.offsetHeight - inputBox.offsetHeight - 30 - 330;

				tableRight.style.height = contentRight.offsetHeight + "px";
				if (tableHeight < 300) {
					map.style.height =
						(tableRight.offsetHeight - inputBox.offsetHeight - 24) / 2 + "px";
					tableBox.style.height =
						(tableRight.offsetHeight - inputBox.offsetHeight - 24) / 2 + "px";
				} else {
					tableBox.style.height = tableHeight + "px";
				}

				this.mapResize();
			},
			mapResize() {
				// this.myChart.resize();
			},
			// 监听resize
			resizeCall() {
				var optimizedResize = (function() {
					var callbacks = [],
						running = false;
					// fired on resize event
					function resize() {
						if (!running) {
							running = true;
							if (window.requestAnimationFrame) {
								window.requestAnimationFrame(runCallbacks);
							} else {
								setTimeout(runCallbacks, 66);
							}
						}
					}
					// run the actual callbacks
					function runCallbacks() {
						callbacks.forEach(function(callback) {
							callback();
						});
						running = false;
					}
					// adds callback to loop
					function addCallback(callback) {
						if (callback) {
							callbacks.push(callback);
						}
					}
					return {
						// public method to add additional callback
						add: function(callback) {
							if (!callbacks.length) {
								window.addEventListener("resize", resize);
							}
							addCallback(callback);
						}
					};
				})();

				// start process
				optimizedResize.add(this.tableResize);
			}
		}
	};
</script>
<style scoped>
	/*输入框*/

	.input-group-addon {
		width: 103px;
	}

	.input-group:nth-last-child(2) {
		display: none;
	}

	.input-group:nth-child(3) {
		border-left: none;
	}

	@media screen and (min-width: 1030px) and (max-width: 1300px) {

		/*输入框*/
		.input-group:nth-last-child(2) {
			display: block;
			width: 66.6666666666666666666666%;
		}

		.input-group:nth-child(4) {
			border-top: none;
			border-left: 1px solid #ededed;
		}
	}

	@media screen and (max-width: 1024px) {

		/*输入框*/
		.input-group:nth-child(3) {
			border-left: 1px solid #ededed;
		}

		.input-group:nth-child(n+3):nth-child(-n+4) {
			border-top: none;
		}
	}

	#map {
		width: 100%;
		margin-bottom: 6px;
		height: 330px;
		border: 1px solid #dbdbdb;
	}

	.input-group .el-icon-date {
		left: 111px;
	}

	#zsgcValue1,
	#zsgcValue2,
	#zsgcValue3,
	#zsgcValue4 {
		background: rgba(255, 255, 255, 0);
		padding-left: 25px !important;
	}

	#echart1,
	#echart2,
	#echart3,
	#echart4 {
		float: left;
		width: 25%;
		height: 100%;
	}

	#echart1,
	#echart2,
	#echart3 {
		border-right: solid 1px #dbdbdb;
	}
</style>
