<template>
    <div class="TitleSection">
      <h1>{{ title }}</h1>
    </div>
</template>

<script>
    export default {
        props: ['title']
    };
</script>

<style>
  .TitleSection{
    color: #465bff;
    padding: 25px 0px;
  }
</style>
