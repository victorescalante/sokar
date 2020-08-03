<template>
    <div :class="' custom-card-table ' + color">
      <div class="title">{{ title }}</div>
      <slot></slot>
    </div>
</template>

<script>
    export default {
      name: "TableGeneral",
      props: ['title', 'color']
    }
</script>

<style lang="scss">
  .custom-card-table{
    padding-bottom: 50px;
    .title{
      border-radius: 5px;
    }

    &.purple{
      .title{
        background: white;
      }
    }

    &.yellow{
      .title{
        background: #e5e500;
        color: #000000;
      }
    }

    &.orange{
      .title{
        background: orangered;
        color: white;
      }
    }

    &.green{
      .title{
        background: #33b105;
        color: white;
      }
    }

    &.purple{
      .title{
        background: #9103b1;
        color: white;
      }
    }

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

  .custom-paginator{
      padding: 25px;
  }
</style>
