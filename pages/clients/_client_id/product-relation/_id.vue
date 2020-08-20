<template>
  <div class="details-product">
    <h2>Detalle del equipo</h2>
    <br>
    <p>El detalle del producto contiene la información relacionada del producto.</p>
    <p v-if="$fetchState.pending" class="primary-color">Cargando datos del producto ...</p>
    <div v-else>
      <el-row  class="content-info" :gutter="15">

        <el-col :md="8">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>Producto</span>
            </div>
            <p>Nombre del producto</p>
            <strong>{{ product_user.product.name }}</strong>
          </el-card>
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>Cliente</span>
            </div>
            <p>Nombre del cliente</p>
            <strong>{{ product_user.client.name }}</strong>
          </el-card>
        </el-col>

        <el-col :md="16">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>Detalle del producto asociado al cliente</span>
            </div>
            <el-row class="card-details">
              <el-col :md="24">
                <p>Número de serie</p>
                <strong>{{ product_user.serial_number }}</strong>
              </el-col>
            </el-row>
            <el-row class="card-details">
              <el-col :md="8">
                <p>Estatus</p>
                <strong>{{ $statusProduct(product_user.status) }}</strong>
              </el-col>
              <el-col :md="8">
                <p>Tipo de producto</p>
                <strong>{{ $typeProduct(product_user.product_type) }}</strong>
              </el-col>
            </el-row>
            <el-row class="card-details">
              <el-col :md="8">
                <p>Último servicio</p>
                <strong>{{ $convertDate(product_user.last_service) }}</strong>
              </el-col>
              <el-col :md="8">
                <p>Proximo servicio</p>
                <strong>{{ $convertDate(product_user.next_service) }}</strong>
              </el-col>
              <el-col :md="8">
                <p>Periodo de servicio</p>
                <strong> cada {{ product_user.period_service }} días</strong>
              </el-col>
              <el-col :md="8">
                <p>Registro de producto</p>
                <strong> {{ $convertDate(product_user.created_at) }}</strong>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>


      <el-row :gutter="15" class="formats">
        <el-card>
          <el-col :md="12">
            <strong class="primary-color">Carta de recepción y liberación </strong>
            <br><br>
            <p>Revisa la información para la generación de la carta de recepción y liberación.</p>
            <br>
            <p><b>Equipo:</b> {{ product_user.product.name }}</p>
            <br>
            <p><b>Número de serie:</b> {{ product_user.serial_number }}</p>
            <br>
            <p><b>Subir carta de recepción y liberación</b></p>
            <br>
            <div class="images-upload">
              <el-upload
                :action="upload.url"
                :headers="upload.headers"
                :data="saveFile('reception')"
                :file-list="filterImagesByCategory('reception')"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove">
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
            </div>
          </el-col>
          <el-col :md="12">
            <br>
            <p><b>Marca las opciones que correspondan a la recepción:</b></p>
            <el-form ref="form" :model="form" class="form-product">
              <el-row style="padding: 15px 0">
                <el-col :xs="12" :md="12">
                  <el-form-item>
                    <el-checkbox-group v-model="form.services" size="medium">
                      <el-checkbox label="Ayuda Visual" name="services"></el-checkbox>
                      <el-checkbox label="Manual de Equipo" name="services"></el-checkbox>
                      <el-checkbox label="Carta Garantia" name="services"></el-checkbox>
                      <el-checkbox label="Capacitación" name="services"></el-checkbox>
                    </el-checkbox-group>
                  </el-form-item>
                </el-col>
                <el-col :xs="12" :md="12">
                  <el-form-item class="lineal-form" label="Prueba de funcionalidad">
                    <el-radio-group v-model="form.functionality">
                      <el-radio label="e">E</el-radio>
                      <el-radio label="b">B</el-radio>
                      <el-radio label="r">R</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item class="lineal-form" label="Prueba de espuma">
                    <el-radio-group v-model="form.foam">
                      <el-radio label="e">E</el-radio>
                      <el-radio label="b">B</el-radio>
                      <el-radio label="r">R</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item>
                <el-button type="primary" @click="downloadFormatReception" plain>Generar formato de recepción</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-card>
      </el-row>

      <el-row class="warranty">
        <el-card style="padding: 15px 0">
          <el-col :md="12">
            <strong class="primary-color">Carta de recepción y liberación </strong>
            <br><br>
            <p><b>Subir garantía</b></p>
            <br>
            <div class="images-upload">
              <el-upload
                :action="upload.url"
                :headers="upload.headers"
                :data="saveFile('garantia')"
                :file-list="filterImagesByCategory('garantia')"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove">
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
            </div>
          </el-col>
          <el-col :md="12">
            <p class="text">Genera el formato de garantía para este equipo.</p>
            <div style="padding: 15px 0">
              <el-button type="primary" @click="downloadFormatWarranty" plain>Generar formato de garantía</el-button>
            </div>
          </el-col>
        </el-card>
      </el-row>

    </div>


  </div>
