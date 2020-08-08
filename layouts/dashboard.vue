<template>
  <div>
    <el-row class="tac">
      <el-col :sm="6" :md="5">
        <div class="custom-desktop" :class="{ active: openNav }">
          <div class="profile">
            <div class="logo-diken-imge">
              <img src="~/assets/images/diken_logo.png" alt="Diken">
            </div>
            <div class="profile-nav">
              <el-avatar
                :size="100"
                src="http://cdn.lowgif.com/full/14cd924518aed580-gif-avatar-11-gif-images-download.gif">
              </el-avatar>
              <p class="role">{{ $auth.$state.user.role }}</p>
              <p class="name" style="font-size: 12px">{{ $auth.$state.user.name }}</p>
              <div class="division_profile"></div>
            </div>
          </div>
          <NavBar @clicked="onClickChild"></NavBar>
        </div>
      </el-col>
      <el-col :md="19" class="col-content">
        <NavTop></NavTop>
        <div class="float-nav" :class="{open: openNav}" @click="openNav=!openNav">
          <div class="menu"></div>
        </div>
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
    },
    methods: {
      onClickChild () {
        this.openNav = false;
      }
    },
    mounted() {
      this.windowHeight = window.innerHeight;
      this.windowWidth = window.innerWidth;
      window.addEventListener('resize', () => {
        this.windowHeight = window.innerHeight
        this.windowWidth = window.innerWidth
      })
    },
    data(){
      return{
        openNav: false,
        windowHeight: 0
      }
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

  .custom-desktop{
    position: initial;
    .profile{
      display: block;
    }
    .button-close{
      display: none;
    }
  }

  .float-nav{
    display: none;
  }

  @media (max-width: 950px){
    .custom-desktop{
      position: fixed;
      background: white;
      width: 100%;
      height: 100vh;
      z-index: 10;
      text-align: center;
      left: -100%;
      transition: all .5s ease-out;

      &.active{
        left: 0px;
      }

      .profile{
        display: none;
      }

      .Navbar{
        position: absolute;
        width: 300px;
        left: 0;
        right: 0;
        margin-left: auto;
        margin-right: auto;
        top: 10%;
      }

      .button-close{
        display: block;
        position: absolute;
        z-index: 11;
        bottom: 50px;
        right: 30px;
        width: 30px;
        height: 3px;
        background: #5d3ce7;
        transform: rotate(45deg);
        &::before{
          content: "";
          position: absolute;
          width: 30px;
          height: 3px;
          background: #5d3ce7;
          transform: rotate(-90deg);
          right: 0px;
        }
      }
    }

    .float-nav{
      display: block;
      position: fixed;
      width: 70px;
      height: 70px;
      border-radius: 50px;
      background: darkblue;
      z-index: 10;
      bottom: 15px;
      right: 15px;
      opacity: .8;
      transition: all .5s ease-in;

      .menu{
        &:before, &:after{
          transition: all .5s ease-in;
        }
      }

      &.open{
        background: red;
        .menu{
          background: red;
          &::before{
            transform: rotate(-45deg);
            top: auto;
          }
          &:after{
            transform: rotate(-135deg);
            top: auto;
          }
        }
      }

      .menu{
        content: "";
        position: absolute;
        width: 40px;
        left: 50%;
        height: 3px;
        background: white;
        top: 50%;
        margin-left: -20px;
        &:before, &:after{
          content: "";
          position: absolute;
          width: 40px;
          left: 50%;
          height: 3px;
          background: white;
          margin-left: -20px;
        }
        &:before{
          top: 10px;
        }
        &:after{
          top: -10px;
        }
      }
    }
  }

</style>
