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
      // cards: [
      //   {
      //     id: 0,
      //     position: "left",
      //     date: "30th June 2019",
      //     summary: "Installation @ Rolvenden",
      //     description:
      //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce mollis mi eget purus rhoncus consectetur. Phasellus egestas vitae neque quis ornare. Nullam ligula est, congue nec rhoncus et, feugiat ac risus. Nullam a aliquam massa. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In lorem arcu, volutpat sed dolor fringilla, sagittis consequat quam. Praesent id hendrerit dolor, non imperdiet ligula. Integer luctus vitae nisl eget luctus. Cras euismod rhoncus pulvinar. Sed faucibus tortor at nibh ultricies hendrerit non eleifend velit. In imperdiet lacinia sem, pulvinar cursus lectus tincidunt a. In mollis tincidunt nunc, non mollis purus pellentesque non. Proin ac arcu ac elit suscipit maximus sed non sapien. Vivamus a elementum sem. Sed scelerisque, arcu nec luctus tempus, felis risus vulputate erat, in pellentesque nunc sapien at justo. Donec et semper turpis."
      //   },
        // {
        //   id: 1,
        //   position: "right",
        //   date: "14th June 2019",
        //   summary: "Follow up talk w. Rolvenden",
        //   description:
        //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce mollis mi eget purus rhoncus consectetur. Phasellus egestas vitae neque quis ornare. Nullam ligula est, congue nec rhoncus et, feugiat ac risus. Nullam a aliquam massa. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In lorem arcu, volutpat sed dolor fringilla, sagittis consequat quam. Praesent id hendrerit dolor, non imperdiet ligula. Integer luctus vitae nisl eget luctus. Cras euismod rhoncus pulvinar. Sed faucibus tortor at nibh ultricies hendrerit non eleifend velit. In imperdiet lacinia sem, pulvinar cursus lectus tincidunt a. In mollis tincidunt nunc, non mollis purus pellentesque non. Proin ac arcu ac elit suscipit maximus sed non sapien. Vivamus a elementum sem. Sed scelerisque, arcu nec luctus tempus, felis risus vulputate erat, in pellentesque nunc sapien at justo. Donec et semper turpis."
        // },
        // {
        //   id: 2,
        //   position: "left",
        //   date: "12th June 2019",
        //   summary: "Sit down w. Rolvenden",
        //   description:
        //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce mollis mi eget purus rhoncus consectetur. Phasellus egestas vitae neque quis ornare. Nullam ligula est, congue nec rhoncus et, feugiat ac risus. Nullam a aliquam massa. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In lorem arcu, volutpat sed dolor fringilla, sagittis consequat quam. Praesent id hendrerit dolor, non imperdiet ligula. Integer luctus vitae nisl eget luctus. Cras euismod rhoncus pulvinar. Sed faucibus tortor at nibh ultricies hendrerit non eleifend velit. In imperdiet lacinia sem, pulvinar cursus lectus tincidunt a. In mollis tincidunt nunc, non mollis purus pellentesque non. Proin ac arcu ac elit suscipit maximus sed non sapien. Vivamus a elementum sem. Sed scelerisque, arcu nec luctus tempus, felis risus vulputate erat, in pellentesque nunc sapien at justo. Donec et semper turpis."
        // }
      // ]
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
    saveEditableCard(card) {
      console.dir(card);

      // order card

      // set position
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
    retrieveDate() {
      const date = new Date();

      let day = date.getDate();
      day = this.formatDate(day);

      let month = date.getMonth();
      month = this.formatMonth(month);

      const year = date.getFullYear();

      return day + " " + month + " " + year;
    },
    addTimelineCard() {
      const editableCards = this.editableCards;
      const numberOfEditableCards = editableCards.length;

      if (numberOfEditableCards === 1) {
        console.error("Can only edit one card at a time.");
        return;
      }

      const timelineCards = this.cards;
      const date = this.retrieveDate();
      let cardID = 0;
      let editableCard = {};

      if (timelineCards.length === 0) {
        editableCard = {
          id: cardID,
          position: "left",
          date: date,
          summary: "",
          description: ""
        };
      } else {
        const firstCard = timelineCards[0];
        const latestPosition = firstCard.position;

        const cardID = this.getNewID(timelineCards);

        // TODO - need to pass in the actual datetime string too
        const date = this.retrieveDate();

        if (latestPosition === "left") {
          editableCard = {
            id: cardID,
            position: "right",
            date: date,
            summary: "",
            description: ""
          };
        } else {
          editableCard = {
            id: cardID,
            position: "left",
            date: date,
            summary: "",
            description: ""
          };
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
}

.timeline-end {
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
