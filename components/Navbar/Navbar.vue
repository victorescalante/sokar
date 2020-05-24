<template>
    <div class="Navbar">
      <el-menu
        class="el-menu-vertical">
        <nuxt-link to="/admin">
          <el-menu-item index="1">
              <i class="el-icon-house"></i>
              <span>Home</span>
          </el-menu-item>
        </nuxt-link>
        <nuxt-link to="/users">
          <el-menu-item index="2">
              <i class="el-icon-user"></i>
              <span>Usuarios</span>
          </el-menu-item>
        </nuxt-link>
        <el-menu-item index="3">
          <i class="el-icon-setting"></i>
          <span>Mantenimiento</span>
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

<style>
  .el-menu-vertical a{
    cursor: pointer;
  }
</style>
