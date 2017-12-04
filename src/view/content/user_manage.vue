<template>
    <div class="manage_content">
        <div class="search">
            <el-form :inline="true" class="demo-form-inline">
                <el-form-item label="用户昵称：">
                    <el-input v-model="searchData.ui_nickname" placeholder="用户昵称"></el-input>
                </el-form-item>
                <el-form-item label="性别：">
                        <el-select v-model="searchData.ui_gender" placeholder="请选择性别">
                            <el-option label="全部" value=""></el-option>
                            <el-option label="未知" value="0"></el-option>
                            <el-option label="男性" value="1"></el-option>
                            <el-option label="女性" value="2"></el-option>
                        </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="content_table">
            <el-dialog :title="formtitle" :visible.sync="dialogFormVisible" size='tiny'>
                <el-form ref="form" :label-width="formLabelWidth" label-position="left">
                    <!-- 下级人员详情 -->
                    <div v-if="formtitle == '下级人员详情'" class="form-content">
                        <el-form-item label="用户昵称:" v-for="item in form" :key="item.ui_nickname">
                            <span>{{item.ui_nickname}}</span>
                        </el-form-item>
                    </div>
                    <!-- 会员捐款详情 -->
                    <div v-else v-for="item in form" :key="item.ui_nickname" class="form-content">
                        <el-form-item label="会员昵称">
                            <span>{{item.ui_nickname}}</span>
                        </el-form-item>
                        <el-form-item label="捐款额度">
                            <span>{{item.utl_donation_amount}}</span>
                        </el-form-item>
                        <el-form-item label="祝福寄语">
                            <span>{{item.utl_greeting_message}}</span>
                        </el-form-item>
                        <el-form-item label="捐款时间">
                            <span>{{item.created_at}}</span>
                        </el-form-item>
                        <el-form-item label="捐助项目的名称">
                            <span>{{item.pi_name}}</span>
                        </el-form-item>
                    </div>
                    <p v-if="form.length==0" style="text-align:center">
                        暂无数据
                    </p>
                    <el-form-item v-if="form.length>0">
                        <el-button type="primary" @click="dialogFormVisible = false">确定</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
            <ul>
                <li v-for="item in tableData" :key="item.ui_id">
                    <header>会员信息</header>
                    <div class="table_msg">
                        <span class="headImg">
                            <img :src="item.ui_avatar"></a>
                        </span>
                        <section>
                            <header>
                                <p>
                                    <span>用户昵称：{{item.ui_nickname}}</span>
                                    <span>用户性别：{{item.ui_gender |sex}}</span>
                                </p>
                                <p>
                                    <span>注册时间：{{item.created_at}}</span>
                                    <span>更新时间：{{item.updated_at}}</span>
                                </p>
                                <!-- <p>
                                    <span>邀请人昵称：{{item.inviter}}</span>
                                </p> -->
                            </header>
                            <!-- <footer>
                                <el-button type="text" @click="subordinatedetail(item)">下级人员详情</el-button>
                                <el-button type="text" @click="projectdetail(item)">捐款详情</el-button>
                            </footer> -->
                        </section>
                    </div>
                </li>
            </ul>
            <p class="notData" v-if="tableData.length<1">暂无数据</p>
            <footer>
                <el-pagination  v-if="tableData.length>0&&pageTotal>10" :page-sizes="pageSizes" :page-size="page.page_limit" layout="prev, pager, next" :total="pageTotal" @size-change="handleSizeChange" @current-change='changePage'>
                </el-pagination>
            </footer>
        </div>
    </div>
</template>

<style scoped>
.manage_content {
    padding: 20px 40px;
    display: flex;
    flex-direction: column;
}

.search {
    padding-bottom: 10px;
}
.notData {
    width: 100%;
    text-align: center;
    padding: 20px;
    font-size: 1.2rem;
}
.content_table {
    flex: 1;
    border: 1px solid #ccc;
}

.content_table ul li {
    width: 49%;
    display: inline-block;
    /* border: 1px solid #ccc; */
}

.content_table ul li:nth-child(even) {
    float: right;
}

.content_table ul li .table_msg {
    display: flex;
    font-size: 13px;
}

.content_table ul li>header {
    padding: 8px;
    background: #efefef;
    font-size: 15px;
    font-weight: 500;
}

.content_table ul li section {
    width: 100%;
    padding: 10px 10px 0;
    display: flex;
    flex-direction: column;
}

.content_table ul li section header {
    flex: 1;
    display: flex;
    flex-direction: column;
}

.content_table ul li section header p {
    flex: 1;
    line-height: 20px;
    display: flex;
}

.content_table ul li section header span {
    flex: 1;
}

.headImg {
    width: 105px;
    height: 105px;
    border-right: 1px solid #ccc;
}

.headImg img {
    width: 105px;
    height: 105px;
}

.form-content {
    width: 80%;
    margin: 0 auto;
}
.content_table>footer{
    padding: 10px 0;
}
</style>

<script src='../../directive/content/user_manage.js'></script>


