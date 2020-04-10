<template>
  <div class="login">
    Username
    <div class="username">
      <input type="text" />
    </div>Password
    <div class="password">
      <input type="password" />
    </div>
    <div class="login-btn">
      <Button @click="goToClients()">Login</Button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
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

.login .username,
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
  background-color: white;
  border-radius: 5px;
  font-size: 22px;
  background-color: inherit;
  font-weight: 600;
  color: #292f36;
  padding: 4px;
  padding: 15px;
  background-color: #6a9e91;
}

.login-btn button:hover {
  cursor: pointer;
  background-color: #5e8a7f;
}

@media only screen and (max-width: 600px) {
  .login {
    width: 80%;
    height: 80%;
  }
}
</style>