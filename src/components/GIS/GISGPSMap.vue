<template>
  <div id = 'map'>
    <!-- 打印的图片 -->
    <div id="print-map">
     <div id="allmap" class="height"></div>
    </div> 
    <!-- 导航 -->
    <div id="r-result"></div>
     <!-- 工具箱 -->
    <div class="tool">
        <div  @click='toggle' title='工具箱'>
          <i class="iconfont icon-gongjuxiang"></i> 
          <span> 工具箱</span> 
        </div>
        <div v-show="isShow" @click='ChangeMap' title='切换底图'>	<i class="iconfont icon-qiehuanditu"></i></div>
        <!-- 放大 -->
        <div v-show="isShow" @click='enlarge' title='放大'>	<i class="iconfont icon-fangda2"></i></div>
        <!-- 缩小 -->
        <div v-show="isShow" @click='narrow' title='缩小'>	<i class="iconfont icon-suoxiao"></i></div>
        <!-- 导航 -->
        <div v-show="isShow" @click='navigation(map)' title='导航'>	<i class="iconfont icon-daohang2"></i></div>
        <div v-show="isShow" @click="getdistance" title='测距' >	<i class="iconfont  icon-ceju "></i></div>
        <div v-show="isShow" title='测面积' @click='cicre()'>	<i class="iconfont icon-mianji"></i></div>
        <div v-show="isShow" @click='yuan()' title='多边形'>	<i class="iconfont icon-duobianxing"></i></div>
        <div v-show="isShow" @click='panorama()'>	<i class="iconfont icon-quanjing" title='全景'></i></div>
        <div v-show="isShow" @click='cleanMap()' title='清除痕迹'>	<i class="iconfont icon-shanchu"></i></div>
    </div>
  </div>

</template>

