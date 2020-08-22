<template>
  <div class="report">
    <p v-if="$fetchState.pending" class="primary-color">Cargando datos del reporte ...</p>
    <TableGeneral v-else title="Reporte de actividades" color="purple">
      <el-row>
        <el-col :md="24">
          <el-card>
            <p>Este es el reporte detallado para el producto <b>{{ report.product_user.product.name }}</b>
              el cual se encuentra asociado al cliente <b>{{ report.product_user.client.name }}</b> </p>
          </el-card>
          <el-card>
            <el-row style="text-align: center">
              <el-col :md="8">
                <p><b>Progreso de servicio</b></p>
                <br>
                <el-progress :percentage="report.progress"></el-progress>
              </el-col>
              <el-col :md="8">
                <p><b>Creación del reporte</b></p>
                <br>
                <p>{{ $convertDateToHuman(report.created_at) }}</p>
              </el-col>
              <el-col :md="8">
                <p><b>Última actualización</b></p>
                <br>
                <p>{{ $convertDateToHuman(report.updated_at) }}</p>
              </el-col>
            </el-row>
          </el-card>

          <el-form :model="report" ref="reportForm" :rules="rules">
            <el-card>
              <el-row :gutter="25">
                <el-col :md="24">
                  <h3 style="padding: 20px 0px">Datos del reporte</h3>
                </el-col>
                <el-col :md="8">
                  <el-form-item label="Fecha de inicio" prop="service_start">
                    <el-date-picker type="date" placeholder="Fecha de inicio" v-model="report.service_start" style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :md="8">
                  <el-form-item label="Fecha de termino" prop="service_end">
                    <el-date-picker type="date" placeholder="Aún no es asignada la fecha de termino" v-model="report.service_end" style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :md="8">
                  <el-form-item label="Estatus de reporte" prop="status">
                    <el-select v-model="report.status" placeholder="Selecciona un estatus">
                      <el-option label="Pendiente" value="pendiente"></el-option>
                      <el-option label="Cancelado" value="cancelado"></el-option>
                      <el-option label="En proceso" value="en_proceso"></el-option>
                      <el-option label="Terminado" value="terminado"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :md="24">
                  <el-form-item label="Observaciones y correcciones del servicio">
                    <el-input type="textarea" rows="5" v-model="report.description"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="25">
                <el-col :md="24">
                  <h3 style="padding: 20px 0">Forma de uso encontrada</h3>
                </el-col>
                <el-col :md="8">
                  <el-form-item label="Dilución" prop="dilution">
                    <el-input v-model="report.dilution"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :md="8">
                  <el-form-item label="Frecuencía" prop="frequency">
                    <el-input v-model="report.frequency"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :md="8">
                  <el-form-item label="Método" prop="method">
                    <el-input v-model="report.method"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="25">
                <el-col :md="12">
                  <h3 style="padding: 20px 0">Costos extras</h3>
                  <el-button type="primary" @click="AddExtraCost" plain>Agregar un costo extra</el-button>
                  <el-row :gutter="20" v-if="report.costs.length > 0">
                    <el-col :md="16">Descripción</el-col>
                    <el-col :md="8">Costo</el-col>
                  </el-row>
                  <el-row v-for="(cost, index) in report.costs" :gutter="20">
                    <el-col :md="16">
                        <el-input type="text" v-model="cost.description" placeholder="Descripción del costo"></el-input>
                    </el-col>
                    <el-col :md="8">
                        <el-input type="number" v-model="cost.cost" placeholder="Costo"></el-input>
                    </el-col>
                  </el-row>
                </el-col>
                <el-col :md="12">
                  <h3 style="padding: 20px 0">Costos de refacciones</h3>
                  <el-button type="primary" @click="AddExtraCostRepair" plain>Agregar una refacción</el-button>
                  <el-row :gutter="20" v-if="report.costs_repairs.length > 0">
                    <el-col :md="16">Refacción</el-col>
                    <el-col :md="8">Costo</el-col>
                  </el-row>
                  <el-row v-for="cost in report.costs_repairs" :gutter="20">
                    <el-col :md="16">
                      <el-select v-model="cost.repair_id" placeholder="Selecciona una refacción" style="width: 100%" filterable>
                        <el-option :label="repair.name" :value="repair.id" v-for="repair in catalog_repairs"></el-option>
                      </el-select>
                    </el-col>
                    <el-col :md="8">
                      <el-input type="number" v-model="cost.cost" placeholder="Costo"></el-input>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
              <el-row>
                <el-col :md="24">
                  <h3 style="padding: 20px 0">Adjuntar evidencía</h3>
                </el-col>
                <el-col :md="24">
                  <div class="images-upload">
                    <el-upload
                      accept="image/png, image/jpeg"
                      :action="upload.url"
                      :multiple="true"
                      :headers="upload.headers"
                      :data="saveFile('report')"
                      :file-list="filterImagesByCategory('report')"
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
              </el-row>
              <el-row>
                <el-col :md="24">
                  <div style="padding: 25px 0;">
                    <el-button type="primary" @click="submitForm('reportForm')">Actualizar reporte</el-button>
                  </div>
                </el-col>
              </el-row>
            </el-card>
          </el-form>
        </el-col>
      </el-row>
    </TableGeneral>
  </div>
</template>

<style lang="scss">
  .report{
    .el-row{
      padding-top: 15px;
    }
    .el-card{
      margin-top: 15px;
    }
  }
</style>

<script>
  import TitleSection from "../../../../components/TitleSection/TitleSection";
  import TableGeneral from "../../../../components/tables/TableGeneral";
  import _ from "lodash";

  export default {
    layout: 'dashboard',
    middleware: ['auth'],
    transition: {
      name: 'default',
      mode: 'out-in'
    },
    components: {
      TitleSection: TitleSection,
      TableGeneral: TableGeneral
    },
    head() {
      return {
        title: 'Actualización de servicio',
      }
    },
    data(){
      return {
        notUpdate: false,
        catalog_repairs: [],
        report:{},
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
        },
        rules: {
          costs: [
            {required: true, message: "Ingresa un costo", trigger: 'blur'}
          ]
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
      AddExtraCost(){
        this.report.costs.unshift({
          description: "",
          cost: 0
        });
      },
      AddExtraCostRepair(){
        this.report.costs_repairs.unshift({
          repair_id: "",
          cost: 0
        });
      },
      async init() {
        let data = await this.$axios.$get(
          process.env.URL_RA_BACKEND + 'services/'+this.$route.params.service_id+'/reports/'+this.$route.params.id
        );
        let repairs = await this.$axios.$get(process.env.URL_RA_BACKEND + 'repairs/?limit=350&order_by=name');
        this.catalog_repairs = await repairs.data.rows;
        this.report = await data.data.report;
        this.upload.data.model = data.data.report.model;
        this.upload.data.model_id = data.data.report.id;
        this.upload.list = _.map(data.data.report.files, function (file) {
          return {
            name: "name",
            url: file.url,
            id: file.id,
            category: file.category
          }
        })
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$axios.patch(process.env.URL_RA_BACKEND + 'services/'+this.$route.params.service_id+'/reports/'+this.$route.params.id, this.report)
              .then(response => {
                this.$notify({
                  title: 'Correcto',
                  message: 'El reporte ha sido actualizado',
                  type: 'success'
                });
                this.report = response.data.data.report;
              }).catch(error => {
              this.$notify.error({
                title: 'Error',
                message: 'El reporte no ha podido ser actualizado'
              });
            });

          } else {
            return false;
          }
        });
      }
    },
    mounted() {
      // montar datos
    },
    async fetch(){
      await this.init();
    }
  }
</script>
