<template>
  <div>
    <TableGeneral title="Refacciones" color="purple">

      <el-row>
        <el-col :md="24" style="padding: 15px">
          <el-card>
            <el-row>
              <el-col :md="24">
                <h3>Registro</h3>
                <br>
                <hr>
              </el-col>
              <el-col :md="24">
                <div class="content-space">
                  <p>Información de registro</p>
                </div>
              </el-col>
              <el-form ref="formService" :rules="rules" :model="form" class="form-style-curds">
                <el-row>
                  <el-col :md="8">
                    <el-form-item label="Nombre de la refacción" prop="name">
                      <el-input v-model="form.name"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :md="8">
                    <el-form-item label="Código" prop="code">
                      <el-input v-model="form.code"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :md="8">
                    <el-form-item label="Cantidad de piezas" prop="quantity">
                      <el-input-number size="mini" v-model="form.quantity" :min="1"></el-input-number>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-col :md="8">
                  <el-form-item label="Tipo de producto" prop="name">
                    <el-select v-model="form.product_repair_parts_id" placeholder="Selecciona un tipo de producto">
                      <el-option v-for="product in products" :label="product.name" :value="product.id"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :md="8">
                  <el-form-item label="Categoría" prop="name">
                    <el-select v-model="form.category_repair_parts_id" placeholder="Selecciona una categoría">
                      <el-option v-for="category in categories" :label="category.name" :value="category.id"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :md="24">
                  <el-form-item label="Caracteristicas de la refacción">
                    <el-input type="textarea" rows="5"  v-model="form.features"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :md="24" class="custom-buttons">
                  <el-button type="primary" @click.stop="submitForm('formService')">Actualizar Refacción</el-button>
                </el-col>
              </el-form>
            </el-row>
          </el-card>
        </el-col>

      </el-row>

    </TableGeneral>
  </div>
</template>

<style lang="scss">
  .el-select{
    width: 100%;
  }
  .custom-buttons{
    padding: 15px;
    text-align: right;
  }
</style>

<script>

  import TableGeneral from "../../components/tables/TableGeneral";

  export default {
    layout: 'dashboard',
    middleware: ['auth'],
    transition: {
      name: 'default',
      mode: 'out-in'
    },
    components: {
      TableGeneral: TableGeneral
    },
    head () {
      return {
        title: 'Creación de Refacciones',
      }
    },
    async fetch(){
      await this.getProducts();
      await this.getCategories();
      await this.getRepair();
    },
    methods: {
      async getRepair() {
        let repair = await this.$axios.$get(process.env.URL_RA_BACKEND + 'repairs/'+ this.$route.params.id);
        this.form = repair.data.repair;
      },
      async getProducts() {
        let data = await this.$axios.$get(process.env.URL_RA_BACKEND + 'products?limit=200');
        this.products = data.data.rows;
      },
      async getCategories() {
        let data = await this.$axios.$get(process.env.URL_RA_BACKEND + 'repairs/categories');
        this.categories = data.data.categories;
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$axios.put(process.env.URL_RA_BACKEND+'repairs/'+this.$route.params.id, this.form)
              .then(response => {
                this.$notify({
                  title: 'Correcto',
                  message: 'La refacción fue actualizada correctamente',
                  type: 'success'
                });
              }).catch(error => {
              this.$notify.error({
                title: 'Error',
                message: 'La refacción no pudo ser actualizada correctamente'
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
        products: [],
        categories: [],
        form: {
          features: "",
          quantity: 1,
          code: "",
          category_repair_parts_id: "",
          product_repair_parts_id: "",
          name: "",
          number_diken: 0
        },
        rules: {
          features: [{required: true, message: 'Agrega caracteristicas', trigger: 'blur'}],
          quantity: [{required: true, message: 'Agrega cantidad', trigger: 'blur'}],
          code: [{required: true, message: 'Agrega codigo', trigger: 'blur'}],
          category_repair_parts_id: [{required: true, message: 'Agrega una categoría', trigger: 'blur'}],
          product_repair_parts_id: [{required: true, message: 'Agrega un producto', trigger: 'blur'}],
          name: [{required: true, message: 'Agrega un nombre', trigger: 'blur'}]
        }
      }
    }
  }
</script>
