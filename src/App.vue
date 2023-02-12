<template>
  <div id="app">
    <HomePage />
    {{ searchImages }}
  </div>
</template>

<script>
import HomePage from './views/Home-Page.vue';

export default {
  name: 'App',
  components: {
    HomePage,
  },
  computed: {
    searchImages() {
    return true;
    }
  },
  mounted() {
    console.log(this.searchImages, "ife");
  },
};
</script>

<style>
* {
  box-sizing: border-box;
}
body {
  margin: 0;
  padding: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}
#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
