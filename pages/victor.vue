<template>
  <div class="input-victor">
    <p v-if="numb > 0">Hola</p>
    <input type="text" v-model="numb">
    <el-button @click="HandleClick">Sumar 100</el-button>
  </div>
</template>

<script>
  export default {
    name: 'InputVictor',
    layout: 'default',
    data(){
      return {
        numb:0
      }
    },
    methods: {
      HandleClick(){
        this.numb = this.numb + 100
      }
    }
  }
</script>

<style>
  .input-victor{
    background: #5d3ce7;
    color: white;
  }
</style>
