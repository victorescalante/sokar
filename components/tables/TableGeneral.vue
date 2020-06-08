<template>
    <div class="custom-card-table">
      <div class="title">{{ title }}</div>
      <slot></slot>
    </div>
</template>

<script>
    export default {
      name: "TableGeneral",
      props: ['title']
    }
</script>

<style lang="scss">
  .custom-card-table{
    padding-bottom: 50px;

    .title{
      background: $blue-dark;
      padding: 15px;
      color: $white;
      font-weight: bold;
    }

    .actions{
      text-align: right;
      padding: 10px 15px;
    }

    .content{
      padding: 15px;
    }

  }
</style>
