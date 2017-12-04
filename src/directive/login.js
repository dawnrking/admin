import config from '../api/config'
import storage from '../utlis/storage'


export default {
    data() {

        var validate = (rule, value, callback) => {
            if (value === '') {
                callback(new Error(`请输入${rule.name}`));
            } else {
                callback();
            }
        };

        return {
            ruleForm2: {
                username: '',
                password: '',
            },
            rules2: {
                username: [
                    { required: true, validator: validate, trigger: 'blur',name: '账号' },
                    
                ],
                password: [
                    { required: true, validator: validate, trigger: 'blur',name: '密码' },
                    { min: 6, max: 20, message: '请输入大于6位的密码', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                config.__login.postLogin(this.ruleForm2).then((req)=>{
                   if (req.data.code === 0) {
                       storage.setItem('TOKEN',req.data.data.token);
                       storage.setItem('manageid',req.data.data.manageid);
                       storage.setItem('userName',req.data.data.username);
                       this.$router.push('index');
                   }
                }).catch(()=>{

                })

                } else {
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        transRot() {
            document.querySelector('.ruleForm').className+=' transRot';
            setTimeout("document.querySelector('.ruleForm').className+=' none'",2000)
        }
    },
    components: {}
}