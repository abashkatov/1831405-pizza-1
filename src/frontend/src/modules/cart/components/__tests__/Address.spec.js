import { shallowMount } from "@vue/test-utils";
import Address from "@/modules/cart/components/Address";
import { SET_ENTITY } from "@/store/mutation-types";
import { generateMockStore } from "@/store/mock";

const loadAddress = (store, address) => {
  const defaultAddress = {
    name: "Название",
    street: "Улица",
    building: "Дом",
    flat: "Квартира",
  };
  address = address || defaultAddress;
  store.commit(SET_ENTITY, {
    module: "Cart",
    entity: "address",
    value: address,
  });
};

describe("Address", () => {
  let store;
  let wrapper;
  let actions;

  const createComponent = (options) => {
    wrapper = shallowMount(Address, options);
  };
  beforeEach(() => {
    actions = {
      Cart: {
        setAddress: jest.fn(),
      },
    };
    store = generateMockStore({ actions });
  });
  afterEach(() => {
    wrapper.destroy();
  });

  it("Отображается правильный адрес", () => {
    loadAddress(store);
    const propsData = { isEditable: true };
    createComponent({ store, propsData });
    expect(wrapper.find('[data-test="addressName"').text()).toEqual(
      "Название:"
    );
    expect(wrapper.find('[data-test="addressStreet"').element.value).toEqual(
      "Улица"
    );
    expect(wrapper.find('[data-test="addressHouse"').element.value).toEqual(
      "Дом"
    );
    expect(wrapper.find('[data-test="addressApartment"').element.value).toEqual(
      "Квартира"
    );
  });

  const checkAddressEnablingDataProvider = [
    { isEditable: true },
    { isEditable: false },
  ];
  it.each(checkAddressEnablingDataProvider)(
    "Правильно блокируется адрес на редактирование",
    ({ isEditable }) => {
      loadAddress(store);
      createComponent({ store, propsData: { isEditable } });
      if (isEditable) {
        expect(
          wrapper.find('[data-test="addressStreet"').attributes("disabled")
        ).not.toBeDefined();
        expect(
          wrapper.find('[data-test="addressHouse"').attributes("disabled")
        ).not.toBeDefined();
        expect(
          wrapper.find('[data-test="addressApartment"').attributes("disabled")
        ).not.toBeDefined();
      } else {
        expect(
          wrapper.find('[data-test="addressStreet"').attributes("disabled")
        ).toBeDefined();
        expect(
          wrapper.find('[data-test="addressHouse"').attributes("disabled")
        ).toBeDefined();
        expect(
          wrapper.find('[data-test="addressApartment"').attributes("disabled")
        ).toBeDefined();
      }
    }
  );
});
