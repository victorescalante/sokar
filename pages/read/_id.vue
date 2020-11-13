<template>
  <div>
    <TableGeneral title="Mantenimientos pendientes por equipo">

      <div class="actions">
        <el-button
          class="el-button--success"
          @click="redirectToRead"
        >Volver a escanear</el-button>
      </div>

      <div class="content" style="overflow: auto">
        <el-table
          :data="rows"
          stripe
          style="width: 100%" @row-click="HandleClickRow">
          <el-table-column
            label="Actividad">
            <template slot-scope="scope">
              <p>{{ $getActivity(scope.row.activity_type) }}</p>
            </template>
          </el-table-column>
          <el-table-column
            prop="report_status"
            label="Estatus del reporte" >
          </el-table-column>
          <el-table-column
            prop="service_begin"
            width="200"
            label="Inicio del reporte">
          </el-table-column>
          <el-table-column
            prop="service_progress"
            label="Progreso del servicio" >
          </el-table-column>
          <el-table-column
            prop="client_name"
            label="Nombre de cliente" >
          </el-table-column>
        </el-table>
      </div>
    </TableGeneral>
  </div>
</template>

<script>
  import TableGeneral from "../../components/tables/TableGeneral";
  export default{
    layout: "dashboard",
    components: {
      TableGeneral
    },
    data(){
      return {
        rows: []
      }
    },
    methods: {
      redirectToRead(){
        this.$router.push('/read');
      },
      HandleClickRow(row, column, event){
        this.$router.push('/services/'); // Agregar el id del servicio *pendiente
      },
    },
    async fetch(){
      let data = await this.$axios.$get(process.env.URL_RA_BACKEND+'product/search?limit=200&serial_number='+this.$route.params.id);
      this.rows = data.data.rows;
      this.total_data = data.data.total;
    }
  }
</script>
