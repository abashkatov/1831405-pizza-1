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
      dispatch("fetchUser");
      dispatch("fetchAddresses");
    },
    fetchUser({ dispatch }) {
      dispatch("setUser", user);
    },
    fetchAddresses({ dispatch }) {
      const address = {
        id: uniqueId(),
        name: "Мой первый адрес",
        street: "Моя улица",
        house: "333",
        apartment: "222",
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
};
