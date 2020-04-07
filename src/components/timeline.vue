<template>
  <div class="timeline-container">
    <div class="add-timeline-card" @click="addNewTimelineCard()">&#43;</div>

    <div class="timeline-start">1st April 2020</div>

    <timelineCard
      v-for="card in cards"
      :key="card.id"
      :position="card.position"
      :date="card.date"
      :dateString="card.dateString"
      :summary="card.summary"
      :description="card.description"
      @updateSummary="updateSummary"
      @updateDescription="updateDescription"
    />

    <div class="timeline-end">1st April 2016</div>
  </div>
</template>

<script>
import timelineCard from "./timelineCard.vue";

export default {
  data: () => {
    return {
      cards: []
    };
  },
  components: {
    timelineCard
  },
  methods: {
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
      const noOfCards = cards.length;

      if (noOfCards <= 1) {
        return cards;
      }

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
    formatNewTimelineCard(id, position, date, dateString) {
      return {
        id: id,
        position: position,
        date: date,
        dateString: dateString,
        summary: "Add Your Title Here",
        description: "Add Your Description Here"
      };
    },
    buildNewTimelineCard(timelineCards) {
      const noOfTimelineCards = timelineCards.length;

      const date = new Date();
      const dateString = this.retrieveDate(date);

      if (noOfTimelineCards === 0) {
        const newTimelineCard = this.formatNewTimelineCard(
          0,
          "left",
          date,
          dateString
        );
        return newTimelineCard;
      }

      const firstCard = timelineCards[0];
      const latestPosition = firstCard.position;
      const cardID = this.getNewID(timelineCards);

      if (latestPosition === "left") {
        const newTimelineCard = this.formatNewTimelineCard(
          cardID,
          "right",
          date,
          dateString
        );
        return newTimelineCard;
      }

      const newTimelineCard = this.formatNewTimelineCard(
        cardID,
        "left",
        date,
        dateString
      );
      return newTimelineCard;
    },
    addNewTimelineCard() {
      const timelineCards = this.cards;

      const newTimelineCard = this.buildNewTimelineCard(timelineCards);

      this.updateTimelineCards(timelineCards, newTimelineCard);
    },
    updateTimelineCards(timelineCards, newTimelineCard) {
      let updatedCards = [newTimelineCard, ...timelineCards];
      updatedCards = this.sortByDate(updatedCards);
      updatedCards = this.setCardPosition(updatedCards);

      this.cards = updatedCards;
    },
    updateSummary() {
      console.dir("update summary....");
    },
    updateDescription() {
      console.dir("update description....");
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
