<template>
  <div>
    <TableGeneral title="Mantenimientos" color="purple">

      <div class="actions">
        <nuxt-link to="services/create"><el-button class="el-button--primary" icon="el-icon-plus">Crear mantenimiento</el-button></nuxt-link>
      </div>

      <div class="content">
        <el-table
          v-loading="loading"
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
            label="Fecha de creación">
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
                @click="handleEdit(scope.$index, scope.row)">Revisar servicio</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="text-align: center">
          <el-pagination
            class="custom-paginator"
            @size-change="handleSizeChange"
            @current-change="HandleCurrentPage"
            :page-sizes="[5, 10, 50, 100, 200]"
            :page-size=parseInt(current_limit)
            :current-page=parseInt(current_page)
            layout="sizes, prev, pager, next"
            :total="total_data">
          </el-pagination>
        </div>
      </div>

    </TableGeneral>
  </div>
</template>

<script>
  import TableGeneral from "../../components/tables/TableGeneral";

  export default {
    watchQuery: true,
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
        data: [],
        total_data: 0,
        loading: false
      }
    },
    methods: {
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
      },
      async handleSizeChange(size) {
        this.current_limit = size;
        await this.$router.replace({
          query: {
            page: this.current_page,
            limit: size
          }
        });
        await this.getData();
      },
      async HandleCurrentPage(page){
        this.current_page = page;
        await this.$router.replace({
          query: {
            page: page,
            limit: this.current_limit
          }
        });
        await this.getData();
      },
      async getData(){
        this.loading = true;
        let data = await this.$axios.$get(process.env.URL_RA_BACKEND+'services', {
          params: {
            page: this.current_page,
            limit: this.current_limit
          }
        });
        this.data = data.data.rows;
        this.total_data = data.data.total;
        this.loading = false;
      }
    },
    asyncData({route, params}) {
      let current_page;
      let current_limit;

      if (route.query.page === undefined){
         current_page = 1;
      }else{
         current_page = route.query.page;
      }

      if (route.query.limit === undefined){
         current_limit = 50;
      }else{
         current_limit = route.query.limit;
      }

      return { current_limit, current_page }

    },
    async fetch(){
      await this.getData();
    }
  }
</script>
