<template>
    <div class="nav">

        <ul class="menu" :class="{'menu--collapse':isCollapse,'not-menu--collapse':!isCollapse}">
            <div class="logo">
                <!-- <img src="../assets/image/logo.png" alt=""> -->
            </div>
            <li v-for="(item,index) in navData" :key='index'>
                <div v-if="item.children" :class="{'is-active':path == item.path}">
                    <div class="navpath" @click="Toggle(item)">
                        <i :class="item.class"></i>
                        <span slot="title">{{item.name}}</span>
                        <i :class="!tagnav?'el-icon-arrow-right':'el-icon-arrow-down'"></i>
                    </div>
                    <ul v-if="tagnav">
                        <li  :class="{'is-active':path == val.path}" class="navhover navchild" v-for="(val,index) in item.children" :key='index'  @click.stop="selectNav(val.path)">
                            <i :class="val.class"></i>
                            <span slot="title">{{val.name}}</span>
                        </li>
                    </ul>
                </div>
                <div class="navpath navhover" v-else  @click="selectNav(item.path)"  :class="{'is-active':path == item.path}">
                    <i :class="item.class"></i>
                    <span slot="title">{{item.name}}</span>
                </div>
            </li>
            
            <!-- <div class="isCollapse" @click="Collapse">
                <i :class="navClass"></i>
            </div> -->
        </ul>
    </div>
    
</template>
<style scoped>

.menu {
    height: 100%;
    color: rgba(250,250,250,0.67);
    font-size: 14px;
    background: #4c5e70;
    /*box-shadow: 1px 0 10px #ccc;*/
    position: relative;
}
.menu li {
        line-height: 40px;
        overflow: hidden;
        cursor: pointer;
    }
.menu li i {
    margin-right:8px; 
}
.menu--collapse {
    width: 60px;
    transition: width .5s;
}
.not-menu--collapse {
    width: 200px;
    transition: width .5s;
}

.menu:hover .isCollapse {
    display: block;
}

.logo {
    width: 100%;
    height: 59px;
    text-align: center;
    line-height: 59px;
}
.logo img{
    height: 59px;
}
.isCollapse {
    display: none;
    width: 15px;
    height: 30px;
    line-height: 30px;
    border-radius: 0 30px 30px 0;
    background: #4c5e70;
    position: absolute;
    right: -15px;
    top: calc(50% - 15px);
    z-index: 10;
}

.is-active {
    background: #414f5d;
}
.navpath {
    padding: 10px 20px;
    display: flex;
    align-items: center;
}
.navchild {
    padding: 5px 20px 0 40px;
}
.navhover:hover {
        color: #fff;
        cursor: pointer;
    }
   
.navpath span {
    flex: 1;
}
</style>

<script>
export default {
    name: 'nav',
    data() {
        return {
            isCollapse: false,
            navClass: 'el-icon-arrow-left',
            path:'',
            tagnav: false,
            childrennav: false
        };
    },
    props: ['navData'],
    methods: {
        Toggle (data) {
            this.path = data.path;
            this.tagnav = !this.tagnav;
            if (this.tagnav) {
               this.$emit('navpath', data.children[0].path);
            }
        },
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        selectNav(keyPath) {
            this.path = keyPath;
            this.$emit('navpath', keyPath);
        },
        Collapse () {
            this.isCollapse = !this.isCollapse;
            this.navClass = this.isCollapse?'el-icon-arrow-right':'el-icon-arrow-left';
        }
    },
    mounted () {
        this.$nextTick(function () {
            
            this.path = this.$route.name
        })
    }
}
</script>
