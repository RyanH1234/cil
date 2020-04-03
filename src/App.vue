<template>
  <div id="app">
    <timeline />
  </div>
</template>

<script>
import timeline from "./components/timeline.vue";

export default {
  name: "App",
  components: {
    timeline
  }
};
</script>

<style>
body {
  margin: 0px;
  background-color: white;
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
