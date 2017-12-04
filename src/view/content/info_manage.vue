<template>
    <div class="manage_content">
        <div class="search">
            <el-button type="info" @click="add">新增</el-button>
            <!-- <el-button type="danger" @click="del" :disabled="delVal.length<1">删除</el-button> -->
            <!-- 新增 编辑-->
            <el-dialog :title="formtitle" :visible.sync="dialogFormVisible">
                <el-form :rules="rules" ref="form" :model="form" :label-width="formLabelWidth">
                    <el-form-item label="消息标题" prop="sn_title">
                        <el-input v-model="form.sn_title" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="消息内容" prop="sn_content">
                        <el-input type='textarea' v-model="form.sn_content" auto-complete="off"></el-input>
                    </el-form-item>
                     <el-form-item label="消息摘要" prop="sn_abstract">
                        <el-input type='textarea' v-model="form.sn_abstract" auto-complete="off"></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="消息内容" prop="sn_content">
                        <editor ref="myTextEditor" 
                        :fileName="'myFile'" 
                        :canCrop="canCrop" 
                        :uploadUrl="uploadUrl" 
                        v-model="form.a_content"></editor>
                    </el-form-item> -->
                    <el-form-item>
                        <el-button type="primary" @click="submit('form')">确定</el-button>
                        <el-button @click="cancel('form')">取消</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
        </div>
        <div class="content_table">
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
    max-width: 300px;
}
.quill-editor img {
    max-width: 300px !important;
}
</style>

<script src='../../directive/content/info_manage.js'></script>


