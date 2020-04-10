<template>
  <div class="client">
    <div class="name">
      <input type="text" :value="name" />
    </div>
    <div class="go-to" @click="goToTimeline()">...</div>
  </div>
</template>

<script>
export default {
  props: ["name"],
  methods: {
    goToTimeline() {
      this.$router.push({ name: "Timeline" });
    }
  }
};
</script>

<style scoped>
.client {
  margin-top: 40px;
  margin-bottom: 40px;
  width: 50%;
  min-height: 200px;
  border-radius: 5px;
  background-color: #52796f;
  -webkit-box-shadow: 5px 7px 10px 0px rgba(23, 32, 33, 1);
  -moz-box-shadow: 5px 7px 10px 0px rgba(23, 32, 33, 1);
  box-shadow: 5px 7px 10px 0px rgba(23, 32, 33, 1);
  color: #292f36;
  display: flex;
  justify-content: center;
  align-items: center;
}

.client .name {
  width: 60%;
}

.name input {
  width: 100%;
  font-size: 50px;
  font-weight: 600;
  color: inherit;
  letter-spacing: 0.5px;
  background-color: inherit;
  border: none;
}

.name input:focus {
  outline: none;
}

.client .go-to {
  width: 20%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 40px;
  color: inherit;
}

.client .go-to:hover {
  cursor: pointer;
}

@media only screen and (max-width: 600px) {
  .client {
    width: 80%;
  }

  .name input {
    font-size: 40px;
  }
}
</style>