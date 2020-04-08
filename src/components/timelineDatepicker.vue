<template>
  <Datepicker 
    class="datepicker" 
    v-model="updatedDate" 
    :value="updatedDate" 
    @input="updateDate" 
  />
</template>

<script>
import Datepicker from "vuejs-datepicker";

export default {
  props: ["date"],
  data: function() {
    return {
      updatedDate: this.date
    };
  },
  components: {
    Datepicker
  },
  methods: {
    updateDate() {
      this.$emit("updateDate", this.updatedDate);
    }
  }
};
</script>

<style>
.datepicker input {
  margin-left: 5px;
  border-radius: 3px;
  padding-left: 5px;
  height: 25px;
  box-shadow: none;
  background-color: #52796f;
  color: #292f36;
  border: none;
  font-size: 16px;
  font-weight: 600;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

input:focus {
  outline: none;
}

::-webkit-inner-spin-button {
  display: none;
}

::-webkit-calendar-picker-indicator {
  background-color: #52796f;
}

::-webkit-calendar-picker-indicator:hover {
  cursor: pointer;
}
</style>