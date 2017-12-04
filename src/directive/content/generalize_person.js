import searchElement from '../../components/search'
import tableElement from '../../components/table'
import tabElement from '../../components/tab'
import editor from '../../components/Quilleditor.vue'
import config from '../../api/config'
import axios from "axios";

import vueCropper from 'vue-cropper'
let url = 'http://www.shanxiwelfare.com';
export default {
    data() {
        return {
            tableData: {
                label: [
                    { name: '推广员姓名', msgname: 'ui_name' },
                    { name: '推广员电话', msgname: 'ui_phone' },
                    {
                        name: '发展会员', msgname: 'count', opate: [{
                            name: '查看', opatename: 'persondetail', filter: function (val) {
                                if (val > 0) return true
                            }
                        }]
                    },
                    { name: '用户昵称', msgname: 'ui_nickname' },
                    { name: 'OpenID', msgname: 'ui_openid' },
                ],
                data: [],
                opate: [
                    { name: '编辑', opatename: 'edit' }
                ],
                filter(data) {
                    if (data.day <= 7 && data.p_status == 1) {
                        return 'color:red;'
                    } else {
                        return
                    }
                },
                // all: 'ui_id'
            },
            dialogFormVisible: false,
            formLabelWidth: '150px',
            form: {
                ui_id: '',
                is_extension: 1,
                ui_name: '',
                ui_phone: '',
            },
            formtitle: '新增推广员',
            rules: {
                ui_name: [
                    { required: true, message: '请输入推广员姓名', trigger: 'blur' },
                ],
                ui_phone: [
                    { required: true, message: '请输入推广员电话', trigger: 'blur' }
                ],
                is_extension: [
                    { required: true, message: '请选择是否推广员', trigger: 'change' },
                ],

            },
            delVal: [],
            pageTotal: 0,
            page: {
                page: 1,
                page_limit: 10
            },
            pageSizes: [],
            searchData: {
                ui_nickname: '',
                ui_phone: '',
                ui_name: ''
            },
            restaurants: [],
            inventer:[],
            timeout:null,
            img:''
        }
    },
    methods: {
        // token失效
        __msg(data) {
            this.$alert('用户项目有误，请重新登陆', data, {
                confirmButtonText: '确定',
                callback: action => {
                    this.$router.push({ path: '/login' });
                }
            });
        },
        // 错误日志
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
        // 操作项
        acquire(data) {
            if (data.opate == 'edit') {
                this.edit(data.data)
            } else if (data.opate == 'msg') {
                this.delVal = data.data
            } else if (data.opate == 'persondetail') {
                
                let msg = {
                    ui_id: data.data.ui_id
                }
                this.getinventer(msg)
            }
        },
        // 收益返还
        profit(msg) {
            this.$confirm('确定开始收益', '收益', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(({ value }) => {
                config.__extension.earnings(msg).then((req) => {
                    if (req.data.code === 0) {
                        this.$message({
                            type: 'success',
                            message: '开始收益'
                        });
                        this.getList({ page: 1 })
                    }
                }).catch((error) => {
                    this.__error(error.response.status);
                })

            })

        },
        // 查询
        onSubmit() {
            this.getList(this.searchData);
        },
        // 筛选查询
        querySearchAsync(queryString, cb) {
            var restaurants = this.restaurants;
            var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;

            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                cb(results);
            }, 3000 * Math.random());
        },
        createStateFilter(queryString) {
            return (state) => {
                return (state.value.indexOf(queryString) === 0);
            };
        },
        handleSelect(item) {
            this.form.ui_id = item.data.ui_id;
            this.img = item.data.ui_avatar;
        },
        // 新增
        add() {
            this.formtitle = '新增推广员';
            this.dialogFormVisible = true;
            Object.assign(this.form, {
                ui_id: '',
                is_extension: 1,
                ui_name: '',
                ui_phone: '',
            })
        },
        // 提交
        submit(formName) {
            if (this.formtitle == '发展会员') {
                return this.dialogFormVisible = false;
            }
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    config.__extension.add(this.form).then((req) => {
                        if (req.data.code === 0) {   
                            if (this.formtitle == '新增推广员') {
                                this.$message('添加成功');
                            } else {
                                this.$message('编辑成功');
                            }
                            this.getList({ page: 1 })
                        }
                        this.$refs[formName].resetFields();
                        this.dialogFormVisible = false;
                    }).catch((error) => {
                        this.__error(error.response.status);
                    })                
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
        // 编辑
        edit(data) {
            this.formtitle = '编辑推广员';
            Object.assign(this.form, {
                ui_id:data.ui_id,
                is_extension:'1',
                ui_name:data.ui_name,
                ui_phone:data.ui_phone,
            })
            this.dialogFormVisible = true;
        },
        // 删除
        del(item) {
            let val = this.delVal.toString();
            let data = {
                p_id: val
            }
            this.$confirm('确定删除', '删除', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(({ value }) => {
                config.__extension.del(data).then((req) => {
                    if (req.data.code === 0) {
                        this.$message('删除成功');
                        this.getList({ page: 1 })
                    }
                }).catch((error) => {
                    console.log(error.req)
                    this.__error(error.response.status);
                })
            })

        },
        // 获取发展会员
        getinventer(data) {
            config.__extension.inventer(data).then((req) => {
                if (req.data.code === 0) {
                    this.inventer = req.data.data;
                    this.formtitle = '发展会员';
                    this.dialogFormVisible = true;
                } else {
                    this.__error(req.data.code);
                }
            }).catch((error) => {
                console.log(error.req)
                this.__error(error.response.status);
            })
        },
        // 获取列表
        getList(data) {
            config.__extension.List(data).then((req) => {
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
        },
        // 获取所有用户
        getuser(data) {
            config.__extension.all(data).then((req) => {
                if (req.data.code === 0) {
                    // this.restaurants = req.data.data;
                    for (let i = 0; i < req.data.data.length; i++) {
                        this.restaurants.push({"value":req.data.data[i].ui_nickname,"data":req.data.data[i]})
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
    components: { searchElement, tableElement, tabElement, editor },
    mounted() {
        this.$nextTick(function () {
            let data = {
                page: 1,
            }
            this.getList(data);
            this.getuser();
        })
    }
}