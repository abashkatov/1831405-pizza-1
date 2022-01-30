import { shallowMount } from "@vue/test-utils";
import PizzaRow from "@/modules/orders/components/PizzaRow";
import { generateMockStore } from "@/store/mock";

describe("PizzaRow", () => {
  let store;
  let wrapper;
  let propsData;
  const defaultPizza = {
    name: "Название пиццы",
    ingredients: [
      { name: "НаЧинка 1", price: 1000, count: 1 },
      { name: "НачИНка 2", price: 100, count: 2 },
      { name: "Лишняя начинка", price: 100000, count: 0 },
    ],
    size: { name: "Название размера", multiplier: 2 },
    dough: { prepositional: "Название теста", price: 1 },
    sauce: { name: "Название соуса", price: 10 },
    count: 2,
  };

  const loadPizza = () => {
    return {
      pizza: {
        ...defaultPizza,
      },
    };
  };

  const createComponent = (options) => {
    wrapper = shallowMount(PizzaRow, options);
  };

  beforeEach(() => {
    propsData = loadPizza();
    store = generateMockStore({});
  });
  afterEach(() => {
    wrapper.destroy();
  });

  it("У картинки правильный alt", () => {
    createComponent({ store, propsData });
    expect(wrapper.find('[data-test="pizzaImg"').attributes("alt")).toEqual(
      "Название пиццы"
    );
  });

  it("Выводится правильное название пиццы", () => {
    createComponent({ store, propsData });
    expect(wrapper.find('[data-test="pizzaName"').text()).toEqual(
      "Название пиццы"
    );
  });

  it("Отображается правильное описание пиццы", () => {
    createComponent({ store, propsData });
    expect(wrapper.find('[data-test="pizzaDescription"').text()).toContain(
      "Название размера, на Название теста тесте"
    );
    expect(wrapper.find('[data-test="pizzaDescription"').text()).toContain(
      "Соус: название соуса"
    );
    expect(wrapper.find('[data-test="pizzaDescription"').text()).toContain(
      "Начинка: начинка 1, начинка 2"
    );
  });

  it("Выводится правильное количество пицц и стоимость, когда пицц несколько", () => {
    createComponent({ store, propsData });
    expect(wrapper.find('[data-test="pizzaTotal"').text()).toEqual(
      "2x2,422 ₽"
    );
  });

  it("Выводится правильное количество пицц и стоимость, когда пицца одна", () => {
    propsData.pizza.count = 1;
    createComponent({ store, propsData });
    expect(wrapper.find('[data-test="pizzaTotal"').text()).toEqual("2,422 ₽");
  });
});
