import { shallowMount } from "@vue/test-utils";
import BuilderPriceCounter from "@/modules/builder/components/BuilderPriceCounter";
import { generateMockStore } from "@/store/mock";
import { SET_ENTITY } from "@/store/mutation-types";

const pizzaWithIngredients = {
  ingredients: [
    {
      count: 1,
      price: 100,
    },
  ],
  selectedDough: {
    price: 30,
  },
  selectedSize: {
    multiplier: 2,
  },
  selectedSauce: {
    price: 3,
  },
};
const pizzaWithoutIngredients = {
  ingredients: [
    {
      count: 0,
      price: 100,
    },
  ],
  selectedDough: {
    price: 20,
  },
  selectedSize: {
    multiplier: 4,
  },
  selectedSauce: {
    price: 2,
  },
};

const loadPizza = (
  store,
  { id, ingredients, selectedDough, selectedSize, selectedSauce, name, count }
) => {
  if (id) {
    store.commit(SET_ENTITY, {
      module: "Builder",
      entity: "id",
      value: id,
    });
  }
  store.commit(SET_ENTITY, {
    module: "Builder",
    entity: "ingredients",
    value: ingredients,
  });
  store.commit(SET_ENTITY, {
    module: "Builder",
    entity: "selectedDough",
    value: selectedDough,
  });
  store.commit(SET_ENTITY, {
    module: "Builder",
    entity: "selectedSize",
    value: selectedSize,
  });
  store.commit(SET_ENTITY, {
    module: "Builder",
    entity: "selectedSauce",
    value: selectedSauce,
  });
  if (name) {
    store.commit(SET_ENTITY, {
      module: "Builder",
      entity: "name",
      value: name,
    });
  }
  if (count) {
    store.commit(SET_ENTITY, {
      module: "Builder",
      entity: "count",
      value: count,
    });
  }
};

describe("BuilderPriceCounter", () => {
  let wrapper;
  let store;
  let actions;

  const createComponent = (options) => {
    wrapper = shallowMount(BuilderPriceCounter, options);
  };
  beforeEach(() => {
    actions = {
      Builder: {
        resetSelectedPizza: jest.fn(),
      },
      Cart: {
        addPizza: jest.fn(),
        updatePizza: jest.fn(),
      },
    };
    store = generateMockStore({ actions });
  });
  afterEach(() => {
    wrapper.destroy();
  });

  const priceCalculatorDataProvider = [
    { data: pizzaWithIngredients, expectedPrice: " 266 ₽" },
    { data: pizzaWithoutIngredients, expectedPrice: " 88 ₽" },
  ];
  it.each(priceCalculatorDataProvider)(
    "Верно считается итоговая стоимость",
    ({ data, expectedPrice }) => {
      loadPizza(store, data);
      createComponent({ store });
      expect(wrapper.find('[data-test="price"]').text()).toContain(
        expectedPrice
      );
    }
  );

  const blockedButtonDataProvider = [
    { data: pizzaWithIngredients, name: "", isButtonBlocked: true },
    { data: pizzaWithIngredients, name: "mi", isButtonBlocked: true },
    { data: pizzaWithIngredients, name: "Exist", isButtonBlocked: false },
    { data: pizzaWithoutIngredients, name: "", isButtonBlocked: true },
    { data: pizzaWithoutIngredients, name: "mi", isButtonBlocked: true },
    { data: pizzaWithoutIngredients, name: "Exist", isButtonBlocked: true },
  ];
  it.each(blockedButtonDataProvider)(
    "Верно блокируется кнопка",
    ({ data, name, isButtonBlocked }) => {
      loadPizza(store, {
        ...data,
        name,
      });
      createComponent({ store });
      const button = wrapper.find('[data-test="buttonAddToCart"]');
      if (isButtonBlocked) {
        expect(button.attributes("disabled")).toBeDefined();
        expect(button.attributes("class")).toContain("button--disabled");
      } else {
        expect(button.attributes("disabled")).not.toBeDefined();
        expect(button.attributes("class")).not.toContain("button--disabled");
      }
    }
  );

  // it("Вызывается метод обновления пиццы, если редактируется пицца из корзины", async () => {
  //   loadPizza(store, pizzaWithIngredients);
  //   createComponent({ store, localVue });
  //   const button = wrapper.find('[data-test="buttonAddToCart"]');
  //   console.log(button.html());
  //   await button.trigger("click");
  //   expect(actions.Builder.resetSelectedPizza).toHaveBeenCalled();
  //   expect(actions.Cart.addPizza).not.toHaveBeenCalled();
  //   expect(actions.Cart.updatePizza).toHaveBeenCalled();
  // });

  // it("Вызывается метод добавления пиццы, если пицца новая", async () => {
  //   loadPizza(store, {
  //     ...pizzaWithIngredients,
  //     id: 1,
  //   });
  //   createComponent({ store });
  //   const button = wrapper.find('[data-test="buttonAddToCart"]');
  //   await button.trigger("click");
  //   expect(actions.Builder.resetSelectedPizza).toHaveBeenCalled();
  //   expect(actions.Cart.addPizza).toHaveBeenCalled();
  //   expect(actions.Cart.updatePizza).not.toHaveBeenCalled();
  // });
});
