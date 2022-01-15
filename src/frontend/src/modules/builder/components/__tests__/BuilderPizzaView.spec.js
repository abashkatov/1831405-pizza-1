import { shallowMount } from "@vue/test-utils";
import BuilderPizzaView from "@/modules/builder/components/BuilderPizzaView";
import {
  ingredients as rawIngredients,
  sauces as baseSauces,
  dough as baseDough,
} from "@/static/pizza.json";
import { generateMockStore } from "@/store/mock";
import { SET_ENTITY } from "@/store/mutation-types";

const baseIngredients = (() => {
  let count = 3;
  return rawIngredients.map((ingredient) => {
    return {
      ...ingredient,
      count: count > 0 ? count-- : 0,
    };
  });
})();

const loadIngredients = (store, ingredients) => {
  store.commit(SET_ENTITY, {
    module: "Builder",
    entity: "ingredients",
    value: ingredients,
  });
};

const loadSauce = (store, sauce) => {
  store.commit(SET_ENTITY, {
    module: "Builder",
    entity: "selectedSauce",
    value: { ...sauce },
  });
};

const loadDough = (store, dough) => {
  store.commit(SET_ENTITY, {
    module: "Builder",
    entity: "selectedDough",
    value: { ...dough },
  });
};

describe("BuilderPizzaView", () => {
  const stubs = ["AppDrop"];
  let store;
  let wrapper;
  const createComponent = (options) => {
    wrapper = shallowMount(BuilderPizzaView, options);
  };
  beforeEach(() => {
    store = generateMockStore({});
  });
  afterEach(() => {
    wrapper.destroy();
  });

  const pizzaClassDataProvider = [
    { doughIndex: 0, sauceIndex: 0 },
    { doughIndex: 0, sauceIndex: 1 },
    { doughIndex: 1, sauceIndex: 0 },
    { doughIndex: 1, sauceIndex: 1 },
  ];
  it.each(pizzaClassDataProvider)(
    "Верный класс у пиццы",
    ({ doughIndex, sauceIndex }) => {
      loadDough(store, baseDough[doughIndex]);
      loadSauce(store, baseSauces[sauceIndex]);
      createComponent({ store, stubs });
      const doughSize =
        baseDough[doughIndex].alias === "light" ? "small" : "big";
      expect(
        wrapper.find('[data-test="pizza-outer"').attributes("class")
      ).toContain(
        `pizza--foundation--${doughSize}-${baseSauces[sauceIndex].alias}`
      );
    }
  );
  it("Учитывается правильное количество ингредиентов на пицце", () => {
    loadIngredients(store, baseIngredients);
    createComponent({ store, stubs });
    expect(wrapper.findAll('[data-test="ingredient"]')).toHaveLength(6);

    expect(
      wrapper.findAll('.pizza__filling--second[data-test="ingredient"]')
    ).toHaveLength(2);
    expect(
      wrapper.findAll('.pizza__filling--third[data-test="ingredient"]')
    ).toHaveLength(1);

    expect(
      wrapper.findAll('.pizza__filling--mushrooms[data-test="ingredient"]')
    ).toHaveLength(3);
    expect(
      wrapper.findAll('.pizza__filling--cheddar[data-test="ingredient"]')
    ).toHaveLength(2);
    expect(
      wrapper.findAll('.pizza__filling--salami[data-test="ingredient"]')
    ).toHaveLength(1);
  });
});
