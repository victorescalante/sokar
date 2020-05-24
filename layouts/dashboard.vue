<template>
  <div>
    <el-row class="tac">
      <el-col :sm="6" :md="4">
        <div class="logo-diken-imge"><img src="~/assets/diken_logo.png" alt="Diken"></div>
        <NavBar></NavBar>
      </el-col>
      <el-col :md="20" class="col-content">
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


<style>
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
  }
  .logo-diken-imge img{
    width: 100px;
  }

  .content-layout{
    padding: 15px;
    min-height: calc(100vh - 61px);
    background: rgba(223,234,245,.4);
  }

  .real-content{
    background: white;
    padding: 15px;
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
</style>
