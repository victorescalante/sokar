<template>
  <div>
    <TableGeneral title="Administración de clientes">

      <div class="actions">
        <el-button
          class="el-button--primary"
          icon="el-icon-plus"
          @click="dialogCreateClient = true"
          v-if="$currentRole(['admin'])"
        >Crear cliente</el-button>
      </div>

      <div class="content">
        <el-table
          :data="data"
          stripe
          style="width: 100%">
          <el-table-column
            prop="name"
            label="Nombre">
          </el-table-column>
          <el-table-column
            prop="last_name"
            label="Apellido">
          </el-table-column>
          <el-table-column
            prop="email"
            label="Correo electrónico">
          </el-table-column>
          <el-table-column
            prop="role"
            label="Rol">
          </el-table-column>
          <el-table-column
            prop="created_at"
            label="Creado">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="Operaciones">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">Editar</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          class="custom-paginator"
          @size-change="handleSizeChange"
          @current-change="HandleCurrentPage"
          :page-sizes="[50, 100, 200]"
          :page-size="50"
          layout="sizes, prev, pager, next"
          :total="total_data">
        </el-pagination>
      </div>
    </TableGeneral>


    <!-- Dialogs -->
    <el-dialog
      title="Agregar cliente"
      :visible.sync="dialogCreateClient"
      width="50%">

      <el-row>
        <el-col :md="24">
          <div class="content-space">
            <p>Información personal del cliente</p>
          </div>
        </el-col>
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
              <p>Datos de acceso a la plataforma para el cliente</p>
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
        </el-form>
      </el-row>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogCreateClient = false">Cancel</el-button>
        <el-button type="primary" @click="submitForm('formUser')">Crear cliente</el-button>
      </span>
    </el-dialog>

    <!-- End Dialogs -->


  </div>
</template>

<script>
  import TableGeneral from "../../components/tables/TableGeneral";

  export default {
    layout: 'dashboard',
    middleware: ['auth'],
    transition: {
      name: 'default',
      mode: 'out-in'
    },
    components:{
      TableGeneral: TableGeneral
    },
    head () {
      return {
        title: 'Administración de clientes',
      }
    },
    data(){
      return {
        data: [],
        paginator: {
          limit: 50,
          page: 1
        },
        total_data: 0,
        dialogCreateClient: false,
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
    },
    methods: {
      async handleSizeChange(size) {
        this.paginator.limit = size;
        let data = await this.$axios.$get(process.env.URL_RA_BACKEND + 'clients', {
          params: this.paginator
        });
        this.data = data.data.rows;
        this.total_data = data.data.total;
      },
      async HandleCurrentPage(page){
        this.paginator.page = page;
        let data = await this.$axios.$get(process.env.URL_RA_BACKEND+'clients', {
          params: this.paginator
        });
        this.data = data.data.rows;
        this.total_data = data.data.total;
      },

      async init() {
        let data = await this.$axios.$get(process.env.URL_RA_BACKEND+'clients');
        this.data = data.data.rows;
        this.total_data = data.data.total;
      },
      handleEdit(index, row){
        this.$router.push('/clients/'+row.id);
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
                  title: 'Success',
                  message: 'El cliente fue creado correctamente',
                  type: 'success'
                });
                this.dialogCreateClient = false;
                this.resetForm('formUser');
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
    mounted() {
      this.init();
    }
  }
</script>
