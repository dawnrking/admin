<template>
    <div class="manage_content">
        <div class="search">
            <el-form :inline="true" class="demo-form-inline">
                <!-- <el-form-item label="用户昵称：">
                    <el-input v-model="searchData.ui_nickname" placeholder="用户昵称"></el-input>
                </el-form-item> -->
                <el-form-item label="是否查看：">
                        <el-select v-model="searchData.uf_issee" placeholder="请选择是否查看">
                            <el-option label="全部 " value=""></el-option>
                            <el-option label="未查看 " value="0"></el-option>
                            <el-option label="已查看 " value="1"></el-option>
                        </el-select>
                </el-form-item>
                <el-form-item label="反馈开始时间">
                        <el-date-picker
                        v-model="searchData.start_feedback_time"
                        type="datetime"
                        placeholder="选择日期时间">
                        </el-date-picker>
                </el-form-item>
                <el-form-item label="反馈结束时间">
                        <el-date-picker
                        v-model="searchData.end_feedback_time"
                        type="datetime"
                        placeholder="选择日期时间">
                        </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
            </el-form>
            <el-button type="danger" @click="del" :disabled="delVal.length<1">删除</el-button>
        </div>
        
        <div class="content_table">
            <!-- 查看反馈问题-->
            <el-dialog :title="formtitle" :visible.sync="dialogFormVisible">
                <el-form ref="form" :label-width="formLabelWidth">
                        <el-form-item label="昵称：">
                            <span>{{form.ui_nickname}}</span>
                        </el-form-item>
                        <el-form-item label="内容：">
                            <span>{{form.uf_content}}</span>
                        </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="viewsubmit">确定</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
            <table-element :tableData='tableData' @msg='acquire'></table-element>
            <el-pagination v-if="tableData.data.length>0&&pageTotal>10" :page-sizes="pageSizes" :page-size="page.page_limit" layout="prev, pager, next" :total="pageTotal" @size-change="handleSizeChange" @current-change='changePage'>
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

img {
    display: block;
    width: 300px;
}
</style>

<script src='../../directive/content/feedback_manage.js'></script>


