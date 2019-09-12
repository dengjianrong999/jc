<!--测试一下-->
<template>

	<div class="jdc-tabs">
		<!-- 头部 -->
		<!-- nav -->
		<div class="signBar">
			<!-- logo -->
			<div class="logo">
				<img src="../assets/images/logo_1920.png" alt="">
				<img src="../assets/images/fushe1_1920.png" alt="">
			</div>
			<!-- 退出登录 -->
			<div class="logo-login">
				<a>
					<img src="../assets/images/user_1920.png" alt=""> 管理员</a>
				<a href='http://117.121.97.120:9001/bjsy-sys/'>
					<i class="icon iconfont icon-shouye3"></i> 首页导航</a>
				<a href="javascript:void(0)" @click="loginout()">
					<i class="icon iconfont icon-tuichu"></i> 退出</a>
			</div>
		</div>
		<!--导航菜单栏-->
		<div class="navigationBar">
			<ul class="First-navigationBar">
				<li v-for='(item,index) in data' :key="index">
					<a href="#" @click="tabInt(item,index)" :class="{isChecked: item.target === currentIndex}">
						<i :class="item.icon"></i>
						{{item.name}}
						<div class="triangle" v-if="item.childList.length"></div>
					</a>
					<ul class="Second-navigationBar">
						<li @click="tabInter(item,index,itm)" v-for='(itm,index) in item.childList' :key="index">
							<a :class="{isChecke: CurtIndex === itm.target}">{{itm.name}}</a>
						</li>
					</ul>
				</li>
			</ul>
		</div>

		<!-- nav -->
		<div class="content">
			<keep-alive>
				<component :is="componentData"></component>
			</keep-alive>
		</div>
	</div>

</template>

<script>
	// 数据管理
	// 引入数据管理子组件
	import rediationsource0 from "./GIS/GISGPSMap"; //gis
	import unitInfo2 from "./QueryAndCount/UnitInformationQuery"; //单位信息查询
	import rediationsource3 from "./QueryAndCount/RadioactiveSourceQuery"; //放射源查询
	import NontightInfo4 from "./QueryAndCount/UnsealedRadioactivity"; //非密封放射性物质查询
	import radialdevice5 from "./QueryAndCount/RayDeviceQuery"; //射线装置查询
	import unitInfo6 from "./QueryAndCount/UnitInformationStatistics"; //单位信息统计
	export default {
		name: "app",
		isShow: false,
		data() {
			return {
				currentIndex: 0,
				CurtIndex: 0,
				componentData: "rediationsource0",
				data: [],
			};
		},
		components: {
			// 声明子组件
			rediationsource0, //gis
			unitInfo2, //单位信息查询
			rediationsource3, //放射源查询
			NontightInfo4, //非密封放射性物质查询
			radialdevice5, //射线装置查询
			unitInfo6, //单位信息统计
		},
		mounted() {
			// 加载菜单页
			var _this = this;
			_this
				.$http({
					method: "get",
					url: `${_this.baseurl.slice(0, 35)}/sys/menu/listJson`
				})
				.then(function(res) {
					if (res.status === 200 && res.data.status === "1") {
						_this.data = res.data.data[1].childList;
						console.log("this.data", _this.data);
						_this.currentIndex = _this.data[0].target;
					}
				})
				.catch(function(err) {
					console.log(err);
					setTimeout(() => {
						layer.msg("加载异常", {
							icon: 2
						});
					}, 5000);
				});
		},
		methods: {
			loginout() {
				this.$http				 
					.get('http://117.121.97.120:9001/bjsy-sys/logout', {
					// .get(`http://124.42.41.43:9001/bjsy-sys/logout`, {
						headers: {
							'Content-Type': 'application/json;charset=UTF-8'
						}
					})
					.then(function(res) {
						// window.location.href = "http://124.42.41.43:9001/bjsy-sys/loginPage/index.html";
						window.location.href = "http://117.121.97.120:9001/bjsy-sys/loginPage/index.html";
					});
			},
			tabInter(item, index, itm) {
				this.currentIndex = item.target;
				this.CurtIndex = itm.target;
				this.componentData = itm.href.split("/")[2] + itm.target;
			},
			tabInt(item, index) {
				if (item.childList.length == 0) {
					this.currentIndex = item.target;
					this.componentData = item.href.split("/")[2] + item.target;
				}

			}
		}
	};
