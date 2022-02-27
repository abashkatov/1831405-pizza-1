import { shallowMount } from "@vue/test-utils";
import Orders from "@/views/Orders";
import { generateMockStore } from "@/store/mock";
import { SET_ENTITY } from "@/store/mutation-types";

const loadOrders = (store) => {
  store.commit(SET_ENTITY, {
    module: "Orders",
    entity: "orders",
    value: [{ id: 1 }, { id: 2 }],
  });
};

describe("Orders", () => {
  let store;
  let actions;
  let wrapper;

  const createComponent = (options) => {
    wrapper = shallowMount(Orders, options);
  };

  beforeEach(() => {
    actions = {
      Orders: {
        fetchOrders: jest.fn(),
      },
    };
    store = generateMockStore({ actions });
  });
  afterEach(() => {
    wrapper.destroy();
  });

  it("Правильно загружаются и выводятся заказы", () => {
    loadOrders(store);
    createComponent({ store });
    expect(actions.Orders.fetchOrders).toBeCalled();
    expect(wrapper.findAll('[data-test="orderRow"]')).toHaveLength(2);
  });
});
