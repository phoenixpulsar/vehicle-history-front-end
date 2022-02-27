import { createStore } from "vuex";
import getConfig from "../config";
import * as nearAPI from "near-api-js";

export default createStore({
  state: {
    nearConfig: null,
    accountState: {
      vehicles: [],
      services: [],
    },
    nearConnection: null,
    accountDetails: null,
    isUserLoggedIn: false,
    walletConnection: null,
    contract: null,
    account: null,
  },
  mutations: {
    SET_NEAR_CONNECTION: (state, nearConnection) => {
      state.nearConnection = nearConnection;
    },
    SET_ACCOUNT_STATE: (state, accountState) => {
      state.accountState = accountState;
    },
    SET_NEAR_CONFIG: (state, nearConfig) => {
      state.nearConfig = nearConfig;
    },
    SET_WALLET_CONNECTION: (state, walletConnection) => {
      state.walletConnection = walletConnection;
    },
    SET_CONTRACT: (state, contract) => {
      state.contract = contract;
    },
    SET_ACCOUNT: (state, account) => {
      state.account = account;
    },
  },
  getters: {
    GET_CONTRACT_STATE: (state) => {
      return state.accountState;
    },
    GET_WALLET_CONNECTION: (state) => {
      return state.walletConnection;
    },
    GET_IS_USER_LOGGED_IN: (state) => {
      return state.isUserLoggedIn;
    },
    GET_USER_ACCOUNT_DETAILS: (state) => {
      return state.accountDetails;
    },
    GET_CONTRACT: (state) => {
      return state.contract;
    },
    GET_ACCOUNT: (state) => {
      return state.account;
    },
  },
  actions: {
    _setConfig: ({ commit }) => {
      try {
        let config = getConfig(process.env.NODE_ENV || "development");
        let nearConfig = {
          ...config,
          keyStore: new nearAPI.keyStores.BrowserLocalStorageKeyStore(),
          // deps: {
          //   keyStore: new nearAPI.keyStores.BrowserLocalStorageKeyStore(),
          // },
        };
        commit("SET_NEAR_CONFIG", nearConfig);
      } catch (error) {
        console.error("Error setting NEAR Config", error);
      }
    },
    _connectToNear: async ({ commit, state }) => {
      try {
        let nearConnection = await nearAPI.connect(state.nearConfig);
        commit("SET_NEAR_CONNECTION", nearConnection);
      } catch (error) {
        console.error("Error connecting to NEAR", error);
      }
    },
    _connectToWallet: ({ commit, state }) => {
      try {
        const wallet = new nearAPI.WalletConnection(state.nearConnection);
        commit("SET_WALLET_CONNECTION", wallet);
      } catch (error) {
        console.error("Error connecting to NEAR wallet");
      }
    },
    _fetchState: async ({ commit, state }) => {
      try {
        // Fetch State
        const response = await state.nearConnection.connection.provider.query({
          prefix_base64: "",
          finality: "final",
          account_id: state.nearConfig.contractName,
          request_type: "view_state",
        });

        // Decode
        let storage = {};
        response.values.forEach((v) => {
          let decodedKey = atob(v.key);
          let decodedVal = atob(v.value);
          storage[decodedKey] = JSON.parse(decodedVal);
        });

        // Data Structures
        let vehicles = [];
        let services = [];

        // Populate Data Structures
        for (const [key, value] of Object.entries(storage)) {
          if (key.startsWith("v:")) {
            let vehicleToAdd = {
              fullid: key,
              ...value,
            };
            vehicles.push(vehicleToAdd);
          }
          if (key.startsWith("vs:")) {
            let serviceToAdd = {
              fullid: key,
              ...value,
            };
            services.push(serviceToAdd);
          }
        }

        // Create object to store
        let accountState = {
          vehicles: vehicles,
          services: services,
        };

        // Update Vuex State
        commit("SET_ACCOUNT_STATE", accountState);
      } catch (error) {
        console.error("Error connecting to NEAR", error);
      }
    },
    getContract: async ({ commit, state }) => {
      let contract = new nearAPI.Contract(
        state.accountDetails, // the account object that is connecting
        "dev-1643565458345-58299177709187",
        {
          // name of contract you're connecting to
          viewMethods: [], // view methods do not change state but usually return a value
          changeMethods: ["addVehicle", "addService"], // change methods modify state
          sender: state.account, // account object to initialize and sign transactions.
        }
      );
      console.log("setting contract", contract);
      commit("SET_CONTRACT", contract);
    },
    _getAccount: async ({ commit, state }) => {
      // looks like we don't need this since we already got the account details when
      // user logged in
      let account = await state.nearConnection.account("macedo.testnet");
      console.log("setting account", account);
      console.log("state account", state.accountDetails);
      commit("SET_ACCOUNT", account);
    },
    addVehicle: async ({ state, dispatch }, vehicleToAdd) => {
      await state.contract.addVehicle({
        year: vehicleToAdd.year,
        make: vehicleToAdd.make,
        model: vehicleToAdd.model,
        owner: vehicleToAdd.owner,
        dateAcquired: vehicleToAdd.dateAcquired,
        vehicleNotes: vehicleToAdd.vehicleNotes,
      });

      dispatch("_fetchState");
    },
    getAccountDetails: async ({ state }) => {
      state.accountDetails = await state.walletConnection.account();
    },
    signIn: ({ state }) => {
      // redirects user to wallet to authorize your dApp
      // this creates an access key that will be stored in the browser's local storage
      // access key can then be used to connect to NEAR and sign transactions via keyStore
      state.walletConnection.requestSignIn(
        "dev-1643565458345-58299177709187", // contract requesting access
        "Vehicle History" // optional
        // "http://YOUR-URL.com/success", // optional
        // "http://YOUR-URL.com/failure" // optional
      );
    },
    signOut: ({ state }) => {
      state.walletConnection.signOut();
      state.isUserLoggedIn = false;
      state.accountDetails = false;
    },
    checkIfUserLoggedIn: ({ state, dispatch }) => {
      if (!state.walletConnection.getAccountId()) {
        state.isUserLoggedIn = false;
      } else {
        state.isUserLoggedIn = true;
        dispatch("getAccountDetails");
      }
    },
    initStore: async ({ dispatch }) => {
      console.log("Init Store In progres...");
      dispatch("_setConfig");
      await dispatch("_connectToNear");
      await dispatch("_fetchState");
      dispatch("_connectToWallet");
      dispatch("checkIfUserLoggedIn");
    },
  },
  modules: {},
});
