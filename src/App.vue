<script setup lang="ts">
</script>


<template>
  <router-view/>
</template>

<style lang="scss">
  @use "./components-scss/variaveis.scss";

  body{
    margin:0;
    padding: 0;
    box-sizing: border-box;
    background-color: variaveis.$corPadraoSite;
  }
</style>
