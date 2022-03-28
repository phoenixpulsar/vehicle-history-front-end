<template>
  <div class="vehicle">
    <div class="left-column">
      <div>Make:</div>
      <div>Year:</div>
      <div>Model:</div>
      <div>Owner:</div>
      <div>DateAcquired:</div>
      <div>VehicleNotes:</div>
    </div>
    <div class="right-column">
      <div>
        <input v-model="make" placeholder="Make" />
      </div>
      <div>
        <input v-model="year" placeholder="Year" />
      </div>
      <div>
        <input v-model="model" placeholder="Model" />
      </div>
      <div>
        <input v-model="owner" placeholder="Owner" />
      </div>
      <div>
        <input v-model="dateAcquired" placeholder="Date Acquired" />
      </div>
      <div>
        <input v-model="vehicleNotes" placeholder="Notes" />
      </div>
    </div>
    <div class="add-vehicle-btn">
      <button class="btn" @click="callAddVehicle()">Add Vehicle</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "AddVehicleForm",
  data() {
    return {
      make: "",
      year: "",
      model: "",
      owner: "",
      vehicleNotes: "",
      dateAcquired: "",
    };
  },
  methods: {
    ...mapActions(["addVehicle"]),
    callAddVehicle() {
      let vehicleToAdd = {
        make: this.make,
        year: this.year,
        model: this.model,
        owner: this.owner,
        vehicleNotes: this.vehicleNotes,
        dateAcquired: this.dateAcquired,
      };
      this.addVehicle(vehicleToAdd);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.vehicle {
  display: grid;
  padding-top: 5px;
  grid-template:
    "leftcolumn  rightcolumn"
    "addbtn      addbtn";
}

.left-column {
  grid-area: leftcolumn;
}

.right-column {
  grid-area: rightcolumn;
}

.add-vehicle-btn {
  grid-area: addbtn;
  margin: 20px;
}
</style>
