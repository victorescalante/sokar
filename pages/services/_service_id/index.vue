<template>
  <div class="table-service">
    <TableGeneral title="Mantenimiento" color="purple">
      <el-row>
        <el-col :md="24">
          <el-card>
            <el-row>
              <el-col :md="24" style="padding-left: 10px">
                <h3>Visita de mantenimiento</h3>
              </el-col>
              <el-col :md="24" style="padding-top: 15px">
                <el-form ref="formService" :rules="rules" :model="form" class="form-style-curds">
                  <el-row>
                    <el-col :md="8">
                      <el-form-item label="Nombre del Técnico" prop="technical_id">
                        <el-select v-model="form.technical_id" placeholder="Selecciona un técnico" disabled>
                          <el-option
                            v-for="tech in techs"
                            :key="tech.id"
                            :label="tech.name"
                            :value="tech.id">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :md="8">
                      <el-form-item label="Nombre del Cliente / Empresa" prop="client_id">
                        <el-select filterable v-model="form.client_id" placeholder="Selecciona un cliente" disabled>
                          <el-option
                            v-for="client in clients"
                            :key="client.id"
                            :label="client.company_name"
                            :value="client.id">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :md="8">
                      <el-form-item label="Fecha tentativa de atención" prop="tentative_date">
                        <el-date-picker
                          @change="UpdateService"
                          style="width: 100%"
                          v-model="form.tentative_date"
                          type="datetime"
                          placeholder="Selecciona una fecha y hora">
                        </el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :md="6">
                      <el-form-item label="Tipo de mantenimiento">
                        <el-select v-model="form.activity" placeholder="Selecciona el tipo de mantenimiento">
                          <el-option label="Mantenimiento correctivo" value="corrective"></el-option>
                          <el-option label="Mantenimiento preventivo" value="preventive"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :md="6">
                      <el-form-item label="Tipo de servicio">
                        <el-select
                          v-model="form.type"
                          @change="form.kms = 0; UpdateService();"
                          placeholder="Selecciona el tipo de servicio">
                          <el-option label="Remoto" value="remote"></el-option>
                          <el-option label="Presencial" value="face-to-face"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :md="6" v-if="form.type === 'face-to-face'">
                      <el-form-item label="Distancia en kilometros">
                        <el-input-number v-model="form.kms" :min="0" :max="1000" @change="UpdateService"></el-input-number>
                      </el-form-item>
                    </el-col>
                    <el-col :md="6" v-if="form.type === 'face-to-face'">
                      <el-form-item label="Rendimiento">
                        <el-input-number v-model="form.performance" :min="0" :max="1000" @change="UpdateService"></el-input-number>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :md="18">
                      <div style="padding: 15px">
                        <p><strong>Comentarios</strong></p>
                        <div v-if="comments.length <= 0" style="padding: 15px">
                          <el-alert
                            title="El cliente aún no realiza comentarios sobre el mantenimiento"
                            type="info"
                            center
                            show-icon>
                          </el-alert>
                        </div>
                        <div v-else style="padding: 15px 0">
                          <el-timeline>
                            <el-timeline-item
                              :timestamp="$convertDateToHuman(comment.created_at)" color="#0b7c79" placement="top" v-for="comment in comments">
                              <div v-if="comment.check_revision">
                                <el-alert
                                  title="El cliente solicito una revisión de este mantenimeinto"
                                  type="error"
                                  center
                                  show-icon>
                                </el-alert>
                              </div>
                              <div style="padding-top: 10px">
                                <h4>Comentario de cliente</h4>
                              </div>
                              <el-card>
                                <div class="comment-container">
                                  <p>{{ comment.description }}</p>
                                  <el-switch class="switch-comment" @change="ChangeStatusComment(comment)" v-model="comment.check_revision" v-if="$currentRole(['admin'])"></el-switch>
                                </div>
                              </el-card>
                            </el-timeline-item>
                          </el-timeline>
                        </div>
                      </div>
                    </el-col>
                  </el-row>
                </el-form>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>

    </TableGeneral>
    <TableGeneral :title="'Ordenen de servicio #'+(key+1)" color="blue" v-for="(report, key) in reports">
      <el-row :gutter="15">
        <el-col :md="18">
          <el-card>
            <p><b>{{ report.product_user.product.name }}</b> - {{ report.product_user.serial_number }}</p>
          </el-card>
        </el-col>
        <el-col :md="6">
          <el-card>
            <div>
              <p><b>Estatus</b> - <span style="text-transform: capitalize">{{ report.status }}</span></p>
            </div>
          </el-card>
        </el-col>
        <el-col :md="24">
          <el-card>
            <el-row :gutter="15">
              <el-col :md="24"><b style="color: dodgerblue">Detalle de la orden de servicio.</b></el-col>
              <el-col :md="12">
                <div style="padding: 20px 0px">
                  <b>Descripción:</b>
                  <p v-if="report.description">{{ report.description }}</p>
                  <p v-else>Aún no hay descripción</p>
                </div>
              </el-col>
              <el-col :md="12">
                <div class="detail-service">
                  <el-row>
                    <el-col :md="24">
                      <div class="progress-element">
                        <b>Progreso del servicio</b>
                        <div class="max-element">
                          <el-progress :percentage="report.progress"></el-progress>
                        </div>
                      </div>
                      <div style="text-align: right">
                        <el-button type="primary" @click="$router.push('/services/'+$route.params.service_id+'/reports/'+report.id)">Actualizar orden de servicio</el-button>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
    </TableGeneral>

    <el-row>
      <el-col :md="24">
        <el-row>
          <el-col v-if="products.length >= 1" :md="24">
            <div style="padding: 15px">
              <p><strong>Estos son los equipos seleccionados para el mantenimiento</strong></p>
              <el-row class="container-card" :gutter="15">
                <el-col :md="8" v-for="product_user in products">
                  <el-card class="box-card">
                    <div slot="header" class="clearfix">
                      <span><b>{{ product_user.product.name }}</b></span>
                    </div>
                    <p style="color: #7F828B; font-size: 14px">Número de serie</p>
                    <small>{{ product_user.serial_number }}</small>
                    <br><br>
                    <p style="color: #7F828B; font-size: 14px">Última fecha de mantenimiento</p>
                    <b>{{ $convertDateToHuman(product_user.last_service) }}</b>
                    <br><br>
                    <p>Fecha de mantenimiento proxima</p>
                    <b style="color: #5d3ce7">{{ $convertDateToHuman(product_user.next_service) }}</b>
                    <br>
                    <el-checkbox-group v-model="form.product_user_ids" style="text-align: right; padding: 15px">
                      <el-checkbox :label="product_user.product.id" disabled>Seleccionar</el-checkbox>
                    </el-checkbox-group>
                  </el-card>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss">
  .comment-container{
    position: relative;
    > p{
      padding-right: 100px
    }
    .switch-comment{
      position: absolute;
      top: 0px;
      right: 15px;
    }
  }

  .el-select{
    width: 100%;
  }

  .custom-buttons{
    padding: 15px;
  }

  .table-service{
    .container-costs{
      padding-top: 15px;
      color: #5d3ce7;
      .header{
        padding: 10px 0px;
      }
    }
    .detail-service{
      padding: 10px;
      .progress-element{
        padding: 20px 0;
        .max-element{
          max-width: 250px;
        }
      }
    }
    .el-card{
      margin-top: 15px;
    }
    .container-card{
      padding: 15px 0;
      .box-card{
        margin-top: 15px;
      }
    }
  }
