<template>
  <el-container>
    <el-row>
      <el-col>
        <h1>Hola</h1>
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
