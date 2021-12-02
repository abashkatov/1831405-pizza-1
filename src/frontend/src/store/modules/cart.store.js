import { DELIVERY_TYPE_SELF } from "@/common/constants.js";
import { ADD_ENTITY, DELETE_ENTITY, SET_ENTITY } from "../mutation-types";
import { uniqueId } from "lodash";

const module = "Cart";

const entityPizzas = "pizzas";
const namespacePizzas = { entity: entityPizzas, module };

export default {
  namespaced: true,
  state: {
    pizzas: [],
    deliveryType: DELIVERY_TYPE_SELF,
    phone: "",
    address: {
      street: "",
      house: "",
      flat: "",
    },
  },
  actions: {
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
        return { ...pizza };
      });
      newPizzas[itemId].count = newCount;
      dispatch("setPizzas", newPizzas);
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
