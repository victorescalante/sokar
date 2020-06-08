<template>
    <div class="Navbar">
      <el-menu
        class="el-menu-vertical"
      >
        <nuxt-link to="/home">
          <el-menu-item to="/home" index="1">
              <i class="el-icon-house"></i>
              <span>Home</span>
          </el-menu-item>
        </nuxt-link>
        <nuxt-link to="/users" v-if="currentRole(['admin','asesor'])">
          <el-menu-item index="2">
              <i class="el-icon-user"></i>
              <span>Usuarios</span>
          </el-menu-item>
        </nuxt-link>
        <nuxt-link to="/clients" v-if="currentRole(['admin','asesor', 'tecnico'])">
          <el-menu-item index="3">
            <i class="el-icon-user"></i>
            <span>Clientes</span>
          </el-menu-item>
        </nuxt-link>
        <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <span>Equipos</span>
        </el-menu-item>
        <nuxt-link to="/services">
          <el-menu-item index="5">
            <i class="el-icon-setting"></i>
            <span>Mantenimiento</span>
          </el-menu-item>
        </nuxt-link>
      </el-menu>
    </div>
</template>

<script>

    export default {
      data(){
        return{

        }
      },
      methods: {
        currentRole(array){
          return array.includes(this.$auth.$state.user.role);
        }
      },
      props:
        {},
    };
</script>

<style>
  .el-menu-vertical a{
    cursor: pointer;
  }
</style>
