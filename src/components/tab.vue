
<template>
    <el-tabs type="border-card">
        <el-tab-pane label="信息管理">
            <table-element :tableData='tabData' :msg='msg'></table-element>
        </el-tab-pane>

    </el-tabs>
</template>
<style scoped>

</style>
<script>
import tableElement from './table'
export default {
    name: 'tab',
    data() {
        return {

        }
    },
    props: ['tabData'],
    methods: {
        msg (msg) {
            console.log(msg);
            this.$emit('msg',msg)
        }
    },
    mounted() {

    },
    components: {tableElement}
}
</script>
