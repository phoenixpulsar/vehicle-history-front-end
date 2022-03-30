<template>
  <div class="vehicle">
    <h2 class="go-back-header" role="button" @click="goBack">
      <fa icon="chevron-left" />
      Back
    </h2>

    <div class="left-column">
      <div class="makeNmodel">Your Request is Being Processed</div>
      <div class="year"></div>
      <div class="divider"></div>
    </div>

    <div class="bottom-row">
      It might take up to a couple of min to see the changes reflected in the
      blockchain.
    </div>
  </div>
</template>

<script>
export default {
  name: "ActionMessage",
  props: {
    message: String,
  },
  data() {
    return {};
  },
  methods: {
    goBack() {
      this.$emit("closeMssg");
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.vehicle {
  width: 300px;
  margin: 0 auto;
  display: grid;

  overflow: hidden;
  overflow-y: scroll;
  padding-top: 5px;
  grid-template:
    "goback"
    "leftcolumn  "
    "bottomrow   ";
  background: #5e81ac;
  border-radius: 18px;
  padding: 15px;
  margin-top: 15px;
  scrollbar-width: none;
  -ms-overflow-style: none;
  position: relative;
}

.mySVG {
  position: absolute;
  left: 175px;
  top: 5px;
  width: 120px;
  height: 120px;
  overflow: visible;
}

.vehicle::-webkit-scrollbar {
  display: none; /* Safari and Chrome */
}

.bottom-row {
  grid-area: bottomrow;
}

.left-column {
  grid-area: leftcolumn;
}

.right-column {
  grid-area: rightcolumn;
}

.makeNmodel {
  color: black;
  font-size: 22px;
  font-weight: bold;
}

.year {
  color: black;
  font-size: 20px;
}

.divider {
  border-bottom: 1px solid white;
  margin-top: 10px;
  margin-bottom: 10px;
}

/* .mySVG {
  width: 100px;
  height: 100px;
} */

/* img {
  max-width: 153% !important;
} */

.left-label {
  color: #2e3440;
}

.go-back-header {
  color: white;
  grid-area: goback;
  cursor: pointer;
  margin-bottom: 10px;
}
</style>
