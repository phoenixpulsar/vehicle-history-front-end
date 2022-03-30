<template>
  <div class="history">
    <div class="welcome" v-if="!GET_IS_USER_LOGGED_IN">
      <Welcome></Welcome>
      <div class="user-actions">
        <button class="btn" @click="signInUsingStore()">
          Sign In with NEAR Wallet
        </button>
      </div>
    </div>
    <div class="user-logged-in" v-if="GET_IS_USER_LOGGED_IN">
      <h1 class="header">Vehicles on the Block</h1>
      <div class="welcomeNlogo user-actions">
        <div class="welcome-user">
          <fa icon="user" />
          <span class="user-val">
            {{ GET_USER_ACCOUNT_DETAILS?.accountId }}</span
          >
        </div>

        <div class="sign-out-user" role="button" @click="signOutUsingStore()">
          <fa icon="arrow-right-from-bracket" />

          <span>Sign Out</span>
        </div>
      </div>

      <ActionMessage v-if="showMessage" @closeMssg="closeMssg"></ActionMessage>

      <div
        class="my-vehicles-header"
        v-if="vehicleBeingEditId === null && !displayVehicleForm"
      >
        <h2 class="vehicles-header">Vehicles</h2>

        <!-- <div class="search-icon-container">
          <fa icon="search" class="search-icon" />
        </div>
        <input type="text" class="search-input" placeholder="Search Vehicles" /> -->
      </div>

      <div
        v-if="
          GET_IS_USER_LOGGED_IN &&
          GET_USER_ACCOUNT_DETAILS?.accountId === 'phoenixpulsar.testnet'
        "
        class="user-actions"
      >
        <button
          v-if="vehicleBeingEditId === null && !displayVehicleForm"
          class="btn"
          @click="showVehicleForm()"
        >
          Add Vehicle
        </button>
      </div>

      <div v-if="displayVehicleForm" class="vehicle-form">
        <AddVehicleForm @closeAddVehicleForm="closeAddVehicleForm" />
      </div>

      <div class="vehicle-box-container" v-if="!displayVehicleForm">
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
            <Vehicle
              v-if="vehicleBeingEditId === null"
              :vehicle="vehicle"
            ></Vehicle>

            <EditVehicleForm
              @closeEditVehicle="closeEditVehicle"
              v-if="vehicle.id === vehicleBeingEditId"
              :vehicle="vehicle"
            ></EditVehicleForm>

            <div
              class="vehicle-ctrls"
              v-if="
                vehicleBeingEditId === null || vehicleBeingEditId === vehicle.id
              "
            >
              <div class="left-ctrl" role="button" @click="showBack(index)">
                <fa icon="gear" />
                <br />
                <span>Services</span>
              </div>
              <div
                class="middle-ctrl"
                role="button"
                @click="openVehicleEditForm(vehicle)"
              >
                <fa icon="edit" />
                <br />
                <span>Edit</span>
              </div>
              <div
                class="right-ctrl"
                role="button"
                @click="callDeleteVehicle(vehicle)"
              >
                <fa icon="trash" />
                <br />
                <span>Delete</span>
              </div>
            </div>
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
                <div v-if="false">
                  <EditVehicleServiceForm
                    v-if="false === false"
                    :service="service"
                  ></EditVehicleServiceForm>
                </div>
                <button class="btn" @click="callDeleteService(service)">
                  Delete Service
                </button>
              </div>
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
import Welcome from "@/components/Welcome.vue";
import ActionMessage from "@/components/ActionMessage.vue";

export default {
  name: "Home",
  components: {
    Vehicle,
    VehicleService,
    AddVehicleForm,
    AddServiceForm,
    EditVehicleForm,
    EditVehicleServiceForm,
    Welcome,
    ActionMessage,
  },
  data() {
    return {
      history: [],
      vehicles: [1],
      services: [],
      showServiceFor: [],
      displayVehicleForm: false,
      displayServiceForm: false,
      vehicleBeingEditId: null,
      showMessage: false,
      showMessageText: null,
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
    showMessagefn(mssg = "") {
      this.showMessage = true;
      this.showMessageText = mssg;
    },
    closeMssg() {
      this.showMessage = false;
      this.showMessageText = null;
    },
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
    openVehicleEditForm(vehicle) {
      this.vehicleBeingEditId = vehicle.id;
    },
    closeEditVehicle() {
      this.vehicleBeingEditId = null;
    },
    closeAddVehicleForm() {
      this.displayVehicleForm = false;
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
  overflow: hidden;
  margin: 10px auto;
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
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
}

.vehicle-box-container::-webkit-scrollbar {
  display: none; /* Safari and Chrome */
}

.vehicle-service-container {
  width: 280px;
  height: 260px;
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
  height: 260px;
  /* height: 500px; */
  margin: 10px auto;
  position: relative;
  perspective: 150rem;
}

.vehicle-service-box {
  width: 250px;
  height: 260px;
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
  /* height: 500px; */
  overflow: hidden;
  position: absolute;
  transition: all 0.8s;
  backface-visibility: hidden;
}

.vehicle-box__side--front-intial {
  /* background: #4c566a; */
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

.my-vehicles-header {
  display: grid;
  grid-template:
    "vheading vheading"
    "srchiconcontainer   srchinput"
    /30px 1fr;
  width: 300px;
  margin: 0 auto;
}

.vehicles-header {
  grid-template: vheading;
  text-align: left;
  color: white;
  font-weight: bold;
}

.search-icon-container {
  grid-area: srchiconcontainer;
  display: grid;
  place-items: center;
}

.search-icon {
  margin-right: 10px;
}

.search-input {
  grid-area: srchinput;
}

input[type="text"] {
  width: 100%;
  background: #2e3440;
  color: white;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #88c0d0;
  border-radius: 4px;
  box-sizing: border-box;
}

.vehicle-ctrls {
  display: grid;
  place-items: center;
  grid-template: "leftctrl middlectrl rightctrl";
  margin-top: 15px;
}

.left-ctrl {
  grid-area: leftctrl;
  text-align: center;
  cursor: pointer;
}

.middle-ctrl {
  grid-area: middlectrl;
  text-align: center;
  cursor: pointer;
}

.right-ctrl {
  grid-area: rightctrl;
  text-align: center;
  cursor: pointer;
}

.welcomeNlogo {
  width: 300px;
  display: grid;
  grid-template: "welcomeuser signoutuser";
}

.welcome-user {
  grid-area: welcomeuser;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.sign-out-user {
  display: grid;
  place-items: center;
  grid-area: signoutuser;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  cursor: pointer;
}

.user-val {
  color: #ebcb8b;
  margin-left: 5px;
}
</style>
