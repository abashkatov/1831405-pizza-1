import { shallowMount } from "@vue/test-utils";
import AddressRow from "@/modules/profile/AddressRow";
import { generateMockStore } from "@/store/mock";

describe("AddressRow", () => {
  let store;
  let wrapper;
  let propsData;
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
    wrapper = shallowMount(AddressRow, options);
  };

  beforeEach(() => {
    propsData = loadAddress();
    store = generateMockStore({});
  });
  afterEach(() => {
    wrapper.destroy();
  });

  it("Правильно выводится id и название адреса", () => {
    createComponent({ store, propsData });
    expect(wrapper.find('[data-test="addressCaption"').text()).toEqual(
      `Адрес №${defaultAddress.id}. ${defaultAddress.name}`
    );
  });

  it("Правильно выводится адрес", () => {
    createComponent({ store, propsData });
    expect(wrapper.find('[data-test="addressRow"').text()).toEqual(
      `${defaultAddress.street}, д. ${defaultAddress.building}, кв. ${defaultAddress.flat}`
    );
  });

  it("Правильно выводится комментарий", () => {
    createComponent({ store, propsData });
    expect(wrapper.find('[data-test="addressComment"').text()).toEqual(
      defaultAddress.comment
    );
  });
});
