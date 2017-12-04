import axios from 'axios'
import Qs from 'qs'

var def = axios.create({
    // 本地
    baseURL: 'http://farmingapi.dev/admin/',
    // 测试服务器
    // baseURL: 'http://farming.llf360.com/admin/',
    // 正式服
    // baseURL: 'http://www.shanxiwelfare.com/admin/',
    headers: {
        // 'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded',
    },
});
// 登陆接口
var __login = {
    postLogin: (data) => {
        def.defaults.headers['Authorization'] = '';
        // def.defaults.headers.common['token'] = '';
        //def.defaults.headers.common['manageid'] = '';
        return def({
            url: 'login',
            method: 'post',
            data: data,
            transformRequest: [function (data) {
                // 对 data 进行任意转换处理
                // 方法一
                // let ret = ''
                // for (let it in data) {
                //     ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                // }
                // return ret

                // 方法二
                return Qs.stringify(data)
            }],
        })
    }
}

//项目管理
var __project = {
    // 列表
    List: (data) => {
        def.defaults.headers['Authorization'] = localStorage.getItem('TOKEN');
        //def.defaults.headers.common['manageid'] = localStorage.getItem('manageid');
        return def({
            url: `project/list`,
            method: 'get',
            params: data,
            paramsSerializer: function (params) {
                return Qs.stringify(params, { arrayFormat: 'brackets' })
            },
        })
    },
    // 详情
    detail: (data) => {
        def.defaults.headers['Authorization'] = localStorage.getItem('TOKEN');
        //def.defaults.headers.common['manageid'] = localStorage.getItem('manageid');
        return def({
            url: `project/detail`,
            method: 'get',
            params: data,
            paramsSerializer: function (params) {
                return Qs.stringify(params, { arrayFormat: 'brackets' })
            },
        })
    },
    // 新增
    add: (data) => {
        def.defaults.headers['Authorization'] = localStorage.getItem('TOKEN');
        //def.defaults.headers.common['manageid'] = localStorage.getItem('manageid');
        return def({
            url: `project/add`,
            method: 'post',
            data: data,
            transformRequest: [function (data) {
                return Qs.stringify(data)
            }],
        })
    },
    // 修改
    edit: (data) => {
        def.defaults.headers['Authorization'] = localStorage.getItem('TOKEN');
        //def.defaults.headers.common['manageid'] = localStorage.getItem('manageid');
        return def({
            url: `project/edit`,
            method: 'post',
            data: data,
            transformRequest: [function (data) {
                return Qs.stringify(data)
            }],
        })
    },
    // 删除
    del: (data) => {
        def.defaults.headers['Authorization'] = localStorage.getItem('TOKEN');
        //def.defaults.headers.common['manageid'] = localStorage.getItem('manageid');
        return def({
            url: `project/del`,
            method: 'post',
            data: data,
            transformRequest: [function (data) {
                return Qs.stringify(data)
            }],
        })
    },
    // 收益返还
    earnings: (data) => {
        def.defaults.headers['Authorization'] = localStorage.getItem('TOKEN');
        //def.defaults.headers.common['manageid'] = localStorage.getItem('manageid');
        return def({
            url: `project/earnings`,
            method: 'post',
            data: data,
            transformRequest: [function (data) {
                return Qs.stringify(data)
            }],
        })
    }
}
//项目进度管理
var __projectevolve = {
    // 列表
    List: (data) => {
        def.defaults.headers['Authorization'] = localStorage.getItem('TOKEN');
        //def.defaults.headers.common['manageid'] = localStorage.getItem('manageid');
        return def({
            url: `projectevolve/list`,
            method: 'get',
            params: data,
            paramsSerializer: function (params) {
                return Qs.stringify(params, { arrayFormat: 'brackets' })
            },
        })
    },
    // 详情
    detail: (data) => {
        def.defaults.headers['Authorization'] = localStorage.getItem('TOKEN');
        //def.defaults.headers.common['manageid'] = localStorage.getItem('manageid');
        return def({
            url: `projectevolve/detail`,
            method: 'get',
            params: data,
            paramsSerializer: function (params) {
                return Qs.stringify(params, { arrayFormat: 'brackets' })
            },
        })
    },
    // 新增
    add: (data) => {
        def.defaults.headers['Authorization'] = localStorage.getItem('TOKEN');
        //def.defaults.headers.common['manageid'] = localStorage.getItem('manageid');
        return def({
            url: `projectevolve/add`,
            method: 'post',
            data: data,
            transformRequest: [function (data) {
                return Qs.stringify(data)
            }],
        })
    },
    // 修改
    edit: (data) => {
        def.defaults.headers['Authorization'] = localStorage.getItem('TOKEN');
        //def.defaults.headers.common['manageid'] = localStorage.getItem('manageid');
        return def({
            url: `projectevolve/edit`,
            method: 'post',
            data: data,
            transformRequest: [function (data) {
                return Qs.stringify(data)
            }],
        })
    },
    // 删除
    del: (data) => {
        def.defaults.headers['Authorization'] = localStorage.getItem('TOKEN');
        //def.defaults.headers.common['manageid'] = localStorage.getItem('manageid');
        return def({
            url: `projectevolve/del`,
            method: 'post',
            data: data,
            transformRequest: [function (data) {
                return Qs.stringify(data)
            }],
        })
    }
}
// 用户反馈
var __feedback = {
    // 列表
    List: (data) => {
        def.defaults.headers['Authorization'] = localStorage.getItem('TOKEN');
        //def.defaults.headers.common['manageid'] = localStorage.getItem('manageid');
        return def({
            url: `feedback/list`,
            method: 'get',
            params: data,
            paramsSerializer: function (params) {
                return Qs.stringify(params, { arrayFormat: 'brackets' })
            },
        })
    },
    // 修改反馈
    edit: (data) => {
        def.defaults.headers['Authorization'] = localStorage.getItem('TOKEN');
        //def.defaults.headers.common['manageid'] = localStorage.getItem('manageid');
        return def({
            url: `feedback/edit`,
            method: 'post',
            data: data,
            transformRequest: [function (data) {
                return Qs.stringify(data)
            }],
        })
    },
    // 删除反馈
    del: (data) => {
        def.defaults.headers['Authorization'] = localStorage.getItem('TOKEN');
        //def.defaults.headers.common['manageid'] = localStorage.getItem('manageid');
        return def({
            url: `feedback/del`,
            method: 'post',
            data: data,
            transformRequest: [function (data) {
                return Qs.stringify(data)
            }],
        })
    },
}
// 文章管理
var __article = {
    // 列表
    List: (data) => {
        def.defaults.headers['Authorization'] = localStorage.getItem('TOKEN');
        //def.defaults.headers.common['manageid'] = localStorage.getItem('manageid');
        return def({
            url: `article/list`,
            method: 'get',
            params: data,
            paramsSerializer: function (params) {
                return Qs.stringify(params, { arrayFormat: 'brackets' })
            },
        })
    },
    // 添加
    add: (data) => {
        def.defaults.headers['Authorization'] = localStorage.getItem('TOKEN');
        //def.defaults.headers.common['manageid'] = localStorage.getItem('manageid');
        return def({
            url: `article/add`,
            method: 'post',
            data: data,
            transformRequest: [function (data) {
                return Qs.stringify(data)
            }],
        })
    },
    // 修改
    edit: (data) => {
        def.defaults.headers['Authorization'] = localStorage.getItem('TOKEN');
        //def.defaults.headers.common['manageid'] = localStorage.getItem('manageid');
        return def({
            url: `article/edit`,
            method: 'post',
            data: data,
            transformRequest: [function (data) {
                return Qs.stringify(data)
            }],
        })
    },
    // 删除
    del: (data) => {
        def.defaults.headers['Authorization'] = localStorage.getItem('TOKEN');
        //def.defaults.headers.common['manageid'] = localStorage.getItem('manageid');
        return def({
            url: `article/del`,
            method: 'post',
            data: data,
            transformRequest: [function (data) {
                return Qs.stringify(data)
            }],
        })
    },
}
// 用户管理
var __user = {
    // 列表
    List: (data) => {
        def.defaults.headers['Authorization'] = localStorage.getItem('TOKEN');
        //def.defaults.headers.common['manageid'] = localStorage.getItem('manageid');
        return def({
            url: `user/list`,
            method: 'get',
            params: data,
            paramsSerializer: function (params) {
                return Qs.stringify(params, { arrayFormat: 'brackets' })
            },
        })
    },
    // 添加
    add: (data) => {
        def.defaults.headers['Authorization'] = localStorage.getItem('TOKEN');
        //def.defaults.headers.common['manageid'] = localStorage.getItem('manageid');
        return def({
            url: `user/add`,
            method: 'post',
            data: data,
            transformRequest: [function (data) {
                return Qs.stringify(data)
            }],
        })
    },
    // 修改
    edit: (data) => {
        def.defaults.headers['Authorization'] = localStorage.getItem('TOKEN');
        //def.defaults.headers.common['manageid'] = localStorage.getItem('manageid');
        return def({
            url: `user/edit`,
            method: 'post',
            data: data,
            transformRequest: [function (data) {
                return Qs.stringify(data)
            }],
        })
    },
    // 删除
    del: (data) => {
        def.defaults.headers['Authorization'] = localStorage.getItem('TOKEN');
        //def.defaults.headers.common['manageid'] = localStorage.getItem('manageid');
        return def({
            url: `user/del`,
            method: 'post',
            data: data,
            transformRequest: [function (data) {
                return Qs.stringify(data)
            }],
        })
    },
}
// 广告管理
var __ad = {
    // 列表
    List: (data) => {
        def.defaults.headers['Authorization'] = localStorage.getItem('TOKEN');
        //def.defaults.headers.common['manageid'] = localStorage.getItem('manageid');
        return def({
            url: `ad/list`,
            method: 'get',
            params: data,
            paramsSerializer: function (params) {
                return Qs.stringify(params, { arrayFormat: 'brackets' })
            },
        })
    },
    // 添加
    add: (data) => {
        def.defaults.headers['Authorization'] = localStorage.getItem('TOKEN');
        //def.defaults.headers.common['manageid'] = localStorage.getItem('manageid');
        return def({
            url: `ad/add`,
            method: 'post',
            data: data,
            transformRequest: [function (data) {
                return Qs.stringify(data)
            }],
        })
    },
    // 修改
    edit: (data) => {
        def.defaults.headers['Authorization'] = localStorage.getItem('TOKEN');
        //def.defaults.headers.common['manageid'] = localStorage.getItem('manageid');
        return def({
            url: `ad/edit`,
            method: 'post',
            data: data,
            transformRequest: [function (data) {
                return Qs.stringify(data)
            }],
        })
    },
    // 删除
    del: (data) => {
        def.defaults.headers['Authorization'] = localStorage.getItem('TOKEN');
        //def.defaults.headers.common['manageid'] = localStorage.getItem('manageid');
        return def({
            url: `ad/del`,
            method: 'post',
            data: data,
            transformRequest: [function (data) {
                return Qs.stringify(data)
            }],
        })
    },
}
// 订单列表
var __order = {
    List: (data) => {
        def.defaults.headers['Authorization'] = localStorage.getItem('TOKEN');
        //def.defaults.headers.common['manageid'] = localStorage.getItem('manageid');
        return def({
            url: `order/list`,
            method: 'get',
            params: data,
            paramsSerializer: function (params) {
                return Qs.stringify(params, { arrayFormat: 'brackets' })
            },
        })
    },
     // 添加
     addredit: (data) => {
        def.defaults.headers['Authorization'] = localStorage.getItem('TOKEN');
        //def.defaults.headers.common['manageid'] = localStorage.getItem('manageid');
        return def({
            url: `order/addredit`,
            method: 'post',
            data: data,
            transformRequest: [function (data) {
                return Qs.stringify(data)
            }],
        })
    },
     // 订单状态修改
     statusedit: (data) => {
        def.defaults.headers['Authorization'] = localStorage.getItem('TOKEN');
        //def.defaults.headers.common['manageid'] = localStorage.getItem('manageid');
        return def({
            url: `order/statusedit`,
            method: 'post',
            data: data,
            transformRequest: [function (data) {
                return Qs.stringify(data)
            }],
        })
    },
    // 订单回报
    orderreturn: (data) => {
        def.defaults.headers['Authorization'] = localStorage.getItem('TOKEN');
        //def.defaults.headers.common['manageid'] = localStorage.getItem('manageid');
        return def({
            url: `order/orderreturn`,
            method: 'post',
            data: data,
            transformRequest: [function (data) {
                return Qs.stringify(data)
            }],
        })
    },
    // 获取第三章回报的收益钱
    projectmoney: (data) => {
        def.defaults.headers['Authorization'] = localStorage.getItem('TOKEN');
        //def.defaults.headers.common['manageid'] = localStorage.getItem('manageid');
        return def({
            url: `order/projectmoney`,
            method: 'post',
            data: data,
            transformRequest: [function (data) {
                return Qs.stringify(data)
            }],
        })
    },
}
// 通知消息管理
var __message = {
    // 列表
    List: (data) => {
        def.defaults.headers['Authorization'] = localStorage.getItem('TOKEN');
        //def.defaults.headers.common['manageid'] = localStorage.getItem('manageid');
        return def({
            url: `message/list`,
            method: 'get',
            params: data,
            paramsSerializer: function (params) {
                return Qs.stringify(params, { arrayFormat: 'brackets' })
            },
        })
    },
    // 添加
    add: (data) => {
        def.defaults.headers['Authorization'] = localStorage.getItem('TOKEN');
        //def.defaults.headers.common['manageid'] = localStorage.getItem('manageid');
        return def({
            url: `message/add`,
            method: 'post',
            data: data,
            transformRequest: [function (data) {
                return Qs.stringify(data)
            }],
        })
    },
    // 修改
    edit: (data) => {
        def.defaults.headers['Authorization'] = localStorage.getItem('TOKEN');
        //def.defaults.headers.common['manageid'] = localStorage.getItem('manageid');
        return def({
            url: `message/edit`,
            method: 'post',
            data: data,
            transformRequest: [function (data) {
                return Qs.stringify(data)
            }],
        })
    },
    // 删除
    del: (data) => {
        def.defaults.headers['Authorization'] = localStorage.getItem('TOKEN');
        //def.defaults.headers.common['manageid'] = localStorage.getItem('manageid');
        return def({
            url: `message/del`,
            method: 'post',
            data: data,
            transformRequest: [function (data) {
                return Qs.stringify(data)
            }],
        })
    },
}
// 业务消息管理
var __service = {
    // 列表
    List: (data) => {
        def.defaults.headers['Authorization'] = localStorage.getItem('TOKEN');
        //def.defaults.headers.common['manageid'] = localStorage.getItem('manageid');
        return def({
            url: `service/list`,
            method: 'get',
            params: data,
            paramsSerializer: function (params) {
                return Qs.stringify(params, { arrayFormat: 'brackets' })
            },
        })
    },
    // 添加
    add: (data) => {
        def.defaults.headers['Authorization'] = localStorage.getItem('TOKEN');
        //def.defaults.headers.common['manageid'] = localStorage.getItem('manageid');
        return def({
            url: `service/add`,
            method: 'post',
            data: data,
            transformRequest: [function (data) {
                return Qs.stringify(data)
            }],
        })
    },
    // 修改
    edit: (data) => {
        def.defaults.headers['Authorization'] = localStorage.getItem('TOKEN');
        //def.defaults.headers.common['manageid'] = localStorage.getItem('manageid');
        return def({
            url: `service/edit`,
            method: 'post',
            data: data,
            transformRequest: [function (data) {
                return Qs.stringify(data)
            }],
        })
    },
    // 删除
    del: (data) => {
        def.defaults.headers['Authorization'] = localStorage.getItem('TOKEN');
        //def.defaults.headers.common['manageid'] = localStorage.getItem('manageid');
        return def({
            url: `service/del`,
            method: 'post',
            data: data,
            transformRequest: [function (data) {
                return Qs.stringify(data)
            }],
        })
    },
}
// 上传图片
var __upload = {
    // 获取签名
    getosskey: (data)=>{
        def.defaults.headers['Authorization'] = localStorage.getItem('TOKEN');
        //def.defaults.headers.common['manageid'] = localStorage.getItem('manageid');
        return def({
            url: `upload/osskey`,
            method: 'get',
            params: data,
            transformRequest: [function (params) {
                return Qs.stringify(params, { arrayFormat: 'brackets' })
            }],
        })
    },
    // 上传图片
    img: (data) => {
        def.defaults.headers['Authorization'] = localStorage.getItem('TOKEN');
        //def.defaults.headers.common['manageid'] = localStorage.getItem('manageid');
        return def({
            url: `upload/img`,
            method: 'post',
            data: data,
            transformRequest: [function (data) {
                return Qs.stringify(data)
            }],
        })
    },
}

