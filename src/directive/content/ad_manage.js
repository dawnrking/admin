import searchElement from '../../components/search'
import tableElement from '../../components/table'
import tabElement from '../../components/tab'
import editor from '../../components/Quilleditor.vue'
import config from '../../api/config'
import axios from "axios";

let url = 'http://www.shanxiwelfare.com';
export default {
    data() {
        return {
            msg: 'hello this is index',
            activeNames: ['1'],
            tableData: {
                label: [
                    { name: '广告标题', msgname: 'a_title' },
                    { name: '广告内容', msgname: 'a_content' },
                    { name: '广告图片地址', msgname: 'a_logo_img' },
                    {
                        name: '是否推送', msgname: 'is_send', filter: function (val) {
                            return ['不推送', '推送'][val]
                        }
                    },
                ],
                data: [],
                opate: [
                    { name: '修改', opatename: 'edit' },
                ],
                all: 'a_id'
            },
            dialogFormVisible: false,
            formLabelWidth: '150px',
            form: {
                a_title: '',
                a_content: '',
                a_logo_img: '',
                is_send: '',
            },
            formtitle: '新增广告',
            rules: {
                a_title: [
                    { required: true, message: '请输入广告标题', trigger: 'blur' },
                ],
                a_content: [
                    { required: true, message: '请输入广告内容', trigger: 'blur' }
                ],
                is_send: [
                    { required: true, message: '请选择是否推送', trigger: 'change' },
                ],
                a_logo_img: [
                    { required: true, message: '请上传广告图', trigger: 'change' },
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
            uploader: {},
            croppa: {},
            imgdata: {
                width:750,
                height:344
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
            this.formtitle = '新增广告';
            this.dialogFormVisible = true;
            Object.assign(this.form, {
                a_title: '',
                a_content: '',
                is_send: '',
            })
        },
        // 提交
        submit(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.form.a_content = this.form.a_content.replace(/\s{2,}/g, "&nbsp;&nbsp;&nbsp;&nbsp;");
                    if (this.formtitle == '新增广告') {
                        config.__ad.add(this.form).then((req) => {
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
                        config.__ad.edit(this.form).then((req) => {
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
            this.formtitle = '编辑广告';
            Object.assign(this.form, data);
            this.form.is_send = this.form.is_send.toString();
            this.dialogFormVisible = true;
        },
        // 删除
        del(item) {
            let val = this.delVal.toString();
            let data = {
                a_id: val
            }
            this.$confirm('确定删除', '删除', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(({ value }) => {
                config.__ad.del(data).then((req) => {
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
            config.__ad.List(data).then((req) => {
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
        },
        
        // 打开裁剪
        mark() {
            this.crpmark = !this.crpmark;
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
                            this.form.a_logo_img=this.uploadconfig.host+'/'+this.uploadconfig.key + name
                        }
                    });    
            }, 'image/jpeg', 1)
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
        },
        deleteImg () {
            this.form.a_logo_img = '';
        },
    },
    components: { searchElement, tableElement, tabElement, editor },
    mounted() {
        this.$nextTick(function () {
            let data = {
                page: 1,
                page_limit: 10
            }
            this.getList(data);
            this.getupload();
        })
    }
}