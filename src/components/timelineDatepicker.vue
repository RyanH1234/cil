<template>
  <Datepicker class="datepicker" v-model="updatedDate" :value="updatedDate" @input="updateDate" />
</template>

<script>
import Datepicker from "vuejs-datepicker";

export default {
  props: ["date"],
  data: function() {
    return {
      updatedDate: this.date
    }
  },
  components: {
    Datepicker
  },
  methods: {
    updateDate() {
      console.dir(this.updatedDate);
      this.$emit("updateDate", this.updatedDate);
    },
    formatMonth(month) {
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ];
      const formattedMonth = monthNames[month];
      return formattedMonth;
    },
    formatDate(date) {
      const unitDigit = date % 10;
      const tensDigit = date % 100;

      if (unitDigit == 1 && tensDigit !== 11) {
        return date + "st";
      }

      if (unitDigit == 2 && tensDigit !== 12) {
        return date + "nd";
      }
      if (unitDigit == 3 && tensDigit != 13) {
        return date + "rd";
      }

      return date + "th";
    },
    retrieveDate(date) {
      let day = date.getDate();
      day = this.formatDate(day);

      let month = date.getMonth();
      month = this.formatMonth(month);

      const year = date.getFullYear();

      return day + " " + month + " " + year;
    },
  }
}
</script>

<style>

.datepicker input {
  margin-left:  5px;
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