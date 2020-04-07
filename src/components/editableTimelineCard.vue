<template>
  <div class="card" v-bind:class="setCardStyling()">
    <div class="date">
      <div class="padding" />
      &#128336; {{ dateString }}
    </div>

    <div class="summary">
      <div class="padding" />
      <input v-model="summary" />
    </div>

    <div class="description">
      <div class="padding" />
      <textarea v-model="description" />
    </div>

    <div class="actions">
      <div class="padding" />
      <Button class="save" @click="saveTimelineCard()">Save</Button>
      <Button class="cancel" @click="removeTimelineCard()"> Cancel </Button>
    </div>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      summary: "Add Your Title Here",
      description: "Add Your Description Here"
    }
  },
  props: ["position", "date", "id", "dateString"],
  methods: {
    setCardStyling() {
      const setToLeft = this.position === "left";
      const setToRight = this.position === "right";

      return {
        left: setToLeft,
        right: setToRight
      };
    },
    removeTimelineCard() {
      this.$emit("removeEditableCard");
    },
    saveTimelineCard() {
      const card = {
        id: this.id,
        date: this.date,
        dateString: this.dateString,
        summary: this.summary,
        description: this.description,
        position: this.position,
      }
      this.$emit("saveEditableCard", card);
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
  margin-bottom: 20px;
}

.card .summary {
  display: flex;
  font-size: 25px;
  align-self: flex-start;
  width: 100%;
  font-weight: 600;
  color: #292f36;
  letter-spacing: 0.5px;
  margin-bottom: 20px;
}

.summary input {
  display: flex;
  font-size: 25px;
  align-self: flex-start;
  width: 60%;
  font-weight: 600;
  color: #292f36;
  letter-spacing: 0.5px;
  background-color: #52796f;
  border: none;
  border-bottom: 1px solid #292f36;
}

.summary input:focus {
  outline: none;
}

.card .description {
  width: 100%;
  margin-bottom: 15px;
  display: flex;
}

.description textarea {
  width: 100%;
  min-width: 95%;
  height: 100px;
  background-color: #649488;
  border-radius: 10px;
  padding: 10px;
  border: none;
  font-size: 18px;
  color: #292f36;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}


textarea:focus {
  outline: none;
}

.card .actions {
  width: 100%;
  display: flex;
}

.actions button {
  border: none;
  padding: 10px;
  font-size: 14px;
  border-radius: 5px;
  color: #292f36;
  font-weight: 600;
}

.actions .cancel {
  margin-left: 10px;
}

.actions button:hover {
  opacity: 1;
  cursor: pointer;
}

.actions button:focus {
  outline: none;
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

  .card .actions {
    justify-content: center;
  }
}
</style>
