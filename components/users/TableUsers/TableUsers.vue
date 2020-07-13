<template>
    <div class="TableUsers">
      <el-row>
        <el-col :md="24">
          <el-table
            :data="data"
            stripe
            style="width: 100%">
            <el-table-column
              prop="name"
              label="Nombre">
            </el-table-column>
            <el-table-column
              prop="last_name"
              label="Apellido">
            </el-table-column>
            <el-table-column
              prop="email"
              label="Correo electrónico">
            </el-table-column>
            <el-table-column
              prop="role"
              label="Rol">
            </el-table-column>
            <el-table-column
              prop="created_at"
              label="Creado">
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
          <el-pagination
            class="custom-paginator"
            @size-change="handleSizeChange"
            @current-change="HandleCurrentPage"
            :page-sizes="[50, 100, 200]"
            :page-size="50"
            layout="sizes, prev, pager, next"
            :total="total_data">
          </el-pagination>
        </el-col>
      </el-row>
    </div>
</template>

<style lang="scss">
  th div{
    color: $black;
  }
</style>

<script>
    export default {
      props: ['data', 'total_data', 'role'],
      data(){
        return {
          paginator: {
            limit: 50,
            page: 1,
            role: this.role
          }
        }
      },
      methods:{
        handleEdit(index, row){
          this.$router.push('/users/'+row.id);
        },
        async handleSizeChange(size) {
          this.paginator.limit = size;
          let data = await this.$axios.$get(process.env.URL_RA_BACKEND + 'users', {
            params: this.paginator
          });
          this.data = data.data.rows;
          this.total_data = data.data.total;
        },
        async HandleCurrentPage(page){
          this.paginator.page = page;
          let data = await this.$axios.$get(process.env.URL_RA_BACKEND+'users', {
            params: this.paginator
          });
          this.data = data.data.rows;
          this.total_data = data.data.total;
        },
      }
    };
</script>
