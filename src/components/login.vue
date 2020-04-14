<template>
  <div class="login">
    Email
    <div class="email">
      <input type="text" v-model="email" :style="errStyling" />
    </div>Password
    <div class="password">
      <input type="password" v-model="password" :style="errStyling" />
    </div>
    <div class="login-btn">
      <Button @click="login()" v-if="!loading">Login</Button>
      <ClipLoader color="#292f36" v-else />
    </div>
  </div>
</template>

<script>
import axios from "axios";

import ClipLoader from "vue-spinner/src/ClipLoader.vue";

export default {
  data: () => {
    return {
      email: "",
      password: "",
      loading: false,
      errStyling: {}
    };
  },
  components: {
    ClipLoader
  },
  methods: {
    login() {
      const email = this.email;
      const password = this.password;

      const payload = {
        email: email,
        password: password
      };

      this.loading = true;

      axios
        .post("/login/", payload)
        .then(resp => {
          const data = resp.data;

          const user = {
            uid: data.user.uid,
            email: data.user.email
          };

          this.clearError();
          this.loading = false;

          this.$store.commit("auth_success", user);

          this.goToClients();
        })
        .catch(err => {
          this.loading = false;
          this.setError();
        });
    },
    setError() {
      this.errStyling = {
        border: "2px solid #9a2727"
      };
    },
    clearError() {
      this.errStyling = {};
    },
    goToClients() {
      this.$router.push({ name: "Clients" });
    }
  }
};
</script>

<style scoped>
.login {
  width: 50%;
  height: 50%;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #52796f;
  color: #292f36;
  font-weight: 600;
  font-size: 16px;
  -webkit-box-shadow: 5px 7px 10px 0px rgba(23, 32, 33, 1);
  -moz-box-shadow: 5px 7px 10px 0px rgba(23, 32, 33, 1);
  box-shadow: 5px 7px 10px 0px rgba(23, 32, 33, 1);
}

.login .err {
  margin-bottom: 40px;
  color: #720c0c;
  font-size: 18px;
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login .email,
.login .password {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login input {
  border: none;
  background-color: none;
  height: 40px;
  margin-top: 20px;
  margin-bottom: 20px;
  width: 80%;
  background-color: #6a9e91;
  border-radius: 10px;
  color: inherit;
  font-size: 22px;
  padding: 5px;
  text-align: center;
  font-weight: 600;
}

.login input:focus,
.login-btn button:focus {
  outline: none;
}

.login .login-btn {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.login-btn button {
  border: none;
  border-radius: 5px;
  font-size: 16px;
  padding: 4px;
  padding: 15px;
  background-color: #6a9e91;
  color: #292f36;
  font-weight: 600;
}

.login-btn button:hover {
  cursor: pointer;
  background-color: #6fa597;
}

@media only screen and (max-width: 600px) {
  .login {
    width: 80%;
    height: 80%;
  }
}
</style>