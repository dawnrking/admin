import searchElement from '../../components/search'
import tableElement from '../../components/table'
import tabElement from '../../components/tab'
import editor from '../../components/Quilleditor.vue'
import config from '../../api/config'
let url = 'http://www.shanxiwelfare.com';
export default {
    data() {
        return {
            msg: 'hello this is index',
            activeNames: ['1'],
            tableData: {
                label: [
                    {
                        name: '信息类型', msgname: 'a_type', filter: function (val) {
                            return ['关于我们', '使用帮助'][val]
                        }
                    },
                    { name: '添加时间', msgname: 'a_createdtime' },
                    { name: '更新时间', msgname: 'a_updatedtime' },
                    { name: '信息内容', msgname: 'a_content' },
                    {
                        name: '前端是否显示', msgname: 'a_isshow', filter: function (val) {
                            return ['显示', '不显示'][val]
                        }
                    },
                ],
                data: [],
                opate: [
                    { name: '修改', opatename: 'edit' },
                ],
                // all: 'a_id'
            },
            img: false,
            dialogFormVisible: false,
            formLabelWidth: '150px',
            form: {
                a_title: '',
                a_content: '',
                a_type: '',
                a_isshow: ''
            },
            formtitle: '新增信息',
            rules: {
                a_title: [
                    { required: true, message: '请输入文章标题', trigger: 'blur' },
                ],
                a_content: [
                    { required: true, message: '请输入文章内容', trigger: 'blur' }
                ],
                a_type: [
                    { required: true, message: '请选择类型', trigger: 'change' },
                ],
                a_isshow: [
                    { required: true, message: '请选择是否显示', trigger: 'change' },
                ],
            },
            delVal: [],
            pageTotal: 0,
            page: {
                page: 1,
                page_limit: 10
            },
            pageSizes: [],
            canCrop: false,
            uploadUrl: `${url}/admin/item/uploadvideo?token=${localStorage.getItem('TOKEN')}`,

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
            } else if (data.opate == 'detail') {

            }
        },
        // 新增
        add() {
            this.formtitle = '新增信息';
            this.dialogFormVisible = true;
            Object.assign(this.form, {
                a_title: '',
                a_content: '',
                a_type: '',
                a_isshow: ''
            })
        },
        // 提交
        submit(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.form.a_content = this.form.a_content.replace(/\s{2,}/g,"&nbsp;&nbsp;&nbsp;&nbsp;");
                    if (this.formtitle == '新增信息') {
                        config.__msg.add(this.form).then((req) => {
                            if (req.data.code === 0) {
                                this.$message('添加成功');
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
                        config.__msg.edit(this.form).then((req) => {
                            if (req.data.code === 0) {
                                this.$message('修改成功');
                                this.getList({ page: 1 })
                            }
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
        // 编辑
        edit(data) {
            this.formtitle = '编辑信息';
            Object.assign(this.form, data);
            this.form.a_isshow = this.form.a_isshow.toString();
            this.form.a_type = this.form.a_type.toString();
            this.dialogFormVisible = true;
        },
        // 删除
        del(item) {
            let val = this.delVal.toString();
            let data = {
                a_id: val
            }
            config.__msg.del(data).then((req) => {
                if (req.data.code === 0) {
                    this.$message('删除成功');
                    this.getList({ page: 1 })
                }
            }).catch((error) => {
                console.log(error.req)
                this.__error(error.response.status);
            })
        },

        // 获取列表
        getList(data) {
            config.__msg.List(data).then((req) => {
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
        getEditor() {
            var html = editor.$textElem[0].innerHTML;
            console.log(html)
        }
    },
    components: { searchElement, tableElement, tabElement,editor },
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