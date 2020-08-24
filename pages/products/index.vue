<template>
  <div>
    <TableGeneral title="Equipos" color="green">

      <div class="actions">
        <nuxt-link to="products/create"><el-button class="el-button--primary" icon="el-icon-plus" disabled>Agregar un equipo</el-button></nuxt-link>
      </div>

      <div class="content">
        <el-table
          :data="data"
          stripe
          :default-sort = "{prop: 'ascending', order: 'asc'}"
          style="width: 100%">
          <el-table-column
            prop="code"
            sortable
            width="150"
            label="Código">
          </el-table-column>
          <el-table-column
            prop="name"
            sortable
            label="Nombre">
          </el-table-column>
          <el-table-column
            sortable
            prop="description"
            label="Descripción">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="Operaciones">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleView(scope.$index, scope.row)">Detalle</el-button>
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">Editar</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          class="custom-paginator"
          @size-change="handleSizeChange"
          @current-change="HandleCurrentPage"
          :page-sizes="[50, 100, 200]"
          :page-size="50"
          layout="sizes, prev, pager, next"
          :total="total_data">
        </el-pagination>
      </div>
    </TableGeneral>

    <el-dialog
      class="custom-dialog"
      :title="viewData.name"
      :visible.sync="viewDetail"
      width="50%"
      center>
      <p><b>Código: </b>{{ viewData.code }}</p>
      <p><b>Nombre del producto: </b>{{ viewData.name }}</p>
      <p><b>Descripción: </b>{{ viewData.description }}</p>
      <p><b>Especificaciones de diseño: </b>{{ viewData.specifications_desing }}</p>
      <p><b>Especificaciones de operación: </b>{{ viewData.specifications_operation }}</p>
      <p><b>Beneficios: </b>{{ viewData.benefits }}</p>
      <p><b>Precio: </b>$ 0</p>
      <p><b>Inventario: </b>0</p>
    </el-dialog>
  </div>
</template>

<style lang="scss">
  .custom-dialog{
    .el-dialog__header .el-dialog__title{
      color: #5d3ce7;
      font-weight: bold;
    }
    p{
      padding-top: 12px;
    }
    b{
      color: black;
    }
  }
</style>

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
        data: [],
        viewDetail: false,
        viewData: {
          product: {},
          category: {}
        },
        paginator: {
          limit: 50,
          page: 1
        },
        total_data: 0,
      }
    },
    methods: {
      async handleSizeChange(size) {
        this.paginator.limit = size;
        let data = await this.$axios.$get(process.env.URL_RA_BACKEND + 'products', {
          params: this.paginator
        });
        this.data = data.data.rows;
        this.total_data = data.data.total;
      },
      async HandleCurrentPage(page){
        this.paginator.page = page;
        let data = await this.$axios.$get(process.env.URL_RA_BACKEND+'products', {
          params: this.paginator
        });
        this.data = data.data.rows;
        this.total_data = data.data.total;
      },
      async init() {
        let data = await this.$axios.$get(process.env.URL_RA_BACKEND+'products');
        this.data = data.data.rows;
        this.total_data = data.data.total;
      },
      handleEdit(index, row){
        this.$router.push('/repair/'+row.id);
      },
      handleView(index, row){
        this.viewData = row;
        this.viewDetail = true;
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