<script>
import { MP } from "@/map.js";
import { json } from "./../../../static/json/bjsy.js";
import { list } from "./../../../static/json/sy_border.js";
export default {
  data: function() {
    return {
      ak: "624839dfead17a9f881a728e83f1fcba",
      map: null,
      isShow: true,
      myDis: null,
      selected: "",
      overlays: [], //圆
      circle: "",
      inputValue: "", //圆的半径
      event: "",
      stopsup: true, //圆的点击事件 防止第二次点击
      circle: null,
      fixedPoints: [],
      fixedPoints2: [],
      fixedPoints3: [],
      incount: 0,
      drawingManager: null,
      person: "",
      marker: null,
      //marker的弹窗信息
      lon: "",
      lat: "",
      unitName: "", //单位名称
      unitAddress: "", //单位地址
      legalPerson: "", //法人
      legalPerPhone: "", //法人联系电话
      category: "", //放射源类别
      fsLicenseNo: "", //证书编号
      periodValidity: "", //有效期至
      typeRange: "", //种类和范围
      nuclideName: "", //核素名称
      activity: "", //活度
      radiatiotType:'',//辐射源类型
      sealDegree:'',//密封程度
      activitiesType:'',//活动种类
      matterType:'',//类型(移动/固定)
      myIcon: ""
    };
  },

  mounted() {
    this.initMap();
    this.getData();
    this.getData2();
    this.getData3();
  },
  methods: {
    toggle() {
      this.isShow = !this.isShow;
    },

    initMap() {
      let _this = this;
      this.$nextTick(function() {
        MP(_this.ak).then(BMap => {
          _this.map = new BMap.Map("allmap", {
            minZoom: 12,
            enableMapClick: false
          });
          _this.myDis = new BMapLib.DistanceTool(_this.map);

          _this.map.centerAndZoom(new BMap.Point(116.73, 40.16), 12);
          _this.map.enableScrollWheelZoom();

          // 个性化底图
          // 个性化在线编辑器地址：http://lbsyun.baidu.com/custom/
          var styleJson = [
            {
              featureType: "land",
              elementType: "all",
              stylers: {
                color: "#f3f9faff"
              }
            },
            {
              featureType: "local",
              elementType: "all",
              stylers: {
                color: "#bbc1fdff"
              }
            },
            {
              featureType: "water",
              elementType: "all",
              stylers: {
                color: "#59ccedff"
              }
            },
            {
              featureType: "highway",
              elementType: "all",
              stylers: {
                color: "#959deeff"
              }
            }
          ];

          _this.map.setMapStyle({ styleJson: styleJson });
          // 个性化底图

          let top_left_control = new BMap.ScaleControl({
            anchor: BMAP_ANCHOR_TOP_LEFT
          });
          // 左上角，添加比例尺
          _this.map.addControl(top_left_control);
          // 放大  缩小
          let menu = new BMap.ContextMenu();
          let txtMenuItem = [
            {
              callback: function() {
                _this.enlarge();
              }
            },
            {
              callback: function() {
                _this.narrow();
              }
            }
          ];
          for (var i = 0; i < txtMenuItem.length; i++) {
            menu.addItem(
              new BMap.MenuItem(
                txtMenuItem[i].text,
                txtMenuItem[i].callback,
                100
              )
            );
          }
          _this.map.addContextMenu(menu);

          setTimeout(function() {
            _this.map_sy(); // 遮罩和边线
          }, 200);
        });
      });
    },

    map_sy() {
      // 遮罩和边线
      let _this = this;
      let townArr = json.features;
      let townsArr = [];
      let townsNameArr = [];

      _this.map.clearOverlays(); //清除地图覆盖物
      for (var k = 0; k < townArr.length; k++) {
        for (var j in townArr[k]) {
          if (j === "geometry") {
            var townPosArr = townArr[k]["geometry"].coordinates[0]; // 每个镇坐标 19
            var townPos = "";
            for (var i = 0; i < townPosArr.length; i++) {
              //
              if (i == townPosArr.length - 1) {
                townPos += townPosArr[i][0] + "," + townPosArr[i][1];
              } else {
                townPos += townPosArr[i][0] + "," + townPosArr[i][1] + ";";
              }
            }
            townsArr.push(townPos);
          } else if (j === "properties") {
            townsNameArr.push(townArr[k]["properties"].name);
          }
        }
      }

      let color = [
        "rgba(103,189,113,0.2)", //优
        "rgba(193,211,120,0.2)", //良
        "rgba(219,145,176,0.2)", //轻度
        "rgba(234,105,69,0.2)", //中度
        "rgba(174,87,66,0.2)", //重度
        "rgba(139,65,117,0.2)", //严重
        "rgba(103,189,113,0.2)", //优
        "rgba(193,211,120,0.2)", //良
        "rgba(219,145,176,0.2)", //轻度
        "rgba(234,105,69,0.2)", //中度
        "rgba(174,87,66,0.2)", //重度
        "rgba(139,65,117,0.2)", //严重
        "rgba(103,189,113,0.2)", //优
        "rgba(193,211,120,0.2)", //良
        "rgba(219,145,176,0.2)", //轻度
        "rgba(234,105,69,0.2)", //中度
        "rgba(174,87,66,0.2)", //重度
        "rgba(139,65,117,0.2)", //严重
        "rgba(139,65,117,0.2)" //严重
      ];

      for (var i = 0; i < townsArr.length; i++) {
        // 镇的多边形
        (function(index) {
          var ply1 = new BMap.Polygon(townsArr[index], {
            strokeWeight: 0.5,
            strokeColor: "#013a4f ",
            fillColor: "rgba(0,0,0,0)",
            fillOpacity: ""
          }); //建立多边形覆盖物
          _this.map.addOverlay(ply1); //添加覆盖物
        })(i);
      }

      /*
      * BAIDU ++++++++++++++++
      */

      var ply = new BMap.Polygon(list.join(";"), {
        strokeWeight: 1,
        strokeColor: "#013a4f",
        strokeOpacity: 1,
        fillColor: "rgba(255,255,255,0)",
        fillOpacity: ".5"
      }); //建立多边形覆盖物
      _this.map.addOverlay(ply); //添加覆盖物
      for (var i = 0; i < townsArr.length; i++) {
        // 镇的多边形
        (function(index) {
          var ply = new BMap.Polygon(townsArr[i], {
            strokeWeight: 1,
            strokeColor: "#3385ff",
            fillColor: color[i],
            fillOpacity: 1
          }); //建立多边形覆盖物
          _this.map.addOverlay(ply); //添加覆盖物

          ply.addEventListener("mouseover", function(evt) {
            ply.setFillOpacity(1);
          });
          ply.addEventListener("mouseout", function(evt) {
            ply.setFillOpacity(1);
          });
          ply.addEventListener("click", function(evt) {
            ply.setFillOpacity(1);
            let incount = 0;
          function circlenum(nums){
            var cireNUm = nums;
              cireNUm.forEach(function(val, idx) {
              let pt = new BMap.Point(val.lng, val.lat);
              if (BMapLib.GeoUtils.isPointInPolygon(pt,ply)) {
                //如果点在区域内，返回true
                incount++;
              }
              _this.openInfo(
              `${townsNameArr[index]}有：${incount}个放射源`,
              evt.point
            );
            });
          }
           circlenum(_this.fixedPoints);
           circlenum(_this.fixedPoints2);
           circlenum(_this.fixedPoints3);
          });
        })(i);
      }
      _this.initDraw(); // 初始化绘画工具

      // 百度地图API功能
     
      var opts = {
        width: 250, // 信息窗口宽度
        enableMessage: true //设置允许信息窗发送短息
      };
      function showmarks(marks){
           var data_info = marks;
           for (var i = 0; i < data_info.length; i++) {

             if(data_info[i].info === '非密封'){
              var contentS = "<table>";
                  contentS = contentS +"<tr><td style='color:#666'>  <span style='color:#333'>单位名称:</span>" +data_info[i].unitName + "</td></tr>";
                  contentS = contentS + "<tr><td style='color:#666'>  <span style='color:#333'>单位地址:</span>" +data_info[i].unitAddress +"</td></tr>";
                  // contentS = contentS +"<tr><td style='color:#666' > <span style='color:#333'>法人:</span>" +data_info[i].legalPerson +"</td></tr>";
                  // contentS = contentS +"<tr><td style='color:#666'> <span style='color:#333'>法人联系电话:</span>" +data_info[i].legalPerPhone +"</td></tr>";
                  contentS = contentS + "<tr><td style='color:#666'><span style='color:#333'>核素名称:</span> " +data_info[i].nuclideName +"</td></tr>";
                  contentS = contentS + "<tr><td style='color:#666'><span style='color:#333'>类型:</span>" +data_info[i].matterType +"</td></tr>";
                  // contentS = contentS + "<tr><td style='color:#666'> <span style='color:#333'>辐射许可证号:</span>" + data_info[i].fsLicenseNo +"</td></tr>";
                  // contentS = contentS +"<tr><td style='color:#666'> <span style='color:#333'>有效期:</span>" + data_info[i].periodValidity +"</td></tr>";
                  // contentS = contentS + "<tr><td style='color:#666'><span style='color:#333'>种类和范围:</span> " + data_info[i].typeRange +"</td></tr>";
                  contentS = contentS + "<tr><td style='color:#666'><span style='color:#333'>密封程度:</span> " + data_info[i].sealDegree +"</td></tr>";
                  contentS = contentS + "<tr><td style='color:#666'> <span style='color:#333'>核数名称:</span>" + data_info[i].nuclideName + "</td></tr>";
                  contentS = contentS + "<tr><td style='color:#666'> <span style='color:#333'>活动种类:</span>" + data_info[i].activitiesType + "</td></tr>";
                 contentS += "</table>";
             }else if(data_info[i].info === '放射源'){
              var contentS = "<table>";
                  contentS = contentS +"<tr><td style='color:#666'>  <span style='color:#333'>单位名称:</span>" +data_info[i].unitName + "</td></tr>";
                  contentS = contentS + "<tr><td style='color:#666'>  <span style='color:#333'>单位地址:</span>" +data_info[i].unitAddress +"</td></tr>";
                  // contentS = contentS +"<tr><td style='color:#666' > <span style='color:#333'>法人:</span>" +data_inf[i].legalPerson +"</td></tr>";
                  // contentS = contentS +"<tr><td style='color:#666'> <span style='color:#333'>法人联系电话:</span>" +data_inf[i].legalPerPhone +"</td></tr>";
                  contentS = contentS + "<tr><td style='color:#666'> <span style='color:#333'>放射源类别:</span> " + data_info[i].category + "</td></tr>";
                  contentS = contentS + "<tr><td style='color:#666'><span style='color:#333'>核素名称:</span> " +data_info[i].nuclideName +"</td></tr>";
                  // contentS = contentS + "<tr><td style='color:#666'> <span style='color:#333'>辐射许可证号:</span>" + data_inf[i].fsLicenseNo +"</td></tr>";
                  // contentS = contentS +"<tr><td style='color:#666'> <span style='color:#333'>有效期:</span>" + data_inf[i].periodValidity +"</td></tr>";
                  // contentS = contentS + "<tr><td style='color:#666'><span style='color:#333'>种类和范围:</span> " + data_inf[i].typeRange +"</td></tr>";
                  contentS = contentS +  "<tr><td style='color:#666'><span style='color:#333'>场所名称:</span>" +data_info[i].activity + "</td></tr>";
                  contentS = contentS + "<tr><td style='color:#666'> <span style='color:#333'>密封程度:</span>" + data_info[i].sealDegree +"</td></tr>";
                  contentS = contentS + "<tr><td style='color:#666'> <span style='color:#333'>类型:</span>" + data_info[i].radiatiotType +"</td></tr>";
              contentS += "</table>";
             } else if(data_info[i].info === '射线装置'){
              var contentS = "<table>";
                  contentS = contentS +"<tr><td style='color:#666'>  <span style='color:#333'>单位名称:</span>" +data_info[i].unitName + "</td></tr>";
                  contentS = contentS + "<tr><td style='color:#666'>  <span style='color:#333'>射线装置名称:</span>" +data_info[i].deviceName +"</td></tr>";
                  contentS = contentS + "<tr><td style='color:#666'> <span style='color:#333'>射线装置类别:</span> " + data_info[i].deviceCategory + "</td></tr>";
                  contentS = contentS + "<tr><td style='color:#666'><span style='color:#333'>射线装置数量:</span> " +data_info[i].deviceNumber +"</td></tr>";
                  contentS = contentS +  "<tr><td style='color:#666'><span style='color:#333'>活动种类:</span>" +data_info[i].activitiesType + "</td></tr>";
              contentS += "</table>";
             }
             
            let myIcon = null;
            if (data_info[i].info == '非密封') {
                 if(data_info[i].matterType == '移动'){
                     myIcon = new BMap.Icon(
                      "static/img/mobile_source.png",
                      new BMap.Size(35, 50)
                    );
                 }else{
                    myIcon = new BMap.Icon(
                      "static/img/fix_source.png",
                      new BMap.Size(35, 50)
                    );
                 }
            }else if(data_info[i].info == '放射源'){
                if(data_info[i].radiatiotType == '移动'){
                     myIcon = new BMap.Icon(
                      "static/img/mobile_source.png",
                      new BMap.Size(35, 50)
                    );
                 }else{
                    myIcon = new BMap.Icon(
                      "static/img/fix_source.png",
                      new BMap.Size(35, 50)
                    );
                 }
            }else if(data_info[i].info == '射线装置'){
                    myIcon = new BMap.Icon(
                      "static/img/radiation_source.png",
                      new BMap.Size(35, 50)
                    );
            }
            var marker = new BMap.Marker(
              new BMap.Point(data_info[i].lng, data_info[i].lat),
              { icon: myIcon }
            ); // 创建标注
            _this.map.addOverlay(marker); // 将标注添加到地图中
            addClickHandler(contentS, marker);
          }

         }
      showmarks(_this.fixedPoints);
      showmarks(_this.fixedPoints2);
      showmarks(_this.fixedPoints3);
      function addClickHandler(content, marker) {
        marker.addEventListener("click", function(e) {
          openInfo(content, e);
        });
      }
      
      function openInfo(contentS, e) {
        var p = e.target;
        var point = new BMap.Point(e.point.lng, e.point.lat);

        // var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
        var infoWindow = new BMap.InfoWindow(contentS, opts); // 创建信息窗口对象
        _this.map.openInfoWindow(infoWindow, point); //开启信息窗口
      }
    },
    // 切换底图
    ChangeMap() {
      this.map.addControl(
        new BMap.MapTypeControl({
          mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP]
        })
      );
    },
    // 切换底图
    //缩小地图
    narrow() {
      this.map.zoomOut();
      // this.map.setZoom(10);
    },
    //放大地图
    enlarge() {
      this.map.zoomIn();
    },
    // 导航
    navigation(map) {
      var transit = new BMap.DrivingRoute(map, {
        renderOptions: {
          map: map,
          panel: "r-result",
          enableDragging: true //起终点可进行拖拽
        }
      });
      transit.search("马坡镇", "杨镇");
    },
    //  测距离
    getdistance() {
      var _this = this;
      _this.map.addEventListener("click", function() {
        _this.myDis.open(); //开启鼠标测距
        //myDis.close();  //关闭鼠标测距
      });
    },
    // 多边形
    yuan() {
      this.drawingManager.open(); // 初始化工具
      this.drawingManager.setDrawingMode(BMAP_DRAWING_POLYGON);
    },
    // 输入园的半径画圆
    cicre() {
      let _this = this;
      // 防止多次弹窗
      _this.map.removeEventListener("click", _this.fn);

      _this.map.addEventListener("click", _this.fn);
    },
    fn(e) {
      let _this = this;
      let point = new BMap.Point(e.point.lng, e.point.lat);
      layer.open({
        title: "请选择圆的半径",
        content:
          '<div class="cicre-bj"style="color:#666" ><span>圆的半径</span><input type="text" id="inputValue"style="border-radius: 3px;margin: 0 5px; text-indent: 5px;"><span style="padding: 0 5px;">单位</span><select name="" id="selectValue" style="border-radius: 3px;margin-left: 0 5px; padding: 0 5px"><option value="千米">千米</option><option value="米">米</option></select></div>',
        btn: ["确定", "取消"],
        yes: function(index) {
          var Yradii = document.getElementById("inputValue").value;
          var selectV = document.getElementById("selectValue").value;
          if (selectV == "千米") {
            Yradii = Yradii * 1000;
          }
          _this.circle = new BMap.Circle(point, Yradii);
          _this.circle.setFillColor("blue"); //填充颜色
          _this.circle.setStrokeColor("#FFF"); //边线颜色
          _this.circle.setStrokeWeight(1); //边线大小
          _this.circle.setFillOpacity(0.3); //边线透明度
          _this.map.addOverlay(_this.circle); //增加圆
          let incount = 0;
          function circlenum(nums){
            var cireNUm = nums;
              cireNUm.forEach(function(val, idx) {
              let pt = new BMap.Point(val.lng, val.lat);
              if (BMapLib.GeoUtils.isPointInCircle(pt, _this.circle)) {
                //如果点在区域内，返回true
                incount++;
              }
            });
          }
           circlenum(_this.fixedPoints);
           circlenum(_this.fixedPoints2);
           circlenum(_this.fixedPoints3);
          _this.openInfo(`该区域有：${incount}个放射源`, e.point);

          layer.close(index);
        },
        cancel: function(index, layero) {
          layer.close(index);
        },
        end: function() {
          _this.map.removeEventListener("click", _this.fn);
        }
      });
    },
    // 输入园的半径画圆
    panorama() {
      var stCtrl = new BMap.PanoramaControl(); //构造全景控件
      stCtrl.setOffset(new BMap.Size(20, 20));
      this.map.addControl(stCtrl); //添加全景控件
    },
    //清除痕迹
    cleanMap() {
      var _this = this;
      _this.map.removeOverlay(_this.circle);
      // mark 图标
      for (var i = 0; i < _this.overlays.length; i++) {
        _this.map.removeOverlay(_this.overlays[i]);
      }
      _this.overlays.length = 0;
    },
    openInfo(content, point) {
      //打开窗口信息
      let Winpoint = {};
      if (point) {
        Winpoint = new BMap.Point(point.lng, point.lat);
      } else {
        let ne = this.map.getBounds().getNorthEast();
        Winpoint = new BMap.Point(ne.lng - 0.1, ne.lat - 0.1);
      }
      var opts = {
        width: 250, // 信息窗口宽度
        height: 80, // 信息窗口高度
        title: "镇的放射源数量", // 信息窗口标题
        enableMessage: true //设置允许信息窗发送短息
      };
      var infoWindow = new BMap.InfoWindow(content, opts); // 创建信息窗口对象
      var infoWindow = new BMap.InfoWindow(content, opts); // 创建信息窗口对象
      this.map.openInfoWindow(infoWindow, Winpoint); //开启信息窗口
    },
    initDraw() {
      let _this = this;
      let incount = 0;
      var overlaycomplete = function(e) {
        _this.overlays.push(e.overlay);
        var path = e.overlay.getPath(); //Array<Point> 返回多边型的点数组
        if (!path || path.length == 0) return;
        _this.drawingManager.close();
        let max_lng = path[0].lng;
        let min_lng = path[0].lng;
        let max_lat = path[0].lat;
        let min_lat = path[0].lat;
        for (var i = 0; i < path.length; i++) {
          if (max_lng < path[i].lng) {
            max_lng = path[i].lng;
          } else {
            min_lng = path[i].lng;
          }
          if (max_lat < path[i].lat) {
            max_lat = path[i].lat;
          } else {
            min_lat = path[i].lat;
          }
        }
        let point = {
          lng: (max_lng + min_lng) / 2,
          lat: (max_lat + min_lat) / 2
        };
        incount = 0;

      function marks(fixmarks){
        let  nums = fixmarks;
        if (e.drawingMode == BMAP_DRAWING_CIRCLE) { 
         nums.forEach(function(val, idx) {
            let pt = new BMap.Point(val.lng, val.lat);
            if (BMapLib.GeoUtils.isPointInCircle(pt, e.overlay)) {
              //如果点在区域内，返回true
              incount++;
            }
          });
        } else if (e.drawingMode == BMAP_DRAWING_POLYGON) {
         nums.forEach(function(val, idx) {
            let pt = new BMap.Point(val.lng, val.lat);
            if (BMapLib.GeoUtils.isPointInPolygon(pt, e.overlay)) {
              //如果点在区域内，返回true
              incount++;
            }
          });
        }
      }

      marks(_this.fixedPoints);
      marks(_this.fixedPoints2);
      marks(_this.fixedPoints3);
        _this.openInfo(`该区域有：${incount}个放射源`, point);
      };
      //实例化鼠标绘制工具
      _this.drawingManager = new BMapLib.DrawingManager(_this.map, {
        isOpen: false, //是否开启绘制模式
        drawingType: BMAP_DRAWING_CIRCLE,
        enableDrawingTool: false, //是否显示工具栏
        enableCalculate: false,
        drawingToolOptions: {
          anchor: BMAP_ANCHOR_TOP_RIGHT, //位置
          offset: new BMap.Size(5, 5), //偏离值
          drawingModes: [BMAP_DRAWING_CIRCLE, BMAP_DRAWING_POLYGON]
        },
        circleOptions: _this.styleOptions, //圆的样式
        polygonOptions: _this.styleOptions //多边形的样式
      });
      // 添加鼠标绘制工具监听事件，用于获取绘制结果
      _this.drawingManager.addEventListener("overlaycomplete", overlaycomplete);
    },
    getData() {
      let _this = this;
      _this.$http
        .get(_this.baseurl + "rediationsource/fsyzs")
        .then(function(res) {
             if (res.status == 200 || res.data.data.status == 1)
            _this.items = res.data.data.mapobj.fmf;
            _this.items.map((item, index) => {
            _this.lon = item.longitude;//经度
            _this.lat = item.latitude;//纬度
            _this.unitName = item.unitName;//所属单位名称     
            _this.unitAddress = item.unitAddress;//单位地址
            _this.legalPerson = item.legalPerson;//法定代表人
            _this.legalPerPhone = item.legalPerPhone;//法人联系电话
            _this.category = item.category;//放射源类别
            _this.fsLicenseNo = item.fsLicenseNo;//证书编号
            _this.periodValidity = item.periodValidity;//有效期至
            _this.typeRange = item.typeRange;//种类和范围
            _this.nuclideName = item.nuclideName;//核素名称
            _this.activity = item.activity;//活度
            _this.radiatiotType = item.radiatiotType;//辐射源类型
            _this.sealDegree = item.sealDegree;//密封程度(密封/非密封)
            _this.activitiesType = item.activitiesType;//活动种类
            _this.matterType = item.matterType;//类型
            //marker数据为下面的
            _this.fixedPoints.push({
              lng: _this.lon,
              lat: _this.lat,
              unitName: _this.unitName,
              unitAddress: _this.unitAddress,
              legalPerson: _this.legalPerson,
              legalPerPhone: _this.legalPerPhone,
              category: _this.category,
              fsLicenseNo: _this.fsLicenseNo,
              periodValidity: _this.periodValidity,
              typeRange: _this.typeRange,
              responsiblePhone: _this.responsiblePhone,
              periodValidity: _this.periodValidity,
              nuclideName: _this.nuclideName,
              activity: _this.activity,
              radiatiotType: _this.radiatiotType,
              sealDegree: _this.sealDegree,
              activitiesType: _this.activitiesType,
              matterType: _this.matterType,
              info: '非密封'
            });
          });
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    getData2(){
      let _this = this;
      _this.$http
        .get(_this.baseurl + "rediationsource/fsyzs")
        .then((res) => {
          console.log('zhefe',res)
          if (res.status == 200 || res.data.data.status == 1)
            _this.items = res.data.data.mapobj.fsy;
          _this.items.map((item, index) => {
             _this.lon = item.longitude;//经度
            _this.lat = item.latitude;//纬度
            _this.unitName = item.unitName;//所属单位名称     
            _this.unitAddress = item.unitAddress;//单位地址
            _this.legalPerson = item.legalPerson;//法定代表人
            _this.legalPerPhone = item.legalPerPhone;//法人联系电话
            _this.category = item.category;//放射源类别
            _this.fsLicenseNo = item.fsLicenseNo;//证书编号
            _this.periodValidity = item.periodValidity;//有效期至
            _this.typeRange = item.typeRange;//种类和范围
            _this.nuclideName = item.nuclideName;//核素名称
            _this.activity = item.activity;//活度
            _this.radiatiotType = item.radiatiotType;//辐射源类型
            _this.sealDegree = item.sealDegree;//密封程度(密封/非密封)
            //marker数据为下面的
            _this.fixedPoints2.push({
              lng: _this.lon,
              lat: _this.lat,
              unitName: _this.unitName,
              unitAddress: _this.unitAddress,
              legalPerson: _this.legalPerson,
              legalPerPhone: _this.legalPerPhone,
              category: _this.category,
              fsLicenseNo: _this.fsLicenseNo,
              periodValidity: _this.periodValidity,
              typeRange: _this.typeRange,
              responsiblePhone: _this.responsiblePhone,
              periodValidity: _this.periodValidity,
              nuclideName: _this.nuclideName,
              activity: _this.activity,
              radiatiotType: _this.radiatiotType,
              sealDegree: _this.sealDegree,
              info: '放射源'
            });
          });
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    //射线装置信息
    getData3(){
     let _this = this;
      _this.$http
        .get(_this.baseurl + "radialdevice/listJson?flag=2")
        .then((res) => {
             if (res.status == 200 || res.data.data.status == 1)
            _this.items = res.data.data;
          _this.items.map((item, index) => {
             _this.lon = item.longitude;//经度
             _this.lat = item.latitude;//纬度
             _this.unitName = item.unitName;//单位名称
             _this.deviceName = item.deviceName;//射线装置名称
             _this.deviceCategory = item.deviceCategory;//射线装置类别
             _this.deviceNumber = item.deviceNumber;//射线装置数量
             _this.activitiesType = item.activitiesType;//活动种类
             
           
            //marker数据为下面的
            _this.fixedPoints3.push({
              lng: _this.lon,
              lat: _this.lat,
              unitName: _this.unitName,
              deviceName :_this.deviceName,//射线装置名称
              deviceCategory : _this.deviceCategory,//射线装置类别
              deviceNumber : _this.deviceNumber,//射线装置数量
              activitiesType : _this.activitiesType,//活动种类
              info: '射线装置'
            });
          });
            })
        .catch(function(err) {
          console.log(err);
        });
    }
  }
};
</script>
 
<!--Add"scoped" attribute to limit CSS to this component only -->
<style>
#map {
  position: relative;
}
/* 去掉左下角logo */
.BMap_cpyCtrl {
  display: none;
}
.anchorBL {
  display: none;
}

.height {
  position: relative;
  width: calc(100% - 20px);
  height: calc(92vh - 56px);
  margin: 10px auto;
  border: 1px solid #dbdbdb;
}
.tool {
  position: absolute;
  top: 50px;
  right: 50px;
}
.tool div {
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #333;
  width: 70px;
  border-bottom: 1px solid #dbdbdb;
  background-color: #fff;
  position: relative;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.3);
}
.tool div:nth-child(1) {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.tool div:nth-child(1) span {
  margin-left: 20px;
  color: #666;
}
.tool div:nth-child(1) i {
  margin-left: 20px;
  margin: -1px 0px 0px 5px;
}
.tool div i {
  position: absolute;
  z-index: 999;
  color: #666;
}
.BMap_contextMenu {
  display: none;
}
#r-result {
  width: 200px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 6;
}
.cicre-bj {
  border: #333;
  direction: flex;
  justify-content: space-between;
  align-items: center;
}

.active {
  height: 0;
  transition: all 0.3s;
}
.sort-type {
  position: absolute;
  left: 50px;
  top: 50px;
  z-index: 5;
  font-weight: 700;
  background-color: #fff;
  padding: 10px;
  border-radius: 3px;
  border: #dbdbdb;
  border: 1px solid #dbdbdb;
}
.sort-type div:nth-child(1) {
  text-align: left;
  text-indent: 5px;
}
.sort-type img {
  width: 14px;
  margin: 0px 5px 0px 4px;
}
.BMapLib_Drawing {
  display: none !important;
}
.BMap_shadow div img {
  display: none;
}
</style>