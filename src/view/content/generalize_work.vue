<template>
    <div class="manage_content">
        <div class="search">
            <el-form :inline="true" class="demo-form-inline">
                <el-form-item label="推广员名字：">
                    <el-input v-model="searchData.ui_nickname" placeholder="推广员名字"></el-input>
                </el-form-item>
                <el-form-item label="订单编号：">
                    <el-input v-model="searchData.o_order_number" placeholder="订单编号"></el-input>
                </el-form-item>
                <el-form-item label="发展会员名字：">
                    <el-input v-model="searchData.ui_name" placeholder="发展会员名字"></el-input>
                </el-form-item>
                <el-form-item label="众筹项目名字：">
                    <el-input v-model="searchData.p_project_name" placeholder="众筹项目名字"></el-input>
                </el-form-item>
                <el-form-item label="下单开始时间">
                        <el-date-picker
                        v-model="searchData.start_order_time"
                        type="datetime"
                        placeholder="选择日期时间">
                        </el-date-picker>
                </el-form-item>
                <el-form-item label="反馈结束时间">
                        <el-date-picker
                        v-model="searchData.end_order_time"
                        type="datetime"
                        placeholder="下单结束时间">
                        </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
            </el-form>
            <!-- <el-button type="info" @click="add">新增</el-button> -->
            <a class="btn export" :href="exportexcel">导出</a>
            <!-- <el-button type="danger" @click="del" :disabled="delVal.length<1">删除</el-button> -->
            <!-- 新增 编辑-->
            <el-dialog :title="formtitle" :visible.sync="dialogFormVisible">
                <el-form ref="form" :model="form" :label-width="formLabelWidth" v-if="formtitle !='发展会员' ">            
                    <el-form-item label="推广员昵称">
                        <el-autocomplete
                        v-model="form.ui_nickname"
                        :fetch-suggestions="querySearchAsync"
                        placeholder="请输入内容"
                        @select="handleSelect"
                        ></el-autocomplete>  
                    <img class="headImg" :src="img" alt="">  
                    </el-form-item>
                    <el-form-item label="推广员姓名" prop="ui_name">
                        <el-input v-model="form.ui_name" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="推广员电话">
                        <el-input v-model="form.ui_phone" auto-complete="off" :maxlength='11'></el-input>
                    </el-form-item>
                    <el-form-item label="是否是推广员" v-if="formtitle == '编辑推广员'">
                        <el-select v-model="form.is_extension" placeholder="请选择是否显示">
                            <el-option label="否" value="0"></el-option>
                            <el-option label="是" value="1"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <el-form v-else>
                    <el-form-item  label="会员名称:" v-for="item of inventer" :key="item"><span>{{item}}</span></el-form-item>
                </el-form>
                <div slot="footer" class='footer'>
                    <el-button type="primary" @click="submit('form')">确定</el-button>
                    <el-button @click="cancel('form')"  v-if="formtitle !='发展会员' ">取消</el-button>
                </div>
            </el-dialog>
        </div>
        <div class="content_table">
            <table-element :tableData='tableData' @msg='acquire'></table-element>
            <el-pagination v-if="tableData.data.length>0&&pageTotal>10" :page-size="page.page_limit" layout="prev, pager, next" :total="pageTotal" @size-change="handleSizeChange" @current-change='changePage'>
            </el-pagination>
        </div>
    </div>
</template>

<style scoped>
.manage_content {
  padding: 20px;
}

.search {
  padding-bottom: 20px;
}

.el-pagination {
  padding: 20px;
}

content_table.el-pagination--small.el-pager li {
  /* font: 1em sans-serif; */
  font-size: 20px;
}

.footer {
  text-align: left;
}
.headImg {
    position: absolute;
    width: 50px;
    right: 4rem;
    bottom: .1rem;
}

.btn {
  text-align: center;
  padding: 10px;
}
.select {
  width: 50%;
}
.export{
    background: #20a0ff;
    color: #fff;
    border-radius: 5px;
}
</style>

<script src='../../directive/content/generalize_work.js'></script>


