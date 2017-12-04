<template>
    <div class="manage_content">
        <div class="search">
            <el-form :inline="true" class="demo-form-inline">
                <el-form-item label="项目标题：">
                    <el-input v-model="searchData.p_title" placeholder="项目标题"></el-input>
                </el-form-item>
                <el-form-item label="产品名称：">
                    <el-input v-model="searchData.p_project_name" placeholder="产品名称"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
            </el-form>
            <el-button type="info" @click="add">新增</el-button>
            <el-button type="danger" @click="del" :disabled="delVal.length<1">删除</el-button>
            <!-- 新增 编辑-->
            <el-dialog :title="formtitle" :visible.sync="dialogFormVisible">
                <el-form :rules="rules" ref="form" :model="form" :label-width="formLabelWidth">
                    <el-form-item label="产品名称" prop="p_project_name">
                        <el-input v-model="form.p_project_name" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="项目标题" prop="p_title">
                        <el-input v-model="form.p_title" auto-complete="off" :maxlength='18'></el-input>
                    </el-form-item>
                    <el-form-item label="项目详情" prop="p_describe">
                        <editor ref="myTextEditor" 
                        :fileName="'myFile'" 
                        :canCrop="canCrop" 
                        :uploadUrl="uploadUrl" 
                        v-model="form.p_describe"></editor>
                    </el-form-item>
                    <!-- <el-form-item label="项目描述" prop="p_describe">
                        <el-input type='textarea'  v-model="form.p_describe" auto-complete="off"></el-input>
                    </el-form-item> -->
                    <el-form-item label="项目简介" prop="p_intro">
                        <el-input type='textarea'  v-model="form.p_intro" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="剩余份数" prop="p_inventory_number">
                        <el-input type='number' v-model.number="form.p_inventory_number" auto-complete="off" :min='0' :disabled="form.p_status ==3||form.p_status ==4"></el-input>
                    </el-form-item>
                    <el-form-item label="项目单价(元/份)" prop="p_unit_price">
                        <el-input type='number' v-model.number="form.p_unit_price" auto-complete="off" :min='0' :disabled="form.p_status ==3||form.p_status ==4||form.res_time ==0"></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="收益返还周期(月)" prop="p_cycle">
                        <el-input type='number' v-model.number="form.p_cycle" auto-complete="off" :min='0'></el-input>
                    </el-form-item> -->
                    <el-form-item label="最大筹款期限(天)" prop="p_fundraising_term">
                        <el-input type='number' v-model.number="form.p_fundraising_term" auto-complete="off" :min='0' :disabled="form.p_status ==3||form.p_status ==4"></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="市场价格(元/斤)" prop="p_market_price">
                        <el-input type='number' v-model.number="form.p_market_price" auto-complete="off" :min='0'></el-input>
                    </el-form-item>
                    <el-form-item label="预期收益(元/份)" prop="p_expect_profit">
                        <el-input type='number' v-model.number="form.p_expect_profit" auto-complete="off" :min='0'></el-input>
                    </el-form-item>
                    <el-form-item label="实际收益(元/份)" prop="p_actual_profit">
                        <el-input type='number' v-model.number="form.p_actual_profit" auto-complete="off" :min='0'></el-input>
                    </el-form-item> -->
                    <el-form-item label="开始众筹时间" prop="p_start_time">
                        <el-date-picker
                        v-model="form.p_start_time"
                        type="datetime"
                         :disabled="form.p_status ==3||form.p_status ==4||form.res_time ==0"
                        :picker-options="pickerOptions"
                        placeholder="选择日期时间">
                        </el-date-picker>
                        <!-- <el-input v-model="form.p_start_time" auto-complete="off"></el-input> -->
                    </el-form-item>
                    <el-form-item label="截止时间" prop="p_end_time">
                        <el-date-picker
                        v-model="form.p_end_time"
                        type="datetime"
                         :disabled="form.p_status ==3||form.p_status ==4"
                        :picker-options="pickerOptions"
                        placeholder="选择日期时间">
                        </el-date-picker>
                        <!-- <el-input v-model="form.p_start_time" auto-complete="off"></el-input> -->
                    </el-form-item>
                    <el-form-item label="预计收益时间" prop="p_cycle">
                        <el-date-picker
                        v-model="form.p_cycle"
                        type="datetime"
                         :disabled="form.p_status ==3||form.p_status ==4"
                        :picker-options="pickerOptions"
                        placeholder="选择日期时间">
                        </el-date-picker>
                        <!-- <el-input v-model="form.p_start_time" auto-complete="off"></el-input> -->
                    </el-form-item>
                    <el-form-item label="上架状态" prop="p_is_up">
                        <el-select v-model="form.p_is_up" placeholder="请选择类型">
                            <el-option label="上架 " value="0"></el-option>
                            <el-option label=" 下架 " value="1"></el-option>
                        </el-select>
                    </el-form-item>
                    <!-- <el-form-item label="项目状态" prop="p_status">
                        <el-select v-model="form.p_status" placeholder="请选择是否显示">
                            <el-option label="众筹中" value="0"></el-option>
                            <el-option label="众筹成功" value="1"></el-option>
                            <el-option label="众筹失败 " value="2"></el-option>
                            <el-option label="收益返还中" value="3"></el-option>
                            <el-option label="返还完成" value="4"></el-option>
                        </el-select>
                    </el-form-item> -->
                    <el-form-item label="收益回报方式">
                        <div v-for="item in form.earning" :key="item.pem_type">
                                <el-input v-model="item.pem_name" auto-complete="off" style="width:165px;" :disabled="form.p_status ==3||form.p_status ==4||form.res_time ==0"></el-input>
                            <!-- <label style="width:20%; display:inline-block;">{{item.pem_name}}</label> -->
                            <el-input v-model.number="item.pem_value.money" auto-complete="off" style="width:25%;" type='number' :min='0' :disabled="form.p_status ==3||form.p_status ==4||form.res_time ==0">
                                <template slot="prepend">市场价值(元)</template>
                            </el-input>
                            <el-input v-if="item.pem_type != 2" v-model.number="item.pem_value.weight" auto-complete="off" style="width:25%;" type='number' :min='0' :disabled="form.p_status ==3||form.p_status ==4||form.res_time ==0">
                                <template slot="prepend">产品数量(斤)</template>
                            </el-input>
                            <span  v-else>
                                <el-input v-model.number="item.pem_value.rate" auto-complete="off" style="width:25%;" type='number' :min='0' :disabled="form.p_status ==3||form.p_status ==4||form.res_time ==0">
                                <template slot="prepend">产品年收益(%)</template>
                                </el-input>
                                <el-input v-model.number="item.pem_value.lownum" auto-complete="off" style="width:25%;" type='number' @blur='changenum' :min='0' :disabled="form.p_status ==3||form.p_status ==4||form.res_time ==0">
                                <template slot="prepend">最低份数(份)</template>
                                </el-input>
                            </span>                         
                        </div>
                    </el-form-item>
                    <el-form-item label="上传项目banner图" prop="p_image_banner">
                        <a  href="javascript:void(0);" @click="mark('p_image_banner')">裁剪上传</a>
                        <img :src="form.p_image_banner" alt="">
                        <a class="error" v-if="form.p_image_banner " @click="delImg('banner')">删除</a>
                    </el-form-item>
                    <el-form-item label="上传项目logo图" prop="p_image_logo">
                        <a  href="javascript:void(0);" @click="mark('p_image_logo')">裁剪上传</a>
                        <img :src="form.p_image_logo" alt="">
                        <a class="error" v-if="form.p_image_logo" @click="delImg('logo')">删除</a>
                    </el-form-item>
                </el-form>
                <div slot="footer" class='footer'>
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
/* .footer img {
    max-width: 750px;
    padding-left: 150px;
} */
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

<script src='../../directive/content/item_list.js'></script>


