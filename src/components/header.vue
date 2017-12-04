<template>
    <header>
        <div class="header_content">
            <div class="header_content--title">
                <!-- 公益接力后台管理系统 -->
                农业项目
            </div>
            <div class="header_content--msg">
                <label>
                    <i class="el-icon-picture"></i>
                    <span>{{headData.userName}}</span>
                </label>
                <label>
                    <span class="quit" @click="quit">
                        <i class="el-icon-upload2"></i>
                    <span>退出</span>
                    </span>
                </label>

            </div>
        </div>
    </header>
</template>

<style scoped>
header {
    height: 50px;position:fixed;top:0;left:0;background:#6084eb;width:100%;
    display: flex;z-index:999;
    /*box-shadow: 0 1px 2px #e4eaf3;*/
}

.header_content--msg {
    display: flex;
    font-size: 1rem;
    width: 15rem;
    line-height: 50px;
    color:#fefefe;
    margin-right:30px;
     /* background: #eef1f6;      */
    /* background: #627990;
    color: #fff; */
}
label {
    flex: 1;
    text-align:center;
    border-left:1px solid #5478de;
}
.header_content {
    flex: 1;
    display: flex;
}

.header_content--title {
    flex: 1;
    display: flex;
    align-items: center;
    font-size: 1.5rem;
    color: #fefefe;
    text-align: left;
    text-indent: 20px;
}

.quit {
    display: block;
    color:#fefefe;
}
.quit:hover {
    background: #638bff;
}
</style>

<script>
export default {
    name: 'header',
    data() {
        return {

        };
    },
    props:['headData'],
    methods: {
        quit () {
            this.$emit('quit','quit')
        }
    }
}
</script>
