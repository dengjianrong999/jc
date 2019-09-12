<!--
放射源信息
-->
<template>
	<!--右-->
	<div class="fs-right">
		<!--输入框-->
		<div class="input-box">
			<div class="input-group">
				<span class="input-group-addon">单位名称：</span>
				<input type="text" class="form-control" v-model='zsgcValue1'>
			</div>
			<div class="input-group">
				<span class="input-group-addon">核素名称：</span>
				<input type="text" class="form-control" v-model='zsgcValue2'>
			</div>
			<div class="input-group">
				<span class="input-group-addon">工作场所：</span>
				<input type="text" class="form-control" v-model='zsgcValue3'>
			</div>
			<div class="input-group">
				<span class="input-group-addon">活动种类：</span>
				<input type="text" class="form-control" v-model='zsgcValue4'>
			</div>
			<div class="input-group">
			</div>
			<!--按钮-->
			<div class="input-group">
				<span class="btn_content btn_query" @click="select()">
					<i class="iconfont icon-chaxun2"></i>
					<span>查询</span>
				</span>
				<span class="btn_content btn_empty" @click='empty()'>
					<i class="iconfont icon-xunhuan"></i>
					<span>清空</span>
				</span>
			</div>
		</div>
		<!--表格内容-->
		<el-main v-loading="fullscreenLoading" element-loading-background="rgba(255, 255, 255, 0.5)" element-loading-text="数据正在加载中">
			<table class="table table-bordered">
				<thead>
					<tr>
						<th scope="col">序号</th>
						<th scope="col">单位名称</th>
						<th scope="col">核素名称</th>
						<th scope="col">工作场所</th>
						<th scope="col">年最大用量</th>
						<th scope="col">活动种类</th>
						<th scope="col" width="70px">操作</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(item,index) of items" :key='index'>
						<td v-if="page == 1 || page == ''">{{index+1}}</td>
						<td v-else-if="rows == 10">{{index+1+(10*(page-1))}}</td>
						<td v-else-if="rows == 20">{{index+1+(20*(page-1))}}</td>
						<td v-else-if="rows == 50">{{index+1+(50*(page-1))}}</td>
						<td v-else-if="rows == 100">{{index+1+(100*(page-1))}}</td>
						<td :title="item.unitName">{{item.unitName}}</td>
						<td :title="item.nuclideName">{{item.nuclideName}}</td>
						<td :title="item.workplaceName">{{item.workplaceName}}</td>
						<td :title="item.annualMaximum">{{item.annualMaximum}}</td>
						<td :title="item.activitiesType">{{item.activitiesType}}</td>
						<td width="70px">
							<span @click="SeeOrModify(item.pkid,0)"> [
								<i class="iconfont icon-chaxun">
									]
								</i>
							</span>
						</td>
					</tr>
				</tbody>
			</table>
		</el-main>
		<!--分页-->
		<panigation :page='page' :rows='rows' :total='total' :options="options" @changePage="toPage" @changeRows='toRows'
		 @operatePage='optPage'></panigation>
	</div>
</template>

