import { createStore } from "vuex";
import getConfig from "../config";
import * as nearAPI from "near-api-js";

export default createStore({
  state: {
    nearConfig: null,
    accountState: null,
    nearConnection: null,
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
  },
  actions: {
    _setConfig: ({ commit }) => {
      try {
        let config = getConfig(process.env.NODE_ENV || "development");
        let nearConfig = {
          ...config,
          deps: {
            keyStore: new nearAPI.keyStores.BrowserLocalStorageKeyStore(),
          },
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
    _fetchStorage: async ({ commit, state }) => {
      try {
        const response = await state.nearConnection.connection.provider.query({
          prefix_base64: "",
          finality: "final",
          account_id: state.nearConfig.contractName,
          request_type: "view_state",
        });
        let storage = {};
        response.values.forEach((v) => {
          let decodedKey = atob(v.key);
          let decodedVal = atob(v.value);
          storage[decodedKey] = JSON.parse(decodedVal);
        });
        commit("SET_ACCOUNT_STATE", storage);
      } catch (error) {
        console.error("Error connecting to NEAR", error);
      }
    },
    initStore: async ({ dispatch }) => {
      console.log("Init Store In progres...");
      dispatch("_setConfig");
      await dispatch("_connectToNear");
      await dispatch("_fetchStorage");
    },
  },
  modules: {},
});