</style>

<script>
  import TitleSection from "../../../components/TitleSection/TitleSection";
  import TableGeneral from "../../../components/tables/TableGeneral";
  import _ from 'lodash';
  import moment from "moment";

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
    head () {
      return {
        title: 'Actualización de servicio',
      }
    },
    data(){
      return {
        upload: {
          url: process.env.URL_RA_BACKEND+'files',
          headers: {
            'Authorization': this.$auth.getToken('local')
          },
          data: {
            category: 'default',
            model_id: '',
            model: 0
          },
          list: []
        },
        dialogImageUrl: '',
        clients: [],
        techs: [],
        products: [],
        reports: [],
        comments: [],
        clientHaveProducts: false,
        form: {
          product_user_ids: [],
          client_id: "",
          technical_id: "",
          tentative_date: "",
          type: "",
          kms: "",
          activity: "",
          performance: ""
        },
        rules: {

        }
      }
    },
    methods: {
      async ChangeStatusComment(comment){
        await this.$axios.$patch(process.env.URL_RA_BACKEND + 'services/reviews/'+ comment.id, comment);
      },
      async UpdateService() {
        this.form.tentative_date = moment(this.form.tentative_date).locale('es-mx').format('Y-M-D H:mm');
        await this.$axios.$patch(process.env.URL_RA_BACKEND + 'services/' + this.$route.params.service_id, this.form);
        this.$notify({
          title: 'Servicio actualizado',
          message: 'Servicio actualizado correctamente.',
          type: 'success'
        });
      },
      async init() {
        let clients = await this.$axios.$get(process.env.URL_RA_BACKEND + 'clients?limit=200');
        let techs = await this.$axios.$get(process.env.URL_RA_BACKEND + 'users?limit=200&role=tecnico');
        this.clients = clients.data.rows;
        this.techs = techs.data.rows;
      },
      async getService() {
        let service = await this.$axios.$get(process.env.URL_RA_BACKEND + 'services/' + this.$route.params.service_id)
        let products = await this.$axios.$get(process.env.URL_RA_BACKEND + 'clients/'+ service.data.service.client_id + '/product-relation?limit=200');
        this.products = products.data.rows;
        this.reports = service.data.service.reports;
        this.comments = service.data.service.comments;
        this.form.client_id = service.data.service.client_id;
        this.form.technical_id = service.data.service.technical_id;
        this.form.tentative_date = service.data.service.tentative_date;
        this.form.type = service.data.service.type;
        this.form.kms = service.data.service.kms;
        this.form.performance = service.data.service.performance;
        this.form.activity = service.data.service.activity;
        this.form.product_user_ids = _.map(service.data.service.reports, function (report) {
          return report.product_user.product.id;
        })
      }
    },
    async fetch() {
      await this.init();
      await this.getService();
    }
  }
</script>
