<template>
  <div class="timeline-container">
    <div class="add-timeline-card" @click="addNewTimelineCard()">&#43;</div>

    <div class="timeline-start">1st April 2020</div>

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
    buildNewTimelineCard(timelineCards) {
      const noOfTimelineCards = timelineCards.length;

      const date = new Date();

      if (noOfTimelineCards === 0) {
        const newTimelineCard = this.formatNewTimelineCard(
          0,
          "left",
          date,
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
        );
        return newTimelineCard;
      }

      const newTimelineCard = this.formatNewTimelineCard(
        cardID,
        "left",
        date,
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
    },
    updateDate(payload) {
      const cardID = payload.id;
      const newDate = payload.date;

      const timelineCards = this.cards;

      // TODO - this can be replaced with a call to the API
      let updatedCards = timelineCards.map(card => {
        const id = card.id;
        if(id === cardID) {
          const updatedCard = {
            ...card,
            ...{date: newDate}
          }
          return updatedCard
        }

        return card;
      });

      updatedCards = this.sortByDate(updatedCards);
      updatedCards = this.setCardPosition(updatedCards);

      this.cards=updatedCards;
    },
    removeCard(payload) {
      const id = payload.id;
      const timelineCards = this.cards;

      let updatedCards = timelineCards.filter(card => card.id !== id);
      
      this.cards = updatedCards;
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
