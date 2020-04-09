<template>
  <div id="app">
    <timeline />
    <!-- <login /> -->
  </div>
</template>

<script>
import timeline from "./components/timeline.vue";
// import login from "./components/login.vue";

export default {
  name: "App",
  components: {
    timeline,
    // login
  }
};
</script>

<style>
body {
  margin: 0px;
  background-color: #2F3E46;
}

#app {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>
