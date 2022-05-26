import { shallowMount } from "@vue/test-utils";
import Cart from "@/views/Cart";
import { generateMockStore } from "@/store/mock";
import { SET_ENTITY } from "@/store/mutation-types";
import {
  DELIVERY_TYPE_SELF,
  DELIVERY_TYPE_NEW_ADDRESS,
} from "@/common/constants.js";

const loadPizzas = (store, pizzas) => {
  store.commit(SET_ENTITY, {
    module: "Cart",
    entity: "pizzas",
    value: pizzas,
  });
};

const loadPhone = (store, phone) => {
  store.commit(SET_ENTITY, {
    module: "Cart",
    entity: "phone",
    value: phone,
  });
};

const loadProducts = (store, products) => {
  store.commit(SET_ENTITY, {
    module: "Goods",
    entity: "goods",
    value: products,
  });
};

const loadAddresses = (store, addresses) => {
  store.commit(SET_ENTITY, {
    module: "Auth",
    entity: "addresses",
    value: addresses,
  });
};

const loadUser = (store, user) => {
  store.commit(SET_ENTITY, {
    module: "Auth",
    entity: "user",
    value: user,
  });
};

describe("Cart", () => {
  let store;
  let actions;
  let wrapper;

  const createComponent = (options) => {
    wrapper = shallowMount(Cart, options);
  };

  beforeEach(() => {
    actions = {
      Cart: {
        setAddress: jest.fn(),
        resetAddress: jest.fn(),
        setPhone: jest.fn(),
        makeOrder: jest.fn(),
        clearCart: jest.fn(),
      },
    };
    store = generateMockStore({ actions });
  });
  afterEach(() => {
    wrapper.destroy();
  });

  it("Если нет пиццы, то выводится заглушка", () => {
    loadPizzas(store, []);
    createComponent({ store });
    expect(wrapper.find('[data-test="formWithPizzas"]').exists()).toBeFalsy();
    expect(wrapper.find('[data-test="formWithoutPizzas"]').text()).toBeTruthy();
  });

  it("Отображается правильное количество пицц", () => {
    loadPizzas(store, [{ id: 1 }, { id: 2 }]);
    createComponent({ store });
    expect(wrapper.findAll('[data-test="pizzaRow"]')).toHaveLength(2);
  });

  it("Отображается правильное количество товаров", () => {
    loadPizzas(store, [{ id: 1 }]);
    loadProducts(store, [{ id: 1 }, { id: 2 }]);
    createComponent({ store });
    expect(wrapper.findAll('[data-test="productRow"]')).toHaveLength(2);
  });

  const addressesDataProvider = [{ user: null }, { user: {} }];
  describe.each(addressesDataProvider)(
    "Отображается правильное количество адресов",
    ({ user }) => {
      if (user === null) {
        it("Когда пользователь не авторизован", () => {
          loadPizzas(store, [{ id: 1 }]);
          loadAddresses(store, [{ id: 1, name: "Название адреса" }]);
          loadUser(store, user);
          createComponent({ store });
          expect(
            wrapper.findAll('[data-test="addressOptions"]>option')
          ).toHaveLength(2);
          const optionsText = wrapper
            .find('[data-test="addressOptions"]')
            .text();
          expect(optionsText).toContain("Заберу сам");
          expect(optionsText).toContain("Новый адрес");
        });
      } else {
        it("Когда пользователь авторизован", () => {
          loadPizzas(store, [{ id: 1 }]);
          loadAddresses(store, [{ id: 1, name: "Название адреса" }]);
          loadUser(store, user);
          createComponent({ store });
          expect(
            wrapper.findAll('[data-test="addressOptions"]>option')
          ).toHaveLength(3);
          const optionsText = wrapper
            .find('[data-test="addressOptions"]')
            .text();
          expect(optionsText).toContain("Заберу сам");
          expect(optionsText).toContain("Новый адрес");
          expect(optionsText).toContain("Название адреса");
        });
      }
    }
  );

  it("Отображается правильный телефон", () => {
    const phone = "777-77-77";
    loadPizzas(store, [{ id: 1 }]);
    loadPhone(store, phone);
    createComponent({ store });
    expect(wrapper.find('[data-test="phoneNumber"]').element.value).toEqual(
      phone
    );
  });

  const addressProvider = [
    {
      description: "При самовывозе",
      deliveryTypeIndex: 0,
      deliveryType: DELIVERY_TYPE_SELF,
      isVisible: false,
      isEditable: false,
    },
    {
      description: "При новом адресе",
      deliveryTypeIndex: 1,
      deliveryType: DELIVERY_TYPE_NEW_ADDRESS,
      isVisible: true,
      isEditable: true,
    },
    {
      description: "При ранее добавленном адресе",
      deliveryTypeIndex: 2,
      deliveryType: "1",
      isVisible: true,
      isEditable: false,
    },
  ];
  describe.each(addressProvider)(
    "Адрес правильно скрывается и определяется редактируемым",
    ({
      description,
      deliveryTypeIndex,
      deliveryType,
      isVisible,
      isEditable,
    }) => {
      it(description, async () => {
        loadPizzas(store, [{ id: 1 }]);
        loadUser(store, {});
        loadAddresses(store, [{ id: 1, name: "Название адреса" }]);
        createComponent({ store });
        const options = wrapper.findAll('[data-test="addressOptions"]>option');
        expect(options.at(deliveryTypeIndex).element.value).toEqual(
          deliveryType
        );
        await options.at(deliveryTypeIndex).setSelected();
        await wrapper.find('[data-test="addressOptions"]').trigger("change");
        const address = wrapper.find('[data-test="addressRow"]');
        expect(address.exists()).toEqual(isVisible);
        if (isVisible) {
          expect(address.attributes("iseditable")).toEqual(
            isEditable ? "true" : undefined
          );
        }
      });
    }
  );

  const deliveryTypeProvider = [
    {
      description: "Cамовывоз",
      deliveryTypeIndex: 0,
      expectedDeliveryType: DELIVERY_TYPE_SELF,
    },
    {
      description: "Новый адрес",
      deliveryTypeIndex: 1,
      expectedDeliveryType: DELIVERY_TYPE_NEW_ADDRESS,
    },
    {
      description: "Существующий адрес №1",
      deliveryTypeIndex: 2,
      expectedDeliveryType: "1",
    },
    {
      description: "Существующий адрес №2",
      deliveryTypeIndex: 3,
      expectedDeliveryType: "2",
    },
  ];
  describe.each(deliveryTypeProvider)(
    "Правильно выводятся типы доставки и отрабатывает изменение типа доставки",
    ({ description, deliveryTypeIndex, expectedDeliveryType }) => {
      it(description, async () => {
        loadPizzas(store, [{ id: 1 }]);
        const adressess = [
          { id: 1, name: "Название адреса 1" },
          { id: 2, name: "Название адреса 2" },
        ];
        loadUser(store, {});
        loadAddresses(store, adressess);
        createComponent({ store });
        const options = wrapper.findAll('[data-test="addressOptions"]>option');
        expect(options.at(deliveryTypeIndex).element.value).toEqual(
          expectedDeliveryType
        );
        await options.at(deliveryTypeIndex).setSelected();
        await wrapper.find('[data-test="addressOptions"]').trigger("change");
        if (DELIVERY_TYPE_NEW_ADDRESS === expectedDeliveryType) {
          expect(actions.Cart.resetAddress).toBeCalled();
        } else if (DELIVERY_TYPE_SELF !== expectedDeliveryType) {
          const addressIndex = "1" === expectedDeliveryType ? 0 : 1;
          expect(actions.Cart.setAddress).toBeCalledWith(
            expect.anything(),
            adressess[addressIndex]
          );
        }
      });
    }
  );

  it("Правильно отрабатывает изменение телефона", async () => {
    loadPizzas(store, [{ id: 1 }]);
    const phone = "777-77-77";
    loadPhone(store, phone);
    createComponent({ store });
    await wrapper.find('[data-test="phoneNumber"]').trigger("change");
    expect(actions.Cart.setPhone).toBeCalledWith(expect.anything(), phone);
  });

  const makeOrderProvider = [
    {
      description: "Пользователь не авторизован и самовывоз",
      user: null,
      deliveryType: DELIVERY_TYPE_SELF,
    },
    {
      description: "Пользователь авторизован и доставка по новому адресу",
      user: { id: 1 },
      deliveryType: DELIVERY_TYPE_NEW_ADDRESS,
    },
  ];
  describe.each(makeOrderProvider)(
    "Правильно отрабатывает оформление заказа",
    ({ description, user, deliveryType }) => {
      it(description, async () => {
        loadPizzas(store, [{ id: 1 }]);
        loadUser(store, user);
        createComponent({ store });
        expect(
          wrapper.find('[data-test="orderThanksModal"]').exists()
        ).toBeFalsy();
        if (DELIVERY_TYPE_SELF !== deliveryType) {
          await wrapper
            .findAll('[data-test="addressOptions"]>option')
            .at(1)
            .setSelected();
          await wrapper.find('[data-test="addressOptions"]').trigger("change");
        }
        await wrapper.find('[data-test="cartFooter"]').vm.$emit("makeOrder");
        expect(
          wrapper.find('[data-test="orderThanksModal"]').exists()
        ).toBeTruthy();
        const expectedParams = {
          userId: user?.id ?? null,
          deliveryType,
        };
        expect(actions.Cart.makeOrder).toBeCalledWith(
          expect.anything(),
          expectedParams
        );
      });
    }
  );
});
