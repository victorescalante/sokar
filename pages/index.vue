<template>
    <div class="body-home">
      <el-row :gutter="15">
        <el-col :md="24" class="title-home">
          <h1>Hola, {{ $auth.$state.user.name }}</h1>
        </el-col>
        <el-col :md="8">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>Enlaces importantes</span>
            </div>
            <el-link type="primary" href="https://dikeninternational.com/mex/universidad-diken-online/" target="_blank">Universidad Diken</el-link>
            <el-divider></el-divider>
            <el-link type="primary" href="https://www.dikeninternational.com/bigdata/signin.php" target="_blank">Big data</el-link>
            <el-divider></el-divider>
            <el-link type="primary" href="https://www.dikeninternational.com/auditorias/" target="_blank">Auditoría</el-link>
          </el-card>
        </el-col>
      </el-row>
      <el-row>
        <el-col :md="24">
          <div style="padding: 25px 15px;">
            <h3 style="color: #0767C6">Reporte de servicios</h3>
            <p>Reporte de servicios de la fecha {{ $convertDate(params.service_begin) }} a {{ $convertDate(params.service_end) }}</p>
            <el-row style="padding: 20px 0" :gutter="15">
              <el-col :md="6">
                <el-card class="box-card card-info-dash">
                  <div slot="header" class="clearfix">
                    <span>Servicios pendientes</span>
                  </div>
                  <div class="number-center pending">
                    {{ pending_services }}
                  </div>
                </el-card>
              </el-col>
              <el-col :md="6">
                <el-card class="box-card card-info-dash">
                  <div slot="header" class="clearfix">
                    <span>Servicios terminados</span>
                  </div>
                  <div class="number-center ">
                    {{ finished_services }}
                  </div>
                </el-card>
              </el-col>
              <el-col :md="6">
                <el-card class="box-card card-info-dash">
                  <div slot="header" class="clearfix">
                    <span>Servicios en progreso</span>
                  </div>
                  <div class="number-center in_process">
                    {{ in_process_services }}
                  </div>
                </el-card>
              </el-col>
            </el-row>
            <el-row>
              <el-col :md="24">
                <b>Filtros:</b>
                <div class="filters-report">
                  <div class="i-block">
                    <p>Fecha de inicio</p>
                    <el-date-picker
                      format="yyyy-MM-dd"
                      value-format="yyyy-MM-dd"
                      v-model="params.service_begin"
                      type="date"
                    >
                    </el-date-picker>
                  </div>
                  <div class="i-block">
                    <p>Fecha de fin</p>
                    <el-date-picker
                      format="yyyy-MM-dd"
                      value-format="yyyy-MM-dd"
                      v-model="params.service_end"
                      type="date">
                    </el-date-picker>
                  </div>
                  <div class="i-block" v-if="$currentRole(['admin'])">
                    <p>Tecnico responsable</p>
                    <el-select v-model="params.technical_id">
                      <el-option label="Todos" value=""></el-option>
                      <el-option v-for="technical in technicals" :label="technical.name" :value="technical.id"></el-option>
                    </el-select>
                  </div>
                  <div class="i-block">
                    <p>Estatus de servicio</p>
                    <el-select v-model="params.report_status">
                      <el-option label="Todos" value=""></el-option>
                      <el-option label="Pendiente" value="pendiente"></el-option>
                      <el-option label="Terminado" value="terminado"></el-option>
                      <el-option label="En proceso" value="en_proceso"></el-option>
                    </el-select>
                  </div>
                  <div class="i-block">
                    <el-button type="primary" @click="refreshReport">Aplicar</el-button>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
          <div style="overflow-x:auto;">
            <el-table
              :data="reportServices"
              style="width: 100%; min-height: 400px">
              <el-table-column
                prop="report_status"
                label="Estatus"
                width="120">
              </el-table-column>
              <el-table-column
                prop="technical_name"
                label="Tecnico"
                width="150">
              </el-table-column>
              <el-table-column
                prop="service_begin"
                label="Fecha de inicio"
                width="150"
                >
              </el-table-column>
              <el-table-column
                label="Actividad"
                width="120">
                <template slot-scope="scope">
                  <p>{{ $getActivity(scope.row.activity_type) }}</p>
                </template>
              </el-table-column>
              <el-table-column
                label="Tipo de Act."
                width="120">
                <template slot-scope="scope">
                  <p>{{ $getTypeOfActivity(scope.row.services_type) }}</p>
                </template>
              </el-table-column>
              <el-table-column
                label="Progreso"
                width="120">
                <template slot-scope="scope">
                  <el-progress :percentage="scope.row.service_progress"></el-progress>
                </template>
              </el-table-column>
              <el-table-column
                prop="client_name"
                label="Cliente"
                width="150">
              </el-table-column>
              <el-table-column
                label="Costos extras"
                width="120">
                <template slot-scope="scope">
                  <p>$ {{ scope.row.extra_total_costs }}</p>
                </template>
              </el-table-column>
              <el-table-column
                label="Costo de refacciones"
                width="200">
                <template slot-scope="scope">
                  <p>$ {{ scope.row.repairs_total_cost }}</p>
                </template>
              </el-table-column>
              <el-table-column
                prop="number_services"
                label="# de servicios"
                width="120">
              </el-table-column>
            </el-table>
            <el-pagination
              class="custom-paginator"
              @size-change="handleSizeChange"
              @current-change="HandleCurrentPage"
              :page-sizes="[50, 100, 200]"
              :page-size="50"
              layout="sizes, prev, pager, next"
              :total="total">
            </el-pagination>
          </div>
        </el-col>
      </el-row>
    </div>
