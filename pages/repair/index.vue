<template>
  <div>
    <TableGeneral title="Refaccciones" color="purple">

      <div class="actions">
        <nuxt-link to="repair/create"><el-button class="el-button--primary" icon="el-icon-plus">Agregar una refacción</el-button></nuxt-link>
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
            prop="category.name"
            label="Categoría">
          </el-table-column>
          <el-table-column
            sortable
            prop="product.name"
            label="Producto">
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
      width="30%"
      center>
      <p><b>Código: </b>{{ viewData.code }}</p>
      <p><b>Nombre del producto: </b>{{ viewData.product.name }}</p>
      <p><b>Categoría: </b>{{ viewData.category.name }}</p>
      <p><b>Número de parte: </b>{{ viewData.number_of_part }}</p>
      <p><b>Caracteristicas: </b>{{ viewData.features }}</p>
      <p><b>Cantidad: </b>{{ viewData.quantity }}</p>
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
        total_data: 0,
        paginator: {
          limit: 50,
          page: 1
        }
      }
    },
    methods: {

      async handleSizeChange(size) {
        this.paginator.limit = size;
        let data = await this.$axios.$get(process.env.URL_RA_BACKEND + 'repairs', {
          params: this.paginator
        });
        this.data = data.data.rows;
        this.total_data = data.data.total;
      },
      async HandleCurrentPage(page){
        this.paginator.page = page;
        let data = await this.$axios.$get(process.env.URL_RA_BACKEND+'repairs', {
          params: this.paginator
        });
        this.data = data.data.rows;
        this.total_data = data.data.total;
      },
      async init() {
        let data = await this.$axios.$get(process.env.URL_RA_BACKEND+'repairs');
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
