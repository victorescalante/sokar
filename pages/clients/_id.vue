<template>
  <div>

    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/clients' }">Clientes</el-breadcrumb-item>
      <el-breadcrumb-item>Actualizar cliente</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row class="group-title">
      <el-col :md="12">
        <TitleSection title="Cliente"></TitleSection>
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
          <el-tooltip class="item" effect="dark" content="Agrega una contraseña, solo si deseas hacer el cambio." placement="top-start">
            <el-form-item label="Nueva Contraseña" prop="password">
              <el-input type="password" v-model="form.password"></el-input>
            </el-form-item>
          </el-tooltip>
        </el-col>
        <el-col :md="24">
          <div class="content-space">
            <el-button type="primary"  @click="submitForm('formUser')">Actualizar cliente</el-button>
          </div>
        </el-col>
        <el-col :md="24">
          <TableProducts :data="products" ></TableProducts>
        </el-col>
      </el-form>
    </el-row>

  </div>
</template>

<script>
  import TitleSection from "../../components/TitleSection/TitleSection";
  import TableProducts from "../../components/products/TableProducts";

  export default {
    layout: 'dashboard',
    middleware: ['auth'],
    transition: {
      name: 'default',
      mode: 'out-in'
    },
    components: {
      TitleSection: TitleSection,
      TableProducts: TableProducts
    },
    head () {
      return {
        title: 'Actualización de cliente',
      }
    },
    data(){
      return {
        form: {
          role: "client",
          password: ""
        },
        rules: {
          name: [{required: true, message: 'Agrega nombre', trigger: 'blur'}],
          last_name: [{required: true, message: 'Agrega apellido', trigger: 'blur'}],
          email: [{required: true, message: 'Agrega un correo', trigger: 'blur'}]
        },
        products: []
      }
    },
    methods: {
      submitForm(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.form);
            this.$axios.patch(process.env.URL_RA_BACKEND+'clients/'+this.$route.params.id, this.form)
              .then(response => {
                this.$notify({
                  title: 'Notificación',
                  message: 'El cliente fue actualizado correctamente',
                  type: 'success'
                });
              }).catch(function (error) {
              this.$notify.error({
                title: 'Error',
                message: 'El cliente no ha posido ser actualizado'
              });
            });
          } else {
            return false;
          }
        });
      },
      getUser() {
        this.$axios.get(process.env.URL_RA_BACKEND + 'clients/' + this.$route.params.id)
          .then(response => {
            this.form = response.data.data.user;
            console.log('form ',this.form);
          }).catch(function (error) {
            console.log("error");
          });
      },
      getProducts(){
        this.$axios.get(process.env.URL_RA_BACKEND + 'clients/' + this.$route.params.id + '/product-relation')
          .then(response => {
            this.products = response.data.data.rows;
            console.log(this.products);
          }).catch(function (error) {
          console.log("error", error);
        });
      }
    },
    mounted() {
      this.getUser();
      this.getProducts();
    }
  }
</script>
