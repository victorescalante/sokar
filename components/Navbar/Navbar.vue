<template>
    <div class="Navbar">
      <div class="only-tablet">
        <h1 class="title primary-color ">Menú</h1>
      </div>

      <el-menu
        class="el-menu-vertical"
      >

        <nuxt-link to="/">
          <el-menu-item index="1" @click="onClickButton">
              <i class="el-icon-house"></i>
              <span>Dashboard</span>
          </el-menu-item>
        </nuxt-link>

        <nuxt-link to="/users" v-if="$currentRole(['admin','asesor'])">
          <el-menu-item index="2" @click="onClickButton">
              <i class="el-icon-user"></i>
              <span>Usuarios</span>
          </el-menu-item>
        </nuxt-link>

        <nuxt-link to="/clients">
          <el-menu-item index="3" @click="onClickButton">
            <i class="el-icon-user-solid"></i>
            <span @click="onClickButton">Clientes</span>
          </el-menu-item>
        </nuxt-link>

        <nuxt-link to="/repair">
          <el-menu-item index="4" @click="onClickButton">
            <i class="el-icon-setting"></i>
            <span>Refacciones</span>
          </el-menu-item>
        </nuxt-link>

        <nuxt-link to="/products">
          <el-menu-item index="5" @click="onClickButton">
            <i class="el-icon-folder"></i>
            <span>Equipos</span>
          </el-menu-item>
        </nuxt-link>

        <nuxt-link to="/services">
          <el-menu-item index="6" @click="onClickButton">
            <i class="el-icon-edit-outline"></i>
            <span>Mantenimientos</span>
          </el-menu-item>
        </nuxt-link>

        <nuxt-link to="/plan" v-if="$currentRole(['tecnico'])">
          <el-menu-item index="7" @click="onClickButton">
            <i class="el-icon-notebook-1"></i>
            <span>Plan de trabajo</span>
          </el-menu-item>
        </nuxt-link>

        <nuxt-link to="/read" v-if="$currentRole(['tecnico', 'admin'])">
          <el-menu-item index="7" @click="onClickButton">
            <i class="el-icon-camera"></i>
            <span>Leer QR</span>
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
