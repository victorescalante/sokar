<template>
  <div>

    <TableGeneral title="Administración de usuarios">

      <div class="actions">
        <el-button class="el-button--primary" icon="el-icon-plus" @click="dialogCreateUser = true">Crear usuario</el-button>
      </div>

      <div class="content">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="Todos" name="all">
            <TableUsers :data="myTable()" :total_data="total_data"></TableUsers>
          </el-tab-pane>
          <el-tab-pane label="Técnicos" name="tecnico">
            <TableUsers :data="myTable('tecnico')" :total_data="total_data" role="tecnico"></TableUsers>
          </el-tab-pane>
          <el-tab-pane label="Asesores" name="asesor">
            <TableUsers :data="myTable('asesor')" :total_data="total_data" role="asesor"></TableUsers>
          </el-tab-pane>
          <el-tab-pane label="Administradores" name="admin">
            <TableUsers :data="myTable('admin')" :total_data="total_data" role="admin"></TableUsers>
          </el-tab-pane>
        </el-tabs>
      </div>

    </TableGeneral>


    <!-- Dialogs -->
    <el-dialog
      title="Agregar usuario"
      :visible.sync="dialogCreateUser"
      width="60%">

      <el-row>
        <el-form ref="formUser" :rules="rules" :model="form" class="form-style-curds">
          <el-col :md="8">
            <el-form-item label="Nombre completo" prop="name">
              <el-input v-model="form.name" required></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="8">
            <el-form-item label="Apellido Paterno" prop="last_name">
              <el-input v-model="form.last_name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="8">
            <el-form-item label="Apellido Materno" prop="second_last_name">
              <el-input v-model="form.second_last_name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="24">
            <div class="content-space">
              <p>Datos de acceso a la plataforma</p>
            </div>
          </el-col>
          <el-col :md="8">
            <el-form-item label="Correo electrónico" prop="email">
              <el-input v-model="form.email"></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="8">
            <el-form-item label="Contraseña" prop="password">
              <el-input type="password" v-model="form.password"></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="8">
            <el-form-item label="Rol de usuario" prop="role">
              <el-select v-model="form.role" placeholder="Selecciona un rol">
                <el-option label="Asesor" value="asesor"></el-option>
                <el-option label="Tecnico" value="tecnico"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogCreateUser = false">Cancel</el-button>
        <el-button type="primary" @click="submitForm('formUser')">Crear usuario</el-button>
      </span>
    </el-dialog>

    <!-- End Dialogs -->

  </div>
</template>

<style lang="scss">

  .el-dialog__header::after{
    content: "";
    width: 90%;
    position: absolute;
    top: 60px;
    left: 5%;
    padding: 0px 10px;
    border-bottom: solid 1px $blue;
  }

</style>

<script>

  import _ from 'lodash';
  import TableUsers from "../../components/users/TableUsers/TableUsers";
  import TableGeneral from "../../components/tables/TableGeneral";

  export default {
    layout: 'dashboard',
    middleware: ['auth'],
    transition: {
      name: 'default',
      mode: 'out-in'
    },
    components:{
      TableUsers: TableUsers,
      TableGeneral: TableGeneral
    },
    head () {
      return {
        title: 'Administración de usuarios',
      }
    },
    data(){
      return {
        data: [],
        total_data: 0,
        paginator: {
          limit: 50,
          page: 1,
          role: this.role
        },
        activeName: 'all',
        dialogCreateUser: false,
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
          password: [{required: true, message: 'Agrega una contraseña', trigger: 'blur'}],
          role: [{required: true, message: 'Agrega un rol', trigger: 'blur'}],
        }
      }
    },
    methods: {
      async handleClick(tab, event) {
        if (tab.name !== 'all') {
          this.paginator.role = tab.name;
        }else{
          this.paginator.role = "";
        }
        let data = await this.$axios.$get(process.env.URL_RA_BACKEND + 'users', {
          params: this.paginator
        });
        this.data = data.data.rows;
        this.total_data = data.data.total;
      },
      async init() {
        let data = await this.$axios.$get(process.env.URL_RA_BACKEND+'users');
        this.data = data.data.rows;
        this.total_data = data.data.total;
      },
      myTable(role){
        if (role){
          return _.filter(this.data, {'role': role });
        }
        return this.data;
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$axios.post(process.env.URL_RA_BACKEND+'users', this.form)
              .then(response => {
                this.data.push(response.data.data.user);
                this.$notify({
                  title: 'Correcto',
                  message: 'El usuario fue creado correctamente',
                  type: 'success'
                });
                this.dialogCreateUser = false;
                this.resetForm('formUser');
              }).catch(error => {
              this.$notify.error({
                title: 'Error',
                message: 'El usuario no ha posido ser creado'
              });
            });

          } else {
            return false;
          }
        });
      }
    },
    mounted() {
      this.init();
    }
  }
</script>
