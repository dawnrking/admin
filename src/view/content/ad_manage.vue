<template>
    <div class="manage_content">
        <div class="search">
            <el-button type="info" @click="add">新增</el-button>
            <el-button type="danger" @click="del" :disabled="delVal.length<1">删除</el-button>
            <!-- 新增 编辑-->
            <el-dialog :title="formtitle" :visible.sync="dialogFormVisible">
                <el-form :rules="rules" ref="form" :model="form" :label-width="formLabelWidth">
                    <el-form-item label="广告标题" prop="a_title">
                        <el-input v-model="form.a_title" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="广告内容" prop="a_content">
                        <editor ref="myTextEditor" 
                        :fileName="'myFile'" 
                        :canCrop="canCrop" 
                        :uploadUrl="uploadUrl" 
                        v-model="form.a_content"></editor>
                    </el-form-item>
                    <el-form-item label="是否推送" prop="is_send">
                        <el-select v-model="form.is_send" placeholder="请选择是否推送">
                            <el-option label="不推送" value="0"></el-option>
                            <el-option label="推送" value="1"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="上传广告图" prop="a_logo_img">
                        <a  href="javascript:void(0);" @click="mark">裁剪上传</a>
                        <img :src="form.a_logo_img" alt="">
                        <a class="error" v-if="form.a_logo_img" @click="deleteImg">删除</a>
                    </el-form-item>
                </el-form>
                 <div slot="footer" class='footer'>
                      <!-- <div>
                        <label class="el-form-item__label" style="width:150px;">请选择上传图片</label>
                        <div class="uploadimg">
                            <div id="container">
                                <a id="selectfiles" href="javascript:void(0);" class='btn'>选择文件</a>
                                <a @click="upload()" id="uploadfiles" href="javascript:void(0);" class='btn'>开始上传</a>
                            </div>
                            <div id="ossfile"></div>
                            <pre id="console"></pre>
                        </div>
                        <img :src="file.path" alt="">
                        <span class="delete error" v-if="!img">请上传图片</span>
                        <span class="delete error" @click="deleteImg" v-if="file.path">删除</span>   
                    </div> -->
                    <div class="footer--btn">
                        <el-button class="delete" type="primary" @click="submit('form')">确定</el-button>
                        <el-button class="delete " @click="cancel('form')">取消</el-button>
                    </div>
                </div>
            </el-dialog>
             <div class='mock' v-if='crpmark'>
                    <div class='mock-content'>
                        <croppa :width='imgdata.width' :height='imgdata.height' :quality='2' :prevent-white-space='true' v-model="croppa">
                        </croppa>
                    <el-button type="primary" @click="uploadCroppedImage">确定</el-button>
                    </div>
            </div> 
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
    max-width: 750px;
}
.quill-editor img {
    max-width: 300px !important;
}
.footer {
    text-align: left;
}
.footer img {
    width: 400px;
    padding-left: 150px;
}
.uploadimg {
    height: 36px;
    display: flex;
    line-height: 36px;
}
.error {
    color: red;
}
.btn {
    text-align: center;
    padding: 10px;
}
.select {
    width: 50%;
}
.delete {
    cursor: pointer;
    margin-left:150px ;
}
.footer--btn {
    padding: 10px;
}
.mock {
    position:fixed;
    top: 0;
    left: 0;
    right:0;
    bottom:0;
    z-index: 9999;
    background: rgba(125,125,125,.8);
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>

<script src='../../directive/content/ad_manage.js'></script>


