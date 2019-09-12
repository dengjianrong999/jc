<!--
放射源信息弹窗 
-->
<template>
	<div class="fs-window">
		<!--输入框-->
		<div class="block">
			<div class="name">
				
				<span>单位名称：</span>
			</div>
			<div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag" v-model="unitName">
			</div>
		</div>
		<div class="block">
			<div class="name">
				
				<span>所属单位id：</span>
			</div>
			<div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag" v-model="unitId">
			</div>
		</div>
		<div class="block">
			<div class="name">
				
				<span>单位地址：</span>
			</div>
			<div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag" v-model="unitAddress">
			</div>
		</div>
		<div class="block">
			<div class="name">
				
				<span>统一社会信用代码：</span>
			</div>
			<div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag" v-model="tyshxydm">
			</div>
		</div>
		<div class="block">
			<div class="name">
				
				<span>种类和范围：</span>
			</div>
			<div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag" v-model="typeRange">
			</div>
		</div>
		<div class="block">
			<div class="name">
				
				<span>审批类型：</span>
			</div>
			<div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag" v-model="typeApproval">
			</div>
		</div>
		<div class="block">
			<div class="name">
				<span>来源/去向：</span>
			</div>
			<div class="value">
				<i class="el-input__icon el-icon-date"></i>
				<input type="text" class="myinput" :disabled="disabledFlag" v-model="sourceTo">
			</div>
		</div>

		<div class="block">
			<div class="name">
				<span>用途：</span>
			</div>
			<div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag" v-model="purpose">
			</div>
		</div>
		<div class="block">
			<div class="name">
				<span>经纬度：</span>
			</div>
			<div class="value">
				<span class="warp-weft">经度</span>
				<input type="text" class="myinput inp-one" :disabled="disabledFlag" v-model="latitude">
				<span class="warp-weft">纬度</span>
				<input type="text" class="myinput inp-two" :disabled="disabledFlag" v-model="longitude">
			</div>
		</div>
		<div class="block">
			<div class="name">
				
				<span>有效期至：</span>
			</div>
			<div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag" v-model="periodValidity">
			</div>
		</div>
		<div class="block">
			<div class="name">
				
				<span>发证日期：</span>
			</div>
			<div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag" v-model="openingDate">
			</div>
		</div>
		<div class="block">
			<div class="name">
				
				<span>单位性质：</span>
			</div>
			<div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag" v-model="natureUnit">
			</div>
		</div>
		<div class="block">
			<div class="name">
				<span>许可证条件：</span>
			</div>
			<div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag" v-model="licenceConditions">
			</div>
		</div>
		<div class="block">
			<div class="name">
				<span>法定代表人：</span>
			</div>
			<div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag" v-model="legalPerson">
			</div>
		</div>
		<div class="block">
			<div class="name">
				<span>法人联系电话：</span>
			</div>
			<div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag" v-model="legalPerPhone">
			</div>
		</div>
		<div class="block">
			<div class="name">
				<span>行业类别：</span>
			</div>
			<div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag" v-model="industryCategory">
			</div>
		</div>
		<div class="block">
			<div class="name">
				<span>证书编号：</span>
			</div>
			<div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag" v-model="fsLicenseNo">
			</div>
		</div>
		<div class="block">
			<div class="name">
				<span>单位信息备注：</span>
			</div>
			<div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag" v-model="dwremarks">
			</div>
		</div>
		<div class="block">
			<div class="name">
				<span>单位信息经纬度：</span>
			</div>
			<div class="value">
				<span class="warp-weft unit-lon">单位信息经度</span>
				<input type="text" class="myinput inp-one" :disabled="disabledFlag" v-model="dwlongitude">
				<span class="warp-weft unit-lon">单位信息纬度</span>
				<input type="text" class="myinput inp-two" :disabled="disabledFlag" v-model="dwlatitude">
			</div>
		</div>
		<div class="block">
			<div class="name">
				<span>发证机关：</span>
			</div>
			<div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag" v-model="certifyingAuthority">
			</div>
		</div>
		<div class="block">
			<div class="name">
				<span>证件类型：</span>
			</div>
			<div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag" v-model="certificateType">
			</div>
		</div>
		<div class="block">
			<div class="name">
				<span>证件号码：</span>
			</div>
			<div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag" v-model="certificateNumber">
			</div>
		</div>
		<div class="block">
			<div class="name">
				<span>放射源类别：</span>
			</div>
			<div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag" v-model="category">
			</div>
		</div>
		<div class="block">
			<div class="name">
				<span>射线装置名称：</span>
			</div>
			<div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag" v-model="deviceName">
			</div>
		</div>
		<div class="block">
			<div class="name">
				<span>射线装置数量：</span>
			</div>
			<div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag" v-model="deviceNumber">
			</div>
		</div>
		<div class="block">
			<div class="name">
				<span>射线装置类别：</span>
			</div>
			<div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag" v-model="deviceCategory">
			</div>
		</div>
		<div class="block">
			<div class="name">
				<span>审核人：</span>
			</div>
			<div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag" v-model="auditor">
			</div>
		</div>
		<div class="block">
			<div class="name">
				<span>审核日期：</span>
			</div>
			<div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag" v-model="auditDate">
			</div>
		</div>
		<div class="block">
			<div class="name">
				<span>行政区划：</span>
			</div>
			<div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag" v-model="administrativeDivision">
			</div>
		</div>
		<div class="block">
			<div class="name">
				<span>添加人：</span>
			</div>
			<div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag" v-model="addPerson">
			</div>
		</div>
		<div class="block">
			<div class="name">
				<span>添加时间：</span>
			</div>
			<div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag" v-model="addTime">
			</div>
		</div>
	
		<div class="block">
			<div class="name">
				<span>活动种类：</span>
			</div>
			<div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag" v-model="activitiesType">
			</div>
		</div>
		<div class="remark">
			<div class="name">
				<span>备注：</span>
			</div>
			<div class="value">
				<textarea type="text" class="myinput" :disabled="disabledFlag" v-model="remarks"></textarea>
			</div>
		</div>
	</div>
