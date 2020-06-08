<template>
    <div class="TitleSection">
      <h2>{{ title }}</h2>
    </div>
</template>

<script>
    export default {
        props: ['title']
    };
</script>

<style>
  .TitleSection{
    color: #409EFF;
    padding: 25px 0px;
    text-transform: uppercase;
  }
</style>
