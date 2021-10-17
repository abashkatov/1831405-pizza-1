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
    fetch({ commit }) {
      const dataDoughs = dough;
      const dataSizes = sizes;
      const dataSauces = sauces;
      const dataIngredients = ingredients.map(function (ingredient) {
        return { ...ingredient, count: 0 };
      });
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
          ...namespaceSizes,
          value: dataSizes,
        },
        { root: true }
      );
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
  },
};
