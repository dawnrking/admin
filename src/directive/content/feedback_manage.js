import searchElement from '../../components/search'
import tableElement from '../../components/table'
import tabElement from '../../components/tab'
import config from '../../api/config'

export default {
    data() {
        return {
            tableData: {
                label: [
                    { name: '反馈标题', msgname: 'uf_title' },
                    { name: '客户的昵称', msgname: 'ui_nickname' },
                    { name: '手机号', msgname: 'uf_phone' },
                    { name: '反馈的内容', msgname: 'uf_content' },
                    { name: '手机号', msgname: 'uf_phone' },
                    { name: '反馈问题的时间', msgname: 'created_at' },
                    { name: '最后一次查看信息的时间', msgname: 'updated_at' },
                    {
                        name: '是否查看', msgname: 'uf_issee', filter: function (val) {
                            return ['未查看', '已查看'][val]
                        }
                    },
                ],
                data: [],
                opate: [
                    { name: '查看', opatename: 'edit' },
                ],
                all: 'uf_id'
            },
            dialogFormVisible: false,
            formLabelWidth: '150px',
            form: {
                ui_nickname: '',
                uf_content: '',
            },
            formtitle: '查看反馈问题',
            pageTotal: 0,
            page: {
                page: 1,
                page_limit: 10
            },
            pageSizes: [],
            searchData: {
                uf_issee: '',
                start_feedback_time: '',
                end_feedback_time: '',
            },
            delVal: []
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
                    this.tableData.data = [];
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
        acquire(data) {
            if (data.opate == 'edit') {
                this.edit(data.data)
            } else if (data.opate == 'msg') {
                this.delVal = data.data
            }
        },
        // 编辑
        edit(item) {
            Object.assign(this.form, item)
            let data = {
                uf_id: item.uf_id
            }
            config.__feedback.edit(data).then((req) => {
                if (req.data.code === 0) {
                    Object.assign(this.form, req.data.data)
                }
            }).catch((error) => {
                console.log(error.req)
                this.__error(error.response.status);
            })
            this.dialogFormVisible = true;
        },
        viewsubmit() {
            this.getList(this.searchData)
            this.dialogFormVisible = false;
        },
        // 删除
        del(item) {
            let val = this.delVal.toString();
            let data = {
                uf_id: val
            }
            this.$confirm('确定删除', '删除', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(({ value }) => {
                config.__feedback.del(data).then((req) => {
                    if (req.data.code === 0) {
                        this.delVal = [];
                        this.$message('删除成功');
                        this.getList({ page: 1 })
                    }
                }).catch((error) => {
                    console.log(error.req)
                    this.__error(error.response.status);
                })
            })
            
        },
        // 查询
        onSubmit() {
            this.searchData.start_feedback_time =this.searchData.start_feedback_time?this.timeFormat(this.searchData.start_feedback_time):'';
            this.searchData.end_feedback_time =this.searchData.end_feedback_time?this.timeFormat(this.searchData.end_feedback_time):'';
            this.getList(this.searchData);        
        },
        timeFormat(val) {
            let time = new Date(val);
            var o = {
                Y: time.getFullYear(), //年
                M: time.getMonth()>8?time.getMonth()+1:'0'+(time.getMonth()+1), //月份 
                d: time.getDate()>9?time.getDate():'0'+time.getDate(), //日 
                h: time.getHours()>9?time.getHours():'0'+time.getHours(), //时 
                m: time.getMinutes()>9?time.getMinutes():'0'+time.getMinutes(), //分 
                s: time.getSeconds()>9?time.getSeconds():'0'+time.getSeconds(), //秒 
            };
            return `${o.Y}-${o.M}-${o.d} ${o.h}:${o.m}:${o.s}`
        },
        // 获取列表
        getList(data) {
            config.__feedback.List(data).then((req) => {
                if (req.data.code === 0) {
                    this.tableData.data = req.data.data.data
                    this.pageTotal = req.data.data.total;
                    let num = Math.ceil(parseInt(this.pageTotal, 10) / 10)
                    if (this.pageSizes.length < 1) {
                        for (var index = 0; index < num; index++) {
                            this.pageSizes.push((index + 1) * 10)
                        }
                    }
                } else {
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
    }
}