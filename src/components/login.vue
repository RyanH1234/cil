<template>
  <div class="login">
    Username
    <div class="username"> <input type="text" /> </div>
    Password
    <div class="password"> <input type="password" /> </div>
    <div class="login-btn"> <Button @click="goToClients()"> Go! </Button> </div>
  </div>
</template>

<script>
export default {
  methods: {
    goToClients() {
      this.$router.push({name:'Clients'})
    }
  }
}
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
.login-btn Button:focus {
  outline: none;
}

.login .login-btn {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-right: 18%;
}

.login-btn Button {
  border: none;
  background-color: white;
  border-radius: 5px;
  font-size: 18px;
  background-color: rgb(52, 68, 77);
  color: white;
  padding: 15px;
}

.login-btn Button:hover {
  cursor: pointer;
  background-color: rgb(66, 87, 99);
}

@media only screen and (max-width: 600px) {
  .login {
    width: 80%;
    height: 80%;
  }
}
</style>