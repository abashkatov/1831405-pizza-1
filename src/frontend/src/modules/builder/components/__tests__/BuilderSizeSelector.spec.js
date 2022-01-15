import { shallowMount } from "@vue/test-utils";
import BuilderSizeSelector from "@/modules/builder/components/BuilderSizeSelector";
import { sizes } from "@/static/pizza.json";
import { SET_ENTITY } from "@/store/mutation-types";
import { generateMockStore } from "@/store/mock";

const loadSizes = (store, sizeId) => {
  sizeId = sizeId || 1;
  store.commit(SET_ENTITY, {
    module: "Builder",
    entity: "sizes",
    value: sizes,
  });
  store.commit(SET_ENTITY, {
    module: "Builder",
    entity: "selectedSize",
    value: sizes.find((size) => size.id === sizeId),
  });
};

describe("BuilderSizeSelector", () => {
  let wrapper;
  let actions;
  let store;

  const createComponent = (options) => {
    wrapper = shallowMount(BuilderSizeSelector, options);
  };

  beforeEach(() => {
    actions = {
      Builder: {
        setSize: jest.fn(),
      },
    };
    store = generateMockStore({ actions });
  });
  afterEach(() => {
    wrapper.destroy();
  });

  it("Отображается правильное количество элементов", () => {
    loadSizes(store);
    createComponent({ store });
    const sizeElements = wrapper.findAll('[data-test="sizeElement"]');
    expect(sizeElements).toHaveLength(3);
  });

  it("Формируются правильные классы у элементов", () => {
    loadSizes(store);
    createComponent({ store });
    const sizeElements = wrapper.find('[data-test="sizeElement"]');
    const sizeRadio = wrapper.find('[data-test="sizeRadio"]');
    expect(sizeElements.attributes("class")).toContain(
      "diameter__input--small"
    );
    expect(sizeRadio.element.value).toEqual("small");
  });

  it("Правильно отображается выбранный элемент", () => {
    loadSizes(store);
    createComponent({ store });
    const sizeElements = wrapper.findAll('[data-test="sizeRadio"');
    expect(sizeElements.wrappers[0].element.checked).toBeTruthy();
    expect(sizeElements.wrappers[1].element.checked).toBeFalsy();
    expect(sizeElements.wrappers[2].element.checked).toBeFalsy();
  });

  it("Отображается правильное имя", () => {
    loadSizes(store);
    createComponent({ store });
    const sizeElements = wrapper.find('[data-test="sizeName"');
    expect(sizeElements.text()).toEqual("23 см");
  });
});
