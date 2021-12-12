import {
  ADD_ENTITY,
  DELETE_ENTITY,
  SET_ENTITY,
  UPDATE_ENTITY,
} from "../mutation-types";

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
        const user = {
          ...data,
          avatar: data.avatar.slice(0, -4),
        };
        dispatch("setUser", user);
      } catch {
        dispatch("logout", false);
      }
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
    async fetchAddresses({ dispatch }) {
      const addresses = await this.$api.addresses.query();
      dispatch("setAddresses", addresses);
    },
    async updateAddress({ commit }, address) {
      await this.$api.addresses.put(address);
      commit(
        UPDATE_ENTITY,
        {
          ...namespaceAddresses,
          value: address,
        },
        { root: true }
      );
    },
    async deleteAddress({ commit }, id) {
      await this.$api.addresses.delete(id);
      commit(
        DELETE_ENTITY,
        {
          ...namespaceAddresses,
          id,
        },
        { root: true }
      );
    },
    async addAddress({ commit }, address) {
      const newAddress = await this.$api.addresses.post(address);
      commit(
        ADD_ENTITY,
        {
          ...namespaceAddresses,
          value: newAddress,
        },
        { root: true }
      );
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
  },
  getters: {
    isAuthenticated: (state) => state.user !== null,
  },
};
