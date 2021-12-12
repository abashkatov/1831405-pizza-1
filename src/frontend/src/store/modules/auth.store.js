import user from "@/static/user.json";
import { ADD_ENTITY, SET_ENTITY } from "../mutation-types";
import { uniqueId } from "lodash";

const module = "Auth";

const entityUser = "user";
const namespaceUser = { entity: entityUser, module };

const entityAddresses = "addresses";
const namespaceAddresses = { entity: entityAddresses, module };

export default {
  namespaced: true,
  state: {
    user: null,
    addresses: [],
  },
  actions: {
    fetch({ dispatch }) {
      dispatch("fetchAddresses");
    },
    async fetchUser({ dispatch }) {
      try {
        const data = await this.$api.auth.getMe();
        dispatch("setUser", data);
      } catch {
        dispatch("logout", false);
      }
      dispatch("setUser", user);
    },
    async login({ dispatch }, credentials) {
      const data = await this.$api.auth.login(credentials);
      this.$jwt.saveToken(data.token);
      this.$api.auth.setAuthHeader();
      dispatch("fetchUser");
    },
    async logout({ dispatch }, sendRequest = true) {
      if (sendRequest) {
        await this.$api.auth.logout();
      }
      this.$jwt.destroyToken();
      this.$api.auth.setAuthHeader();
      dispatch("setUser", null);
    },
    fetchAddresses({ dispatch }) {
      const address = {
        id: uniqueId(),
        name: "Мой первый адрес",
        street: "Моя улица",
        building: "333",
        flat: "222",
        comment: "sdfdsf",
      };
      dispatch("addAddress", address);
    },
    setUser({ commit }, user) {
      commit(
        SET_ENTITY,
        {
          ...namespaceUser,
          value: user,
        },
        { root: true }
      );
    },
    setAddresses({ commit }, addresses) {
      commit(
        SET_ENTITY,
        {
          ...namespaceAddresses,
          value: addresses,
        },
        { root: true }
      );
    },
    addAddress({ commit }, address) {
      commit(
        ADD_ENTITY,
        {
          ...namespaceAddresses,
          value: address,
        },
        { root: true }
      );
    },
  },
  getters: {
    isAuthenticated: (state) => state.user !== null,
  },
};
