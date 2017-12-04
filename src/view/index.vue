<template>
    <div class="source">
        <header-element @quit='quit' :headData='headData'></header-element>
        <div class="main">
            <nav-element :navData='navData' @navpath='navpath'></nav-element>
            <div class="content">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>
<script src='../directive/index.js'></script>

<style scoped>
.source{
   min-width: 1040px !important;height:100%;position:relative;
}
.main {
    margin-top:50px;
    height: 100%;
}
.content {
    margin-left:200px;
}
.nav{position:fixed;top:50px;left:0;background:#3d3f43;height:100%;z-index:9998}
</style>

