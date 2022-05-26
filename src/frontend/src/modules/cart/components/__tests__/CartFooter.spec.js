import { shallowMount } from "@vue/test-utils";
import CartFooter from "@/modules/cart/components/CartFooter";
import { generateMockStore } from "@/store/mock";

describe("CartFooter", () => {
  let store;
  let wrapper;
  let getters;
  const stubs = ["router-link"];

  const createComponent = (options) => {
    wrapper = shallowMount(CartFooter, options);
  };
  beforeEach(() => {
    getters = {
      Cart: {
        getPizzasCost: jest.fn(() => 2),
      },
      Goods: {
        getProductsCost: jest.fn(() => 3),
      },
    };
    store = generateMockStore({ getters });
  });
  afterEach(() => {
    wrapper.destroy();
  });

  it("Отображается правильная стоимость", () => {
    createComponent({ store, stubs });
    expect(wrapper.find('[data-test="price"').text()).toEqual("Итого: 5 ₽");
  });
});