</template>

<script>
// 引入子组件
export default {
  name: "app",
  data() {
    return {
      Interface: [],
      pkid: Date.parse(new Date()),
      unitId: "",
      deviceName: "",
      deviceCategory: "",
      remarks: "",
      addTime: "",
      addPerson: "",
      deviceNumber: "",
      activitiesType: "",
      longitude: "",
      latitude: "",
      unitName: "",
      unitAddress: "",
      legalPerson: "",
      legalPerPhone: "",
      fsLicenseNo: "",
      typeRange: "",
      dwremarks: "",
      administrativeDivision: "",
      certificateType: "",
      certificateNumber: "",
      certifyingAuthority: "",
      openingDate: "",
      dwlongitude: "",
      dwlatitude: "",
      periodValidity: "",
      licenceConditions: "",
      tyshxydm: "",
      industryCategory: "",
      natureUnit: "",
      typeApproval: "",
      serialNumber: "",
      specificationsModels: "",
      category: "",
      purpose: "",
      sourceTo: "",
      auditor: "",
      auditDate: "",
      operateNum: 999, //操作类型 0查看详情 1修改
      disabledFlag: false
    };
  },
  mounted() {
    this.getDetailData();
    this.lastInterface();
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
        });
    },
    save() {
      let _this = this;
      if (this.operateNum === 999) {
        // 新增
        this.pkid = Date.parse(new Date());
      }
      let submitFlag = true;
      let submitMC = true;
      console.log("pkid", this.pkid);
      var a = [
        this.unitName,
        this.deviceName,
        this.deviceCategory,
        this.activitiesType,
        
      ];
      var b = [
        "请填写单位名称",
        "请填写射线装置名称",
        "请填写射线装置类别",
        "请填写活动种类",
      ];
      for (var i = 0, l = a.length; i < l; i++) {
        if (!a[i] || a[i].length == 0) {
          submitFlag = false;
          for (var j = i, len = b.length; j < len; j++) {
            if (b[j]) {
              submitMC = false;
              layer.msg(b[j], {
                icon: 2
              });
              break;
            }
          }
          break;
        }
      }
      if (submitFlag) {
        this.$http({
          method: "post",
          url: this.baseurl + "rediationsource/save",
          data: {
            pkid: this.pkid,
            // unitId = this.unitId,
            // deviceName = this.deviceName,
            // deviceCategory = this.deviceCategory,
            // activitiesType = this.activitiesType,
            // remarks = this.remarks,
            // addTime = this.addTime,
            // deviceNumber = this.deviceNumber,
            // addPerson = this.addPerson,
            // latitude = this.latitude,
            // longitude = this.longitude,
            // unitName = this.unitName,
            // unitAddress = this.unitAddress,
            // legalPerson = this.legalPerson,
            // legalPerPhone = this.legalPerPhone,
            // fsLicenseNo = this.fsLicenseNo,
            // typeRange = this.typeRange,
            // dwremarks = this.dwremarks,
            // administrativeDivision = this.administrativeDivision,
            // certificateNumber = this.certificateNumber,
            // certificateType = this.certificateType,
            // certifyingAuthority = this.certifyingAuthority,
            // openingDate = this.openingDate,
            // dwlongitude = this.dwlongitude,
            // dwlatitude = this.dwlatitude,
            // periodValidity = this.periodValidity,
            // licenceConditions = this.licenceConditions,
            // tyshxydm = this.tyshxydm,
            // industryCategory = this.industryCategory,
            // natureUnit = this.natureUnit,
            // typeApproval = this.typeApproval,
            // serialNumber = this.serialNumber,
            // specificationsModels = this.specificationsModels,
            // category = this.category,
            // purpose = this.purpose,
            // sourceTo = this.sourceTo,
            // auditor = this.auditor,
            // auditDate = this.auditDate,
          }
        }).then(function(res) {
          if (res.status === 200 && res.data.status === "1") {
            layer.msg("保存成功！", {
              icon: 1
            });
            let timer = setTimeout(function() {
              _this.closeIframe();
              clearTimeout(timer);
            }, 1000);
          }
        });
      }
    },
    getDetailData() {
      // this.fixedHeight(); //适应高度

      // 操作 operateNum0详情 1修改
	  let id = this.$route.params.id;
	  console.log('id',id);
      let _this = this;
      if (id !== "save") {
        // 不是新增
        this.operateNum = JSON.parse(sessionStorage.getItem("operateNum")); // 操作类型 0详情 1修改
        id = id + "";
        if (this.operateNum === 0) {
          //0详情
          this.disabledFlag = true;
        } else {
          // 修改
          this.disabledFlag = false;
        }
        this.$http({
          method: "get",
          url: `${this.baseurl}radialdevice/data/${id}`
        }).then(function(res) {
          if (res.status === 200 && res.data.status === "1") {
            console.log(res.data.data);
            let datas = res.data.data;
            _this.details = res.data.data;
            _this.pkid = _this.details.pkid;
            _this.unitId = _this.details.unitId;
            _this.deviceName = _this.details.deviceName;
            _this.deviceCategory = _this.details.deviceCategory;
            _this.activitiesType = _this.details.activitiesType;
            _this.remarks = _this.details.remarks;
            _this.addTime = _this.details.addTime;
            _this.deviceNumber = _this.details.deviceNumber;
            _this.addPerson = _this.details.addPerson;
            _this.latitude = _this.details.latitude;
            _this.longitude = _this.details.longitude;
            _this.unitName = _this.details.unitName;
            _this.unitAddress = _this.details.unitAddress;
            _this.legalPerson = _this.details.legalPerson;
            _this.legalPerPhone = _this.details.legalPerPhone;
            _this.fsLicenseNo = _this.details.fsLicenseNo;
            _this.typeRange = _this.details.typeRange;
            _this.dwremarks = _this.details.dwremarks;
            _this.administrativeDivision = _this.details.administrativeDivision;
            _this.certificateNumber = _this.details.certificateNumber;
            _this.certificateType = _this.details.certificateType;
            _this.certifyingAuthority = _this.details.certifyingAuthority;
            _this.openingDate = _this.details.openingDate;
            _this.dwlongitude = _this.details.dwlongitude;
            _this.dwlatitude = _this.details.dwlatitude;
            _this.periodValidity = _this.details.periodValidity;
            _this.licenceConditions = _this.details.licenceConditions;
            _this.tyshxydm = _this.details.tyshxydm;
            _this.industryCategory = _this.details.industryCategory;
            _this.natureUnit = _this.details.natureUnit;
            _this.typeApproval = _this.details.typeApproval;
            _this.serialNumber = _this.details.serialNumber;
            _this.specificationsModels = _this.details.specificationsModels;
            _this.category = _this.details.category;
            _this.purpose = _this.details.purpose;
            _this.sourceTo = _this.details.sourceTo;
            _this.auditor = _this.details.auditor;
            _this.auditDate = _this.details.auditDate;
          }
        });
      }
    }
  }
};
</script>
<style scoped>
.name {
  width: 117px;
}

.radio input[type="radio"]:checked + div {
  /*当radiuo被选中时，把input下边的div标签的背景图片替换掉*/
  background: url(../../assets/images/duigou.png) no-repeat;
}
.warp-weft {
  line-height: 25px;
}
.fs-window .name{
	padding: 0 !important;
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
.unit-lon{
	width: 320px !important;
}
</style>
