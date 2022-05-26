import { shallowMount } from "@vue/test-utils";
import AddressForm from "@/modules/profile/AddressForm";
import { generateMockStore } from "@/store/mock";

describe("AddressForm", () => {
  let store;
  let wrapper;
  let actions;
  let propsData;
  const listeners = { closeForm: null };
  const defaultAddress = {
    id: "id адреса",
    name: "Название адреса",
    street: "Название улицы",
    building: "Номер дома",
    flat: "Номер квартиры",
    comment: "Комментарий",
  };

  const loadAddress = () => {
    return {
      address: {
        ...defaultAddress,
      },
    };
  };

  const createComponent = (options) => {
    wrapper = shallowMount(AddressForm, options);
  };

  beforeEach(() => {
    listeners.closeForm = jest.fn();
    propsData = loadAddress();
    actions = {
      Auth: {
        deleteAddress: jest.fn(),
        addAddress: jest.fn(),
        updateAddress: jest.fn(),
      },
    };
    store = generateMockStore({ actions });
  });
  afterEach(() => {
    wrapper.destroy();
  });

  const addressIdDataProvider = [
    { id: 1, expectedName: "Адрес №1" },
    { id: null, expectedName: "Новый адрес" },
  ];
  it.each(addressIdDataProvider)(
    "Выводится правильный id адреса",
    ({ id, expectedName }) => {
      propsData.address.id = id;
      createComponent({ store, propsData });
      expect(wrapper.find('[data-test="addressName"').text()).toEqual(
        expectedName
      );
    }
  );

  const removeAddressButtonDataProvider = [
    { id: 1, expectedButtonExists: true },
    { id: null, expectedButtonExists: false },
  ];
  it.each(removeAddressButtonDataProvider)(
    "Кнопка удаления адреса выводится в правильных случаях",
    ({ id, expectedButtonExists }) => {
      propsData.address.id = id;
      createComponent({ store, propsData });
      expect(wrapper.find('[data-test="removeAddressButton"').exists()).toEqual(
        expectedButtonExists
      );
    }
  );

  it("Правильно отрабатывает удаление адреса", async () => {
    createComponent({ store, propsData, listeners });
    await wrapper.find('[data-test="removeAddressButton"').trigger("click");
    expect(actions.Auth.deleteAddress).toBeCalledWith(
      expect.anything(),
      defaultAddress.id
    );
    expect(wrapper.emitted().closeForm).toBeTruthy();
  });

  const saveAddressDataProvider = [
    { caption: "существующего", id: 5 },
    { caption: "нового", id: null },
  ];
  describe.each(saveAddressDataProvider)(
    "Правильно отрабатывает сохранение адреса",
    ({ caption, id }) => {
      it(caption, async () => {
        propsData.address.id = id;
        createComponent({ store, propsData });
        await wrapper.find('[data-test="addressForm"').trigger("submit");
        const expectedFunc = id
          ? actions.Auth.updateAddress
          : actions.Auth.addAddress;
        const unexpectedFunc = id
          ? actions.Auth.addAddress
          : actions.Auth.updateAddress;
        expect(expectedFunc).toBeCalledWith(expect.anything(), {
          ...defaultAddress,
          id,
        });
        expect(unexpectedFunc).toBeCalledTimes(0);
        expect(wrapper.emitted().closeForm).toBeTruthy();
      });
    }
  );
});
