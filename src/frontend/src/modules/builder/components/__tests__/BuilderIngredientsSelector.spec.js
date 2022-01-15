import { shallowMount } from "@vue/test-utils";
import BuilderIngredientsSelector from "@/modules/builder/components/BuilderIngredientsSelector";
import {
  ingredients as rawIngredients,
  sauces as baseSauces,
} from "@/static/pizza.json";
import { generateMockStore } from "@/store/mock";
import { SET_ENTITY } from "@/store/mutation-types";

const baseIngredients = rawIngredients.map((ingredient) => {
  return {
    ...ingredient,
    count: 1,
  };
});
const loadIngredients = (store, ingredients) => {
  store.commit(SET_ENTITY, {
    module: "Builder",
    entity: "ingredients",
    value: ingredients,
  });
};

const loadSauces = (store, sauces) => {
  store.commit(SET_ENTITY, {
    module: "Builder",
    entity: "sauces",
    value: sauces,
  });
  store.commit(SET_ENTITY, {
    module: "Builder",
    entity: "selectedSauce",
    value: { ...sauces[0] },
  });
};

describe("BuilderIngredientsSelector", () => {
  let store;
  let actions;
  let wrapper;
  const stubs = ["AppDrag", "ItemCounter", "RadioButton"];

  const createComponent = (options) => {
    wrapper = shallowMount(BuilderIngredientsSelector, options);
  };
  beforeEach(() => {
    actions = {
      Builder: {
        setSauce: jest.fn(),
        changeIngredientCount: jest.fn(),
      },
    };
    store = generateMockStore({ actions });
  });
  afterEach(() => {
    wrapper.destroy();
  });

  it("Правильно передаётся выбранный соус", () => {
    loadSauces(store, baseSauces);
    createComponent({ store, stubs });
    expect(
      wrapper.find('[data-test="sauce-radio-button"').attributes("selectedid")
    ).toEqual(baseSauces[0].id.toString());
  });

  it("Отображается правильное количество ингредиентов", () => {
    loadIngredients(store, baseIngredients);
    loadSauces(store, baseSauces);
    createComponent({ store, stubs });
    expect(wrapper.findAll('[data-test="ingredient-li"')).toHaveLength(
      baseIngredients.length
    );
  });
  it("Счетчик ингредиента правильно заполняется", () => {
    const ingredient = baseIngredients[0];
    loadIngredients(store, [ingredient]);
    loadSauces(store, baseSauces);
    createComponent({ store, stubs });
    const ingredientCounter = wrapper.find('[data-test="ingredient-counter"');
    expect(ingredientCounter.exists()).toBeTruthy();
    expect(ingredientCounter.attributes("title")).toEqual(ingredient.name);
    expect(ingredientCounter.attributes("item-id")).toEqual(
      ingredient.id.toString()
    );
    expect(ingredientCounter.attributes("itemcount")).toEqual(
      ingredient.count.toString()
    );
  });
});
