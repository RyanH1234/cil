<template>
  <div class="clients">
    <div class="add-client-card" @click="addClient()">&#43;</div>
    <client
      v-for="client in clients"
      :name="client.name"
      :id="client.id"
      :key="client.id"
      @updateName="updateName"
      @goToTimeline="goToTimeline"
    />
  </div>
</template>

<script>
import axios from "axios";
import client from "@/components/client.vue";

export default {
  data: () => {
    return {
      clients: []
    };
  },
  components: {
    client
  },
  methods: {
    buildClientList(clientsObj) {
      const clientIDs = Object.keys(clientsObj);

      const clients = clientIDs.map(clientID => {
        let client = clientsObj[clientID];
        client = {
          ...client,
          ...{ id: clientID }
        };
        return client;
      });

      return clients;
    },
    getAllClients() {
      axios
        .get("/clients/get_all_clients")
        .then(resp => {
          const data = resp.data;
          const clients = this.buildClientList(data);
          this.clients = clients;
        })
        .catch(err => {
          console.error(err);
        });
    },
    addClient() {
      const clients = this.clients;

      const newClient = {
        name: "Client Name"
      };

      this.postNewClient(newClient);
    },
    postNewClient(newClient) {
      axios
        .post("/clients/new_client", newClient)
        .then(resp => {
          const newClientID = resp.data;

          const client = [{
            ...newClient,
            ...{ id: newClientID }
          }];

          const clients = this.clients;
          this.clients = [...client, ...clients];
        })
        .catch(err => {
          console.error(err);
        });
    },
    updateName(payload) {
      const { ["id"]: clientID, ...updatedClient } = payload;

      axios
        .post(`/clients/update_client_name/${clientID}`, updatedClient)
        .catch(err => {
          console.error(err);
        });
    },
    goToTimeline(client) {
      this.$store.commit("setClient", client);
      this.$router.push({ name: "Timeline" });
    }
  },
  mounted() {
    this.getAllClients();
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