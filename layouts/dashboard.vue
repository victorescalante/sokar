<template>
  <div>
    <el-row class="tac">
      <el-col :sm="6" :md="4" :lg="3">
        <div class="logo-diken-imge">
          <img src="~/assets/images/diken_logo.png" alt="Diken">
        </div>
        <div class="profile-nav">
          <el-avatar
            :size="100"
            src="http://cdn.lowgif.com/full/14cd924518aed580-gif-avatar-11-gif-images-download.gif">
          </el-avatar>
          <p class="role">{{ $auth.$state.user.role }}</p>
          <p class="name">{{ $auth.$state.user.name }}</p>
          <div class="division_profile"></div>
        </div>
        <NavBar></NavBar>
      </el-col>
      <el-col :md="20" :lg="21" class="col-content">
        <NavTop></NavTop>
        <div class="content-layout">
          <div class="real-content">
            <nuxt />
          </div>
        </div>
      </el-col>
    </el-row>

  </div>
</template>

<script>

  import Navbar from "../components/Navbar/Navbar";
  import Navtop from "../components/Navtop/Navtop";

  export default {
    components:{
      'NavBar': Navbar,
      'NavTop': Navtop
    }
  }
</script>


<style lang="scss">
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

  .logo-diken-imge{
    text-align: center;
    height: 60px;

    img{
      width: 70px;
    }

  }


  .content-layout{
    padding: 15px;
    min-height: calc(100vh - 61px);
    background: rgba(223,234,245,.4);
  }

  .real-content{
    background: white;
  }

  .el-menu--horizontal > .el-submenu{
    float: right;
  }

  a{
    color: inherit;
    text-decoration: inherit;
  }

  .el-menu{
    border-right: none;
  }

  .profile-nav{
    padding: 15px;
    text-align: center;
    .role{
      padding: 15px 0px;
      text-transform: uppercase;
      font-weight: bold;
      color: $blue;
    }
    .name{
      text-transform: uppercase;
      font-size: 15px;
    }
    .division_profile{
      margin-top: 15px;
      padding: 0px 15px;
      width: 100%;
      height: 1px;
      background: $blue;
    }
  }
</style>
