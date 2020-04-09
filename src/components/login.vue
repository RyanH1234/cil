<template>
  <div class="login">
    Username
    <div class="username"> <input type="text" /> </div>
    Password
    <div class="password"> <input type="password" /> </div>
    <div class="login-btn"> <Button> Login </Button> </div>
  </div>
</template>

<style scoped>
.login {
  width: 50%;
  height: 50%;
  border-radius: 5px;
  border: 1px solid white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgb(43, 60, 70);
  color: white;
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
  background-color: #2F3E46;
  border: 1px solid white;
  border-radius: 10px;
  color: white;
  font-size: 22px;
  padding: 5px;
  text-align: center;
}

.login input:focus,
.login-btn Button:focus {
  outline: none;
}

.login-btn Button {
  border: none;
  background-color: white;
  border-radius: 5px;
  font-size: 20px;
  text-transform: uppercase;
  background-color: #2F3E46;
  border: 1px solid white;
  color: white;
  padding: 15px;
}

.login-btn Button:hover {
  cursor: pointer;
  background-color: rgb(65, 86, 99);
}

@media only screen and (max-width: 600px) {
  .login {
    width: 80%;
    height: 80%;
  }
}
</style>