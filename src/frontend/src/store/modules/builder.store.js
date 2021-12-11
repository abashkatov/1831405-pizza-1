import { SET_ENTITY } from "@/store/mutation-types";
import resources from "@/common/enums/resources";

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
    async fetchDough({ commit, dispatch }) {
      const dough = await this.$api[resources.DOUGH].query();
      const dataDoughs = dough.map((currentDough) => {
        const prepositional = `${currentDough.name
          .toLowerCase()
          .slice(0, -1)}м`;
        const alias = currentDough.image.slice(18, 23);
        return {
          ...currentDough,
          prepositional,
          alias,
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
    async fetchSizes({ commit, dispatch }) {
      const dataSizes = await this.$api[resources.SIZES].query();
      const aliases = ["", "small", "normal", "big"];
      const sizes = dataSizes.map((size) => {
        return {
          ...size,
          alias: aliases[size.id] ?? "big",
        };
      });
      commit(
        SET_ENTITY,
        {
          ...namespaceSizes,
          value: sizes,
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
    async fetchSauces({ commit, dispatch }) {
      const dataSauces = await this.$api[resources.SAUCE].query();
      const sauces = dataSauces.map((sauce) => {
        return {
          ...sauce,
          alias: sauce.id === 1 ? "tomato" : "creamy",
        };
      });
      commit(
        SET_ENTITY,
        {
          ...namespaceSauces,
          value: sauces,
        },
        { root: true }
      );
      dispatch("setSauce", sauces[0]);
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
    async fetchIngredients({ commit }) {
      const ingredients = await this.$api[resources.INGREDIENTS].query();
      const regexp = new RegExp("/public/img/filling/(\\w+)\\.svg");
      const dataIngredients = ingredients.map(function (ingredient) {
        return {
          ...ingredient,
          count: 0,
          alias: regexp.exec(ingredient.image)[1] ?? "",
        };
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
