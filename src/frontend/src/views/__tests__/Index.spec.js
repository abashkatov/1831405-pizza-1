import { shallowMount } from "@vue/test-utils";
import Index from "@/views/Index.vue";
import { generateMockStore } from "@/store/mock";
import { SET_ENTITY } from "@/store/mutation-types";

const loadName = (store) => {
  store.commit(SET_ENTITY, {
    module: "Builder",
    entity: "name",
    value: "Название пиццы",
  });
};

describe("Index", () => {
  let store;
  let actions;
  let wrapper;

  const createComponent = (options) => {
    wrapper = shallowMount(Index, options);
  };

  beforeEach(() => {
    actions = {
      Builder: {
        setName: jest.fn(),
      },
    };
    store = generateMockStore({ actions });
  });
  afterEach(() => {
    wrapper.destroy();
  });

  it("Правильно работает изменение имени", async () => {
    loadName(store);
    const newName = "Новое имя";
    createComponent({ store });
    const inputName = wrapper.find('[data-test="inputName"]');
    inputName.setValue(newName);
    await inputName.trigger("change");
    expect(actions.Builder.setName).toBeCalledWith(expect.anything(), newName);
  });
});
