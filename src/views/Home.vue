<template>
  <div class="history">
    <h1 class="header">History</h1>
    <div class="vehicle-box-container">
      <div
        v-for="(vehicle, index) in vehicles"
        :key="index"
        class="vehicle-box"
      >
        <div
          class="vehicle-box__side"
          :class="[
            isFrontSideShowing(index)
              ? 'vehicle-box__side--front-intial'
              : 'vehicle-box__side--front-rotate',
          ]"
        >
          <div>Make:</div>
          <div>Year:</div>
          <div>Model:</div>
          <div>Owner:</div>
          <div>DateAcquired:</div>
          <div>DateAcquired:</div>
          <div>VehicleNotes:</div>
          <div>PurchasedFrom:</div>
          <div>PricePaid:</div>
          <button @click="showBack(index)">See Services</button>
        </div>
        <div
          class="vehicle-box__side"
          :class="[
            isFrontSideShowing(index)
              ? 'vehicle-box__side--back-intial'
              : 'vehicle-box__side--back-rotate',
          ]"
        >
          <div class="vehicle-service-container">
            <button @click="showFront(index)">Show Vehicle Details</button>
            <div class="vehicle-service-box">
              <div>Make:</div>
              <div>VehicleId:</div>
              <div>ServiceDates:</div>
              <div>ServiceNotes:</div>
            </div>
            <div class="vehicle-service-box">
              <div>Make:</div>
              <div>VehicleId:</div>
              <div>ServiceDates:</div>
              <div>ServiceNotes:</div>
            </div>
            <div class="vehicle-service-box">
              <div>Make:</div>
              <div>VehicleId:</div>
              <div>ServiceDates:</div>
              <div>ServiceNotes:</div>
            </div>
            <div class="vehicle-service-box">
              <div>Make:</div>
              <div>VehicleId:</div>
              <div>ServiceDates:</div>
              <div>ServiceNotes:</div>
            </div>
            <div class="vehicle-service-box">
              <div>Make:</div>
              <div>VehicleId:</div>
              <div>ServiceDates:</div>
              <div>ServiceNotes:</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Home",
  data() {
    return {
      history: [],
      vehicles: [1],
      showServiceFor: [],
      myPerfectStructure: [
        {
          id: "VEWEWEET",
        },
      ],
    };
  },
  mounted() {
    this.initStore();
    // console.log(this.$store.state);
  },
  watch: {
    contractState: {
      handler(val) {
        console.log("in watcher", val);
      },
    },
  },
  computed: {
    ...mapGetters(["GET_CONTRACT_STATE"]),
    contractState() {
      return this.GET_CONTRACT_STATE;
    },
  },
  methods: {
    ...mapActions(["initStore"]),
    showBack(index) {
      this.showServiceFor.push(index);
    },
    showFront(index) {
      this.showServiceFor = this.showServiceFor.filter((i) => i !== index);
    },
    isFrontSideShowing(index) {
      return !this.showServiceFor.includes(index);
    },
  },
};
</script>
<style lang="scss" scoped>
.history {
  color: #88c0d0;
}

.header {
  text-align: center;
}

.header-2 {
  text-align: center;
  font-size: 18px;
}

.vehicle-box-container {
  width: 320px;
  padding: 2px;
  height: 80vh;
  overflow: hidden;
  margin: 10px auto;
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
  outline: 2px solid lightsalmon;
}

.vehicle-box-container::-webkit-scrollbar {
  display: none; /* Safari and Chrome */
}

.vehicle-service-container {
  padding: 2px;
  width: 280px;
  height: 280px;
  overflow: hidden;
  margin: 10px auto;
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
  backface-visibility: hidden;
  outline: 2px solid #d08770;
}

.vehicle-service-container::-webkit-scrollbar {
  display: none; /* Safari and Chrome */
}

.vehicle-service-box {
  width: 250px;
  height: 180px;
  overflow: hidden;
  margin: 15px auto;
  background: #2e3440;
  backface-visibility: hidden;
  outline: 1px solid #bf616a;
}

.vehicle-box {
  width: 300px;
  height: 300px;
  margin: 10px auto;
  position: relative;
  perspective: 150rem;
  outline: 1px solid #88c0d0;
}

.vehicle-box__side {
  top: 0;
  left: 0;
  width: 100%;
  height: 300px;
  overflow: hidden;
  position: absolute;
  transition: all 0.8s;
  backface-visibility: hidden;
}

.vehicle-box__side--front-intial {
  background: #4c566a;
}

.vehicle-box__side--back-intial {
  background: #5e81ac;
  transform: rotateX(180deg);
}

.vehicle-box__side--front-rotate {
  transform: rotateX(180deg);
}
.vehicle-box__side--back-rotate {
  transform: rotateX(0);
}
</style>
