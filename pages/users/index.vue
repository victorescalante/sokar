<template>
  <div>
    <el-row class="group-title">
      <el-col :md="12">
        <TitleSection title="Administración de usuarios"></TitleSection>
      </el-col>
      <el-col :md="12">
        <div class="buttons-section">
          <nuxt-link to="users/create"><el-button type="primary">Crear usuario</el-button></nuxt-link>
        </div>
      </el-col>
    </el-row>
    <template>
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
    </template>
  </div>
</template>

<script>
  import TitleSection from "../../components/TitleSection/TitleSection";

  export default {
    layout: 'dashboard',
    middleware: ['auth'],
    transition: {
      name: 'default',
      mode: 'out-in'
    },
    components:{
      TitleSection: TitleSection
    },
    head () {
      return {
        title: 'Administración de usuarios',
      }
    },
    data(){
      return {
        data: []
      }
    },
    methods: {
      async init() {
        let data = await this.$axios.$get(process.env.URL_RA_BACKEND+'users');
        this.data = data.data.users;
      },
      handleEdit(index, row){
        this.$router.push('/users/'+row.id);
      }
    },
    mounted() {
      this.init();
    }
  }
</script>