</template>

<script>
  import download from 'downloadjs';
  import _ from "lodash";
  export default {
    layout: 'dashboard',
    middleware: ['auth'],
    head () {
      return {
        title: 'Producto Relacionado',
      }
    },
    data(){
      return {
        form: {
          product_user: 0,
          services: ['Ayuda Visual', 'Manual de Equipo', 'Carta Garantia', 'Capacitación'],
          functionality: 'e',
          foam: 'e',
        },
        product_user: {},
        product_type: "own",
        dialogImageUrl: '',
        dialogVisible: false,
        upload: {
          url: process.env.URL_RA_BACKEND+'files',
          headers: {
            'Authorization': this.$auth.getToken('local')
          },
          data: {
            model_id: '',
            model: 0
          },
          list: []
        }
      }
    },
    methods: {
      saveFile(category){
        return {
          category: category,
          model_id: this.upload.data.model_id,
          model: this.upload.data.model
        }
      },
      filterImagesByCategory(category){
        return _.filter(this.upload.list, {'category': category})
      },
      async handleRemove(file, fileList) {
        await this.$axios.$delete(process.env.URL_RA_BACKEND + 'files/' + file.id);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      async downloadFormatReception() {
        let response = await this.$axios.$post(process.env.URL_RA_BACKEND + 'download/file/reception', this.form);
        download(atob(response), 'archivo.pdf', 'application/pdf')
      },
      async downloadFormatWarranty() {
        let response = await this.$axios.$post(process.env.URL_RA_BACKEND + 'download/file/warranty', this.form);
        download(atob(response), 'warranty.pdf', 'application/pdf')
      },
      async getProductUser() {
        let data = await this.$axios.$get(
          process.env.URL_RA_BACKEND + 'clients/' + this.$route.params.client_id + '/product-relation/' + this.$route.params.id
        );
        this.product_user = data.data.product_user;
        this.form.product_user = data.data.product_user.id;
        this.product_type = data.data.product_user.product_type;
        this.upload.data.model = data.data.product_user.model;
        this.upload.data.model_id = data.data.product_user.id;
        this.upload.list = _.map(data.data.product_user.files, function (file) {
          return {
            name: "name",
            url: file.url,
            id: file.id,
            category: file.category
          }
        })
      }

    },
    async fetch(){
      await this.getProductUser();
    },
    fetchOnServer: false
  }
</script>

<style lang="scss">
  .images-upload{
    padding: 15px 0;
  }
  .details-product{
    .warranty{
      .text{
        padding: 15px 0;
      }
      .c-button{
        padding: 15px 0;
        text-align: center;
      }
    }
    .form-product{
      .el-checkbox{
        display: block;
        width: 100%;
      }
      .lineal-form{
        > label{
          display: block;
          width: 100%;
          text-align: left;
          font-weight: bold;
        }
      }
    }
    .formats{
      padding: 25px 0px;
    }
    .content-info{
      padding: 25px 0px;
      .box-card{
        margin-top: 15px;
        span{
          font-weight: bold;
        }
        .card-details{
          p{
            color: #5d3ce7;
            padding: 15px 0px;
          }
        }
      }
    }
  }
</style>
