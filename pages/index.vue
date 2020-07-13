<template>
  <el-container>
    <el-row class="body-home">
      <el-col :md="24" class="title-home">
        <h1>Hola, {{ $auth.$state.user.name }}</h1>
      </el-col>
      <el-col :md="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>Información relevante</span>
          </div>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
          standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
          <br><br>
          a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
          Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions
          of Lorem Ipsum.
        </el-card>
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

<style>

  .title-home{
    padding: 20px 15px;
  }
  .body-home{
    min-height: 80vh;
    padding: 15px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    margin-top: 15px;
    width: 480px;
  }
</style>
