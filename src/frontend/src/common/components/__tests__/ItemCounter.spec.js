import { shallowMount } from "@vue/test-utils";
import ItemCounter from "../ItemCounter";

describe("ItemCounter", () => {
  const slots = { default: "content" };
  const title = "title";
  const counterClass = "counterClass";
  const itemCount = 2;
  const maxCount = 3;
  const buttonColor = "buttonColor";
  const defaultOptions = {
    slots,
    propsData: {
      title,
      counterClass,
      itemCount,
      maxCount,
      buttonColor,
    },
  };
  let wrapper;
  const createComponent = (options) => {
    wrapper = shallowMount(ItemCounter, options);
  };
  afterEach(() => {
    wrapper.destroy();
  });

  it("Слот верно отображается", () => {
    createComponent(defaultOptions);
    expect(wrapper.html()).toContain(slots.default);
  });

  it("У обёртки кнопок верный класс", () => {
    createComponent(defaultOptions);
    expect(
      wrapper.find('[data-test="buttons-outer"]').attributes("class")
    ).toContain(counterClass);
  });

  const countDataProvider = [[0], [2], [3]];
  it.each(countDataProvider)("Кнопка минус правильно блокируется", (count) => {
    const isDisabled = count <= 0;
    createComponent({
      slots,
      propsData: {
        ...defaultOptions.propsData,
        itemCount: count,
      },
    });
    const buttonMinus = wrapper.find('[data-test="button-minus"]');
    expect(buttonMinus.exists()).toBeTruthy();
    if (isDisabled) {
      expect(buttonMinus.attributes("disabled")).toBeDefined();
      expect(buttonMinus.attributes("class")).toContain(
        "counter__button--disabled"
      );
    } else {
      expect(buttonMinus.attributes("disabled")).not.toBeDefined();
      expect(buttonMinus.attributes("class")).not.toContain(
        "counter__button--disabled"
      );
    }
  });

  it.each(countDataProvider)("Кнопка плюс правильно блокируется", (count) => {
    const isDisabled = count >= maxCount;
    createComponent({
      slots,
      propsData: {
        ...defaultOptions.propsData,
        itemCount: count,
      },
    });
    const buttonPlus = wrapper.find('[data-test="button-plus"]');
    expect(buttonPlus.exists()).toBeTruthy();
    if (isDisabled) {
      expect(buttonPlus.attributes("disabled")).toBeDefined();
      expect(buttonPlus.attributes("class")).toContain(
        "counter__button--disabled"
      );
    } else {
      expect(buttonPlus.attributes("disabled")).not.toBeDefined();
      expect(buttonPlus.attributes("class")).not.toContain(
        "counter__button--disabled"
      );
    }
  });

  it("Счётчик имеет верное значение", () => {
    createComponent(defaultOptions);
    expect(wrapper.find('[data-test="input"]').element.value).toEqual(
      itemCount.toString()
    );
  });
});
