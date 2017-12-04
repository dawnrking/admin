import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            redirect: { name: 'login' },
        },
        {
            path: '/login', //登录
            name: 'login',
            component:resolve => require(['../view/login'],resolve)  
        },
        {
            path: '/index',
            name: 'index',
            component:resolve => require(['../view/index'],resolve), 
            redirect: { name: 'item_manage' },
            children: [
                {
                    path: '/index/item_manage',
                    name: 'item_manage',
                    component:resolve => require(['../view/content/item_manage'],resolve),
                    redirect: { name: 'item_list' },
                    children: [
                        {
                            path: '/index/item_manage/list',//项目管理
                            name: 'item_list',
                            component:resolve => require(['../view/content/item_list'],resolve),
                        },
                        {
                            path: '/index/item_manage/:id',//项目进度管理
                            name: 'item_process',
                            component:resolve => require(['../view/content/item_process'],resolve),
                        }
                    ]
                },
                {
                    path: '/index/feedback_manage', //用户反馈管理
                    name: 'feedback_manage',
                    component:resolve => require(['../view/content/feedback_manage'],resolve),
                },
                {
                    path: '/index/ad_manage',  //广告管理
                    name: 'ad_manage',
                    component:resolve => require(['../view/content/ad_manage'],resolve),
                },
                {
                    path: '/index/article_manage',  //文章管理
                    name: 'article_manage',
                    component:resolve => require(['../view/content/article_manage'],resolve),
                },
                // {
                //     path: '/index/service_manage',  //业务消息管理
                //     name: 'service_manage',
                //     component:resolve => require(['../view/content/service_manage'],resolve),
                // },
                {
                    path: '/index/item_manage', //项目管理
                    name: 'item_manage',
                    component:resolve => require(['../view/content/item_manage'],resolve),
                },
                {
                    path: '/index/info_manage',//通知信息管理
                    name: 'info_manage',
                    component:resolve => require(['../view/content/info_manage'],resolve),
                },
                {
                    path: '/index/user_manage', //用户管理
                    name: 'user_manage',
                    component:resolve => require(['../view/content/user_manage'],resolve),
                },
                {
                    path: '/index/order_manage',
                    name: 'order_manage',
                    component:resolve => require(['../view/content/order_manage'],resolve),
                    redirect: { name: 'order_list' },
                    children: [
                        {
                            path: '/index/order_manage/list',//订单管理
                            name: 'order_list',
                            component:resolve => require(['../view/content/order_list'],resolve),
                        },
                        {
                            path: '/index/order_manage/:id',//订单消息管理
                            name: 'service_manage',
                            component:resolve => require(['../view/content/service_manage'],resolve),
                        }
                    ]
                },
                {
                    path: '/index/generalize_manage/person',//推广员管理
                    name: 'generalize_person',
                    component:resolve => require(['../view/content/generalize_person'],resolve),
                },
                {
                    path: '/index/generalize_manage/work',//业务推广管理
                    name: 'generalize_work',
                    component:resolve => require(['../view/content/generalize_work'],resolve),
                }
                // {
                //     path: '/index/cropper', //图片裁剪
                //     name: 'cropper',
                //     component:resolve => require(['../view/content/cropper'],resolve),
                // },
            ]
        }
    ]
})
