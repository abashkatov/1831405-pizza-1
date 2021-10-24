import { dough, ingredients, sauces, sizes } from "@/static/pizza.json";
import { SET_ENTITY } from "@/store/mutation-types";

const module = "Builder";

const entityDoughs = "doughs";
const entitySizes = "sizes";
const entitySauces = "sauces";
const entityIngredients = "ingredients";

const namespaceDoughs = { entity: entityDoughs, module };
const namespaceSizes = { entity: entitySizes, module };
const namespaceSauces = { entity: entitySauces, module };
const namespaceIngredients = { entity: entityIngredients, module };

const entitySelectedDough = "selectedDough";
const entitySelectedSize = "selectedSize";
// const entitySelectedSauce = "selectedSauce";

const namespaceSelectedDough = { entity: entitySelectedDough, module };
const namespaceSelectedSize = { entity: entitySelectedSize, module };
// const namespaceSelectedSauce = { entity: entitySelectedSauce, module };

export default {
  namespaced: true,
  state: {
    doughs: [],
    sizes: [],
    sauces: [],
    ingredients: [],
    selectedDough: {},
    selectedSize: {},
    selectedSauce: {},
  },
  actions: {
    fetch({ commit, dispatch }) {
      dispatch("fetchDough");
      dispatch("fetchSizes");
      const dataSauces = sauces;
      const dataIngredients = ingredients.map(function (ingredient) {
        return { ...ingredient, count: 0 };
      });
      commit(
        SET_ENTITY,
        {
          ...namespaceSauces,
          value: dataSauces,
        },
        { root: true }
      );
      commit(
        SET_ENTITY,
        {
          ...namespaceIngredients,
          value: dataIngredients,
        },
        { root: true }
      );
    },
    fetchDough({ commit }) {
      const dataDoughs = dough;
      commit(
        SET_ENTITY,
        {
          ...namespaceDoughs,
          value: dataDoughs,
        },
        { root: true }
      );
      commit(
        SET_ENTITY,
        {
          ...namespaceSelectedDough,
          value: dataDoughs[0],
        },
        { root: true }
      );
    },
    setDough({ commit }, dough) {
      commit(
        SET_ENTITY,
        {
          ...namespaceSelectedDough,
          value: dough,
        },
        { root: true }
      );
    },
    fetchSizes({ commit }) {
      const dataSizes = sizes;
      commit(
        SET_ENTITY,
        {
          ...namespaceSizes,
          value: dataSizes,
        },
        { root: true }
      );
      commit(
        SET_ENTITY,
        {
          ...namespaceSelectedSize,
          value: dataSizes[0],
        },
        { root: true }
      );
    },
    setSize({ commit }, size) {
      commit(
        SET_ENTITY,
        {
          ...namespaceSelectedSize,
          value: size,
        },
        { root: true }
      );
    },
  },
};
