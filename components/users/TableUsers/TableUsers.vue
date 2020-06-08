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
      props: ['data'],
      methods:{
        handleEdit(index, row){
          this.$router.push('/users/'+row.id);
        }
      }
    };
</script>
