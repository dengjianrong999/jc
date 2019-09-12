<!--
放射源信息弹窗
-->
<template>
    <div class="fs-window">
        <div class="block" v-for="(item,index) in dataModel" :key="index">
            <div class="name">
                <span>{{item.cnName}}</span>
            </div>
            <div class="value">
                <input type="text" class="myinput" disabled="true" v-model="item.value">
            </div>
        </div>
        <!--输入框-->
        <!-- <div class="block">
            <div class="name">
                <span>单位名称：</span>
            </div>
            <div class="value">
                <input type="text" class="myinput" :disabled="disabledFlag" v-model="value1">
            </div>
        </div>
        <div class="block">
            <div class="name">
                <span>核素名称：</span>
            </div>
            <div class="value">
                <input type="text" class="myinput" :disabled="disabledFlag" v-model="value2">
            </div>
        </div>
        <div class="block">
            <div class="name">
                <span>场所：</span>
            </div>
            <div class="value">
                <input type="text" class="myinput" :disabled="disabledFlag" v-model="value3">
            </div>
        </div>
        <div class="block">
            <div class="name">
                <span>活动种类：</span>
            </div>
            <div class="value">
                <input type="text" class="myinput" :disabled="disabledFlag" v-model="value4">
            </div>
        </div>
        <div class="block">
            <div class="name">
                <span>年最大用量：</span>
            </div>
            <div class="value">
                <input type="text" class="myinput" :disabled="disabledFlag" v-model="value5">
            </div>
        </div> -->
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
                value1:"",
                value2:"",
                value3:"",
                value4:"",
                value5:"",
                value6:"",
                value7:"",
                value8:"",
                value9:"",
                value10:"",
                operateNum: 999, //操作类型 0查看详情 1修改
                disabledFlag: false,
                dataModel:[
                    {
                        enName:'activitiesType',
                        value:'',
                        cnName:'活动种类：'},
                    {
                        enName:'administrativeDivision',
                        value:'',
                        cnName:'行政区划：'},
                    {
                        enName:'annualMaximum',
                        value:'',
                        cnName:'年最大用量：'},
                    {
                        enName:'auditDate',
                        value:'',
                        cnName:'审核日期：'},
                    {
                        enName:'auditor',
                        value:'',
                        cnName:'审核人：'},
                    {
                        enName:'certificateNumber',
                        value:'',
                        cnName:'证件号码：'},
                    {
                        enName:'certificateType',
                        value:'',
                        cnName:'证件类型：'},
                    {
                        enName:'certifyingAuthority',
                        value:'',
                        cnName:'发证机关：'},
                    {
                        enName:'dwlatitude',
                        value:'',
                        cnName:'单位信息纬度：'},
                    {
                        enName:'dwlongitude',
                        value:'',
                        cnName:'单位信息经度：'},
                    {
                        enName:'dwremarks',
                        value:'',
                        cnName:'单位信息备注：'},
                    {
                        enName:'equivalentMaximumOperand',
                        value:'',
                        cnName:'日等效最大操作量：'},
                    {
                        enName:'fmfremark',
                        value:'',
                        cnName:'非密封台账备注：'},
                    {
                        enName:'frequency',
                        value:'',
                        cnName:'频次：'},
                    {
                        enName:'fsLicenseNo',
                        value:'',
                        cnName:'证书编号：'},
                    {
                        enName:'industryCategory',
                        value:'',
                        cnName:'行业类别：'},
                    {
                        enName:'legalPerPhone',
                        value:'',
                        cnName:'法人联系电话：'},
                    {
                        enName:'legalPerson',
                        value:'',
                        cnName:'法定代表人：'},
                    {
                        enName:'licenceConditions',
                        value:'',
                        cnName:'许可证条件：'},
                    {
                        enName:'matterType',
                        value:'',
                        cnName:'类型：'},
                    {
                        enName:'natureUnit',
                        value:'',
                        cnName:'单位性质：'},
                    {
                        enName:'nuclideName',
                        value:'',
                        cnName:'核素名称：'},
                    {
                        enName:'openingDate',
                        value:'',
                        cnName:'发证日期：'},
                    {
                        enName:'periodValidity',
                        value:'',
                        cnName:'有效期至：'},
                    {
                        enName:'purpose',
                        value:'',
                        cnName:'用途：'},
                    {
                        enName:'sealDegree',
                        value:'',
                        cnName:'密封程度：'},
                    {
                        enName:'sourceTo',
                        value:'',
                        cnName:'来源/去向：'},
                    {
                        enName:'totalActivity',
                        value:'',
                        cnName:'总活度：'},
                    {
                        enName:'typeApproval',
                        value:'',
                        cnName:'审批类型：'},
                    {
                        enName:'typeRange',
                        value:'',
                        cnName:'种类和范围：'},
                    {
                        enName:'tyshxydm',
                        value:'',
                        cnName:'统一社会信用代码：'},
                    {
                        enName:'unitAddress',
                        value:'',
                        cnName:'单位地址：'},
                    {
                        enName:'unitName',
                        value:'',
                        cnName:'单位名称：'},
                    {
                        enName:'workplaceGrade',
                        value:'',
                        cnName:'工作场所等级：'},
                    {
                        enName:'workplaceName',
                        value:'',
                        cnName:'工作场所名称：'},
                    {
                        enName:'remark',
                        value:'',
                        cnName:'备注：'},
                ]
            };
        },
        mounted() {
            this.getDetailData();
        },
        methods: {
            cancle() {
                this.closeIframe();
            },
            closeIframe() {
                this.frameIndex = parent.layer.getFrameIndex(window.name); //得到当前iframe层的索引
                parent.layer.close(this.frameIndex); //再执行关闭
            },
            showToggle: function (item) {
                item.isSubShow = !item.isSubShow;
            },
            // 获取上一个接口数据
            lastInterface() {
                let _this = this;
                _this.$http
                    .get(`${_this.baseurl}WorkplaceInfo/listJson`)
                    .then(function (res) {
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
                            url: `${this.baseurl}NontightInfo/data/${id}`
                        })
                        .then(function (res) {
                            if (res.status === 200 && res.data.status === '1') {
                                let datas = res.data.data;
                                for(let key in datas){
                                    _this.dataModel.map((item,index) => {
                                        if(key == item.enName){
                                            item.value = datas[key];
                                        }
                                    });
                                }
                                // _this.value1 = datas.unitName;
                                // _this.value2 = datas.nuclideName;
                                // _this.value3 = datas.workplaceName;
                                // _this.value4 = datas.annualMaximum;
                                // _this.value5 = datas.activitiesType;
                            }
                        });
                }
            }
        }
    }
</script>
<style scoped>
    .name {
        width: 117px;
    }

    .radio input[type="radio"]:checked+div {
        /*当radiuo被选中时，把input下边的div标签的背景图片替换掉*/
        background: url(../../assets/images/duigou.png) no-repeat;
    }
    .warp-weft{
        line-height: 25px;
    }
    .fs-window .value{
        width: 100px;
    }
    .remark .name{
        width: 100px;
    }
    .value .el-input__inner{
    margin: 0px !important;
    width: calc(100% - 0px) !important;
    }
</style>
