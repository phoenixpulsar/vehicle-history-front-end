<template>
  <div class="vehicle-service">
    <div class="left-column">
      <div>fullid:</div>
      <div>vehicleid:</div>
      <div>id:</div>
      <div>ServiceDates:</div>
      <div>ServiceNotes:</div>
    </div>
    <div class="right-column">
      <div>{{ service.fullid }}</div>
      <div>{{ service.vehicleId }}</div>
      <div>{{ service.id }}</div>
      <div>{{ service.serviceDate }}</div>
      <div>{{ service.serviceNotes }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "VehicleService",
  props: {
    service: Object,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.vehicle-service {
  display: grid;
  grid-template: "leftcolumn rightcolumn";
}

.left-column {
  grid-area: leftcolumn;
}

.right-column {
  grid-area: rightcolumn;
}
</style>
