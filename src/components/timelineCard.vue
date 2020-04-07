<template>
  <div class="card" :style="height" v-bind:class="setCardStyling()" @click="doToggle()">
    <div class="date">
      <div class="padding" />
      &#128336; {{ dateString }}
    </div>

    <div class="summary" v-show="!toggled">
      <div class="padding" />
      {{ summary }}
    </div>

    <div class="description" v-show="toggled">
      <div class="padding" />
      {{ description }}
    </div>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      height: { height: "100px", "min-height": "100px" },
      toggled: false
    };
  },
  props: ["position", "date", "dateString", "summary", "description"],
  methods: {
    setCardStyling() {
      const setToLeft = this.position === "left";
      const setToRight = this.position === "right";

      return {
        left: setToLeft,
        right: setToRight
      };
    },
    doToggle() {
      const expandHeight = !this.toggled;

      if (expandHeight) {
        this.height = {
          height: "300px",
          "min-height": "300px"
        };
        this.toggled = true;
      } else {
        this.height = { height: "100px", "min-height": "100px" };
        this.toggled = false;
      }
    }
  }
};
</script>

<style scoped>
.card {
  display: inline-flex;
  transition: all 1s ease;
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  background-color: #52796f;
  border-radius: 20px;
  margin-top: 40px;
  margin-bottom: 40px;
  padding: 20px;
  margin-left: 10px;
  margin-right: 10px;
  -webkit-box-shadow: 5px 7px 10px 0px rgba(23, 32, 33, 1);
  -moz-box-shadow: 5px 7px 10px 0px rgba(23, 32, 33, 1);
  box-shadow: 5px 7px 10px 0px rgba(23, 32, 33, 1);
}

.card:hover {
  cursor: pointer;
}

.card .date {
  color: #292f36;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-weight: 600;
}

.card .summary {
  display: flex;
  font-size: 25px;
  align-self: flex-start;
  width: 100%;
  font-weight: 600;
  color: #292f36;
  letter-spacing: 0.5px;
}

.card .description {
  margin-top: 20px;
  padding: 0px 10px 10px 10px;
  overflow: auto;
  color: #292f36;
  font-size: 18px;
}

/* Scrollbar */
::-webkit-scrollbar {
  width: 10px;
}
::-webkit-scrollbar-track {
  background: #f1f1f1;
}
::-webkit-scrollbar-thumb {
  background: #888;
  height: 20px;
}
::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.padding {
  width: 10px;
}

.left {
  align-self: flex-start;
}

.right {
  align-self: flex-end;
}

@media only screen and (max-width: 600px) {
  .card {
    width: 80%;
  }

  .left,
  .right {
    align-self: center;
  }
}
</style>
