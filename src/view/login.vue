<template>
    <div class="main">
        <div class="ruleForm">
            <header>
                ADMIN
            </header>
            <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="100px">
                <el-form-item label="账号" prop="username">
                    <el-input v-model="ruleForm2.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="ruleForm2.password"></el-input>
                </el-form-item>
                <el-form-item class="footer">
                    <el-button type="primary" @click="submitForm('ruleForm2')">登录</el-button>
                    <!-- <el-button @click="resetForm('ruleForm2')">取消</el-button> -->
                </el-form-item>
            </el-form>
        </div>

    </div>
</template>
<script src='../directive/login.js'></script>

<style lang="sass" scoped>
@import "./../styles/login.scss";
</style>
