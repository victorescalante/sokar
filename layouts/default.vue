<template>
  <div>
    <div class="navbar-login">
      <div class="navbar-image">
        <img class="logo" src="~/assets/images/30diken.png" alt="Diken logo">
      </div>
      <div class="navbar-text">SISTEMA ADMINISTRATIVO DE EQUIPOS Y MANTENIMIENTOS</div>
    </div>
    <nuxt />
  </div>
</template>

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

  .navbar-login{
    background: #0767C6 0% 0% no-repeat padding-box;
    height: 50px;
    width: 100%;
    z-index: 10;
  }

  .navbar-login > div{
    display: inline-block;
  }

  .navbar-image{
    height: 50px;
    background: white;
    width: 150px;
    position: relative;
    border-radius: 0px 0px 100px 0px;
  }

  .navbar-image img{
    position: absolute;
    width: 70px;
    top: 0px;
    left: 35px;
  }

  .navbar-text{
    position: absolute;
    max-width: 100%;
    top: 50%;
    margin-top: -10px;
    left: 200px;
    color: white;
  }

  @media (max-width: 950px){
    .navbar-text{
      font-size: 12px;
    }
  }
</style>
