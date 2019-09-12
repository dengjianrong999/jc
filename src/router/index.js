import Vue from 'vue'
import Router from 'vue-router'
import RadiantEleSystem from '@/components/RadiantEleSystem'

// 放射源信息弹窗 
import RayDeviceQueryWD from '@/components/QueryAndCount/RayDeviceQueryWD'
import UnitInformationQueryWD from '@/components/QueryAndCount//UnitInformationQueryWD.vue'
import UnsealedRadioactivityWD from '@/components/QueryAndCount//UnsealedRadioactivityWD.vue'
import RadioactiveSourceQueryWD from '@/components/QueryAndCount//RadioactiveSourceQueryWD.vue'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: 'RadiantEleSystem',
        component: RadiantEleSystem
    },
    //射线装置查询 
    {
        path: '/RayDeviceQueryWD/:id',
        name: 'RayDeviceQueryWD',
        component: RayDeviceQueryWD
    },
 
    // 单位信息查询弹窗
    {
        path: '/UnitInformationQueryWD/:id',
        name: 'UnitInformationQueryWD',
        component: UnitInformationQueryWD
    },
    //非密封放射性物质查询
    {
        path: '/UnsealedRadioactivityWD/:id',
        name: 'UnsealedRadioactivityWD',
        component: UnsealedRadioactivityWD
    },
    //放射源查询
    {
        path: '/RadioactiveSourceQueryWD/:id',
        name: 'RadioactiveSourceQueryWD',
        component: RadioactiveSourceQueryWD
    }
    ]
})
