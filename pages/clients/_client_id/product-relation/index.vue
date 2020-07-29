<template>
  <div>

    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/clients' }">Clientes</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/clients/'+ this.$route.params.client_id }">{{ this.$route.params.client_id }}</el-breadcrumb-item>
      <el-breadcrumb-item>Creación de producto</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row class="group-title">
      <el-col :md="12">
        <TitleSection title="Asignar producto a cliente"></TitleSection>
      </el-col>
    </el-row>

    <el-row>
      <el-form ref="formProduct" :rules="rules" :model="form" class="form-style-curds">
        <el-col :md="6">
          <el-form-item label="Tipo de Equipo">
            <el-select v-model="form.product_type" placeholder="Selecciona el tipo de equipo">
              <el-option label="Propio" value="own"></el-option>
              <el-option label="Prestado" value="borrowed"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :md="6">
          <el-form-item label="Selecciona Equipo" prop="product_id">
            <el-select v-model="form.product_id" placeholder="Selecciona un equipo">
              <el-option
                v-for="product in products"
                :key="product.id"
                :label="product.name"
                :value="product.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :md="24">
          <div class="content-space">
            <el-button type="primary" @click="submitForm('formProduct')">Asignar producto</el-button>
          </div>
        </el-col>
      </el-form>
    </el-row>
  </div>
</template>

<script>
  import TitleSection from "../../../../components/TitleSection/TitleSection";

  export default {
    layout: 'dashboard',
    middleware: ['auth'],
    components: {
      TitleSection: TitleSection
    },
    data(){
      return {
        products: [],
        form: {
          product_type: "",
          product_id: "",
          status: true,
          client_id: this.$route.params.client_id
        }
      }
    },
    head () {
      return {
        title: 'Creación de servicio',
      }
    },
    mounted() {
      this.init();
    },
    methods: {
      async init() {
        let products = await this.$axios.$get(process.env.URL_RA_BACKEND+'products');
        this.products = products.data.rows;
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$axios.post(process.env.URL_RA_BACKEND+'clients/'+this.$route.params.client_id+'/product-relation', this.form)
              .then(response => {
                this.$notify({
                  title: 'Success',
                  message: 'El producto fue asignado correctamente',
                  type: 'success'
                });
                let data = response.data.data.user_product;
                this.$router.push('/clients/'+data.user_id+'/product-relation/'+data.id);
              }).catch(function (error) {
              this.$notify.error({
                title: 'Error',
                message: 'El servicio no ha posido ser creado'
              });
            });

          } else {
            return false;
          }
        });
      }
    }
  }
</script>
