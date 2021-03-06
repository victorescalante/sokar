<template>
  <div>

    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/clients' }">Clientes</el-breadcrumb-item>
      <el-breadcrumb-item>Detalle de cliente</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row class="group-title">
      <el-col :md="12">
        <TitleSection title="Cliente"></TitleSection>
      </el-col>
    </el-row>

    <el-row>
      <el-form ref="formUser" :rules="rules" :model="form" class="form-style-curds">
        <el-row>
          <el-col :md="24">
            <div class="content-space">
              <p>Información de la empresa</p>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :md="6">
            <el-form-item label="Razón social" prop="business_name">
              <el-input v-model="form.business_name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="6">
            <el-form-item label="RFC" prop="rfc">
              <el-input v-model="form.rfc"></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="6">
            <el-form-item label="Nombre de la empresa" prop="company_name">
              <el-input v-model="form.company_name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :md="24">
            <div class="content-space">
              <p>Datos de acceso a la plataforma</p>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :md="6">
            <el-form-item label="Nombre completo" prop="name">
              <el-input v-model="form.name" required></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :md="6">
            <el-form-item label="Apellido Paterno" prop="last_name">
              <el-input v-model="form.last_name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :md="6">
            <el-form-item label="Apellido Materno" prop="second_last_name">
              <el-input v-model="form.second_last_name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
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
        </el-row>
        <el-row>
          <el-col :md="12">
            <div class="content-space">
              <p>Datos de contacto</p>
            </div>
          </el-col>
          <el-col :md="12">
            <div class="content-space">
              <el-button type="primary" @click="addContact" size="small" plain>Agregar nuevo contacto</el-button>
            </div>
          </el-col>
        </el-row>
        <el-row v-for="(contact, index) in form.contacts">
          <el-col :md="6">
            <el-form-item label="Nombre de contacto">
              <el-input v-model="contact.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="6">
            <el-form-item label="Teléfono de contacto">
              <el-input v-model="contact.phone"></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="6">
            <el-form-item label="Puesto">
              <el-input v-model="contact.job"></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="6">
            <div style="padding-top: 35px">
              <el-button type="danger" plain @click="DeleteContact(index)">Eliminar contacto</el-button>
            </div>
          </el-col>
        </el-row>
        <el-col :md="24" v-if="$currentRole(['admin'])">
          <div class="content-space">
            <el-button type="primary" @click="submitForm('formUser')">Actualizar datos de cliente</el-button>
          </div>
        </el-col>
        <el-col :md="24">
          <TableProducts @updateProductsList="getProducts()" :data="products" ></TableProducts>
        </el-col>
      </el-form>
    </el-row>

  </div>
</template>

<script>
  import TitleSection from "../../../components/TitleSection/TitleSection";
  import TableProducts from "../../../components/products/TableProducts";

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
          password: "",
          business_name: "",
          rfc: "",
          company_name: "",
          contacts: []
        },
        rules: {
          name: [{required: true, message: 'Agrega nombre', trigger: 'blur'}],
          last_name: [{required: true, message: 'Agrega apellido', trigger: 'blur'}],
          email: [{required: true, message: 'Agrega un correo', trigger: 'blur'}],
          company_name: [{required: true, message: 'Agrega el nombre de la empresa', trigger: 'blur'}]
        },
        products: []
      }
    },
    methods: {
      addContact(){
        this.form.contacts.push({
          name: "",
          phone: "",
          job: ""
        })
      },
      DeleteContact(position){
        this.form.contacts.splice(position, 1);
      },
      submitForm(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$axios.patch(process.env.URL_RA_BACKEND+'clients/'+this.$route.params.client_id, this.form)
              .then(response => {
                this.$notify({
                  title: 'Notificación',
                  message: 'El cliente fue actualizado correctamente',
                  type: 'success'
                });
              }).catch(error => {
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
        this.$axios.get(process.env.URL_RA_BACKEND + 'clients/' + this.$route.params.client_id)
          .then(response => {
            this.form = response.data.data.user;
          }).catch(error => {
            console.log("error");
          });
      },
      getProducts(){
        this.$axios.get(process.env.URL_RA_BACKEND + 'clients/' + this.$route.params.client_id + '/product-relation')
          .then(response => {
            this.products = response.data.data.rows;
          }).catch(error => {
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
