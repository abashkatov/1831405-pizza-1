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
const expectedPizza = {
  ingredients: pizzaWithIngredients.ingredients,
  dough: pizzaWithIngredients.selectedDough,
  size: pizzaWithIngredients.selectedSize,
  sauce: pizzaWithIngredients.selectedSauce,
  name: "Pizza Name",
  count: 1,
  price: 266,
  id: null,
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
    {
      caption: "Заблокирована из-за отсутствия названия",
      data: pizzaWithIngredients,
      name: "",
      isButtonBlocked: true,
    },
    {
      caption: "Заблокирована из-за короткого названия",
      data: pizzaWithIngredients,
      name: "mi",
      isButtonBlocked: true,
    },
    {
      caption: "Разблокирована ",
      data: pizzaWithIngredients,
      name: "Exist",
      isButtonBlocked: false,
    },
    {
      caption:
        "Заблокирована из-за отсутствия названия и отсутствия ингредиентов ",
      data: pizzaWithoutIngredients,
      name: "",
      isButtonBlocked: true,
    },
    {
      caption:
        "Заблокирована из-за короткого названия и отсутствия ингредиентов ",
      data: pizzaWithoutIngredients,
      name: "mi",
      isButtonBlocked: true,
    },
    {
      caption: "Заблокирована из-за отсутствия ингредиентов",
      data: pizzaWithoutIngredients,
      name: "Exist",
      isButtonBlocked: true,
    },
  ];
  describe.each(blockedButtonDataProvider)(
    "Верно блокируется кнопка",
    ({ caption, data, name, isButtonBlocked }) => {
      if (isButtonBlocked) {
        it(caption, () => {
          loadPizza(store, {
            ...data,
            name,
          });
          createComponent({ store });
          const button = wrapper.find('[data-test="buttonAddToCart"]');
          expect(button.attributes("disabled")).toBeDefined();
          expect(button.classes()).toContain("button--disabled");
        });
      } else {
        it(caption, () => {
          loadPizza(store, {
            ...data,
            name,
          });
          createComponent({ store });
          const button = wrapper.find('[data-test="buttonAddToCart"]');
          expect(button.attributes("disabled")).not.toBeDefined();
          expect(button.classes()).not.toContain("button--disabled");
        });
      }
    }
  );

  it("Вызывается метод обновления пиццы, если редактируется пицца из корзины", async () => {
    const pizza = {
      ...pizzaWithIngredients,
      name: expectedPizza.name,
    };
    loadPizza(store, pizza);
    createComponent({ store });
    const button = wrapper.find('[data-test="buttonAddToCart"]');
    await button.trigger("click");
    expect(actions.Builder.resetSelectedPizza).toHaveBeenCalled();
    expect(actions.Cart.addPizza).toHaveBeenCalledWith(
      expect.anything(),
      expectedPizza
    );
    expect(actions.Cart.updatePizza).not.toHaveBeenCalled();
  });

  it("Вызывается метод добавления пиццы, если пицца новая", async () => {
    const pizza = {
      ...pizzaWithIngredients,
      id: 1,
      name: expectedPizza.name,
    };
    loadPizza(store, pizza);
    createComponent({ store });
    const button = wrapper.find('[data-test="buttonAddToCart"]');
    await button.trigger("click");
    expect(actions.Builder.resetSelectedPizza).toHaveBeenCalled();
    expect(actions.Cart.addPizza).not.toHaveBeenCalled();
    expect(actions.Cart.updatePizza).toHaveBeenCalledWith(expect.anything(), {
      ...expectedPizza,
      id: 1,
    });
  });
});
