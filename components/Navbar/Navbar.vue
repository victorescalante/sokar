<template>
    <div class="Navbar">
      <h1 class="title primary-color">Menú</h1>
      <el-menu
        class="el-menu-vertical"
      >
        <nuxt-link to="/">
          <el-menu-item to="/" index="1">
              <i class="el-icon-house"></i>
              <span @click="onClickButton">Dashboard</span>
          </el-menu-item>
        </nuxt-link>
        <nuxt-link to="/users" v-if="$currentRole(['admin','asesor'])">
          <el-menu-item index="2">
              <i class="el-icon-user"></i>
              <span @click="onClickButton">Usuarios</span>
          </el-menu-item>
        </nuxt-link>
        <nuxt-link to="/clients">
          <el-menu-item index="3">
            <i class="el-icon-user-solid"></i>
            <span @click="onClickButton">Clientes</span>
          </el-menu-item>
        </nuxt-link>
        <nuxt-link to="/repair">
          <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span @click="onClickButton">Refacciones</span>
          </el-menu-item>
        </nuxt-link>
        <nuxt-link to="/products">
          <el-menu-item index="5">
            <i class="el-icon-folder"></i>
            <span @click="onClickButton">Equipos</span>
          </el-menu-item>
        </nuxt-link>
        <nuxt-link to="/services">
          <el-menu-item index="6">
            <i class="el-icon-edit-outline"></i>
            <span @click="onClickButton">Mantenimiento</span>
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
        onClickButton (event) {
          this.$emit('clicked')
        }
      },
      props:
        {},
    };
</script>

<style lang="scss">
  .el-menu-vertical a{
    cursor: pointer;
  }

  @media (max-width: 950px){

    .el-menu-vertical a span{
      font-size: 20px;
    }

    .Navbar{
      ul{
        text-align: left;
      }
      .title{
        padding: 25px 20px;
        text-align: left;
      }
    }


  }
</style>
