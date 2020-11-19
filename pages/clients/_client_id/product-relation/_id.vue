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
              <span>Datos del cliente</span>
            </div>
            <p><strong>Razón social:</strong> {{ product_user.client.business_name }}</p>
            <p><strong>Nombre de la empresa:</strong> {{ product_user.client.company_name }}</p>
            <p><strong>RFC:</strong> {{ product_user.client.rfc }}</p>
          </el-card>
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>Código QR del producto</span>
            </div>
            <el-button type="primary" @click="downloadQRProduct">Descargar código QR del producto</el-button>
          </el-card>
        </el-col>

        <el-col :md="16">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>Detalle del producto asociado al cliente</span>
              <el-button style="float: right; padding: 3px 0" type="text" @click="dialogVisibleEdit=true">Actualizar producto</el-button>
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
                <p>Tipo de equipo</p>
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
                accept="image/png, image/jpeg"
                :action="upload.url"
                :multiple="true"
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
                <el-col :xs="24" :md="24">
                  <el-form-item>
                    <el-checkbox-group v-model="form.services" size="medium">
                      <el-checkbox label="Ayuda Visual" name="services"></el-checkbox>
                      <el-checkbox label="Manual de Equipo" name="services"></el-checkbox>
                      <el-checkbox label="Carta Garantia" name="services"></el-checkbox>
                      <el-checkbox label="Capacitación" name="services"></el-checkbox>
                    </el-checkbox-group>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :md="24">
                  <el-form-item class="lineal-form" label="Prueba de funcionalidad">
                    <el-radio-group v-model="form.functionality">
                      <el-radio label="e">Excelente</el-radio>
                      <el-radio label="b">Bueno</el-radio>
                      <el-radio label="r">Regular</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item class="lineal-form" label="Prueba de espuma">
                    <el-radio-group v-model="form.foam">
                      <el-radio label="e">Excelente</el-radio>
                      <el-radio label="b">Bueno</el-radio>
                      <el-radio label="r">Regular</el-radio>
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
            <strong class="primary-color">Formato de garantía </strong>
            <br><br>
            <p><b>Subir garantía</b></p>
            <br>
            <div class="images-upload">
              <el-upload
                accept="image/png, image/jpeg"
                :action="upload.url"
                :headers="upload.headers"
                :multiple="true"
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

    <el-dialog
      title="Editar el equipo del cliente"
      :visible.sync="dialogVisibleEdit"
      width="50%">
      <el-row>
        <el-col :md="20">
          <p>El periodo de servicio es un dato muy importante ya que este define la proxima fecha de mantenimiento.</p>
          <br>
        </el-col>
      </el-row>
      <el-form ref="form" :model="product_user" >
        <el-row>
          <el-col :md="8">
            <el-form-item label="Tipo de producto">
              <el-select v-model="product_user.product_type" placeholder="Tipo de producto">
                <el-option label="Propio" value="own"></el-option>
                <el-option label="Comodato" value="borrowed"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :md="8">
            <el-form-item label="Periodo de servicio (días)">
              <el-input-number v-model="product_user.period_service" :min="1" :max="365"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :md="8">
            <el-form-item label="Estatus">
              <el-select v-model="product_user.status" placeholder="Estatus">
                <el-option label="Activo" :value=true></el-option>
                <el-option label="Inactivo" :value=false></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleEdit = false">Cancel</el-button>
        <el-button type="primary" @click="updateProduct()">Actualizar</el-button>
      </span>
    </el-dialog>

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
        dialogVisibleEdit: false,
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
      async updateProduct(){
        await this.$axios.$patch(process.env.URL_RA_BACKEND + 'clients/' + this.$route.params.client_id + '/product-relation/' + this.$route.params.id, this.product_user);
        this.$notify({
          title: 'Producto actualizado',
          message: 'El producto ha sido actualizado correctamente.',
          type: 'success'
        });
        this.dialogVisibleEdit = false;
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
      async downloadQRProduct() {
        let response = await this.$axios.$post(process.env.URL_RA_BACKEND + 'download/product/qr', {serial_number: this.product_user.serial_number});
        download(atob(response), 'qr.pdf', 'application/pdf')
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