// 推广管理
var __extension = {
    // 推广员列表
    List: (data)=>{
        def.defaults.headers['Authorization'] = localStorage.getItem('TOKEN');
        return def({
            url: `extension/list`,
            method: 'get',
            params: data,
            transformRequest: [function (params) {
                return Qs.stringify(params, { arrayFormat: 'brackets' })
            }],
        })
    },
    // 检索用户
    all: (data)=>{
        def.defaults.headers['Authorization'] = localStorage.getItem('TOKEN');
        return def({
            url: `extension/all`,
            method: 'get',
            params: data,
            transformRequest: [function (params) {
                return Qs.stringify(params, { arrayFormat: 'brackets' })
            }],
        })
    },
    // 新增
    add: (data) => {
        def.defaults.headers['Authorization'] = localStorage.getItem('TOKEN');
        return def({
            url: `extension/add`,
            method: 'post',
            data: data,
            transformRequest: [function (data) {
                return Qs.stringify(data)
            }],
        })
    },
    // 新增
    inventer: (data) => {
        def.defaults.headers['Authorization'] = localStorage.getItem('TOKEN');
        return def({
            url: `extension/inventer`,
            method: 'post',
            data: data,
            transformRequest: [function (data) {
                return Qs.stringify(data)
            }],
        })
    },
    // 业务推广列表
    extensionorderlist: (data)=>{
        def.defaults.headers['Authorization'] = localStorage.getItem('TOKEN');
        return def({
            url: `extension/extensionorderlist`,
            method: 'get',
            params: data,
            transformRequest: [function (params) {
                return Qs.stringify(params, { arrayFormat: 'brackets' })
            }],
        })
    },
    exportexcel: ()=> {
       return `${def.defaults.baseURL}exportexcel`
    }
}

export default { __login,__project,__projectevolve,__feedback,__article,__user,__ad, __order,__message,__service,__upload,__extension}