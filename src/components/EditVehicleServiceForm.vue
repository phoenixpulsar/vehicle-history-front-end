<template>
  <div class="service">
    <div class="left-column">
      <div>Service Date:</div>
      <div>Service Notes:</div>
    </div>
    <div class="right-column">
      <div>
        <input
          :value="service.serviceDate"
          @change="serviceDate = $event.target.value"
          placeholder="Service Date"
        />
      </div>
      <div>
        <input
          :value="service.serviceNotes"
          @change="serviceNotes = $event.target.value"
          placeholder="Service Notes"
        />
      </div>
    </div>
    <div class="add-service-btn">
      <button class="btn" @click="callUpdateVehicleService()">
        Update Service
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "EditServiceForm",
  props: {
    service: Object,
  },
  data() {
    return {
      serviceDate: null,
      serviceNotes: null,
    };
  },
  methods: {
    ...mapActions(["updateVehicleService"]),
    callUpdateVehicleService() {
      let serviceToUpdate = {
        vehicleServiceId: this.service.id,
        vehicleId: this.service.vehicleId,
        serviceDate:
          this.serviceDate !== null
            ? this.serviceDate
            : this.service.serviceDate,
        serviceNotes:
          this.serviceNotes !== null
            ? this.serviceNotes
            : this.service.serviceNotes,
      };
      this.updateVehicleService(serviceToUpdate);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.service {
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

.add-service-btn {
  grid-area: addbtn;
  margin: 20px;
}
</style>
