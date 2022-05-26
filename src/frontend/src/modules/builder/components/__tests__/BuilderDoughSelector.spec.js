import { shallowMount } from "@vue/test-utils";
import BuilderDoughSelector from "@/modules/builder/components/BuilderDoughSelector";
import { dough } from "@/static/pizza.json";
import { SET_ENTITY } from "@/store/mutation-types";
import { generateMockStore } from "@/store/mock";

const loadDoughs = (store, doughs) => {
  store.commit(SET_ENTITY, {
    module: "Builder",
    entity: "doughs",
    value: doughs,
  });
};
describe("BuilderDoughSelector", () => {
  let store;
  let wrapper;
  let actions;
  const createComponent = (options) => {
    wrapper = shallowMount(BuilderDoughSelector, options);
  };
  beforeEach(() => {
    actions = {
      Builder: {
        setDough: jest.fn(),
      },
    };
    store = generateMockStore({ actions });
  });
  afterEach(() => {
    wrapper.destroy();
  });

  it("Отображается правильное количество элементов", () => {
    loadDoughs(store, dough);
    createComponent({ store });
    expect(wrapper.findAll('[data-test="dough"]')).toHaveLength(dough.length);
  });

  it("правильно формирует элемент 'тесто'", () => {
    const firstDough = dough[0];
    loadDoughs(store, [firstDough]);
    createComponent({ store });
    const doughWrapper = wrapper.find('[data-test="dough"]');
    expect(doughWrapper.exists()).toBeTruthy();
    expect(doughWrapper.text()).toContain(firstDough.name);
    expect(doughWrapper.text()).toContain(firstDough.description);
    expect(doughWrapper.html()).toContain(`dough__input--${firstDough.alias}`);
  });

  it("Правильно отрабатывает клик по кнопке", async () => {
    loadDoughs(store, dough);
    createComponent({ store });
    await wrapper.find('[data-test="radioButton"]').trigger("click");
    expect(actions.Builder.setDough).toHaveBeenCalledWith(
      expect.anything(),
      dough[0]
    );
  });
});
