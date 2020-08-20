<template>
  <div>

    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/clients' }">Clientes</el-breadcrumb-item>
      <el-breadcrumb-item>Creación de cliente</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row class="group-title">
      <el-col :md="12">
        <TitleSection title="Crear cliente"></TitleSection>
      </el-col>
    </el-row>

    <el-row>
      <el-col :md="24">
        <div class="content-space">
          <p>Información personal del cliente</p>
        </div>
      </el-col>
      <el-form ref="formUser" :rules="rules" :model="form" class="form-style-curds">
        <el-col :md="6">
          <el-form-item label="Nombre completo" prop="name">
            <el-input v-model="form.name" required></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="6">
          <el-form-item label="Apellido Paterno" prop="last_name">
            <el-input v-model="form.last_name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="6">
          <el-form-item label="Apellido Materno" prop="second_last_name">
            <el-input v-model="form.second_last_name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="24">
          <div class="content-space">
            <p>Datos de acceso a la plataforma para el cliente</p>
          </div>
        </el-col>
        <el-col :md="6">
          <el-form-item label="Correo electrónico" prop="email">
            <el-input v-model="form.email"></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="6">
          <el-form-item label="Contraseña" prop="password">
            <el-input type="password" v-model="form.password"></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="24">
          <div class="content-space">
            <el-button type="primary" @click="submitForm('formUser')">Crear cliente</el-button>
          </div>
        </el-col>
      </el-form>
    </el-row>

  </div>
</template>

<script>
  import TitleSection from "../../components/TitleSection/TitleSection";

  export default {
    layout: 'dashboard',
    middleware: ['auth'],
    transition: {
      name: 'default',
      mode: 'out-in'
    },
    components: {
      TitleSection: TitleSection
    },
    head () {
      return {
        title: 'Creación de usuario',
      }
    },
    methods: {
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$axios.post(process.env.URL_RA_BACKEND+'users', this.form)
              .then(response => {
                this.$notify({
                  title: 'Correcto',
                  message: 'El cliente fue creado correctamente',
                  type: 'success'
                });
                this.$router.push('/clients');
              }).catch(function (error) {
              this.$notify.error({
                title: 'Error',
                message: 'El cliente no ha posido ser creado'
              });
            });

          } else {
            return false;
          }
        });
      }
    },
    data(){
      return {
        form: {
          name: '',
          last_name: '',
          second_last_name: '',
          email: '',
          password: '',
          role: 'cliente'
        },
        rules: {
          name: [{required: true, message: 'Agrega nombre', trigger: 'blur'}],
          last_name: [{required: true, message: 'Agrega apellido', trigger: 'blur'}],
          email: [{required: true, message: 'Agrega un correo', trigger: 'blur'}],
          password: [{required: true, message: 'Agrega una contraseña', trigger: 'blur'}]
        }
      }
    }
  }
</script>
