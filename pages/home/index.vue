<template>
  <el-container>
    <el-row>
      <el-col>
        <h2>Hola, {{ $auth.$state.user.name }}</h2>
      </el-col>
    </el-row>
  </el-container>
</template>

<script>
  export default {
    layout: 'dashboard',
    middleware: ['auth'],
    data(){
      return {

      }
    }
  }
</script>
