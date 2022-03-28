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
        <input
          :value="vehicle?.make"
          @change="make = $event.target.value"
          placeholder="Make"
        />
      </div>
      <div>
        <input
          :value="vehicle?.year"
          @change="year = $event.target.value"
          placeholder="Year"
        />
      </div>
      <div>
        <input
          :value="vehicle?.model"
          @change="model = $event.target.value"
          placeholder="Model"
        />
      </div>
      <div>
        <input
          :value="vehicle?.owner"
          @change="owner = $event.target.value"
          placeholder="Owner"
        />
      </div>
      <div>
        <input
          :value="vehicle?.dateAcquired"
          @change="dateAcquired = $event.target.value"
          placeholder="Date Acquired"
        />
      </div>
      <div>
        <input
          :value="vehicle?.vehicleNotes"
          @change="vehicleNotes = $event.target.value"
          placeholder="Notes"
        />
      </div>
    </div>
    <div class="add-vehicle-btn">
      <button class="btn" @click="callUpdateVehicle()">Update Vehicle</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "EditVehicleForm",
  props: {
    vehicle: Object,
  },
  data() {
    return {
      make: null,
      year: null,
      model: null,
      owner: null,
      vehicleNotes: null,
      dateAcquired: null,
    };
  },
  methods: {
    ...mapActions(["updateVehicle"]),
    callUpdateVehicle() {
      let vehicleToUpdate = {
        vehicleId: this.vehicle.id,
        make: this.make !== null ? this.make : this.vehicle.make,
        year: this.year !== null ? this.year : this.vehicle.year,
        model: this.model !== null ? this.model : this.vehicle.model,
        owner: this.owner !== null ? this.owner : this.vehicle.owner,
        vehicleNotes:
          this.vehicleNotes !== null
            ? this.vehicleNotes
            : this.vehicle.vehicleNotes,
        dateAcquired:
          this.dateAcquired !== null
            ? this.dateAcquired
            : this.vehicle.dateAcquired,
      };
      console.log("update", vehicleToUpdate);
      this.updateVehicle(vehicleToUpdate);
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
