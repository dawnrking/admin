import navElement from '../components/nav'
import headerElement from '../components/header'
import config from '../api/config'
import storage from '../utlis/storage'

export default {
    data() {
        return {
            msg: 'hello this is index',
            activeNames: ['1'],
            navData: [
                {
                    id: '1',
                    class: 'el-icon-message',
                    path: 'item_manage',
                    fullpath: 'item_list',
                    name: '项目管理'
                },
                {
                    id: '2',
                    class: 'el-icon-menu',
                    path: 'order_manage',
                    fullpath: 'order_list',
                    name: '订单列表'
                },
                {
                    id: '3',
                    class: 'el-icon-message',
                    path: 'user_manage',
                    name: '用户管理'
                },
                {
                    id: '4',
                    class: 'el-icon-message',
                    path: 'info_manage',
                    name: '通知信息管理'
                },
                {
                    id: '5',
                    class: 'el-icon-message',
                    path: 'ad_manage',
                    name: '广告管理'
                },
                // {
                //     id: '6',
                //     class: 'el-icon-message',
                //     path: 'service_manage',
                //     name: '业务消息管理'
                // },
                {
                    id: '7',
                    class: 'el-icon-message',
                    path: 'article_manage',
                    name: '文章管理'
                },
                {
                    id: '8',
                    class: 'el-icon-setting',
                    path: 'feedback_manage',
                    name: '客户反馈管理'
                },
                {
                    id: '9',
                    class: 'el-icon-menu',
                    path: 'generalize_manage',
                    name: '推广管理',
                    children: [
                        {
                            id: '10',
                            class: 'el-icon-message',
                            path: 'generalize_manage/person',
                            name: '推广员管理',
                        },
                        {
                            id: '11',
                            class: 'el-icon-message',
                            path: 'generalize_manage/work',
                            name: '业务推广管理',
                        }
                    ]
                },
                // {
                //     id: '8',
                //     class: 'el-icon-message',
                //     path: 'donate_manage',
                //     name: '捐赠项目管理'
                // },
                // {
                //     id: '9',
                //     class: 'el-icon-menu',
                //     path: 'vip_manage',
                //     name: '会员管理'
                // },
                // {
                //     id: '10',
                //     class: 'el-icon-upload',
                //     path: 'donation_manage',
                //     name: '捐赠品管理'
                // },
                
            ],
            headData: {
                userName: ''
            }
        }
    },
    methods: {
        handleClick() {
            console.log(1);
        },
        changePage(page) {
            console.info(page)
        },
        navpath(data) {
            this.$router.push({path:`/index/${data}`})
        },
        quit() {
            this.$router.push({ path: '/login' });
            storage.clear()
        }
    },
    mounted () {
        this.$nextTick(function () {
            this.headData.userName = storage.getItem('userName');
        })
    },
    components: {  navElement, headerElement }
}