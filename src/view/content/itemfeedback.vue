<template>
    <div class="manage_content">
        <div class="search">
            <el-button type="info" @click="add">新增</el-button>
            <el-button type="danger" @click="del" :disabled="delVal.length<1">删除</el-button>

            <!-- 新增 编辑-->
            <el-dialog :title="formtitle" :visible.sync="dialogFormVisible">
                <el-form :rules="rules" ref="form" :model="form" :label-width="formLabelWidth">
                    <el-form-item label="反馈内容" prop="pf_content">
                        <el-input type='textarea' v-model="form.pf_content" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="上传图片">
                        <!-- <input ref="pic" type="file">
                        <el-button type="text" @click="uploadImg">上传图片</el-button>
                        <img :src="form.pf_file_url" alt="">
                        <p class="el-form-item__error" v-if="!form.pf_file_url && img">请上传图片</p> -->
                        <div class="tailor" v-if="example2.img">
                            <vueCropper ref="cropper2" 
                            :img="example2.img" 
                            :outputSize="example2.size" 
                            :outputType="example2.outputType" 
                            :info="example2.info" 
                            :canScale="example2.canScale" 
                            :autoCrop="example2.autoCrop" 
                            :autoCropWidth="example2.Width" 
                            :autoCropHeight="example2.Height" 
                            :fixed="example2.fixed" 
                            :fixedBox="example2.fixedBox" 
                            :fixedNumber="example2.fixedNumber"></vueCropper>
                            <div class="cropBtn">
                                <el-button @click="finish">裁剪上传</el-button>
                                <el-button @click="cropCancel">取消</el-button>
                            </div>
                        </div>
                        <label type="text" for="uploads2">选择图片</label>
                        <input ref="pic" type="file" id="uploads2" style="position:absolute; clip:rect(0 0 0 0);" accept="image/png, image/jpeg, image/gif, image/jpg" @change="electImg($event,2)">

                        <!-- <input ref="pic2" type="file">
                                    <el-button type="text" @click="uploadImg(2)">上传图片</el-button> -->
                        <div v-for="(item,index) in form.pf_file_url" :key="item">
                            <el-form-item v-loading="loadingLength===(index+1)" style="width:140px;" :element-loading-text="loadingText">
                                <img :src="item" alt="">
                            </el-form-item>
                            <el-button type="text" v-if="item" style="color:red" @click="delImg(index)">删除</el-button>
                        </div>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submit('form')">确定</el-button>
                        <el-button @click="cancel('form')">取消</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
        </div>
        <div class="content_table">
            <table-element :tableData='tableData' @msg='acquire'></table-element>
            <!-- <el-pagination v-if="tableData.data.length>0" :page-sizes="pageSizes" :page-size="page.page_limit" layout="prev, pager, next" :total="pageTotal" @size-change="handleSizeChange" @current-change='changePage'>
            </el-pagination> -->
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
    width: 140px;
}
.tailor {
    position: fixed;
    width: 49vw;
    height: 50vh;
    left: 0;
    top: 0;
    z-index: 999;
    /* border: 1px solid #666; */
}

.vue-cropper {
    width: 100%;
    height: 50%;
}

.cropBtn {
    width: 100%;
    text-align: center;
    padding: 20px 0;
    margin-left: -1px;
    border: 1px solid #666;
    border-top:none; 
    background: #fff;
}
</style>

<script src='../../directive/content/itemfeedback.js'></script>


