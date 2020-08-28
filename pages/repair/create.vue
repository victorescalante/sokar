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
                    <el-form-item label="Nombre de la refacción">
                      <el-input v-model="form.name"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :md="8">
                    <el-form-item label="Código">
                      <el-input v-model="form.code"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :md="8">
                    <el-form-item label="Cantidad de piezas">
                      <el-input-number size="mini" v-model="form.quantity" :min="1"></el-input-number>
                    </el-form-item>
                  </el-col>
                  <el-col :md="8">
                    <el-form-item label="Inventario">
                      <el-input-number size="mini" v-model="form.quantity" :min="1"></el-input-number>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-col :md="8">
                  <el-form-item label="Tipo de producto" prop="name">
                    <el-select v-model="form.product_id" placeholder="Selecciona un tipo de producto">
                      <el-option v-for="product in products" :label="product.name" :value="product.id"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :md="8">
                  <el-form-item label="Categoría" prop="name">
                    <el-select v-model="form.category_id" placeholder="Selecciona una categoría">
                      <el-option v-for="category in categories" :label="category.name" :value="category.id"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :md="8">
                  <el-form-item label="Precio">
                    <el-input placeholder="Coloca el precio" v-model="input1">
                      <template slot="prepend">$</template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :md="24">
                  <el-form-item label="Caracteristicas de la refacción">
                    <el-input type="textarea" rows="5"  v-model="form.desc"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :md="24" class="custom-buttons">
                  <el-button type="primary">Agregar Refacción</el-button>
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
    mounted: function () {
      this.$nextTick(function () {
        this.getProducts();
        this.getCategories();
      })
    },
    methods: {
      async getProducts() {
        let data = await this.$axios.$get(process.env.URL_RA_BACKEND + 'repairs/product-relation');
        this.products = data.data.products;
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
            this.$axios.post(process.env.URL_RA_BACKEND+'users', this.form)
              .then(response => {
                this.$notify({
                  title: 'Correcto',
                  message: 'El cliente fue creado correctamente',
                  type: 'success'
                });
                this.$router.push('/clients');
              }).catch(error => {
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
        products: [],
        categories: [],
        form: {
          name: '',
          last_name: '',
          second_last_name: '',
          email: '',
          password: '',
          role: 'cliente',
          num: 1
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
