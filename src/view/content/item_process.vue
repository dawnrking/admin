<template>
    <div class="manage_content">
        <div class="search">
            <el-button type="info" @click="add">新增</el-button>
            <el-button type="danger" @click="del" :disabled="delVal.length<1">删除</el-button>
            <!-- 新增 编辑-->
            <el-dialog :title="formtitle" :visible.sync="dialogFormVisible">
                <el-form :rules="rules" ref="form" :model="form" :label-width="formLabelWidth">
                    <el-form-item label="项目进度介绍" prop="pe_introduce">
                        <el-input type='textarea'  v-model="form.pe_introduce" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="上传项目进度图">
                        <a  href="javascript:void(0);" @click="mark">裁剪上传</a>
                        <div  v-for="(item,index) in form.pe_image_url"  :key="item">        
                            <img :src="item" alt="">
                            <a  class="error inline" href="javascript:;" @click="delImg(index)">删除</a>
                        </div>
                    </el-form-item>
                </el-form>
                
                <div slot="footer" class='footer'>
                      <!-- <div>
                        <label class="el-form-item__label" style="width:150px;">请选择上传图片</label>
                        <div class="uploadimg">
                            <div id="container">
                                <a v-if="form.pe_image_url.length>3" class="btn error" href="javascript:void(0);">最多上传4张图片</a>
                                <a v-else  id="selectfiles" href="javascript:void(0);" class='btn'>选择并上传</a>
                            </div>
                            <div v-if="form.pe_image_url.length<4" id="ossfile"></div>
                            <pre v-if="form.pe_image_url.length<4" id="console"></pre>
                        </div>
                        <div  v-for="(item,index) in form.pe_image_url"  :key="item">        
                            <img :src="item" alt="">
                            <a  class="error inline" href="javascript:;" @click="delImg(index)">删除</a>
                        </div>
                        <span class="error" v-if="!img">请上传图片</span>
                    </div> -->
                    <el-button type="primary" @click="submit('form')">确定</el-button>
                    <el-button @click="cancel('form')">取消</el-button>
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
    max-width: 400px;
    padding-left: 150px;
}
.left {
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

<script src='../../directive/content/item_process.js'></script>


