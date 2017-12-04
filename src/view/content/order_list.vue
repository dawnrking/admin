<template>
    <div class="manage_content">
        <div class="search">
            <el-form :inline="true" class="demo-form-inline">
                <el-form-item label="收货人姓名：">
                    <el-input v-model="page.o_name" placeholder="收货人姓名"></el-input>
                </el-form-item>
                <el-form-item label="用户昵称：">
                    <el-input v-model="page.ui_nickname" placeholder="用户昵称"></el-input>
                </el-form-item>
                <el-form-item label="订单编号：">
                    <el-input v-model="page.o_order_number" placeholder="订单编号"></el-input>
                </el-form-item>
                <el-form-item label="支付状态:">
                    <el-select v-model="page.o_payment_status" placeholder="请选择是支付状态">
                        <el-option label="全部" value="0"></el-option>
                        <el-option label="未支付" value="1"></el-option>
                        <el-option label="已支付" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
            </el-form>
            <el-dialog :title="formtitle" :visible.sync="dialogFormVisible">
                <el-form :rules="rules" ref="form" :model="form" :label-width="formLabelWidth" v-if="formtitle =='修改订单状态'">
                    <el-form-item label="订单状态" prop="o_type_status">
                        <el-select v-model="form.o_type_status" placeholder="请选择订单状态">
                            <el-option label="已回报" value="1"></el-option>
                            <el-option label="用户确认已完成" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <el-form :rules="rules" ref="report" :model="report" :label-width="formLabelWidth" v-if="formtitle == '回报'">
                    <el-form-item label="回报类型" prop="s_return_type">
                        <el-select v-model="report.s_return_type" placeholder="请选择回报类型" disabled>
                            <el-option label="产品" value="0"></el-option>
                            <el-option label="本金+产品" value="1"></el-option>
                            <el-option label="本金+收益" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="本金：" v-if="report.s_return_type != 0">
                        <el-input type='number' v-model.number="report.money" placeholder="本金" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="快递名称：" v-if="report.s_return_type != 2"  prop="s_express_name">
                        <el-input v-model="report.s_express_name" placeholder="快递名称"></el-input>
                    </el-form-item>
                    <el-form-item label="快递编号：" v-if="report.s_return_type != 2" prop="s_express_num">
                        <el-input v-model="report.s_express_num" placeholder="快递编号"></el-input>
                    </el-form-item>
                    <el-form-item label="收益金额：" v-if="report.s_return_type == 2">
                        <el-input v-model="report.s_money" placeholder="收益金额"disabled></el-input>
                    </el-form-item>
                </el-form>
                 <div slot="footer" class='footer'>
                    <div class="footer--btn" v-if="formtitle =='修改订单状态'">
                        <el-button class="delete" type="primary" @click="submit('form')">确定</el-button>
                        <el-button class="delete " @click="cancel('form')">取消</el-button>
                    </div>
                    <div class="footer--btn" v-if="formtitle == '回报'">
                        <el-button class="delete" type="primary" @click="submit('report')">确定</el-button>
                        <el-button class="delete " @click="cancel('report')">取消</el-button>
                    </div>
                </div>
            </el-dialog>
        </div>
        <div class="content_table">
            <table-element :tableData='tableData' @msg='acquire'></table-element>
            <el-pagination v-if="tableData.data.length>0&&pageTotal>10" :current-page='page.page' :page-sizes="pageSizes" :page-size="page.page_limit" layout="prev, pager, next" :total="pageTotal" @size-change="handleSizeChange" @current-change='changePage'>
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

<script src='../../directive/content/order_list.js'></script>


