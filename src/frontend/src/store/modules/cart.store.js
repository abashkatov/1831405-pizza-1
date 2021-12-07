import { DELIVERY_TYPE_SELF } from "@/common/constants.js";
import {
  ADD_ENTITY,
  DELETE_ENTITY,
  SET_ENTITY,
  UPDATE_ENTITY,
} from "../mutation-types";
import { uniqueId } from "lodash";

const module = "Cart";

const entityPizzas = "pizzas";
const namespacePizzas = { entity: entityPizzas, module };

const entityDeliveryType = "deliveryType";
const namespaceDeliveryType = { entity: entityDeliveryType, module };

const entityPhone = "phone";
const namespacePhone = { entity: entityPhone, module };

const entityAddress = "address";
const namespaceAddress = { entity: entityAddress, module };

const newAddress = {
  id: null,
  name: "Новый адрес",
  street: "",
  house: "",
  apartment: "",
};

export default {
  namespaced: true,
  state: {
    pizzas: [],
    deliveryType: DELIVERY_TYPE_SELF,
    phone: "",
    address: newAddress,
  },
  actions: {
    resetAddress({ dispatch }) {
      dispatch("setAddress", newAddress);
    },
    setAddress({ commit }, address) {
      commit(
        SET_ENTITY,
        {
          ...namespaceAddress,
          value: address,
        },
        { root: true }
      );
    },
    addPizza({ commit }, pizza) {
      commit(
        ADD_ENTITY,
        {
          ...namespacePizzas,
          value: {
            ...pizza,
            id: pizza.id || uniqueId(),
          },
        },
        { root: true }
      );
    },
    setPizzas({ commit }, pizzas) {
      commit(
        SET_ENTITY,
        {
          ...namespacePizzas,
          value: pizzas,
        },
        { root: true }
      );
    },
    setDeliveryType({ commit }, deliveryType) {
      commit(
        SET_ENTITY,
        {
          ...namespaceDeliveryType,
          value: deliveryType,
        },
        { root: true }
      );
    },
    setPhone({ commit }, phone) {
      commit(
        SET_ENTITY,
        {
          ...namespacePhone,
          value: phone,
        },
        { root: true }
      );
    },
    updatePizza({ commit }, pizza) {
      commit(
        UPDATE_ENTITY,
        {
          ...namespacePizzas,
          value: pizza,
        },
        { root: true }
      );
    },
    changePizzasCount({ commit, state, dispatch }, { itemId, newCount }) {
      if (newCount <= 0) {
        commit(
          DELETE_ENTITY,
          {
            ...namespacePizzas,
            id: state.pizzas[itemId].id,
          },
          { root: true }
        );
        return;
      }
      const newPizzas = state.pizzas.map(function (pizza) {
        const newPizza = { ...pizza };
        if (itemId === pizza.id) {
          newPizza.count = newCount;
        }
        return newPizza;
      });
      dispatch("setPizzas", newPizzas);
    },
    makeOrder({ dispatch }) {
      dispatch("resetAddress");
      dispatch("setDeliveryType", DELIVERY_TYPE_SELF);
      dispatch("setPhone", "");
      dispatch("setPizzas", []);
      dispatch("Builder/resetSelectedPizza", null, { root: true });
      dispatch("Goods/resetProducts", null, { root: true });
    },
  },
  getters: {
    getPizzasCost(state) {
      return state.pizzas.reduce((prevCost, pizza) => {
        const ingredientsCost = pizza.ingredients.reduce(
          (prev, cur) => prev + cur.price * cur.count,
          0
        );
        return (
          prevCost +
          pizza.size.multiplier *
            pizza.count *
            (pizza.dough.price + pizza.sauce.price + ingredientsCost)
        );
      }, 0);
    },
  },
};
