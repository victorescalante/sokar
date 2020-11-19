<template>
  <div>
    <TableGeneral title="Mantenimientos" color="purple">

      <div class="actions">
        <nuxt-link to="services/create"><el-button class="el-button--primary" icon="el-icon-plus">Crear mantenimiento</el-button></nuxt-link>
      </div>

      <div class="content">
        <el-table
          :data="data"
          stripe
          style="width: 100%">
          <el-table-column
            prop="client.company_name"
            label="Nombre del cliente">
          </el-table-column>
          <el-table-column
            prop="technical.name"
            label="Nombre del tecnico">
          </el-table-column>
          <el-table-column
            prop="created_at"
            label="Creado">
          </el-table-column>
          <el-table-column
            align="center"
            label="Número de servicios">
            <template slot-scope="scope">
              {{ scope.row.reports.length }}
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="Operaciones">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">Editar</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

    </TableGeneral>
  </div>
</template>

<script>
  import TableGeneral from "../../components/tables/TableGeneral";

  export default {
    layout: 'dashboard',
    middleware: ['auth'],
    transition: {
      name: 'default',
      mode: 'out-in'
    },
    components:{
      TableGeneral: TableGeneral
    },
    head () {
      return {
        title: 'Administración de mantenimientos',
      }
    },
    data(){
      return {
        data: []
      }
    },
    methods: {
      async init() {
        let data = await this.$axios.$get(process.env.URL_RA_BACKEND+'services');
        this.data = data.data.services;
      },
      handleEdit(index, row){
        this.$router.push('/services/'+row.id);
      },
      defineProgress(progress){
        if(progress <= 10){
          return '';
        }
        if (progress <= 50){
          return 'exception';
        }
        if(progress < 100){
          return 'warning';
        }
        return 'success'
      }
    },
    mounted() {
      this.init();
    }
  }
</script>
