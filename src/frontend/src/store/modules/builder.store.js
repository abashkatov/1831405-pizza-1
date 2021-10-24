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
const entitySelectedSauce = "selectedSauce";

const namespaceSelectedDough = { entity: entitySelectedDough, module };
const namespaceSelectedSize = { entity: entitySelectedSize, module };
const namespaceSelectedSauce = { entity: entitySelectedSauce, module };

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
    fetch({ dispatch }) {
      dispatch("fetchDough");
      dispatch("fetchSizes");
      dispatch("fetchSauces");
      dispatch("fetchIngredients");
    },
    fetchDough({ commit, dispatch }) {
      const dataDoughs = dough;
      commit(
        SET_ENTITY,
        {
          ...namespaceDoughs,
          value: dataDoughs,
        },
        { root: true }
      );
      dispatch("setDough", dataDoughs[0]);
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
    fetchSizes({ commit, dispatch }) {
      const dataSizes = sizes;
      commit(
        SET_ENTITY,
        {
          ...namespaceSizes,
          value: dataSizes,
        },
        { root: true }
      );
      dispatch("setSize", dataSizes[0]);
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
    fetchSauces({ commit, dispatch }) {
      const dataSauces = sauces;
      commit(
        SET_ENTITY,
        {
          ...namespaceSauces,
          value: dataSauces,
        },
        { root: true }
      );
      dispatch("setSauce", dataSauces[0]);
    },
    setSauce({ commit }, sauce) {
      commit(
        SET_ENTITY,
        {
          ...namespaceSelectedSauce,
          value: sauce,
        },
        { root: true }
      );
    },
    fetchIngredients({ commit }) {
      const dataIngredients = ingredients.map(function (ingredient) {
        return { ...ingredient, count: 0 };
      });
      commit(
        SET_ENTITY,
        {
          ...namespaceIngredients,
          value: dataIngredients,
        },
        { root: true }
      );
    },
    changeIngredientCount({ state, commit }, { itemId, newCount }) {
      const newIngredients = state.ingredients.map(function (ingredient) {
        if (ingredient.id === itemId) {
          ingredient.count = newCount;
        }
        return ingredient;
      });

      commit(
        SET_ENTITY,
        {
          ...namespaceIngredients,
          value: newIngredients,
        },
        { root: true }
      );
    },
    addIngredient({ dispatch }, ingredient) {
      dispatch("changeIngredientCount", {
        itemId: ingredient.id,
        newCount: ingredient.count + 1,
      });
    },
  },
};
