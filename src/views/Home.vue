<template>
  <div class="history">
    <h1 class="header">History</h1>
    <div class="user-actions" v-if="GET_IS_USER_LOGGED_IN">
      Welcome, {{ GET_USER_ACCOUNT_DETAILS?.accountId }}
    </div>
    <div v-if="!GET_IS_USER_LOGGED_IN" class="user-actions">
      <button class="btn" @click="signInUsingStore()">Sign In</button>
    </div>
    <div v-if="GET_IS_USER_LOGGED_IN" class="user-actions">
      <button class="btn" @click="signOutUsingStore()">Sign Out</button>
    </div>
    <div
      v-if="
        GET_IS_USER_LOGGED_IN &&
        GET_USER_ACCOUNT_DETAILS?.accountId === 'phoenixpulsar.testnet'
      "
      class="user-actions"
    >
      <button class="btn" @click="showVehicleForm()">Add Vehicle</button>
    </div>

    <div v-if="displayVehicleForm" class="vehicle-form">
      <AddVehicleForm />
    </div>

    <div class="vehicle-box-container">
      <div
        v-for="(vehicle, index) in contractState.vehicles"
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
          <button class="btn" @click="showBack(index)">See Services</button>
          <Vehicle :vehicle="vehicle"></Vehicle>

          <EditVehicleForm :vehicle="vehicle"></EditVehicleForm>

          <button class="btn" @click="callDeleteVehicle(vehicle)">
            Delete Vehicle
          </button>
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
            <!-- could optimize here and just fetch service if user clicks see services -->
            <div class="vehicle-service-ctrls">
              <button class="btn" @click="showFront(index)">
                Show Vehicle Details
              </button>

              <div
                v-if="
                  GET_IS_USER_LOGGED_IN &&
                  GET_USER_ACCOUNT_DETAILS?.accountId ===
                    'phoenixpulsar.testnet'
                "
              >
                <AddServiceForm :vehicleId="vehicle.id" />
              </div>
            </div>
            <div
              v-for="(service, index) in getServices(vehicle.id)"
              :key="index"
              class="vehicle-service-box"
            >
              <VehicleService :service="service"></VehicleService>
              <EditVehicleServiceForm
                :service="service"
              ></EditVehicleServiceForm>
              <button class="btn" @click="callDeleteService(service)">
                Delete Service
              </button>
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
import Vehicle from "@/components/Vehicle.vue";
import VehicleService from "@/components/VehicleService.vue";
import AddVehicleForm from "@/components/AddVehicleForm.vue";
import AddServiceForm from "@/components/AddServiceForm.vue";
import EditVehicleForm from "@/components/EditVehicleForm.vue";
import EditVehicleServiceForm from "@/components/EditVehicleServiceForm.vue";

export default {
  name: "Home",
  components: {
    Vehicle,
    VehicleService,
    AddVehicleForm,
    AddServiceForm,
    EditVehicleForm,
    EditVehicleServiceForm,
  },
  data() {
    return {
      history: [],
      vehicles: [1],
      services: [],
      showServiceFor: [],
      displayVehicleForm: false,
      displayServiceForm: false,
    };
  },
  mounted() {
    this.initStore();
  },
  watch: {},
  computed: {
    ...mapGetters([
      "GET_CONTRACT_STATE",
      "GET_WALLET_CONNECTION",
      "GET_IS_USER_LOGGED_IN",
      "GET_USER_ACCOUNT_DETAILS",
    ]),
    contractState() {
      return this.GET_CONTRACT_STATE;
    },
  },
  methods: {
    ...mapActions([
      "initStore",
      "signIn",
      "signOut",
      "getContract",
      "deleteVehicle",
      "deleteService",
    ]),
    showBack(index) {
      this.showServiceFor.push(index);
    },
    showFront(index) {
      this.showServiceFor = this.showServiceFor.filter((i) => i !== index);
    },
    isFrontSideShowing(index) {
      return !this.showServiceFor.includes(index);
    },
    getServices(vehicleId) {
      return this.contractState.services.filter((s) => {
        if (s.vehicleId === vehicleId) {
          return s;
        }
      });
    },
    showVehicleForm() {
      this.displayVehicleForm = true;
      this.getContract();
    },
    showServiceForm() {
      this.displayServiceForm = true;
    },
    callDeleteVehicle(vehicle) {
      console.log("delete vehicle", vehicle);
      this.deleteVehicle(vehicle);
    },
    callDeleteService(service) {
      console.log("delete service", service);
      this.deleteService(service);
    },
    signInUsingStore() {
      this.signIn();
    },
    signOutUsingStore() {
      this.signOut();
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

.vehicle-form {
  width: 320px;
  padding: 2px;
  height: 30vh;
  overflow: hidden;
  margin: 10px auto;
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
  outline: 2px solid lightsalmon;
}

.vehicle-form::-webkit-scrollbar {
  display: none; /* Safari and Chrome */
}

.service-form {
  width: 250px;
  padding: 2px;
  height: 180px;
  overflow: hidden;
  /* margin: 0 auto; */
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
  outline: 2px solid lightsalmon;
}

.service-form::-webkit-scrollbar {
  display: none; /* Safari and Chrome */
}

.vehicle-box-container {
  width: 320px;
  padding: 2px;
  height: 60vh;
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
  width: 280px;
  height: 500px;
  overflow: hidden;
  margin: 0px auto;
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
  backface-visibility: hidden;
}

.vehicle-service-container::-webkit-scrollbar {
  display: none; /* Safari and Chrome */
}

.vehicle-box {
  width: 300px;
  height: 500px;
  margin: 10px auto;
  position: relative;
  perspective: 150rem;
  outline: 1px solid #88c0d0;
}

.vehicle-service-box {
  width: 250px;
  height: 300px;
  overflow: hidden;
  margin: 15px auto;
  background: #2e3440;
  backface-visibility: hidden;
  outline: 1px solid #bf616a;
}

.vehicle-box__side {
  top: 0;
  left: 0;
  width: 100%;
  padding: 8px;
  height: 500px;
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

.vehicle-service-ctrls {
  padding: 14px 14px 2px 14px;
}

.user-actions {
  width: 250px;
  padding: 5px;
  margin: 5px auto;
}
</style>
