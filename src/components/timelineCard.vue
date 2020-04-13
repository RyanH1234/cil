<template>
  <div class="card" :style="height" v-bind:class="setCardStyling()">
    <div class="date">
      <div class="padding" />&#128336;
      <timelineDatepicker :date="date" @updateDate="updateDate" />
    </div>

    <div class="summary" v-show="!toggled">
      <div class="padding" />
      <div class="save" @click="updateSummary()" v-if="summaryChanged">&#x1f5ab;</div>
      <input v-model="updatedSummary" @input="summaryUpdated()" />
    </div>

    <div class="description" v-show="toggled">
      <div class="padding" />
      <textarea v-model="updatedDescription" @input="descriptionUpdated()"/>
    </div>

    <div class="toggle">
      <div class="padding" />
      <Button v-if="toggled" @click="doToggle()">Hide Description</Button>
      <Button v-else @click="doToggle()">Show Description</Button>

      <Button class="delete" @click="deleteCard()">Delete</Button>
      
      <div class="save" @click="updateDescription()" v-if="descriptionChanged">&#x1f5ab;</div>
    </div>
  </div>
</template>

<script>
import timelineDatepicker from "./timelineDatepicker";

export default {
  data: function() {
    return {
      height: { height: "150px", "min-height": "150px" },
      toggled: false,
      updatedSummary: this.summary,
      updatedDescription: this.description,
      summaryChanged: false,
      descriptionChanged: false,
    };
  },
  components: {
    timelineDatepicker
  },
  props: ["id", "position", "date", "summary", "description"],
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
        const expandedHeight = {
          height: "300px",
          "min-height": "300px"
        };

        this.height = expandedHeight;
        this.toggled = true;
      } else {
        const collapsedHeight = {
          height: "150px",
          "min-height": "150px"
        };

        this.height = collapsedHeight;
        this.toggled = false;
      }
    },
    updateDate(date) {
      const payload = {
        date: date,
        id: this.id
      };
      this.$emit("updateDate", payload);
    },
    deleteCard() {
      const payload = {
        id: this.id
      };

      this.$emit("delete", payload);
    },
    updateSummary() {
      const payload = {
        id: this.id,
        summary: this.updatedSummary
      };

      this.$emit("updateSummary", payload);
      this.summaryChanged = false;
    },
    updateDescription() {
      const payload = {
        id: this.id,
        description: this.updatedDescription
      }
      
      this.$emit("updateDescription", payload);
      this.descriptionChanged = false;
    },
    summaryUpdated() {
      this.summaryChanged = true;
    },
    descriptionUpdated() {
      this.descriptionChanged = true;
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

.card .date {
  color: #292f36;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-weight: 600;
}

.card .date:hover {
  cursor: pointer;
}

.card .summary {
  display: flex;
  font-size: 25px;
  align-items: baseline;
  width: 100%;
  height: 50px;
  font-weight: 600;
  color: #292f36;
  letter-spacing: 0.5px;
}

.save {
  font-weight: 600;
  font-size: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
}

.toggle .save {
  flex-grow: 2;
  display: flex;
  justify-content: flex-end;
}

.save:hover {
  cursor: pointer;
}

.summary input {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 25px;
  width: 60%;
  font-weight: 600;
  color: #292f36;
  letter-spacing: 0.5px;
  background-color: #52796f;
  border: none;
}

.summary input:focus {
  outline: none;
}

.card .description {
  margin-top: 20px;
  padding: 0px 10px 10px 10px;
  overflow: auto;
  color: #292f36;
  font-size: 18px;
  width: 95%;
}

.card .description::-webkit-scrollbar {
  width: 0px;
  background: transparent;
}

.description textarea {
  padding: 5px;
  width: 100%;
  max-width: 100%;
  max-height: 200px;
  height: 200px;
  background-color: #649488;
  border-radius: 10px;
  border: none;
  font-size: 18px;
  color: #292f36;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

.card .toggle {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
}

.toggle button {
  border: none;
  padding: 10px;
  font-size: 14px;
  border-radius: 5px;
  color: #292f36;
  font-weight: 600;
}

.toggle button:hover {
  cursor: pointer;
}

.toggle button:focus {
  outline: none;
}

.toggle .delete {
  margin-left: 10px;
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

  .summary input {
    width: 100%;
  }
}
</style>
