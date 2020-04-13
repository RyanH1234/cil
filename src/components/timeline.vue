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
      @delete="removeCard"
      @updateDate="updateDate"
      @updateSummary="updateSummary"
      @updateDescription="updateDescription"
    />

    <div class="timeline-end">{{ timelineEarliest }}</div>
  </div>
</template>

<script>
import axios from "axios";

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
    this.getAllCards();
  },
  methods: {
    formatDate(date) {
      const day = date.getDate();

      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ];
      let month = date.getMonth();
      month = months[month];

      const year = date.getFullYear();

      const dateString = day + " " + month + " " + year;
      return dateString;
    },
    setBoundaries(latest, earliest) {
      const latestDateString = this.formatDate(latest);
      this.timelineLatest = latestDateString;

      const earliestDateString = this.formatDate(earliest);
      this.timelineEarliest = earliestDateString;
    },
    buildTimelineBoundaries() {
      const timelineCards = this.cards;
      const noOfCards = timelineCards.length;

      if (noOfCards === 0) {
        const now = new Date();

        const lastYear = now.getFullYear() - 1;
        let oneYearAgo = new Date();
        oneYearAgo.setFullYear(lastYear);

        this.setBoundaries(now, oneYearAgo);
        return;
      }

      if (noOfCards === 1) {
        const card = timelineCards[0];

        let latest = card.date;
        latest = this.fromUnixToDate(latest);

        const earliest = new Date(latest);
        const previousYear = latest.getFullYear() - 1;
        earliest.setFullYear(previousYear);

        this.setBoundaries(latest, earliest);
        return;
      }

      const head = timelineCards[0];
      const tail = timelineCards[noOfCards - 1];

      let latest = head.date;
      latest = this.fromUnixToDate(latest);

      let earliest = tail.date;
      earliest = this.fromUnixToDate(earliest);

      this.setBoundaries(latest, earliest);
    },
    getAllCards() {
      const client = this.$store.getters.getClient;
      const clientID = client.id;

      axios.get(`/timeline/${clientID}/get_all_cards`).then(resp => {
        const cardData = resp.data;

        const cardIDs = Object.keys(cardData);

        let cards = cardIDs.map(cardID => {
          const card = cardData[cardID];
          return {
            ...card,
            ...{ id: cardID }
          };
        });

        cards = this.sortCardsByDate(cards);
        cards = this.setCardPosition(cards);
        this.cards = cards;
        this.buildTimelineBoundaries();
      });
    },
    formatNewTimelineCard(position, date) {
      return {
        position: position,
        date: date,
        summary: "Add Your Title Here",
        description: "Add Your Description Here"
      };
    },
    fromUnixToDate(unixTimestamp) {
      const date = new Date(unixTimestamp);
      return date;
    },
    getUnixTimestamp(date) {
      const unixTimestamp = date.getTime();
      return unixTimestamp;
    },
    buildNewTimelineCard() {
      const timelineCards = this.cards;
      const noOfTimelineCards = timelineCards.length;

      let date = new Date();
      date = this.getUnixTimestamp(date);

      if (noOfTimelineCards === 0) {
        const newTimelineCard = this.formatNewTimelineCard("left", date);
        return newTimelineCard;
      }

      const firstCard = timelineCards[0];
      const latestPosition = firstCard.position;

      if (latestPosition === "left") {
        const newTimelineCard = this.formatNewTimelineCard("right", date);
        return newTimelineCard;
      }

      const newTimelineCard = this.formatNewTimelineCard("left", date);
      return newTimelineCard;
    },
    postNewCard(newTimelineCard) {
      const client = this.$store.getters.getClient;
      const clientID = client.id;

      axios
        .post(`/timeline/${clientID}/add_card`, newTimelineCard)
        .then(resp => {
          const newTimelineCardID = resp.data;

          const card = [{
            ...newTimelineCard,
            ...{ id: newTimelineCardID }
          }];

          const timelineCards = this.cards;
          this.cards = [...card, ...timelineCards];

          this.updateTimelineCards();
        })
        .catch(err => {
          console.error(err);
        });
    },
    sortCardsByDate(cards) {
      const noOfCards = cards.length;

      if (noOfCards <= 1) {
        return cards;
      }

      let sortedCards = cards.sort((d1, d2) => {
        const date1 = this.fromUnixToDate(d1.date);
        const date2 = this.fromUnixToDate(d2.date);
        return date1 - date2;
      });

      sortedCards.reverse();

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
    updateTimelineCards() {
      let updatedCards = this.cards;

      updatedCards = this.sortCardsByDate(updatedCards);
      updatedCards = this.setCardPosition(updatedCards);

      this.cards = updatedCards;

      this.buildTimelineBoundaries();
    },
    addNewTimelineCard() {
      let newTimelineCard = this.buildNewTimelineCard();

      this.postNewCard(newTimelineCard);
    },
    deleteCard(cardID) {
      const client = this.$store.getters.getClient;
      const clientID = client.id;

      axios.delete(`timeline/${clientID}/delete_card/${cardID}`).catch(err => {
        console.error(err);
      });
    },
    removeCard(payload) {
      const id = payload.id;
      const timelineCards = this.cards;

      this.deleteCard(id);

      let updatedCards = timelineCards.filter(card => card.id !== id);

      this.cards = updatedCards;
    },
    updateCard(cardID, updatedCard) {
      const client = this.$store.getters.getClient;
      const clientID = client.id;

      axios
        .post(`/timeline/${clientID}/update_card/${cardID}`, updatedCard)
        .catch(err => {
          console.dir(err);
        });
    },
    updateDate(payload) {
      const cardID = payload.id;
      const newDate = payload.date;

      const timelineCards = this.cards;

      let card = timelineCards.filter(card => card.id === cardID);
      card = card[0];

      const updatedCard = {
        ...card,
        ...{ date: newDate }
      };

      let updatedCards = timelineCards.filter(card => card.id !== cardID);
      updatedCards = [...updatedCards, ...[updatedCard]];
      this.cards = updatedCards;

      this.updateCard(cardID, updatedCard);
      this.updateTimelineCards();
    },
    updateSummary(payload) {
      const cardID = payload.id;
      const newSummary = payload.summary;

      const timelineCards = this.cards;

      let card = timelineCards.filter(card => card.id === cardID);
      card = card[0];

      const updatedCard = {
        ...card,
        ...{ summary: newSummary }
      };

      this.updateCard(cardID, updatedCard);
    },
    updateDescription(payload) {
      const cardID = payload.id;
      const newDescription = payload.description;

      const timelineCards = this.cards;

      let card = timelineCards.filter(card => card.id === cardID);
      card = card[0];

      const updatedCard = {
        ...card,
        ...{ description: newDescription }
      };

      this.updateCard(cardID, updatedCard);
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
