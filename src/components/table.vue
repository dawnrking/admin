<template>
    <div class="table">
        <table border="0" cellspacing="1" cellpadding="0">
            <thead>
                <tr>
                    <th v-if="tableData.all && tableData.data.length>0" style="text-align: center;">
                        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                    </th>
                    <th v-for="items in tableData.label" :key="items.name">{{items.name}}</th>
                    <th v-if="tableData.opate.length > 0">操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in tableData.data" :key="item.name" :style="tableData.filter&&tableData.filter(item)">
                    <el-checkbox-group v-model="checked" @change="handleCheckedChange" v-if="tableData.all">
                        <el-checkbox :label="item[tableData.all]" :key="item[tableData.all]"></el-checkbox>
                    </el-checkbox-group>
                    <td v-for="items in tableData.label" :key="items.msgname" @click="detail(item)">
                        <!-- <span v-if="items.filter" :data-val='items.filter[item[items.msgname]]'>{{items.filter[item[items.msgname]]}}</span> -->
                        <span v-if="items.filter" :data-val='item[items.msgname]' @change='getData(item[items.msgname])'>{{items.filter(item[items.msgname])}}</span>
                         <span v-else-if="items.opate">
                            <span :data-val='item[items.msgname]'>{{item[items.msgname]}}</span>
                            <span v-for="itemsop in items.opate" :key="itemsop.opatename">
                                <a v-if="itemsop.filter(item[items.msgname])" class="opt" href="javascript:;"  @click.stop='edit(item,itemsop.opatename)'>{{itemsop.name}}</a>
                            </span>
                        </span>
                        <span v-else :data-val='item[items.msgname]'>{{item[items.msgname]}}</span>
                    </td>
                    <td v-if="tableData.opate.length > 0">
                        <span class="btn_box" v-for="itemop in tableData.opate" :key="itemop.opatename">
                            <el-button type="text" size="small"  @click='edit(item,itemop.opatename)' v-if="!itemop.filter">{{itemop.name}}</el-button>
                            <el-button type="text" size="small"  @click='edit(item,itemop.opatename)' v-else>{{itemop.filter(item[itemop.valname],item[itemop.msgname])}}</el-button>
                        </span>  
                    </td>
                </tr>
            </tbody>
        </table>
        <p class="notData" v-if="tableData.data.length<1">暂无数据</p>
    </div>
</template>
<style scoped>
.table {
    width: 100%;
}

.table .notData {
    width: 100%;
    text-align: center;
    padding: 20px;
    font-size: 1.2rem;
}

table {
    width: 100%;
    /*margin: 10px 0;*/
}

table,
button {
    font-size: 14px;
}

table thead tr {
    /* background: #e4eaf3; */
    background: #f7f7f7;
}
table thead tr th{
    font-weight: 500;
    color:#222;
    font-size:14px;
}
table th,
table td {
    position: relative;
    padding: 1rem 0.4rem;
    max-width: 200px;
    overflow: hidden;
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size:13px;
}
table tbody tr {
    border-bottom: 1px solid #e9e9e9;
}

table tbody tr:hover {
    background: #f5f5f5;
}
.btn_box {
    padding: 0 5px;
}
.opt {
    float: right;
    color: #20a0ff;
}
</style>
<script>
// import mixin from './mixin.js'
export default {
    name: 'table',
    // mixins: [mixin],
    data() {
        return {
            checkAll: false,
            checked: [],
            datalenght: [],
            isIndeterminate: false
        }
    },
    props: ['tableData'],
    methods: {
        edit(msg, opate) {
            let data = {
                data: msg,
                opate: opate
            }
            this.$emit('msg', data)
        },
        getData(data) {
            console.log(data)
        },
        detail(msg) {
            let data = {
                data: msg,
                opate: 'detail'
            }
            this.$emit('msg', data)
        },
        getId() {
            this.tableData.data.forEach((element) => {
                this.datalenght.push(element[this.tableData.all])
            }, this);
        },
        handleCheckAllChange(event) {
            this.getId();
            this.checked = event.target.checked ? this.datalenght : [];      
            this.isIndeterminate = false;
            this.$emit('msg', { opate: 'msg', data: this.checked })
        },
        handleCheckedChange(value) {
            let checkedCount = value.length;
            this.checkAll = checkedCount === this.tableData.data.length;
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.tableData.data.length;
            this.$emit('msg', { opate: 'msg', data: this.checked });
        }

    },
    mounted() {

    },
    beforeCreate() {
    },
    filters: {}
}
</script>
