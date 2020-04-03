<template>
  <div class="timeline-container">
    <div class="timeline-start">1st April 2020 9:50</div>
    <timelineCard top="true" bottom="false" position="left" />
    <timelineCard top="false" bottom="false" position="right" />
    <timelineCard top="false" bottom="true" position="left" />
    <div class="timeline-end">1st April 2016 9:50</div>
  </div>
</template>

<script>
import timelineCard from "./timelineCard.vue";

export default {
  components: {
    timelineCard
  }
};
</script>

<style scoped>
.timeline-container {
  width: 90%;
  display: flex;
  flex-direction: column;
  overflow: auto;
}

.timeline-container::-webkit-scrollbar {
  display: none;
}

.timeline-start {
  align-self: center;
  height: 20px;
  margin-top: 50px;
}

.timeline-end {
  align-self: center;
  height: 20px;
  margin-bottom: 50px;
}
</style>