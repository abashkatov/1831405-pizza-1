import { shallowMount } from "@vue/test-utils";
import OrderRow from "@/modules/orders/components/OrderRow";
import { generateMockStore } from "@/store/mock";

describe("OrderRow", () => {
  let store;
  let wrapper;
  let actions;
  let propsData;
  const defaultOrder = {
    id: 1,
    pizzas: [
      {
        id: 1,
        ingredients: [{ price: 1000, count: 1 }],
        size: { multiplier: 2 },
        dough: { price: 10000 },
        sauce: { price: 100000 },
        count: 1,
      },
      {
        id: 2,
        ingredients: [{ price: 1000, count: 1 }],
        size: { multiplier: 2 },
        dough: { price: 10000 },
        sauce: { price: 100000 },
        count: 1,
      },
    ],
    products: [
      { id: 1, count: 1, price: 100 },
      { id: 2, count: 2, price: 10 },
    ],
    address: {
      name: "Название адреса",
      street: "Название улицы",
      building: "Номер дома",
      flat: "Номер квартиры",
    },
  };

  const loadOrder = () => {
    return {
      ...defaultOrder,
    };
  };

  const createComponent = (options) => {
    wrapper = shallowMount(OrderRow, options);
  };

  beforeEach(() => {
    propsData = { order: loadOrder() };
    actions = {
      Orders: {
        deleteOrder: jest.fn(),
        addOrderToCart: jest.fn(),
      },
    };
    store = generateMockStore({ actions });
  });
  afterEach(() => {
    wrapper.destroy();
  });

  it("Отображается правильный номер заказа", () => {
    createComponent({ store, propsData });
    expect(wrapper.find('[data-test="orderId"').text()).toEqual("Заказ #1");
  });

  it("Отображается правильная стоимость заказа", () => {
    createComponent({ store, propsData });
    expect(wrapper.find('[data-test="orderCost"').text()).toEqual(
      "Сумма заказа: 444,120 ₽"
    );
  });

  it("Отображается правильное количество пицц", () => {
    createComponent({ store, propsData });
    expect(wrapper.findAll('[data-test="orderPizza"')).toHaveLength(2);
  });

  it("Отображается правильное количество продуктов", () => {
    createComponent({ store, propsData });
    expect(wrapper.findAll('[data-test="orderProduct"')).toHaveLength(2);
  });

  it("Скрывается адрес доставки при правильных условиях", () => {
    propsData.order.address = undefined;
    createComponent({ store, propsData });
    expect(wrapper.find('[data-test="orderAddress"').exists()).toBeFalsy();
  });

  it("Отображается правильный адрес доставки", () => {
    createComponent({ store, propsData });
    expect(wrapper.find('[data-test="orderAddress"').text()).toEqual(
      "Адрес доставки: Название адреса"
    );
  });
});
