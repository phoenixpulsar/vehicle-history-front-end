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
      <div>{{ vehicle.make }}</div>
      <div>{{ vehicle.year }}</div>
      <div>{{ vehicle.model }}</div>
      <div>{{ vehicle.owner }}</div>
      <div>{{ vehicle.dateAcquired }}</div>
      <div>{{ vehicle.vehicleNotes }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Vehicle",
  props: {
    vehicle: Object,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.vehicle {
  display: grid;
  padding-top: 5px;
  grid-template: "leftcolumn  rightcolumn";
}

.left-column {
  grid-area: leftcolumn;
}

.right-column {
  grid-area: rightcolumn;
}
</style>
