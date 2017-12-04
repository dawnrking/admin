import searchElement from '../../components/search'
import tableElement from '../../components/table'
import tabElement from '../../components/tab'
import config from '../../api/config'

import vueCropper from 'vue-cropper'
export default {
    data() {
        return {
            msg: 'hello this is index',
            activeNames: ['1'],
            tableData: {
                label: [
                    { name: '项目名称', msgname: 'pi_name' },
                    { name: '反馈内容', msgname: 'pf_content' },
                    { name: '反馈图片地址', msgname: 'pf_file_url' },
                    { name: '反馈时间', msgname: 'created_at' },
                ],
                data: [],
                opate: [
                    { name: '修改', opatename: 'edit' }
                ],
                // all: 'pt_id'
            },
            img: false,
            dialogFormVisible: false,
            formLabelWidth: '150px',
            form: {
                pi_id: '',
                pf_content: '',
                pf_file_url: [],                                                                                                                          
            },
            formtitle: '新增项目反馈',
            rules: {
                pf_content: [
                    { required: true, message: '请输入反馈内容', trigger: 'blur' },
                ],
            },
            delVal: [],
            pageTotal: 0,
            page: {
                page: 1,
                page_limit: 10
            },
            pageSizes: [],
            example2: {
                img: '',
                info: true,
                size: 1,
                outputType: 'png',
                canScale: true,
                autoCrop: true,
                // 只有自动截图开启 宽度高度才生效
                Width:140,
                Height:140,
                fixed: false,
                fixedBox: true,
                fixedNumber: [4, 3]
            },
            loading:false,
            loadingText:'正在上传',
            loadingLength: 0,

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
        // handleSizeChange (size) {
        //     this.page.page_limit = size;
        //     this.getList(this.page)
        // },
        // changePage(page) {
        //     this.page.page = page;
        //     this.getList(this.page)
        // },
        acquire(data) {
            if (data.opate == 'edit') {
                this.edit(data.data)
            } else if (data.opate == 'msg') {
                this.delVal = data.data
            }
        },
        // 新增
        add() {
            this.formtitle = '新增项目反馈';
            this.dialogFormVisible = true;
            this.form = {
                pi_id: this.$route.params.id,
                pf_content: '',
                pf_file_url: [],
            }
        },
        // 提交
        submit(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if (!this.form.pf_file_url) {
                        this.img = true
                    } else {
                        this.img = false
                        this.form.pf_file_url = JSON.stringify(this.form.pf_file_url);
                        if (this.formtitle == '新增项目反馈') {
                            config.__itemfeedback.add(this.form).then((req) => {
                                if (req.data.code === 0) {
                                    this.$message('添加成功');
                                    this.getList({ pi_id: this.$route.params.id })
                                }
                                this.$refs[formName].resetFields();
                                this.dialogFormVisible = false;
                            }).catch((error) => {
                                console.log(error.req)
                                this.__error(error.response.status);
                            })
                        } else {
                            config.__itemfeedback.edit(this.form).then((req) => {
                                if (req.data.code === 0) {
                                    this.$message('修改成功');
                                    this.getList({ pi_id: this.$route.params.id })
                                }
                                this.dialogFormVisible = false;
                            }).catch((error) => {
                                console.log(error.req)
                                this.__error(error.response.status);
                            })
                        }

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
            if (this.formtitle == '新增项目反馈') {
                this.img = false;
                this.form.video_url = ''
            }

        },
        // 编辑
        edit(data) {
            this.formtitle = '编辑项目反馈';
            Object.assign(this.form, data);
            this.form.pf_file_url = JSON.parse(this.form.pf_file_url);
            this.dialogFormVisible = true;
        },
        // 删除
        del(item) {
            let val = this.delVal.toString();
            let data = {
                pt_id: val
            }
            config.__itemfeedback.del(data).then((req) => {
                if (req.data.code === 0) {
                    this.$message('删除成功');
                    this.getList({ pi_id: this.$route.params.id })
                }
            }).catch((error) => {
                console.log(error.req)
                this.__error(error.response.status);
            })
        },
        //上传
        // uploadContent(pic) {
        //     var reader = new FileReader();
        //     var imgUrl = ''
        //     const that = this
        //     reader.onload = function (e) {
        //         var video = e.target.result;
        //         var data = {
        //             video: video
        //         }
        //         config.__donate.upload(data).then((req) => {
        //             if (req.data.code === 0) {
        //                 that.form.pf_file_url = req.data.data.imgUrl
        //             }
        //         }).catch((error) => {
        //             console.log(error.req)
        //             this.__error(error.response.status);
        //         })
        //     };
        //     reader.readAsDataURL(pic);


        // },
        // uploadImg() {
        //     var pic = this.$refs.pic.files[0];
        //     if (pic) this.uploadContent(pic)
        // },
        electImg (e) {
            var file = e.target.files[0]
            if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
                alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
                return false
            }
            var reader = new FileReader()
            reader.onload = (e) => {
                this.example2.img = e.target.result
            }
            reader.readAsDataURL(file)
        },
        finish () {
            const that = this
            if (that.form.pf_file_url.length ===4) {
                return this.$message.error('最多添加四张图片');
            }
            this.$refs.cropper2.getCropBlob((data) => {
                var blob = data; //转成blob
                var reader = new FileReader(); //通过 FileReader 读取blob类型
                reader.onload = function() {
                    that.example2.img = '';
                    that.loadingText = "正在上传";
                    that.form.pf_file_url.push(this.result)
                    that.loadingLength = that.form.pf_file_url.length        
                    var data = {
                        video: this.result
                    }
                    config.__donate.upload(data).then((req) => {
                        if (req.data.code === 0) {
                            that.form.pf_file_url[that.form.pf_file_url.length-1]=req.data.data.imgUrl
                            that.loadingText = "上传成功";
                            setTimeout(()=> {
                                that.loading = false;
                                that.loadingLength = 0; 
                            }, 1000);  
                        }
                    }).catch((error) => {
                        console.log(error.req)
                        that.__error(error.response.status);
                    })
                }
                reader.readAsDataURL(blob);
            })
        },
        cropCancel () {
            this.example2.img = '';
            this.form.pdt_imgurl = ''
        },
        // 删除图片
        delImg(index) {
            if (index === -1) {
                this.form.pi_video_url = '';
            } else {
                this.form.pf_file_url.splice(index, 1);
            }
        },
        // 获取列表
        getList(data) {
            config.__itemfeedback.List(data).then((req) => {
                if (req.data.code === 0) {
                    this.tableData.data = req.data.data;
                }else if (req.data.code === -404) {
                    this.tableData.data = []
                }
            }).catch((error) => {
                console.log(error.req)
                this.__error(error.response.status);
            })
        }
    },
    components: { searchElement, tableElement, tabElement,vueCropper },
    mounted() {
        this.$nextTick(function () {
            this.getList({ pi_id: this.$route.params.id })
        })
    }
}