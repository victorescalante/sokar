<template>
    <div class="body-home">
      <el-row :gutter="15">
        <el-col :md="24" class="title-home">
          <h1>Hola, {{ $auth.$state.user.name }}</h1>
        </el-col>
        <!-- Start check services -->
        <el-col :md="24">
          <el-card class="box-card box-card-dashboard">
            <div slot="header" class="clearfix">
              <span>Servicios que han solicitado revisión</span>
            </div>
            <el-row style="max-height: 350px; overflow-y: scroll">
              <el-col :sm="24">
                <el-table
                  empty-text="Ningún servicio reportado"
                  :data="reviews"
                  style="width: 100%">
                  <el-table-column
                    prop="service_id"
                    label="#"
                    width="100px"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="client_business"
                    label="Cliente">
                  </el-table-column>
                  <el-table-column
                    prop="technical_name"
                    label="Tecnico">
                  </el-table-column>
                  <el-table-column
                    label="Fecha de revisión">
                    <template slot-scope="scope">
                      <p>{{ $convertDateToHuman(scope.row.created_at) }}</p>
                    </template>
                  </el-table-column>
                  <el-table-column>
                    <template slot-scope="scope">
                      <el-button size="small" @click="$router.push('services/'+ scope.row.service_id)">Revisar servicio</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
        <!-- End check services -->
        <el-divider></el-divider>
        <!-- Start check services -->
        <el-col :md="24">
          <el-card class="box-card box-card-dashboard">
            <div slot="header" class="clearfix">
              <span>Equipos que faltan por realizar mantenimiento</span>
            </div>
            <el-row style="max-height: 350px; overflow-y: scroll">
              <el-col :sm="24">
                <el-table
                  empty-text="Ningún equipo por realizar servicio"
                  :data="product_next_service"
                  style="width: 100%">
                  <el-table-column
                    prop="client_business_name"
                    label="Cliente">
                  </el-table-column>
                  <el-table-column
                    prop="product_name"
                    label="Producto">
                  </el-table-column>
                  <el-table-column
                    label="Fecha de servicio">
                    <template slot-scope="scope">
                      <p>{{ $convertDateToHuman(scope.row.product_next_service) }}</p>
                    </template>
                  </el-table-column>
                  <el-table-column>
                    <template slot-scope="scope">
                      <el-button size="small" @click="$router.push('clients/'+ scope.row.client_id)">Revisar producto</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
        <!-- End check services -->
      </el-row>
      <el-row v-loading="loading" element-loading-text="Espera un momento...">
        <el-col :md="24">
          <div style="padding: 50px 15px;">
            <h3 style="color: #0767C6">Reporte de servicios</h3>
            <br>
            <p>Reporte de servicios de la fecha {{ $convertDate(params.service_begin) }} a {{ $convertDate(params.service_end) }}</p>
            <el-row>
              <el-col :sm="6" class="content-resume">
                <div class="count-resume">
                  <div> <p>Pendientes:</p> </div>
                  <div> {{pending_services}} </div>
                </div>
              </el-col>
              <el-col :sm="6" class="content-resume">
                <div class="count-resume">
                  <div> <p>En proceso:</p> </div>
                  <div> {{in_process_services}} </div>
                </div>
              </el-col>
              <el-col :sm="6" class="content-resume">
                <div class="count-resume">
                  <div> <p>Terminados:</p> </div>
                  <div> {{finished_services}} </div>
                </div>
              </el-col>
              <el-col :sm="6" class="content-resume">
                <div class="count-resume">
                  <el-button type="success" @click="downloadReport" v-if="total >= 1">Descargar reporte</el-button>
                </div>
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
                  <p>$ {{ scope.row.extra_total_costs || "0" }}</p>
                </template>
              </el-table-column>
              <el-table-column
                label="Costo de refacciones"
                width="200">
                <template slot-scope="scope">
                  <p>$ {{ scope.row.repairs_total_cost || "0" }}</p>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :md="24">
          <div style="text-align: right">
            <el-pagination
              v-if="total >= 1"
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
        loading: false,
        activities: [],
        technicals: [],
        reviews: [],
        product_next_service: [],
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
      async downloadReport(){
        this.loading = true;
        this.params.download = true;
        this.$axios.get(process.env.URL_RA_BACKEND+'report/services', {
          params: this.params,
          responseType: "blob"
        }).then(res => {
          let blob = new Blob([res.data], {
            type: "application/vnd.ms-excel"
          }); // 2. Get the blob setting file type in the response object returned by the request. Here is excel as an example.
          let url = window.URL.createObjectURL(blob); // 3. Create a temporary url pointing to the blob object

          // 4. After creating the url, you can simulate a series of operations on this file object, for example: preview, download
          let a = document.createElement("a");
          a.href = url;
          a.download = "Reporte de servicios "+ moment().format("MMMM Do YYYY") +" .xlsx";
          a.click();
          // 5. Release this temporary object url
          window.URL.revokeObjectURL(url);
          this.loading = false;
        }).catch((error) => {
          console.log(error);
          this.loading = false;
        });
      },
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
      async getReviewsWithReport() {
        let data = await this.$axios.$get(process.env.URL_RA_BACKEND+'services/reviews?limit=200');
        this.reviews = data.data.rows;
        console.log(this.reviews)
      },
      async getProductNextService() {
        let data = await this.$axios.$get(process.env.URL_RA_BACKEND+'products/next_service?limit=200');
        this.product_next_service = data.data.rows;
        console.log(this.product_next_service)
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
      await this.getReviewsWithReport();
      await this.getProductNextService();
    }
  }
</script>

<style lang="scss">

  .box-card-dashboard{
    span{
      font-weight: bold;
    }
  }

  .content-resume{
    .count-resume{
      padding: 15px 0;
      div{
        padding: 15px;
        display: inline-block;
        box-shadow: 1px 1px 3px 0px rgba(0,0,0,0.75);
        width: 30%;
        text-align: center;
      }
      div:first-child{
        background: #2186ea;
        color: white;
        width: 50%;
      }
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
