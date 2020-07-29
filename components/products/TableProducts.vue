<template>
    <div class="table-products">
      <el-row>
        <el-col :md="24">
          <h3>Administrar los equipos del cliente</h3>
          <br>
          <el-button type="primary" plain @click="openAddProduct = true">Agregar equipo</el-button>
          <el-button type="info" v-if="data.length >= 1" plain @click="$router.push('/services/create')">Realizar mantenimiento</el-button>
        </el-col>
        <el-col :md="24">
          <p><strong>Número de serie:</strong> El número de serie es asignado al momento de agregar un producto del catálogo al cliente.</p>
        </el-col>
      </el-row>
      <div class="body-products">
        <el-row>
          <el-col :md="24">
            <el-table
              :data="data"
              @row-click="HandleClickRow"
              style="width: 100%">
              <el-table-column
                prop="serial_number"
                label="Número de serie"
              >
              </el-table-column>
              <el-table-column
                prop="product.name"
                label="Nombre">
              </el-table-column>
              <el-table-column
                label="Último mantenimiento">
                <template slot-scope="scope">
                  {{ $convertDate(scope.row.last_service) }}
                </template>
              </el-table-column>
              <el-table-column
                label="Proximo mantenimiento">
                <template slot-scope="scope">
                  {{ $convertDate(scope.row.next_service) }}
                </template>
              </el-table-column>
              <el-table-column
                label="Estatus">
                <template slot-scope="scope">
                  {{ getStatus(scope.row.status) }}
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </div>
      <el-dialog
        title="Asignar equipo a cliente"
        :visible.sync="openAddProduct"
        width="30%">
        <el-row>
          <el-form class="mini-form-product" ref="formProduct" :rules="rules" :model="form">
            <el-col :md="24">
              <el-form-item label="Tipo de Equipo">
                <el-select v-model="form.product_type" placeholder="Selecciona el tipo de equipo">
                  <el-option label="Propio" value="own"></el-option>
                  <el-option label="Prestado" value="borrowed"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :md="24">
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
              <div class="content-space" style="text-align: right">
                <el-button type="info" @click="openAddProduct = false">Cancelar</el-button>
                <el-button type="primary" @click="submitForm('formProduct')">Asignar producto</el-button>
              </div>
            </el-col>
          </el-form>
        </el-row>
      </el-dialog>
    </div>
</template>

<script>

  import moment from 'moment'

  export default {
      name: "TableProducts",
      props: ['data', 'color'],
      data() {
        return {
          openAddProduct: false,
          products: [],
          form: {
            product_type: "",
            product_id: "",
            status: true
          }
        }
      },
      async fetch(){
        let products = await this.$axios.$get(process.env.URL_RA_BACKEND+'products');
        this.products = products.data.rows;
      },
      methods: {
        HandleClickRow(row, column, event){
          this.$router.push('/clients/'+this.$route.params.id+'/product-relation/'+row.id);
        },
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.$axios.post(process.env.URL_RA_BACKEND+'clients/'+this.$route.params.id+'/product-relation', this.form)
                .then(response => {
                  this.$notify({
                    title: 'Success',
                    message: 'El producto fue asignado correctamente',
                    type: 'success'
                  });
                  let data = response.data.data.user_product;
                  this.$router.push('/clients/'+this.$route.params.id+'/product-relation/'+data.id);
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
        },
        getNameType(type){
          if (type === 'own'){
            return "Propio";
          }
          if (type === 'borrowed'){
            return "Prestado";
          }
        },
        getStatus(status){
          if (status){
            return "Activo";
          }
          return "Inactivo";
        }
      }
    }
</script>

<style lang="scss">
  .mini-form-product{
    label{
      display: block;
      width: 100%;
      text-align: left;
    }
    .el-select{
      width: 100%;
    }
  }
  .table-products{
    padding: 25px 15px;
    p{
      padding-top: 15px;
    }
    .body-products{
      padding-top: 15px;
      .row-custom{
        padding-top: 15px;
        &.row-header{
          font-weight: bold;
        }
      }
    }
  }
</style>
