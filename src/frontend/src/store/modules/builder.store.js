import { dough, ingredients, sauces, sizes } from "@/static/pizza.json";
import { SET_ENTITY } from "@/store/mutation-types";

const module = "Builder";

const entityDoughs = "doughs";
const entitySizes = "sizes";
const entitySauces = "sauces";
const entityIngredients = "ingredients";
const entityId = "id";
const entityCount = "count";

const namespaceDoughs = { entity: entityDoughs, module };
const namespaceSizes = { entity: entitySizes, module };
const namespaceSauces = { entity: entitySauces, module };
const namespaceIngredients = { entity: entityIngredients, module };
const namespaceId = { entity: entityId, module };
const namespaceCount = { entity: entityCount, module };

const entitySelectedDough = "selectedDough";
const entitySelectedSize = "selectedSize";
const entitySelectedSauce = "selectedSauce";
const entityName = "name";

const namespaceSelectedDough = { entity: entitySelectedDough, module };
const namespaceSelectedSize = { entity: entitySelectedSize, module };
const namespaceSelectedSauce = { entity: entitySelectedSauce, module };
const namespaceName = { entity: entityName, module };

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
    name: "",
    id: null,
    count: 1,
  },
  actions: {
    fetch({ dispatch }) {
      dispatch("fetchDough");
      dispatch("fetchSizes");
      dispatch("fetchSauces");
      dispatch("fetchIngredients");
    },
    fetchDough({ commit, dispatch }) {
      const dataDoughs = dough.map((currentDough) => {
        const prepositional = `${currentDough.name
          .toLowerCase()
          .slice(0, -1)}м`;
        return {
          ...currentDough,
          prepositional,
        };
      });
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
    setIngredients({ commit }, ingredients) {
      commit(
        SET_ENTITY,
        {
          ...namespaceIngredients,
          value: ingredients,
        },
        { root: true }
      );
    },
    changeIngredientCount({ state, dispatch }, { itemId, newCount }) {
      const newIngredients = state.ingredients.map(function (ingredient) {
        if (ingredient.id === itemId) {
          ingredient = {
            ...ingredient,
            count: newCount,
          };
        }
        return ingredient;
      });
      dispatch("setIngredients", newIngredients);
    },
    addIngredient({ dispatch }, ingredient) {
      dispatch("changeIngredientCount", {
        itemId: ingredient.id,
        newCount: ingredient.count + 1,
      });
    },
    setName({ commit }, name) {
      commit(
        SET_ENTITY,
        {
          ...namespaceName,
          value: name,
        },
        { root: true }
      );
    },
    setId({ commit }, id) {
      commit(
        SET_ENTITY,
        {
          ...namespaceId,
          value: id,
        },
        { root: true }
      );
    },
    setCount({ commit }, count) {
      commit(
        SET_ENTITY,
        {
          ...namespaceCount,
          value: count,
        },
        { root: true }
      );
    },
    resetSelectedPizza({ state, dispatch }) {
      const newIngredients = state.ingredients.map((ingredient) => {
        return {
          ...ingredient,
          count: 0,
        };
      });
      dispatch("setIngredients", newIngredients);
      dispatch("setName", "");
      dispatch("setDough", state.doughs[0]);
      dispatch("setSize", state.sizes[0]);
      dispatch("setSauce", state.sauces[0]);
      dispatch("setId", null);
      dispatch("setCount", 1);
    },
    setPizza({ dispatch }, pizza) {
      dispatch("setIngredients", pizza.ingredients);
      dispatch("setName", pizza.name);
      dispatch("setDough", pizza.dough);
      dispatch("setSize", pizza.size);
      dispatch("setSauce", pizza.sauce);
      dispatch("setId", pizza.id);
      dispatch("setCount", pizza.count);
    },
  },
};
