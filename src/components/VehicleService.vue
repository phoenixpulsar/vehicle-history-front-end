<template>
  <div class="vehicle-service">
    <div class="ctrls">
      <fa icon="edit" class="edit-btn" @click="editService" />
      <fa icon="trash" class="delete-btn" @click="deleteService" />
    </div>
    <div class="left-column">
      <div class="service-label">Service Id:</div>
      <div class="service-label">Service Date:</div>
    </div>
    <div class="right-column">
      <div class="id">{{ service.id }}</div>
      <div class="date">{{ service.serviceDate }}</div>
    </div>
    <div class="service-notes">
      <span class="service-label">Service Notes:</span>
      <br />
      <span class="service-notes-val"> {{ service.serviceNotes }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "VehicleService",
  props: {
    service: Object,
  },
  methods: {
    editService() {
      this.$emit("editThisService", this.service.id);
    },
    deleteService() {
      this.$emit("deleteThisService", this.service.id);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.vehicle-service {
  display: grid;
  grid-template:
    "ctrls      ctrls"
    "leftcolumn rightcolumn "
    "servicenotes servicenotes"
    / 1fr 1fr;
  padding-bottom: 10px;
  border-bottom: 2px solid #3b4252;
}

.ctrls {
  grid-area: ctrls;
  text-align: right;
  margin-bottom: 10px;
  /* display: grid; */
  /* justify-content: right; */
  /* place-items: center; */
}

.service-notes {
  grid-area: servicenotes;
}

.left-column {
  grid-area: leftcolumn;
}

.right-column {
  grid-area: rightcolumn;
  text-align: right;
}

.edit-btn,
.delete-btn {
  margin: 5px;
  color: white;
  cursor: pointer;
}

.service-label {
  color: white;
}
.service-notes-val {
  margin-left: 5px;
}
</style>
