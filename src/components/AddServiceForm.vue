<template>
  <div class="service">
    <div class="left-column">
      <div>Service Date:</div>
      <div>Service Notes:</div>
    </div>
    <div class="right-column">
      <div>
        <input v-model="serviceDate" placeholder="Service Date" />
      </div>
      <div>
        <input v-model="serviceNotes" placeholder="Service Notes" />
      </div>
    </div>
    <div class="add-service-btn">
      <button class="btn" @click="callAddService()">Add Service</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "AddServiceForm",
  data() {
    return {
      serviceDate: "",
      serviceNotes: "",
    };
  },
  methods: {
    ...mapActions(["addService"]),
    callAddService() {
      let serviceToAdd = {
        vehicleId: this.vehicleId,
        serviceDate: this.serviceDate,
        serviceNotes: this.serviceNotes,
      };
      this.addService(serviceToAdd);
    },
  },
  props: {
    vehicleId: String,
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