</template>

<script>
  import moment from "moment";

  export default {
    layout: 'dashboard',
    middleware: ['auth'],
    head () {
      return {
        title: 'Diken - Dashboard',
      }
    },
    data(){
      return {
        activities: [],
        technicals: [],
        reportServices: [],
        pending_services: 0,
        finished_services: 0,
        in_process_services: 0,
        total: 0,
        params: {
          limit: 50,
          page: 1,
          service_begin: "2020-10-01",
          service_end: "2020-10-10",
          technical_id: "",
          report_status: ""
        },
      }
    },
    methods: {
      async getReport(){
        let report = await this.$axios.$get(process.env.URL_RA_BACKEND+'report/services', {
          params: this.params
        });
        this.reportServices = report.data.services.rows;
        this.total = report.data.services.total;
        this.pending_services = report.data.pending_services;
        this.finished_services = report.data.finished_services;
        this.in_process_services = report.data.in_process_services;
        this.$notify({
          title: 'Reporte actualizado correctamente',
          type: 'success'
        });
      },
      async getTechnicals(){
        let request = await this.$axios.$get(process.env.URL_RA_BACKEND + 'users/', {
          params: {role: 'tecnico'}
        });
        this.technicals = request.data.rows;
      },
      async handleSizeChange(size) {
        this.params.limit = size;
        await this.getReport();
      },
      async HandleCurrentPage(page){
        this.params.page = page;
        await this.getReport();
      },
      transformDate(date_moment){
        return date_moment.format('YYYY-MM-DD');
      },
      refreshReport(){
        this.getReport();
      }
    },
    async fetch(){
      this.params.service_begin = this.transformDate(moment(this.now).locale('es-mx').startOf('month'))
      this.params.service_end = this.transformDate(moment(this.now).locale('es-mx').endOf('month'));
      await this.getReport();
      await this.getTechnicals();
    }
  }
</script>

<style lang="scss">

  .number-center{
    display: block;
    text-align: center;
    color: black;
    font-size: 25px;
    &.pending{
      color: purple;
    }
    &.in_process{
      color: purple;
    }
  }

  .card-info-dash{
    .el-card__header{
      background: purple;
      color: white;
    }
  }

  .box-activity{
    padding: 0px;
  }

  .board-tech{
    padding-top: 20px;
  }
  .title-home{
    padding: 20px 15px;
  }
  .body-home{
    min-height: 80vh;
    padding: 15px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    margin-top: 15px;
  }

  .filters-report{
    display: block;
    padding: 15px 0;
    p{
      padding: 15px 0px;
    }
    .i-block{
      display: inline-block;
    }
  }
</style>
