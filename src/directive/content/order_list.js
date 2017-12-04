import searchElement from '../../components/search'
import tableElement from '../../components/table'
import tabElement from '../../components/tab'
import config from '../../api/config'

export default {
    data() {
        return {
            msg: 'hello this is index',
            activeNames: ['1'],
            tableData: {
                label: [
                    { name: '用户昵称', msgname: 'ui_nickname' },
                    { name: '收件人姓名', msgname: 'o_name' },
                    { name: '收件人电话', msgname: 'o_phone' },
                    { name: '收件人地址', msgname: 'o_address' },
                    { name: '订单号', msgname: 'o_order_number' },
                    { name: '众筹项目名称', msgname: 'p_project_name' },
                    { name: '众筹总金额', msgname: 'o_money' },
                    { name: '众筹份数', msgname: 'o_number' },
                    { 
                        name: '认筹回报方式', msgname: 'o_return_type', filter: function (val) {
                            return ['产品 ', '本金+产品', '本金+利率'][val]
                        } 
                    },
                    { name: '下单时间', msgname: 'o_order_time' },
                    { 
                        name: '支付状态', msgname: 'o_payment_status', filter: function (val) {
                            return ['未支付 ', '已支付'][val]
                        } 
                    },
                    { 
                        name: '回报状态', msgname: 'o_type_status', filter: function (val) {
                            return ['未回报 ', '已回报','用户确认已完成'][val]
                        } 
                    },

                ],
                data: [],
                opate: [
                    { name: '修改地址', opatename: 'editaddress' },
                    { name: '订单状态', opatename: 'itemstatus' },
                    { name: '业务消息', opatename: 'orderserve' },
                    { 
                        name: '回报', opatename: 'shipments',msgname: 'p_status',valname:'o_return_type', filter: function (val,jugval) {
                            if (jugval == 3) {
                                return ['发货','回报','收益'][val]
                            }else {
                                return
                            }
                            
                            
                        }  
                    },
                    
                ],
                // all: ''
            },
            img: false,
            dialogFormVisible: false,
            formLabelWidth: '150px',
            form: {
                o_id: '',
                o_type_status: '',
            },
            report:{
                o_id: '',
                o_pid: '',
                s_return_type: '',
                s_express_num: '',
                s_express_name: '',
                s_money: '',
                money:'',
                num:''
            },
            formtitle: '修改订单状态',
            rules: {
                o_type_status: [
                    { required: true, message: '请选择订单状态', trigger: 'change' },
                ],
                s_express_num: [
                    { required: true, message: '请填写快递单号', trigger: 'blur' },
                ],
                s_express_name: [
                    { required: true, message: '请填写快递名称', trigger: 'blur' },
                ],
                s_money: [
                    { required: true, message: '请填写收益金额', trigger: 'blur' },
                ],
            },
            delVal: [],
            pageTotal: 0,
            page: {
                page: 1,
                page_limit: 10,
                ui_nickname: '',
                o_order_number: '',
                o_name: '',
                o_payment_status: '',
            },
            pageSizes: [],
            // searchData: {
            //     ui_nickname: '',
            //     utl_order_number: ''
            // }
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
            } else if (data.opate == 'editaddress') {
                this.$prompt('地址:', '修改地址', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputValue:data.data.o_address,
                    inputValidator(val){
                        if (!val) {
                            return false
                        }
                    },
                    inputErrorMessage: '请填写地址'
                  }).then(({ value }) => {
                      let msg = {
                        o_id: data.data.o_id,
                        o_name: data.data.o_name,
                        o_phone: data.data.o_phone,
                        o_address: value,
                      }
                      this.editaddress(msg)
                  })
            }else if (data.opate == 'itemstatus') {
                this.form.o_id =data.data.o_id;
                this.formtitle='修改订单状态';
                this.dialogFormVisible = true;
            }else if (data.opate == 'shipments') {
                this.formtitle='回报';
                this.report = {
                    o_id: '',
                    o_pid: '',
                    s_return_type: '',
                    s_express_num: '',
                    s_express_name: '',
                    s_money: '',
                    money:'',
                    num:''
                },
                this.report.o_id = data.data.o_id;
                this.report.o_pid = data.data.o_pid;
                this.report.s_return_type = data.data.o_return_type.toString();
                this.report.money = data.data.o_money;
                this.report.num = data.data.o_number;
                let msg = {
                    o_id : data.data.o_id,
                    o_pid: data.data.o_pid,
                }
                if (data.data.o_return_type == 2) {
                    this.projectmoney(msg)
                }
                this.dialogFormVisible = true;
            }else if (data.opate == 'orderserve') {
                this.$router.push({path:'/index/order_manage/'+data.data.o_id})
            }
        },
        // 获取第三种回报的收益
        projectmoney (data) {
            config.__order.projectmoney(data).then((req) => {
                if (req.data.code === 0) {
                    this.report.s_money = req.data.data*this.report.num
                } else {
                    this.__error(req.data.code);
                }
            }).catch((error) => {
                console.log(error.req)
                this.__error(error.response.status);
            })
        },
        // 修改地址
        editaddress (data) {
            config.__order.addredit(data).then((req) => {
                if (req.data.code === 0) {
                    let data = {
                        page: 1,
                        page_limit: 10
                    }
                    this.getList(data)
                } else {
                    this.__error(req.data.code);
                }
            }).catch((error) => {
                console.log(error.req)
                this.__error(error.response.status);
            })
        },
        // 订单状态修改
        submit(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if (this.formtitle =='修改订单状态') {
                        config.__order.statusedit(this.form).then((req) => {
                            if (req.data.code === 0) {
                                this.$message('订单状态修改成功');
                                this.getList({ page: 1 })
                            } else if (req.data.code === -409) {
                                this.$message(req.data.msg);
                            }
                            this.$refs[formName].resetFields();
                            this.dialogFormVisible = false;
                        }).catch((error) => {
                            console.log(error.req)
                            this.__error(error.response.status);
                        })
                    } else {
                        config.__order.orderreturn(this.report).then((req) => {
                            if (req.data.code === 0) {
                                this.$message('订单状态修改成功');
                                this.getList({ page: 1 })
                            } else {
                                this.$message(req.data.msg);
                            }
                            this.$refs[formName].resetFields();
                            this.dialogFormVisible = false;
                        }).catch((error) => {
                            console.log(error.req)
                            this.__error(error.response.status);
                        })
                    }
                    
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        // 取消
        cancel(formName) {
            this.$refs[formName].resetFields();
            this.dialogFormVisible = false;
        },
        // 搜索
        onSubmit() {
            this.page.page = 1;
            this.page.page_limit = 10;
            this.getList(this.page)
        },
        // 获取列表
        getList(data) {
            config.__order.List(data).then((req) => {
                if (req.data.code === 0) {
                    this.tableData.data = req.data.data.data;
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