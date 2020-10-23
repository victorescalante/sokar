<template>
  <div>
    <TableGeneral title="Productos" color="purple">

      <el-row>
        <el-col :md="24" style="padding: 15px">
          <el-card>
            <el-row>
              <el-col :md="24">
                <h3>Actualización de producto</h3>
                <br>
                <hr>
              </el-col>
              <el-col :md="24">
                <div class="content-space">
                  <p>Información</p>
                </div>
              </el-col>
              <el-form ref="formService" :rules="rules" :model="form" class="form-style-curds">
                <el-row>
                  <el-col :md="8">
                    <el-form-item label="Nombre del producto" prop="name">
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
                  <el-col :md="24">
                    <el-form-item label="Descripción" prop="description">
                      <el-input type="textarea" rows="5"  v-model="form.description"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :md="24">
                    <el-form-item label="Especificaciones de diseño" prop="specifications_desing">
                      <el-input type="textarea" rows="5"  v-model="form.specifications_desing"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :md="24">
                    <el-form-item label="Especificaciones de operación" prop="specifications_operation">
                      <el-input type="textarea" rows="5"  v-model="form.specifications_operation"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :md="24">
                    <el-form-item label="Beneficios" prop="benefits">
                      <el-input type="textarea" rows="5"  v-model="form.benefits"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-col :md="24" class="custom-buttons">
                  <el-button type="primary" @click.stop="submitForm('formService')">Actualizar Producto</el-button>
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
        title: 'Edición de productos',
      }
    },
    async fetch(){
      await this.getProduct();
    },
    methods: {
      async getProduct(){
        let product = await this.$axios.$get(process.env.URL_RA_BACKEND + 'products/'+ this.$route.params.id);
        this.form = product.data.product;
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$axios.put(process.env.URL_RA_BACKEND + 'products/' + this.$route.params.id, this.form)
              .then(response => {
                this.$notify({
                  title: 'Correcto',
                  message: 'El producto fue actualizado correctamente',
                  type: 'success'
                });
                this.$router.push('/products');
              }).catch(error => {
              this.$notify.error({
                title: 'Error',
                message: 'El producto no pudo ser actualizado correctamente'
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
          code: "",
          name: "",
          specifications_desing: "",
          specifications_operation: "",
          benefits: "",
          category_id: 1
        },
        rules: {
          specifications_desing: [{required: true, message: 'Agrega especificaciones de diseño', trigger: 'blur'}],
          specifications_operation: [{required: true, message: 'Agrega especificaciones de operación', trigger: 'blur'}],
          description: [{required: true, message: 'Agrega descripción', trigger: 'blur'}],
          benefits: [{required: true, message: 'Agrega beneficios', trigger: 'blur'}],
          code: [{required: true, message: 'Agrega codigo', trigger: 'blur'}],
          name: [{required: true, message: 'Agrega un nombre', trigger: 'blur'}]
        }
      }
    }
  }
</script>
