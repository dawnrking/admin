import searchElement from '../../components/search'
import tableElement from '../../components/table'
import tabElement from '../../components/tab'
import config from '../../api/config'
export default {
    data() {
        return {
            tableData: {},
            dialogFormVisible: false,
            formLabelWidth: '150px',
            form: {},
            formtitle: '下级人员详情',
            searchData: {
                ui_nickname: '',
                ui_gender: ''
            },
            pageTotal: 0,
            page: {
                page: 1,
                page_limit: 10
            },
            pageSizes: [],

        }
    },
    methods: {
        __msg(data) {
            this.$alert('用户信息有误，请重新登陆', data, {
                confirmButtonText: '确定',
                callback: action => {
                    this.$router.push({ path: '/login' });
                }
            });
        },
        __error(data) {
            switch (data) {
                case 401:
                    this.__msg(data);
                    break;
                case -404:
                    this.tableData = [];
                    this.pageTotal = 0;
                    break;
                default:
                    break;
            }
        },
        handleSizeChange(size) {
            this.page.page_limit = size;
            this.getList(this.page)
        },
        changePage(page) {
            this.page.page = page;
            this.getList(this.page)
        },
        // 下级人员详情
        subordinatedetail(item) {
            this.formtitle = '下级人员详情';
            this.dialogFormVisible = true;
            let data = {
                id: item.ui_id
            }
            config.__user.subordinatedetail(data).then((req) => {
                if (req.data.code === 0) {
                    this.form = req.data.data
                }
            }).catch((error) => {
                console.log(error.req)
                this.__error(error.response.status);
            })
        },
        // 会员捐赠详情
        projectdetail(item) {
            this.formtitle = '会员捐赠详情';
            this.dialogFormVisible = true;
            let data = {
                id: item.ui_id
            }
            config.__user.projectdetail(data).then((req) => {
                if (req.data.code === 0) {
                    this.form = req.data.data
                }
            }).catch((error) => {
                console.log(error.req)
                this.__error(error.response.status);
            })
        },
        // 查询
        onSubmit() {
            this.searchData.page = 1
            this.searchData.page_limit = 10
            this.getList(this.searchData)
        },
        // 获取列表
        getList(data) {
            config.__user.List(data).then((req) => {
                if (req.data.code === 0) {
                    this.tableData = req.data.data.data;
                    this.pageTotal = req.data.data.total;
                    let num = Math.ceil(parseInt(this.pageTotal, 10) / 10)
                    if (this.pageSizes.length < 1) {
                        for (var index = 0; index < num; index++) {
                            this.pageSizes.push((index + 1) * 10)
                        }
                    }
                }else {
                    this.__error(req.data.code);
                }
            }).catch((error) => {
                console.log(error.req)
                this.__error(error.response.status);
            })
        }
    },
    components: { searchElement, tableElement, tabElement },
    mounted() {
        this.$nextTick(function () {
            let data = {
                page: 1,
                page_limit: 10
            }
            this.getList(data)
        })
    },
    filters: {
        sex(data) {
            return ['未知', '男', '女'][data]
        }
    }
}