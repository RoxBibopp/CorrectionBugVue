<template>
  <router-link to="/">Meteo</router-link>
  <router-link style="margin-left:30px" to="/postIt">Post-It</router-link>

  <router-view />
</template>

<script setup lang="ts">
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  margin-top: 60px;
}
</style>