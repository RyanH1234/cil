<template>
  <div class="timeline-container">
    <div class="add-timeline-card" @click="addNewTimelineCard()">&#43;</div>

    <div class="timeline-start">{{ timelineLatest }}</div>

    <timelineCard
      v-for="card in cards"
      :key="card.id"
      :id="card.id"
      :position="card.position"
      :date="card.date"
      :summary="card.summary"
      :description="card.description"
      @updateSummary="updateSummary"
      @updateDescription="updateDescription"
      @updateDate="updateDate"
      @cancel="removeCard"
    />

    <div class="timeline-end">{{ timelineEarliest }} </div>
  </div>
</template>

<script>
import timelineCard from "./timelineCard.vue";

export default {
  data: () => {
    return {
      cards: [],
      timelineLatest: "",
      timelineEarliest: ""
    };
  },
  components: {
    timelineCard
  },
  mounted() {
    this.buildTimelineBoundaries();
  },
  methods: {
    buildTimelineBoundaries() {
      const timelineCards = this.cards;
      const noOfCards = timelineCards.length;

      if(noOfCards === 0) {
        const now = new Date();

        const lastYear = now.getFullYear() - 1;
        let oneYearAgo = new Date();
        oneYearAgo.setFullYear(lastYear);

        this.setBoundaries(now, oneYearAgo);
        return;
      }

      if(noOfCards === 1) {
        const card = timelineCards[0];

        const latest = card.date;

        const earliest = new Date(latest);
        const previousYear = latest.getFullYear() - 1;
        earliest.setFullYear(previousYear)

        this.setBoundaries(latest, earliest);
        return;
      }
      
      const head = timelineCards[0];
      const tail = timelineCards[noOfCards - 1];
      const latest = head.date;
      const earliest = tail.date;
      this.setBoundaries(latest, earliest);
    },
    setBoundaries(latest, earliest) {
      const latestDateString = this.formatDate(latest);
      this.timelineLatest = latestDateString;
      
      const earliestDateString = this.formatDate(earliest);
      this.timelineEarliest = earliestDateString;
    },
    formatDate(date) {
      const day = date.getDate();
      
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      let month = date.getMonth();
      month = months[month];

      const year = date.getFullYear();

      const dateString = day + " " + month + " " + year;
      return dateString;
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
    sortCardsByDate(cards) {
      const noOfCards = cards.length;

      if (noOfCards <= 1) {
        return cards;
      }

      const sortedCards = cards.sort((d1, d2) => d1.date - d2.date).reverse();
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
    formatNewTimelineCard(id, position, date) {
      return {
        id: id,
        position: position,
        date: date,
        summary: "Add Your Title Here",
        description: "Add Your Description Here"
      };
    },
    buildNewTimelineCard() {
      const timelineCards = this.cards;
      const noOfTimelineCards = timelineCards.length;

      const date = new Date();

      if (noOfTimelineCards === 0) {
        const newTimelineCard = this.formatNewTimelineCard(0, "left", date);
        return newTimelineCard;
      }

      const firstCard = timelineCards[0];
      const latestPosition = firstCard.position;
      const cardID = this.getNewID(timelineCards);

      if (latestPosition === "left") {
        const newTimelineCard = this.formatNewTimelineCard(
          cardID,
          "right",
          date
        );
        return newTimelineCard;
      }

      const newTimelineCard = this.formatNewTimelineCard(cardID, "left", date);
      return newTimelineCard;
    },
    updateTimelineCards(newTimelineCard) {
      const timelineCards = this.cards;

      let updatedCards = [newTimelineCard, ...timelineCards];
      updatedCards = this.sortCardsByDate(updatedCards);
      updatedCards = this.setCardPosition(updatedCards);
      this.cards = updatedCards;

      this.buildTimelineBoundaries();
    },
    addNewTimelineCard() {
      const newTimelineCard = this.buildNewTimelineCard();
      this.updateTimelineCards(newTimelineCard);
    },
    removeCard(payload) {
      const id = payload.id;
      const timelineCards = this.cards;

      let updatedCards = timelineCards.filter(card => card.id !== id);

      this.cards = updatedCards;
    },
    updateSummary() {
      console.dir("update summary....");
    },
    updateDescription() {
      console.dir("update description....");
    },
    updateDate(payload) {
      const cardID = payload.id;
      const newDate = payload.date;

      const timelineCards = this.cards;

      let card = timelineCards.filter(card => card.id === cardID);
      card = card[0];

      const removeCardPayload = { id: cardID };
      this.removeCard(removeCardPayload);

      const updatedCard = {
        ...card,
        ...{ date: newDate }
      };

      this.updateTimelineCards(updatedCard);
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
