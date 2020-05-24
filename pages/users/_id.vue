<template>
  <div>

    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/users' }">Usuarios</el-breadcrumb-item>
      <el-breadcrumb-item>Actualizar de usuario</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row class="group-title">
      <el-col :md="12">
        <TitleSection title="Actualizar usuario"></TitleSection>
      </el-col>
    </el-row>

    <el-row>
      <el-col :md="24">
        <div class="content-space">
          <p>Información personal del usuario</p>
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
            <p>Datos de acceso a la plataforma</p>
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
        <el-col :md="6">
          <el-form-item label="Rol" prop="role">
            <el-select v-model="form.role" placeholder="Selecciona un rol">
              <el-option label="Asesor" value="asesor"></el-option>
              <el-option label="Tecnico" value="tecnico"></el-option>
              <el-option label="Cliente" value="cliente"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :md="24">
          <div class="content-space">
            <el-button type="primary" @click="submitForm('formUser')">Actualizar usuario</el-button>
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
        title: 'Actualización de usuario',
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
          role: ''
        },
        rules: {
          name: [{required: true, message: 'Agrega nombre', trigger: 'blur'}],
          last_name: [{required: true, message: 'Agrega apellido', trigger: 'blur'}],
          email: [{required: true, message: 'Agrega un correo', trigger: 'blur'}],
          role: [{required: true, message: 'Agrega un rol', trigger: 'blur'}],
        }
      }
    },
    methods: {
      submitForm(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            delete this.form.password;
            this.$axios.patch(process.env.URL_RA_BACKEND+'users/'+this.$route.params.id, this.form)
              .then(response => {
                this.$notify({
                  title: 'Success',
                  message: 'El usuario fue actualizado correctamente',
                  type: 'success'
                });
              }).catch(function (error) {
              this.$notify.error({
                title: 'Error',
                message: 'El usuario no ha posido ser creado'
              });
            });
          } else {
            return false;
          }
        });
      },
      getUser() {
        this.$axios.get(process.env.URL_RA_BACKEND + 'users/' + this.$route.params.id)
          .then(response => {
            this.form = response.data.data.user;
          }).catch(function (error) {
          console.log("error");
          });
      }
    },
    mounted() {
      this.getUser();
    }
  }
</script>
