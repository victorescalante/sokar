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
              label="Rol"
              width="100"
            >
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
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">Eliminar</el-button>
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

      <el-dialog
        title="Atención"
        :visible.sync="deleteVisible"
        width="30%"
        center>
        <div style="text-align: center">
          <span>¿Seguro que quieres eliminar este usuario?</span><br>
          <span><b>{{ user_to_delete.name }}</b></span><br>
          <span>Esta acción no se puede deshacer</span>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="deleteVisible = false">Cancelar</el-button>
          <el-button type="danger" @click="deleteUser(user_to_delete.id)">Confirmar</el-button>
        </span>
      </el-dialog>

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
          deleteVisible: false,
          paginator: {
            limit: 50,
            page: 1,
            role: this.role
          },
          user_to_delete: {}
        }
      },
      methods:{
        handleDelete(index, row){
          this.user_to_delete = row;
          this.deleteVisible = true;
        },
        async deleteUser(user_id) {
          await this.$axios.$delete(process.env.URL_RA_BACKEND + 'users/' + user_id)
          this.deleteVisible = false;
          this.$notify({
            title: 'Eliminación',
            message: 'Usuario eliminado correctamente',
            type: 'success'
          });
        },
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
