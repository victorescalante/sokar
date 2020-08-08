<template>
    <div class="Navtop">
      <el-menu
        class="el-menu-demo"
        mode="horizontal"
        background-color="rgb(7,103,198)"
        text-color="#fff"
        active-text-color="rgb(0,122,200)"
      >
        <el-submenu index="1">
          <template slot="title">Hola, {{ $auth.$state.user.name }}</template>
          <el-menu-item index="2-3" @click="$auth.logout()">Salir</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
</template>

<style lang="scss">
  @import "Navtop";
</style>

<script>
    export default {
      data(){
        return {
          user: {}
        }
      },
      props: {},
    };
</script>