</script>
<style scoped lang="less">
	.jdc-tabs {
		min-width: 1000px;
	}

	.logo-login {
		height: 100%;
		display: flex;
		align-items: center;
		cursor: pointer;
	}

	.logo-login a {
		display: block;
		padding: 5px 8px;
		line-height: 35px;
		background: none;
		border: none;
		margin-right: 5px;
		color: #038fcf;
		font-size: 14px !important;
	}

	.logo-login a:nth-child(2) {}

	.logo-login a img {
		width: 30px;
		height: 30px;
	}

	.logo-login a .icon {
		font-size: 14px;
	}

	.logo-login a:hover {
		color: #ffffff;
		border-radius: 3px;
		background: rgba(3, 143, 207, 0.5);
	}

	///////头部背景
	.signBar {
		width: 100%;
		height: 60px;
		background: url(../assets/images/cloud2.png) no-repeat;
		background-size: 100% 100%;
		display: flex;
		justify-content: space-between;
	}

	// 导航栏
	.navigationBar {
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
		width: 100%;
		height: 36px;
		z-index: 1;
		border-bottom: 1px solid #029ad1;
		overflow: hidden;
		background-color: #fff;
		background-image: -moz-linear-gradient(90deg,
			rgb(241, 241, 241) 0%,
			rgb(248, 248, 248) 49%,
			rgb(255, 255, 255) 100%);
		background-image: -webkit-linear-gradient(90deg,
			rgb(241, 241, 241) 0%,
			rgb(248, 248, 248) 49%,
			rgb(255, 255, 255) 100%);
	}

	.navigationBar ul {
		position: absolute;
		z-index: 999;
	}

	.navigationBar .Second-navigationBar {
		box-shadow: 0 3px 8px rgba(0, 0, 0, 0.3);
		cursor: pointer;
	}

	.navigationBar ul,
	.navigationBar li {
		list-style: none;
		margin: 0;
		padding: 0;
		float: left;
	}

	.First-navigationBar>li {
		width: 160px;
		position: relative;
		height: 35px;
		margin-left: 10px;
	}

	.First-navigationBar li:hover ul {
		display: inline-block;
	}

	.First-navigationBar>li>a {
		width: 100%;
		padding: 0 10px;
		line-height: 35px;
		color: #333 !important;
		text-align: center;
		display: inline-block;
	}

	.Second-navigationBar {
		width: 100%;
		left: 0;
		display: none;
		background: #fff;
	}

	.Second-navigationBar li {
		float: none;
		height: 32px;
		border-bottom: 1px solid #dbdbdb;
		border-top: none;
	}

	.Second-navigationBar li a {
		width: 100%;
		line-height: 32px;
		color: #333 !important;
		text-align: left;
		border-top: none;
		display: block;
		padding: 0 10px;
	}

	.First-navigationBar>li:hover>a,
	.Second-navigationBar>li:hover a,
	.First-navigationBar .isChecked,
	.First-navigationBar>li .isChecke,
	.Second-navigationBar .isChecked,
	.Second-navigationBar .isChecked a {
		color: #fff !important;
		height: 100%;
		background-color: rgb(0, 172, 234);
		background-image: -webkit-linear-gradient(90deg,
			rgb(0, 172, 234) 0%,
			rgb(117, 212, 246) 100%);
	}

	//  小三角
	.triangle {
		display: inline-block;
		width: 0px;
		height: 0px;
		border-width: 5px;
		border-top-width: 5px;
		border-bottom-width: 0;
		margin-bottom: 2px;
		border-style: solid;
		border-color: #999 transparent transparent transparent;
	}

	.First-navigationBar li:hover .triangle,
	.First-navigationBar .isChecked .triangle {
		border-color: #fff transparent transparent transparent;
	}

	.content {
		height: calc(100% - 96px);
	}
</style>
