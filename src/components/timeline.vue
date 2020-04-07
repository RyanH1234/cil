<template>
  <div class="timeline-container">
    <div class="add-timeline-card" @click="addTimelineCard()">&#43;</div>

    <div class="timeline-start">1st April 2020</div>

    <editableTimelineCard
      v-for="editableCard in editableCards"
      :key="editableCard.id"
      :id="editableCard.id"
      :position="editableCard.position"
      :date="editableCard.date"
      :dateString="editableCard.dateString"
      :summary="editableCard.summary"
      :description="editableCard.description"
      @removeEditableCard="removeEditableCard"
      @saveEditableCard="saveEditableCard"
    />

    <timelineCard
      v-for="card in cards"
      :key="card.id"
      :position="card.position"
      :date="card.date"
      :dateString="card.dateString"
      :summary="card.summary"
      :description="card.description"
    />

    <div class="timeline-end">1st April 2016</div>
  </div>
</template>

<script>
import timelineCard from "./timelineCard.vue";
import editableTimelineCard from "./editableTimelineCard";

export default {
  data: () => {
    return {
      editableCards: [],
      cards: []
    };
  },
  components: {
    timelineCard,
    editableTimelineCard
  },
  methods: {
    removeEditableCard() {
      this.editableCards = [];
    },
    getNewID(cards) {
      let latestID = 0;
      cards.map(card => {
        const id = card.id;

        if (id > latestID) {
          latestID = id;
        }
      });
      return latestID + 1;
    },
    sortByDate(cards) {
      const sortedCards = cards.sort((d1, d2) => d1.date - d2.date);
      return sortedCards;
    },
    setCardPosition(cards) {
      const orderedCards = cards.map((card, index) => {
        let pos = card.position;
        if (index % 2) {
          pos = "right";
        } else {
          pos = "left";
        }

        return {
          ...card,
          ...{ position: pos }
        };
      });

      return orderedCards;
    },
    saveEditableCard(card) {
      this.editableCards = [];

      let cards = this.cards;
      cards = [...cards, card];
      cards = this.sortByDate(cards);
      cards = this.setCardPosition(cards);

      this.cards = cards;
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
    buildTimelineCard(id, position, date, dateString) {
      return {
        id: id,
        position: position,
        date: date,
        dateString: dateString,
        summary: "",
        description: ""
      }
    },
    addTimelineCard() {
      const editableCards = this.editableCards;
      const numberOfEditableCards = editableCards.length;

      if (numberOfEditableCards === 1) {
        return;
      }

      const timelineCards = this.cards;
      
      const date = new Date();
      const dateString = this.retrieveDate(date);
      
      const noOfTimelineCards = timelineCards.length;
      let editableCard = {};

      if(noOfTimelineCards === 0) {
        editableCard = this.buildTimelineCard(0, "left", date, dateString);
      }

      if(noOfTimelineCards !== 0) {
        const firstCard = timelineCards[0];
        const latestPosition = firstCard.position;
        const cardID = this.getNewID(timelineCards);

        if(latestPosition === "left") {
          editableCard = this.buildTimelineCard(cardID, "right", date, dateString);
        }

        if(latestPosition === "right") {
          editableCard = this.buildTimelineCard(cardID, "left", date, dateString);
        }
      }

      this.editableCards = [editableCard, ...editableCards];
    }
  }
};
</script>

<style scoped>
.timeline-container {
  display: flex;
  width: 90%;
  flex-direction: column;
  overflow: auto;
  z-index: 0;
}

.timeline-container::-webkit-scrollbar {
  display: none;
}

.timeline-start {
  font-weight: 600;
  align-self: center;
  margin-top: 50px;
  color: white;
  padding: 20px;
  opacity: 0.6;
  border-radius: 20px;
  border: 1px solid white;
  margin-bottom: 10px;
}

.timeline-end {
  margin-top: 10px;
  font-weight: 600;
  align-self: center;
  height: 20px;
  margin-bottom: 50px;
  color: white;
  padding: 20px;
  opacity: 0.6;
  border-radius: 20px;
  border: 1px solid white;
}

.add-timeline-card {
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

.add-timeline-card:hover {
  opacity: 1;
  cursor: pointer;
}

@media only screen and (max-width: 600px) {
  .add-timeline-card {
    margin-top: 80vh;
  }
}
</style>
