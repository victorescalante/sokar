<template>
  <div class="table-general">
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
                      <el-form-item label="Nombre del Cliente / Empresa" prop="client_id">
                        <el-select filterable v-model="form.client_id" @change="getProductsOfClients" placeholder="Selecciona un cliente" disabled>
                          <el-option
                            v-for="client in clients"
                            :key="client.id"
                            :label="client.name"
                            :value="client.id">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :md="8">
                      <el-form-item label="Nombre del Técnico" prop="technical_id">
                        <el-select v-model="form.technical_id" filterable placeholder="Selecciona un técnico" disabled>
                          <el-option
                            v-for="tech in techs"
                            :key="tech.id"
                            :label="tech.name"
                            :value="tech.id">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col v-if="products.length >= 1" :md="24">
                      <div style="padding: 15px">
                        <p><strong>Selecciona los equipos a los cuales deseas realizar mantenimiento</strong></p>
                        <el-row class="container-card" :gutter="15">
                          <el-col :md="8" v-for="product_user in products">
                            <el-card class="box-card">
                              <div slot="header" class="clearfix">
                                <span><b>{{ product_user.product.name }}</b></span>
                              </div>
                              <p>última fecha de mantenimiento</p>
                              <b>{{ $convertDateToHuman(product_user.last_service) }}</b>
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
                </el-form>
              </el-col>
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
  }

  .table-general{
    .container-card{
      padding: 15px 0;
      .box-card{
        margin-top: 15px;
      }
    }
  }
</style>

<script>
  import TitleSection from "../../components/TitleSection/TitleSection";
  import TableGeneral from "../../components/tables/TableGeneral";
  import _ from 'lodash';

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
        clientHaveProducts: false,
        form: {
          product_user_ids: [],
          client_id: "",
          technical_id: ""
        },
        rules: {

        }
      }
    },
    methods: {
      async init() {
        let clients = await this.$axios.$get(process.env.URL_RA_BACKEND + 'clients?limit=200');
        let techs = await this.$axios.$get(process.env.URL_RA_BACKEND + 'users?limit=200&role=tecnico');
        this.clients = clients.data.rows;
        this.techs = techs.data.rows;
      },
      async getService() {
        let service = await this.$axios.$get(process.env.URL_RA_BACKEND + 'services/' + this.$route.params.id)
        let products = await this.$axios.$get(process.env.URL_RA_BACKEND + 'clients/'+service.data.service.client_id+'/product-relation?limit=200');
        this.products = products.data.rows;
        this.form.client_id = service.data.service.client_id;
        this.form.technical_id = service.data.service.technical_id;
        this.form.product_user_ids = _.map(service.data.service.reports, function (report) {
          return report.product_user.product.id;
        })
      }
    },
    mounted() {
      this.init();
      this.getService();
    }
  }
</script>
