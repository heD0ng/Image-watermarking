<template>
  <div>
    <Header></Header>
  
    <router-view></router-view>
  </div>
  <!-- <home></home> -->
</template>

<script>
import Home from "./views/Home/index.vue";
import Header from './components/header/index.vue'

export default {
  name: "App",
  components: {
    Home,
    Header
  },
};
</script>

<style>
</style>