<script>
	// 引入子组件
	import panigation from './../component/panigation'
	export default {
		name: 'app',
		data() {
			return {
				flag: 1,
				items: [],
				unitNameOptions: [],
				zsgcValue1: "",
				zsgcValue2: "",
				zsgcValue3: "",
				zsgcValue4: "",
				pkid: 0,
				page: 1,
				rows: 10,
				total: 0,
				options: [{
						text: '10',
						value: '10'
					},
					{
						text: '20',
						value: '20'
					},
					{
						text: '50',
						value: '50'
					},
					{
						text: '100',
						value: '100'
					}
				],
				fullscreenLoading: false
			};
		},
		mounted() {
			this.getpage();
			this.tableResize();
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
			toRows(rows) { // 子组件panigation 触发改变rows
				this.rows = rows;
			},
			toPage(page) { // 子组件panigation 触发改变page
				this.page = page;
			},
			optPage(opt) { //翻页
				if (opt === 1) { // opt = 1 下一页
					this.page < this.total ? this.page++ : this.page = this.total;
				} else if (opt === 0) { // opt = 0 上一页
					this.page > 1 ? this.page-- : this.page = 1;
				}
			},
			getpage() { // 按页获取数据
				this.fullscreenLoading = true;
				let _this = this;
				let temData = {
					flag: this.flag,
					unitName: this.zsgcValue1,
					nuclideName: this.zsgcValue2,
					workplaceName: this.zsgcValue3,
					activitiesType: this.zsgcValue4,
					page: this.page,
					rows: this.rows
				};
				setTimeout(() => {
					_this.$http({
							method: 'get',
							url: `${_this.baseurl}NontightInfo/listPageJson`,
							params: temData
						})
						.then(function(res) {
							if (res.status == 200 || res.data.data.status == 1) {
								_this.items = res.data.data.rows;
								_this.total = res.data.data.total;
								_this.items.map(item => {
									if (!_this.unitNameOptions.some(val => val == item.unitName)) {
										_this.unitNameOptions.push(item.unitName)
									}
								});
								_this.fullscreenLoading = false;
							}
						})
						.catch(function(err) {
							console.log(err);
							setTimeout(() => {
								layer.msg('数据加载异常！', {
									icon: 2
								});
								_this.fullscreenLoading = false;
							}, 1000);
						});
				}, 500);
			},
			// 查询
			select() {
				this.fullscreenLoading = true;
				let _this = this;
				let temData = {
					flag: this.flag,
					unitName: this.zsgcValue1,
					nuclideName: this.zsgcValue2,
					workplaceName: this.zsgcValue3,
					activitiesType: this.zsgcValue4,
					page: this.page,
					rows: this.rows
				};
				if (this.zsgcValue1 == "" && this.zsgcValue2 == "" && this.zsgcValue3 == "" && this.zsgcValue4 == "") {
					// layer.msg('请输入查询条件！', {
					// 	icon: 2
					// });
					setTimeout(() => {
							_this.getpage();
					       _this.fullscreenLoading = false;

						}, 500);
				} else {
					setTimeout(() => {
						_this.$http({
								method: 'get',
								url: `${_this.baseurl}NontightInfo/listPageJson`,
								params: temData
							})
							.then(function(res) {
								if (res.status === 200 && res.data.status === '1') {
									_this.items = res.data.data.rows;
									_this.total = res.data.data.total;
									_this.fullscreenLoading = false;
								}
							})
							.catch(function(err) {
								console.log(err)
								setTimeout(() => {
									layer.msg('查询失败！', {
										icon: 2
									});
									_this.fullscreenLoading = false;
								}, 1000);
							})
					}, 500);
				}
			},
			// 清空
			empty() {
				(this.zsgcValue1 = ""),
				(this.zsgcValue2 = ""),
				(this.zsgcValue3 = ""),
				(this.zsgcValue4 = ""),
				this.getpage();
			},
			// 查看
			SeeOrModify(id, num) {
				let _this = this;
				sessionStorage.setItem('operateNum', JSON.stringify(num));
				let title = '';
				if (!num) {
					title = '详情';
				} else {
					title = '修改';
				}
				let layerIndex = layer.open({
					type: 2,
					title: title,
					maxmin: true,
					resize: false,
					// anim: [parseInt(6 * Math.random())],
					area: ['75%', '70%'],
					content: '#/UnsealedRadioactivityWD/' + id,
					success: function(layero, index) {
						layero.find('.layui-layer-min').remove()
						layer.full(index)
					},
					// btn:['确认','取消'],
					end: function() {
						if (num) {
							_this.getpage();
						}
					}
				});
			},
			// 自适应高度
			tableResize() {
				let contentRight = document.querySelector('.content'); // content-right
				let tableRight = document.querySelector('.fs-right'); // fs-right
				let inputBox = document.querySelector('.input-box'); // input-box
				let tableBox = document.querySelector('.el-main'); // panigation

				if (!contentRight) return;
				if (!tableRight) return;
				if (!inputBox) return;
				if (!tableBox) return;

				tableRight.style.height = contentRight.offsetHeight;
				tableBox.style.height = tableRight.offsetHeight - inputBox.offsetHeight - 66 + 'px';
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
								window.addEventListener('resize', resize);
							}
							addCallback(callback);
						}
					}
				}());

				// start process
				optimizedResize.add(this.tableResize);
			}


		},

	}
</script>
<style scoped>
	/*输入框*/

	.input-group-addon {
		width: 70px;
		flex: 0 0 70px;
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

		.input-group:nth-child(3),
		.input-group:nth-child(4) {
			border-top: none;
		}
	}


	#map {
		width: 100%;
		margin: 10px 0;
		height: 350px;
		border: 1px solid #dbdbdb;
	}
</style>
