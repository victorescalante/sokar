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

      <div v-if="this.$auth.user.role === 'tecnico'">
        <p v-if="$fetchState.pending" class="primary-color">Cargando datos ...</p>
        <el-row :gutter="15" class="board-tech" v-else>
          <el-col :md="12">
            <h3 class="primary-color">Actividades de la semana</h3>
            <el-card class="box-card box-activity">
              <el-table
                :data="this.$auth.user.services.week"
                style="width: 100%">
                <el-table-column
                  prop="id"
                  label="Identificador"
                  width="150" >
                </el-table-column>
                <el-table-column
                  label="Fecha estimada">
                  <template slot-scope="scope">
                    {{ $convertDate(scope.row.tentative_date) }}
                  </template>
                </el-table-column>
              </el-table>
            </el-card>
          </el-col>
          <el-col :md="12">
            <h3>Actividades del mes</h3>
            <el-card class="box-card box-activity">
              <el-table
                :data="this.$auth.user.services.month"
                style="width: 100%">
                <el-table-column
                  prop="id"
                  label="Identificador"
                  width="150"
                >
                </el-table-column>
                <el-table-column
                  label="Fecha estimada">
                  <template slot-scope="scope">
                    {{ $convertDate(scope.row.tentative_date) }}
                  </template>
                </el-table-column>
              </el-table>
            </el-card>
          </el-col>
        </el-row>
      </div>

    </div>
</template>

<script>
  export default {
    layout: 'dashboard',
    middleware: ['auth'],
    head () {
      return {
        title: 'Inicio',
      }
    },
    data(){
      return {
        activities: []
      }
    },
    methods: {
      async init() {

      }
    },
    async fetch(){

    }
  }
</script>

<style>

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
</style>
