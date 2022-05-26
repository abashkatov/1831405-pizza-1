import { shallowMount } from "@vue/test-utils";
import PizzaRow from "@/modules/cart/components/PizzaRow";
import { generateMockStore } from "@/store/mock";

describe("PizzaRow", () => {
  let store;
  let wrapper;
  let actions;
  let propsData;
  let getPropsData = () => {
    return {
      pizza: {
        id: 222,
        name: "pizzaName",
        count: 2,
        price: 100,
        size: {
          name: "sizeName",
        },
        dough: {
          prepositional: "doughPrepositional",
        },
        sauce: {
          name: "SauceName",
        },
        ingredients: [
          {
            count: 0,
            name: "not expected",
          },
          {
            count: 1,
            name: "expected 1",
          },
          {
            count: 2,
            name: "expected 2",
          },
        ],
      },
    };
  };

  const createComponent = (options) => {
    wrapper = shallowMount(PizzaRow, options);
  };
  beforeEach(() => {
    actions = {
      Cart: {
        changePizzasCount: jest.fn(),
      },
      Builder: {
        setPizza: jest.fn(),
      },
    };
    propsData = getPropsData();
    store = generateMockStore({ actions });
  });
  afterEach(() => {
    wrapper.destroy();
  });

  it("Отображается правильное название пиццы в альте картинки", () => {
    createComponent({ store, propsData });
    expect(wrapper.find('[data-test="pizzaImage"').attributes("alt")).toEqual(
      "pizzaName"
    );
  });

  it("Отображается правильное название пиццы", () => {
    createComponent({ store, propsData });
    expect(wrapper.find('[data-test="pizzaTitle"').text()).toEqual("pizzaName");
  });

  it("Отображаются правильные названия размера пиццы и теста", () => {
    createComponent({ store, propsData });
    expect(wrapper.find('[data-test="pizzaName"').text()).toEqual(
      "sizeName, на doughPrepositional тесте"
    );
  });

  it("Отображается правильное название соуса", () => {
    createComponent({ store, propsData });
    expect(wrapper.find('[data-test="pizzaSauce"').text()).toEqual(
      "Соус: saucename"
    );
  });

  it("Отображаются правильные названия ингредиентов", () => {
    createComponent({ store, propsData });
    expect(wrapper.find('[data-test="pizzaIngredients"').text()).toEqual(
      "Начинка: expected 1, expected 2"
    );
  });

  it("В счётчик передаются правильные параметры", () => {
    createComponent({ store, propsData });
    const pizzaCounter = wrapper.find('[data-test="pizzaCounter"');
    expect(pizzaCounter.attributes("title")).toEqual("pizzaName");
    expect(pizzaCounter.attributes("item-id")).toEqual("222");
    expect(pizzaCounter.attributes("itemcount")).toEqual("2");
  });

  it("Отображается правильная стоимость пиццы", () => {
    createComponent({ store, propsData });
    expect(wrapper.find('[data-test="pizzaPrice"').text()).toEqual("200 ₽");
  });
});
