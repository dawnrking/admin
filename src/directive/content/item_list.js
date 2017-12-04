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
                    { name: '产品名称', msgname: 'p_project_name' },
                    { name: '项目标题', msgname: 'p_title' },
                    { name: '项目描述', msgname: 'p_describe' },
                    { name: '剩余份数', msgname: 'p_inventory_number' },
                    { name: '已售份数', msgname: 'p_sold_number' },
                    { name: '单价(元)', msgname: 'p_unit_price' },
                    {
                        name: '上架状态', msgname: 'p_is_up', filter: function (val) {
                            return ['上架 ', '下架'][val]
                        }
                    },
                    // { name: '项目状态', msgname: 'p_status' },
                    {
                        name: '项目状态', msgname: 'p_status', filter: function (val) {
                            return ['众筹中 ', '众筹成功', '众筹失败', '收益返还中', '返还完成'][val]
                        }
                    },
                    {
                        name: '预计收益返还时间', msgname: 'p_cycle', filterbg: function (val) {
                            let nowTime = Date.parse(new Date())
                            console.log(nowTime)

                        }
                    },
                    { name: '众筹开始时间', msgname: 'p_start_time' },
                    { name: '最大筹款期限(天)', msgname: 'p_fundraising_term' },
                    // { name: '市场价格(元/斤)', msgname: 'p_market_price' },
                    // { name: '预期收益(元/份)', msgname: 'p_expect_profit' },
                    // { name: '实际收益(元/份)', msgname: 'p_actual_profit' }
                ],
                data: [],
                opate: [
                    { name: '编辑', opatename: 'edit' },
                    { name: '进度管理', opatename: 'process' },
                    {
                        name: '收益返还', opatename: 'profit', msgname: 'p_status', valname: 'p_status', filter: function (val, jugval) {
                            if (jugval == 1) {
                                return '收益返还'
                            }
                            return

                        }
                    },
                ],
                filter (data) {
                    if (data.day<=7&&data.p_status==1) {
                        return 'color:red;'
                    }else{
                        return
                    } 
                },
                all: 'p_id'
            },
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() < Date.now() - 8.64e7;
                }
            },
            // img: false,
            dialogFormVisible: false,
            formLabelWidth: '150px',
            form: {
                p_project_name: '',
                p_title: '',
                p_describe: '',
                p_inventory_number: '',
                p_unit_price: '',
                p_cycle: '',
                p_start_time: '',
                p_end_time: '',
                p_fundraising_term: '',
                // p_market_price: '',
                // p_expect_profit: '',
                // p_actual_profit: '',
                p_image_banner: '',
                p_image_logo: '',
                p_is_up: '',
                p_intro: '',
                // p_status: '',
                earning: [
                    {
                        pem_name: "",
                        pem_value: {
                            money: '',
                            weight: ''
                        },
                        pem_type: 0
                    },
                    {
                        pem_name: "",
                        pem_value: {
                            money: '',
                            weight: ''
                        },
                        pem_type: 1
                    },
                    {
                        pem_name: "",
                        pem_value: {
                            money: '',
                            rate: '',
                            lownum: ''
                        },
                        pem_type: 2
                    }
                ]
            },
            formtitle: '新增项目',
            rules: {
                p_project_name: [
                    { required: true, message: '请输入项目标题', trigger: 'blur' },
                ],
                p_title: [
                    { required: true, message: '请输入项目内容', trigger: 'blur' }
                ],
                p_describe: [
                    { required: true, message: '请输入项目描述', trigger: 'change' },
                ],
                p_inventory_number: [
                    { type: 'number', required: true, message: '请输入项目份数', trigger: 'blur' }
                ],
                p_unit_price: [
                    { type: 'number', required: true, message: '请输入项目单价', trigger: 'blur' }
                ],
                p_cycle: [
                    { type: 'date', required: true, message: '请选择预期收益时间', trigger: 'change' }
                ],
                p_start_time: [
                    { type: 'date', required: true, message: '请选择上线时间', trigger: 'change' }
                ],
                p_end_time: [
                    { type: 'date', required: true, message: '请选择截止时间', trigger: 'change' }
                ],
                p_fundraising_term: [
                    { type: 'number', required: true, message: '请输入项目内最大筹款期限', trigger: 'blur' }
                ],
                // p_market_price: [
                //     { type:'number', required: true, message: '请输入项目市场价格', trigger: 'blur' }
                // ],
                // p_expect_profit: [
                //     { type:'number', required: true, message: '请输入项目预期收益', trigger: 'blur' }
                // ],
                // p_actual_profit: [
                //     { type:'number', required: true, message: '请输入项目实际收益', trigger: 'blur' }
                // ],
                p_is_up: [
                    { required: true, message: '请选择上架状态', trigger: 'change' },
                ],
                p_intro: [
                    { required: true, message: '请输入项目介绍', trigger: 'blur' }
                ],
                // p_status: [
                //     { required: true, message: '请选择项目的状态', trigger: 'change' },
                // ],
                p_image_banner: [
                    { required: true, message: '请上传项目banner图', trigger: 'change' },
                ],
                p_image_logo: [
                    { required: true, message: '请上传项目logo图', trigger: 'change' },
                ],

            },
            delVal: [],
            pageTotal: 0,
            page: {
                page: 1,
                page_limit: 10
            },
            pageSizes: [],
            uploader: {},
            searchData: {
                p_title: '',
                p_project_name: ''
            },
            canCrop: false,
            uploadUrl: `${url}/admin/item/uploadvideo?token=${localStorage.getItem('TOKEN')}`,
            imgname: '',
            croppa: {},
            imgdata: {
                width:710,
                height:400
            },
            crpmark:false,
            uploadconfig: {
                key: '',
                policy: '',
                OSSAccessKeyId: '',
                success_action_status: '200', //让服务端返回200,不然，默认会返回204
                callback: '',
                signature: '',
                host:''
            },
        }
    },
    methods: {
        // 获取裁剪
        mark(name) {
            this.crpmark = !this.crpmark;
            this.imgname = name;
            if (name == 'p_image_banner') {
                this.imgdata = {
                    width:710,
                    height:400
                }
            } else {
                this.imgdata = {
                    width:260,
                    height:180
                }
            }
        },
        // 裁剪上传
        uploadCroppedImage() {
            this.crpmark = !this.crpmark;
            if (!this.croppa.hasImage()) {
                this.$message('没有图片，无法上传');
                return
              }
            this.croppa.generateBlob((blob) => {
                let time = Date.parse(new Date());  
                let name =time+'.'+blob.type.split('/')[1];
                
                var self = this;
                let param = new FormData(); // 创建form对象
                param.append('key', this.uploadconfig.key+name);// 添加form表单中其他数据
                param.append('name', 'blob');
                param.append('policy', this.uploadconfig.policy);
                param.append('OSSAccessKeyId', this.uploadconfig.OSSAccessKeyId);
                param.append('success_action_status', this.uploadconfig.success_action_status);
                param.append('signature', this.uploadconfig.signature);
                param.append("file", blob); // 通过append向form对象添加数据
                let config = {
                    headers: { "Content-Type": "multipart/form-data" }
                };
                //添加请求头
                axios
                    .post(this.uploadconfig.host, param, config)
                    .then(response => {
                        if (response.status === 200) {
                            if (this.imgname == 'p_image_banner') {
                               this.form.p_image_banner=this.uploadconfig.host+'/'+this.uploadconfig.key + name
                            } else {
                               this.form.p_image_logo = this.uploadconfig.host+'/'+this.uploadconfig.key + name
                            }
                        }
                    });    
            }, 'image/jpeg', 1)
        },
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
            } else if (data.opate == 'process') {
                this.$router.push({ path: '/index/item_manage/' + data.data.p_id })
            } else if (data.opate == 'profit') {
                let msg = {
                    p_id: data.data.p_id
                }
                this.profit(msg)
            }
        },
        // 收益返还
        profit(msg) {
            this.$confirm('确定开始收益', '收益', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(({ value }) => {
                config.__project.earnings(msg).then((req) => {
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
            // this.searchData.page = this.page.page;
            this.getList(this.searchData);
        },
        // 新增
        add() {
            this.formtitle = '新增项目';
            this.dialogFormVisible = true;
            Object.assign(this.form, {
                p_project_name: '',
                p_title: '',
                p_describe: '',
                p_inventory_number: '',
                p_unit_price: '',
                p_cycle: '',
                p_start_time: '',
                p_end_time: '',
                p_fundraising_term: '',
                // p_market_price: '',
                // p_expect_profit: '',
                // p_actual_profit: '',
                p_image_banner: '',
                p_image_logo: '',
                p_is_up: '',
                p_intro: '',
                // p_status: '',
                earning: [
                    {
                        pem_name: "",
                        pem_value: {
                            money: '',
                            weight: ''
                        },
                        pem_type: 0
                    },
                    {
                        pem_name: "",
                        pem_value: {
                            money: '',
                            weight: ''
                        },
                        pem_type: 1
                    },
                    {
                        pem_name: "",
                        pem_value: {
                            money: '',
                            rate: '',
                            lownum: ''
                        },
                        pem_type: 2
                    }
                ]
            })
        },
        // 时间转换为(2017-11-08 15:45:50)格式
        timeFormat(val) {
            let time = new Date(val);
            var o = {
                Y: time.getFullYear(), //年
                M: time.getMonth() > 8 ? time.getMonth() + 1 : '0' + (time.getMonth() + 1), //月份 
                d: time.getDate() > 9 ? time.getDate() : '0' + time.getDate(), //日 
                h: time.getHours() > 9 ? time.getHours() : '0' + time.getHours(), //时 
                m: time.getMinutes() > 9 ? time.getMinutes() : '0' + time.getMinutes(), //分 
                s: time.getSeconds() > 9 ? time.getSeconds() : '0' + time.getSeconds(), //秒 
            };
            return `${o.Y}-${o.M}-${o.d} ${o.h}:${o.m}:${o.s}`
        },
        // 最低限制
        changenum () {
            let maxnum =!this.form.p_unit_price?false:(10000/this.form.p_unit_price).toFixed(0);
            if (maxnum&&maxnum<this.form.earning[2].pem_value.lownum) {
                this.$confirm('最低份数不得超过'+maxnum+'份', '收益回报最低份数', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                this.form.earning[2].pem_value.lownum = maxnum
            }
        },
        // 提交
        submit(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    for (var i = 0; i < this.form.earning.length; i++) {
                        this.form.earning[i].pem_value = JSON.stringify(this.form.earning[i].pem_value)
                    }
                    this.form.p_cycle = this.timeFormat(this.form.p_cycle)
                    this.form.p_end_time = this.timeFormat(this.form.p_end_time)
                    this.form.p_start_time = this.timeFormat(this.form.p_start_time)
                    // this.form.a_content = this.form.a_content.replace(/\s{2,}/g, "&nbsp;&nbsp;&nbsp;&nbsp;");
                    if (this.formtitle == '新增项目') {
                        config.__project.add(this.form).then((req) => {
                            if (req.data.code === 0) {
                                this.$message('添加成功');
                                this.getList({ page: 1 })
                            } else {
                                this.$message(req.data.msg);
                                this.form.p_cycle = this.trantime(this.form.p_cycle)
                                this.form.p_start_time = this.trantime(this.form.p_start_time)
                                this.form.p_end_time = this.trantime(this.form.p_end_time)
                            }
                            this.$refs[formName].resetFields();
                            this.dialogFormVisible = false;
                        }).catch((error) => {
                            this.form.p_cycle = this.trantime(this.form.p_cycle)
                            this.form.p_start_time = this.trantime(this.form.p_start_time)
                            this.form.p_end_time = this.trantime(this.form.p_end_time)
                            this.__error(error.response.status);
                        })
                    } else {
                        config.__project.edit(this.form).then((req) => {
                            if (req.data.code === 0) {
                                this.$message('编辑成功');
                                this.getList({ page: 1 })
                            } else {
                                this.$message(req.data.msg);
                                this.form.p_cycle = this.trantime(this.form.p_cycle)
                                this.form.p_start_time = this.trantime(this.form.p_start_time)
                                this.form.p_end_time = this.trantime(this.form.p_end_time)
                            }
                            this.dialogFormVisible = false;
                        }).catch((error) => {
                            this.form.p_cycle = this.trantime(this.form.p_cycle)
                            this.form.p_start_time = this.trantime(this.form.p_start_time)
                            this.form.p_end_time = this.trantime(this.form.p_end_time)
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
        // 转换时间为标准时间
        trantime(val) {
            if (!val) {
                return ''
            }
            var time = val.split(/\s+/);
            var ymd = time[0].split('-')
            var hms = time[1].split(':')
            return new Date(ymd[0], ymd[1] - 1, ymd[2], hms[0], hms[1], hms[2])
        },
        // 编辑
        edit(data) {
            this.formtitle = '编辑项目';
            config.__project.detail({ p_id: data.p_id }).then((req) => {
                if (req.data.code === 0) {
                    Object.assign(this.form, req.data.data[0]);
                    for (var i = 0; i < 3; i++) {
                        if (req.data.data.earning[i]) {
                            this.form.earning[i] = req.data.data.earning[i];
                            this.form.earning[i].pem_value = JSON.parse(this.form.earning[i].pem_value)
                        } else {
                            switch (i) {
                                case 0:
                                    this.form.earning[0] = {
                                        pem_name: "",
                                        pem_value: {
                                            money: '',
                                            weight: ''
                                        },
                                        pem_type: 0
                                    }
                                    break;
                                case 1:
                                    this.form.earning[1] = {
                                        pem_name: "",
                                        pem_value: {
                                            money: '',
                                            weight: ''
                                        },
                                        pem_type: 1
                                    }
                                    break;
                                case 2:
                                    this.form.earning[2] = {
                                        pem_name: "",
                                        pem_value: {
                                            money: '',
                                            rate: '',
                                            lownum: ''
                                        },
                                        pem_type: 2
                                    }
                                    break;
                            }
                        }
                    }
                    this.form.p_is_up = this.form.p_is_up.toString();
                    this.form.p_inventory_number = this.form.p_inventory_number ? parseInt(this.form.p_inventory_number) : '';
                    this.form.p_unit_price = this.form.p_unit_price ? parseFloat(this.form.p_unit_price) : '';
                    this.form.p_fundraising_term = this.form.p_fundraising_term ? parseInt(this.form.p_fundraising_term) : '';
                    this.form.p_cycle = this.trantime(this.form.p_cycle)
                    this.form.p_start_time = this.trantime(this.form.p_start_time)
                    this.form.p_end_time = this.trantime(this.form.p_end_time)
                }
            }).catch((error) => {
                console.log(error.req)
                this.__error(error.response.status);
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
                config.__project.del(data).then((req) => {
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

        // 获取列表
        getList(data) {
            config.__project.List(data).then((req) => {
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
        // 获取富文本编辑器内容
        getEditor() {
            var html = editor.$textElem[0].innerHTML;
        },
        // 删除图片
        delImg(name) {
            if (name == 'banner') {
                this.form.p_image_banner = ''
            } else {
                this.form.p_image_logo = ''
            }
        },
        // 获取配置
        getupload () {
            config.__upload.getosskey().then((req) => {
                if (req.status === 200) {
                    this.uploadconfig = {
                        key: req.data.dir,
                        policy: req.data.policy,
                        OSSAccessKeyId: req.data.accessid,
                        success_action_status: '200', //让服务端返回200,不然，默认会返回204
                        callback: req.data.callback,
                        signature: req.data.signature,
                        host:req.data.host
                    };
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
            this.getupload();
            this.getList(data);
        })
    }
}