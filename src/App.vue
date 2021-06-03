<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link
        v-if="store.state.backendState"
        to="/DataTypes">Data Types</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  data () {
    return {
      store: this.$root.$store
    }
  }
}
</script>

<style lang="scss">
@import "@/styles/app.scss";

body {
  color: $APP-FG-COLOR;
  background-color: $BODY-BG-COLOR !important;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $APP-FG-COLOR;
  background-color: $APP-BG-COLOR;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
