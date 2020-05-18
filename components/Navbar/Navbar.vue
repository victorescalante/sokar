<template>
    <div class="Navbar">
      <el-menu
        class="el-menu-vertical-demo">
        <el-menu-item index="1">
          <i class="el-icon-menu"></i>
          <span><nuxt-link to="/admin">Dashboard</nuxt-link></span>
        </el-menu-item>
        <el-menu-item index="2">
          <i class="el-icon-document"></i>
          <span>Navigator Three</span>
        </el-menu-item>
        <el-menu-item index="3">
          <i class="el-icon-setting"></i>
          <span>Navigator Four</span>
        </el-menu-item>
      </el-menu>
    </div>
</template>

<script>

    export default {
        data(){
          return{

          }
        },
        props: {
        },
    };
</script>
