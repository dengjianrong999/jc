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
                <input type="text" class="myinput" :disabled="disabledFlag" v-model="unitName">
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
                <span>活动种类：</span>
            </div>
            <div class="value">
                <input type="text" class="myinput" :disabled="disabledFlag" v-model="activitiesType">
            </div>
        </div>
        <div class="block">
            <div class="name">
                <span>批准的总活度：</span>
            </div>
            <div class="value">
                <input type="text" class="myinput" :disabled="disabledFlag" v-model="totalApprovedActivity">
            </div>
        </div>
        <div class="block">
            <div class="name">
                <span>活度：</span>
            </div>
            <div class="value">
                <input type="text" class="myinput" :disabled="disabledFlag" v-model="activity">
            </div>
        </div>
        <div class="block">
            <div class="name">
                <span>核素名称：</span>
            </div>
            <div class="value">
                <input type="text" class="myinput" :disabled="disabledFlag" v-model="nuclideName">
            </div>
        </div>
        <div class="block">
            <div class="name">
                <span>类型：</span>
            </div>
            <div class="value">
                <input type="text" class="myinput" :disabled="disabledFlag" v-model="radiatiotType">
            </div>
        </div>
        <div class="block">
            <div class="name">
                <span>密封程度：</span>
            </div>
            <div class="value">
                <div class="radio">
                    <label>
                        <input type="radio" name="types" id="fixed" value="" :checked="sealDegree == '密封' ? true : false" />
                        <div class="option"></div>
                        <label >密封</label>
                    </label>
                </div>
                <div class="radio">
                    <label>
                        <input type="radio" name="types" :checked="sealDegree == '非密封' ? true : false" id="move" value="" />
                        <div class="option"></div>
                        <label >非密封</label>
                    </label>
                </div>
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
                <span>用途：</span>
            </div>
            <div class="value">
                <input type="text" class="myinput" :disabled="disabledFlag" v-model="purpose">
            </div>
        </div> -->
        <!-- <div class="remark">
            <div class="name">
                <span>备注：</span>
            </div>
            <div class="value">
                <textarea type="text" class="myinput" :disabled="disabledFlag" v-model="remarks"></textarea>
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
                pkid: Date.parse(new Date()),
                unitName:"",
                belongWorkplace: "",
                radiationName:'',
                radiatiotType:'',
                activitiesType:"",
                totalApprovedActivity:'',
                activity:'',
                ratifyMaximumNumber:'',
                nuclideName: "",
                manufacturer: "",
                factoryModeration: "",
                label: "",
                latitude: "",
                longitude: "",
                sealDegree:'',
                radiationsourceCode: "",
                category: "",
                purpose: "",
                sourceDirection: "",
                remarks: "",
                productTime: '',
                operateNum: 999, //操作类型 0查看详情 1修改
                disabledFlag: false,
                dataModel:[
                    {
                        enName:'activitiesType',
                        value:'',
                        cnName:'活动种类：'},
                    {
                        enName:'activity',
                        value:'',
                        cnName:'活度：'},
                    {
                        enName:'administrativeDivision',
                        value:'',
                        cnName:'行政区划：'},
                    {
                        enName:'auditDate',
                        value:'',
                        cnName:'审核日期：'},
                    {
                        enName:'auditor',
                        value:'',
                        cnName:'审核人：'},
                    {
                        enName:'category',
                        value:'',
                        cnName:'放射源类别：'},
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
                        enName:'encoding',
                        value:'',
                        cnName:'编码：'},
                    {
                        enName:'fsLicenseNo',
                        value:'',
                        cnName:'证书编号：'},
                    {
                        enName:'fsycategory',
                        value:'',
                        cnName:'放射源台账类别：'},
                    {
                        enName:'fsyremark',
                        value:'',
                        cnName:'放射源台账备注：'},
                    {
                        enName:'industryCategory',
                        value:'',
                        cnName:'行业类别：'},
                    {
                        enName:'label',
                        value:'',
                        cnName:'标号：'},
                    {
                        enName:'latitude',
                        value:'',
                        cnName:'纬度：'},
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
                        enName:'longitude',
                        value:'',
                        cnName:'经度：'},
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
                        enName:'radiatiotType',
                        value:'',
                        cnName:'辐射源类型：'},
                    {
                        enName:'releaseActivity',
                        value:'',
                        cnName:'出厂活度：'},
                    {
                        enName:'releaseDate',
                        value:'',
                        cnName:'出厂日期：'},
                    {
                        enName:'sealDegree',
                        value:'',
                        cnName:'密封程度：'},
                    {
                        enName:'sourceTo',
                        value:'',
                        cnName:'来源/去向：'},
                    {
                        enName:'totalApprovedActivity',
                        value:'',
                        cnName:'批准的总活度：'},
                    {
                        enName:'totalNumber',
                        value:'',
                        cnName:'总枚数：'},
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
                        cnName:'所属单位名称：'},
                    {
                        enName:'remarks',
                        value:'',
                        cnName:'备注：'},
                ]
            };
        },
        mounted() {

            this.getDetailData();
            //时间插件
            let _this = this;
            setTimeout(function () {
                layui.use("laydate", function () {
                    var laydate = layui.laydate;
                    //执行一个laydate实例
                    laydate.render({
                        elem: "#surface1", //指定元素
                        type: "datetime",
                        done: function (value) {
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
                            url: `${this.baseurl}rediationsource/data/${id}`
                        })
                        .then(function (res) {
                             console.log('ss',res)
                            if (res.status === 200 && res.data.status === '1') {
                                let datas = res.data.data;
                               
                                for(let key in datas){
                                    _this.dataModel.map((item,index) => {
                                        if(key == item.enName){
                                            item.value = datas[key];
                                        }
                                    });
                                }

                                // _this.details = res.data.data;
                                //     _this.unitName = _this.details.unitName;
                                //     _this.belongWorkplace = _this.details.belongWorkplace;
                                //     _this.radiationName = _this.details.radiationName;
                                //     _this.details.radiatiotType = _this.details.radiatiotType== 67 ? '固定源' : '移动源'
                                //     _this.radiatiotType = _this.details.radiatiotType;
                                //     _this.activitiesType = _this.details.activitiesType;
                                //     _this.totalApprovedActivity = _this.details.totalApprovedActivity;
                                //     _this.activity = _this.details.activity;
                                //     _this.ratifyMaximumNumber = _this.details.ratifyMaximumNumber;
                                // _this.nuclideName = _this.details.nuclideName;
                                //     _this.manufacturer = _this.details.manufacturer;
                                //     _this.factoryModeration = _this.details.factoryModeration;
                                //     _this.label = _this.details.label;
                                //     _this.latitude = _this.details.latitude;
                                //     _this.longitude = _this.details.longitude;
                                //     _this.sealDegree = _this.details.sealDegree;
                                //     _this.radiationsourceCode = _this.details.radiationsourceCode;
                                //     _this.category = _this.details.category;
                                //     _this.purpose = _this.details.purpose;
                                //     _this.sourceDirection = _this.details.sourceDirection;
                                //     _this.productTime = _this.details.productTime;
                                //     _this.remarks = _this.details.remarks;
                                //     _this.pkid = _this.details.pkid;
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


</style>
