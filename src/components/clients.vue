<template>
  <div class="clients">
    <div class="add-client-card">&#43;</div>
    <div class="client">
      <div class="name">
        <input type="text" value="Rolvenden" />
      </div>
      <div class="go-to" @click="goToTimeline()">
        &#707;
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goToTimeline() {
      this.$router.push({name:'Timeline'})
    }
  }
};
</script>

<style scoped>
.clients {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.client {
  margin-top: 40px;
  margin-bottom: 40px;
  width: 50%;
  height: 200px;
  border-radius: 5px;
  background-color: #52796f;
  -webkit-box-shadow: 5px 7px 10px 0px rgba(23, 32, 33, 1);
  -moz-box-shadow: 5px 7px 10px 0px rgba(23, 32, 33, 1);
  box-shadow: 5px 7px 10px 0px rgba(23, 32, 33, 1);
  display: flex;
  justify-content: center;
  align-items: center;
}

.client .name {
  width: 60%;
}

.name input {
  width: 100%;
  font-size: 30px;
  text-transform: uppercase;
  font-weight: 600;
  color: white;
  letter-spacing: 0.5px;
  background-color: inherit ;
  border: none;
  border-bottom: 1px solid white;
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
  color: white;
}

.client .go-to:hover {
  cursor: pointer;
}

.add-client-card {
  opacity: 0.6;
  color: white;
  font-size: 40px;
  background-color: #c23c3c;
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 40px;
  position: absolute;
  bottom: 5vh;
  right: 2vw;
  -webkit-box-shadow: 6px 7px 5px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 6px 7px 5px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 6px 7px 5px 0px rgba(0, 0, 0, 0.75);
  align-self: flex-end;
}

.add-client-card:hover {
  opacity: 1;
  cursor: pointer;
}


@media only screen and (max-width: 600px) {
  .client {
    width: 80%;
  }
}
</style>