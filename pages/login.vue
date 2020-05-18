<template>
  <div class="container">
    <el-row class="login-container-row">
      <el-col class="login-container-col">
        <el-card class="box-card">
          <div class="container-logo">
            <img class="logo" src="~/assets/diken_logo.png" alt="Diken logo">
          </div>
          <div class="form_login">
            <el-form label-position="top" label-width="100px" :model="form">
              <el-form-item label="Correo electronico">
                <el-input v-model="form.email"></el-input>
              </el-form-item>
              <el-form-item label="Contraseña">
                <el-input type="password" v-model="form.password"></el-input>
              </el-form-item>
              <div class="login-button">
                <el-button @click="login" type="primary">Acceder al sistema</el-button>
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
        console.log(err)
      }
    }
  }
}
</script>

<style>

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
    border-radius: 15px;
  }

  .container{
    position: relative;
    width: 100%;
    height: 100vh;
    background: linear-gradient(-45deg, #ee7752, #5d3ce7, #23a6d5, #23d5ab);
    background-size: 400% 400%;
    animation: gradient 15s ease infinite;
  }

  .container-logo{
    text-align: center;
  }

  .logo{
    width: 100px;
  }

  .login-button{
    padding: 15px 0px;
    text-align: right;
  }

  .login-container-row{
    height: 100vh;
  }

  .login-container-col{
    width: 450px;
    position: absolute;
    left: 50%;
    margin-left: -225px;
    top: 50%;
    margin-top: -225px;
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
