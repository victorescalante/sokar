<template>
  <div class="container">
    <el-row class="login-container-row">
      <el-col class="login-container-col">
        <el-card class="box-card">
          <div class="container-logo">
            <img class="logo" src="~/assets/images/diken_logo.png" alt="Diken logo">
          </div>
          <div class="form_login">
            <el-form label-position="top" label-width="100px" :model="form">
              <el-form-item label="Usuario">
                <el-input placeholder="Ingresa tu correo" v-model="form.email"></el-input>
              </el-form-item>
              <el-form-item label="Contraseña">
                <el-input placeholder="Ingresa tu password" type="password" v-model="form.password"></el-input>
              </el-form-item>
              <div class="login-button">
                <el-button @click="login" type="primary">Iniciar sesión</el-button>
                <br><br><br>
                <a href="#" style="color: #1989FA">¿Olvidaste tu password?</a>
              </div>
            </el-form>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import 'element-ui/lib/theme-chalk/display.css';

export default {
  data() {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },
  methods:{
    async login() {
      try {
        let response = await this.$auth.loginWith('local', { data: this.form })
        console.log(response)
      } catch (err) {
        this.$message('Credenciales de acceso incorrectas');
      }
    }
  }
}
</script>

<style lang="scss">

  .form_login{
    .el-form-item__label{
      line-height: 15px;
    }
  }


  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  .box-card{
    border-radius: 10px;
    padding: 20px 0px;
    background: white;
    z-index: 5;
  }

  .container{
    position: relative;
    width: 100%;
    height: 100vh;
    // background-image: url("~assets/images/login_bg.png");
    // background-size: cover;
  }

  .container::before{
    content: "";
    position: absolute;
    background: white;
    animation: gradient 15s ease infinite;
    background-size: 400% 400%;
    width: 100%;
    height: 100%;
    z-index: 1;
    opacity: 0.4;
  }

  .container-logo{
    text-align: center;
  }

  .logo{
    width: 100px;
  }

  .login-button{
    padding: 15px 0px;
    text-align: center;
  }

  .login-container-row{
    height: 100vh;
  }

  .login-container-col{
    z-index: 10;
    background: linear-gradient(-45deg, #ee7752, #5d3ce7, #23a6d5, #23d5ab);
    background-size: 400% 400%;
    animation: gradient 15s ease infinite;
    padding: 20px;
    width: 400px;
    position: absolute;
    left: 50%;
    margin-left: -225px;
    top: 40%;
    margin-top: -225px;
    border-radius: 10px;
  }

  @media (max-width: 600px) {
    .box-card{
      border-radius: 0px;
    }
    .login-container-col{
      width: 100%;
      position: relative;
      left: 0%;
      margin-left: 0px;
      top: 0%;
      margin-top: 0px;
    }
  }



</style>
