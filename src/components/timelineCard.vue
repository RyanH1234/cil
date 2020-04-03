<template>
  <div class="card-container" v-bind:class="setCardStyling()" :style="height" @click="doToggle()">
    <div class="card">
      <div class="date">
        <div style="width: 10px" />12th June 2019 - 6:03PM
      </div>
      <div
        class="description"
      >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce mollis mi eget purus rhoncus consectetur. Phasellus egestas vitae neque quis ornare. Nullam ligula est, congue nec rhoncus et, feugiat ac risus. Nullam a aliquam massa. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In lorem arcu, volutpat sed dolor fringilla, sagittis consequat quam. Praesent id hendrerit dolor, non imperdiet ligula. Integer luctus vitae nisl eget luctus. Cras euismod rhoncus pulvinar. Sed faucibus tortor at nibh ultricies hendrerit non eleifend velit. In imperdiet lacinia sem, pulvinar cursus lectus tincidunt a. In mollis tincidunt nunc, non mollis purus pellentesque non. Proin ac arcu ac elit suscipit maximus sed non sapien. Vivamus a elementum sem. Sed scelerisque, arcu nec luctus tempus, felis risus vulputate erat, in pellentesque nunc sapien at justo. Donec et semper turpis.</div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      toggled: false,
      height: {}
    };
  },
  props: ["top", "bottom", "position"],
  methods: {
    setCardStyling() {
      const setToTop = this.top;
      const setToBottom = this.bottom;

      const setToLeft = this.position === "left";
      const setToRight = this.position === "right";

      return {
        top: setToTop,
        bottom: setToBottom,
        left: setToLeft,
        right: setToRight
      };
    },
    doToggle() {
      const expandHeight = !this.toggled;

      if (expandHeight) {
        const styling = {
          height: "500px"
        };
        this.height = styling;
        this.toggled = true;
      } else {
        this.height = {};
        this.toggled = false;
      }
    }
  }
};
</script>

<style scoped>
.card-container {
  width: 50.7%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  transition: height 0.5s;
}

.card {
  width: 89%;
  height: 96%;
  transition: width 0.5s, height 0.5s;
  margin-left: 10px;
  margin-right: 10px;
  /* background-color: #ed6a5a; */
  /* -webkit-box-shadow: 11px 10px 5px 6px rgba(209, 209, 209, 1);
  -moz-box-shadow: 11px 10px 5px 6px rgba(209, 209, 209, 1);
  box-shadow: 11px 10px 5px 6px rgba(209, 209, 209, 1); */
}

.card:hover {
  cursor: pointer;
}

.card .date {
  width: 100%;
  height: 35%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  /* background-color: #e6ebe0; */
  font-size: 20px;
  text-transform: uppercase;
}

.card .description {
  padding: 10px;
  height: 50%;
  overflow: hidden;
}

.left {
  align-self: flex-start;
}

.right {
  align-self: flex-end;
}

.top {
  margin-top: 40px;
}

.bottom {
  margin-bottom: 40px;
}
</style>