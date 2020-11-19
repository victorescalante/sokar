<template>
    <div class="table-products">
      <el-row>
        <el-col :md="24">
          <h3>Administrar los equipos del cliente</h3>
          <br>
          <el-button type="primary" plain @click="openAddProduct = true">Agregar equipo a cliente</el-button>
          <el-button type="info" v-if="data.length >= 1" plain @click="$router.push('/services/create')">Realizar mantenimiento</el-button>
        </el-col>
        <el-col :md="24">
          <p style="padding: 25px 0"><strong>Número de serie:</strong> El número de serie es asignado al momento de agregar un producto del catálogo al cliente.</p>
        </el-col>
      </el-row>
      <div class="body-products">
        <el-row :gutter="15">
          <el-col :xs="12" :md="8" v-for="relation in data" style="padding-top: 15px">
            <div
              class="product-card"
              :class="checkDate(relation.next_service)"
              @click="redirectRelation(relation.id)"
            >
                <el-row>
                  <el-col :md="24">
                    <p class="product_name">{{ relation.product.name }}</p>
                    <p class="serial_number">{{ relation.serial_number }}</p>
                  </el-col>
                </el-row>
                <el-row class="date">
                  <el-col :md="24">
                    <p>Última fecha de servicio</p>
                    <span>{{ $convertDate(relation.last_service) }}</span>
                  </el-col>
                  <el-col :md="24">
                    <p>Proxima fecha de servicio</p>
                    <span>{{ $convertDate(relation.next_service) }}</span>
                  </el-col>
                </el-row>
              <el-row>
                <el-col :md="12" :offset="12"></el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
      </div>
      <el-dialog
        title="Asignar equipo a cliente"
        :visible.sync="openAddProduct"
        :width="$getWidthModal(windowWidth)">
        <el-row v-loading="loadingProduct">
          <el-form class="mini-form-product" ref="formProduct" :model="form">
            <el-col :md="24">
              <el-form-item label="Tipo de Equipo">
                <el-select v-model="form.product_type" placeholder="Selecciona el tipo de equipo">
                  <el-option label="Propio" value="own"></el-option>
                  <el-option label="Comodato" value="borrowed"></el-option>
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
                <el-button type="primary" @click.stop="submitForm('formProduct')">Asignar producto</el-button>
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
          loadingProduct: false,
          windowWidth: 0,
          openAddProduct: false,
          products: [],
          form: {
            product_type: "",
            product_id: "",
            status: true
          }
        }
      },
      mounted() {
        this.windowWidth = window.innerWidth;
        window.addEventListener('resize', () => {
          this.windowWidth = window.innerWidth
        })
      },
      async fetch(){
        await this.getProducts();
      },
      methods: {
        async getProducts(){
          let products = await this.$axios.$get(process.env.URL_RA_BACKEND+'products');
          this.products = products.data.rows;
        },
        redirectRelation(relation_id){
          this.$router.push('/clients/'+this.$route.params.client_id+'/product-relation/'+relation_id);
        },
        checkDate(date){

          let next_service = new Date(date).getTime();
          let now = Date.now();
          let time = now-next_service;

          if (time >= 0){
            return 'danger';
          }
          return '';
        },
        submitForm(formName) {
          this.loadingProduct = true;
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.$axios.post(
                process.env.URL_RA_BACKEND + 'clients/' + this.$route.params.client_id + '/product-relation', this.form)
                .then(response => {
                  this.$notify({
                    title: 'Correcto',
                    message: 'El producto fue asignado correctamente',
                    type: 'success'
                  });
                  this.$emit('updateProductsList');
                  this.openAddProduct = false;
                  this.loadingProduct = false;
                }).catch(error => {
                this.loadingProduct = false;
              });
            } else {
              return false;
            }
          });
        }
      }
    }
</script>

<style lang="scss">

  $base-color: #2d9c03;
  $base-cancelled: #3c5fe0;
  $base-danger: #d90e0e;

  .product-card{
    &.cancel{
      border: $base-cancelled solid 1px;
      .product_name{
        color: $base-cancelled;
      }
    }

    &.danger{
      border: $base-danger solid 1px;
      .product_name{
        color: $base-danger;
      }
    }

    cursor: pointer;
    padding: 15px;
    border: $base-color solid 1px;
    border-radius: 10px;
    text-align: center;
    .date{
      font-size: 12px;
      p{
        font-weight: bold;
      }
    }
    .serial_number{
      font-size: 10px;
    }
    .product_name{
      color: $base-color;
      font-weight: bold;
      padding: 0px;
    }
  }

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
