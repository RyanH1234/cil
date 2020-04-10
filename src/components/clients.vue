<template>
  <div class="clients">
    <div class="add-client-card" @click="addClient()">&#43;</div>
    <client v-for="client in clients" :name="client.name" :key="client.id" />
  </div>
</template>

<script>
import client from "@/components/client.vue";

export default {
  data: () => {
    return {
      clients: [{ id: 0, name: "Rolvenden" }]
    };
  },
  components: {
    client
  },
  methods: {
    getNewID(clients) {
      let latestID = 0;
      clients.map(card => {
        const id = card.id;

        if (id > latestID) {
          latestID = id;
        }
      });
      return latestID + 1;
    },
    addClient() {
      const clients = this.clients;
      const nextID = this.getNewID(clients);
      
      const newClient = [{
        id: nextID,
        name: "Client Name"
      }]

      this.clients = [...newClient, ...clients];
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
  overflow: auto;
  margin-top: 20px;
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
</style>