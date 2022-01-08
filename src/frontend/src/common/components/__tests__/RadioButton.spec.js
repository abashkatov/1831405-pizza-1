import { shallowMount } from "@vue/test-utils";
import RadioButton from "../RadioButton";

describe("RadioButton", () => {
  const slots = { default: "content" };
  const items = [
    {
      id: 1,
      alias: "alias 1",
      name: "name 2",
    },
    {
      id: 2,
      alias: "alias 2",
      name: "name 2",
    },
  ];
  const groupName = "name";
  const labelClass = "labelClass";
  const selectedId = 2;
  const defaultOptions = {
    slots,
    propsData: {
      items,
      name: groupName,
      labelClass,
      selectedId,
    },
  };
  let wrapper;
  const createComponent = (options) => {
    wrapper = shallowMount(RadioButton, options);
  };
  afterEach(() => {
    wrapper.destroy();
  });

  it("Отрисовывается нужное количество кнопок", () => {
    createComponent(defaultOptions);
    expect(wrapper.findAll('[data-test="input"]')).toHaveLength(items.length);
    const labels = wrapper.findAll("label");
    expect(labels).toHaveLength(items.length);
    labels.wrappers.forEach((label) => {
      expect(label.exists()).toBeTruthy();
      expect(label.attributes("class")).toContain(labelClass);
    });
  });

  it.each(items)(
    "Кнопки отрисованы с правильными параметрами",
    ({ alias, name }) => {
      createComponent(defaultOptions);
      const input = wrapper.find(`input[value="${alias}"]`);
      expect(input.exists()).toBeTruthy();
      expect(input.attributes("name")).toEqual(groupName);

      const span = wrapper.find(`input[value="${alias}"]~span`);
      expect(span.text()).toEqual(name);
    }
  );
});
