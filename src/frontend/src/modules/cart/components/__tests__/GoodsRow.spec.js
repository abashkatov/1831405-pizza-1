import { shallowMount } from "@vue/test-utils";
import GoodsRow from "@/modules/cart/components/GoodsRow";
import { generateMockStore } from "@/store/mock";

describe("GoodsRow", () => {
  let store;
  let wrapper;
  let actions;
  const propsData = {
    good: {
      image: "image",
      name: "name",
      id: 1,
      count: 2,
      price: 100,
    },
  };
  const stubs = ["ItemCounter"];

  const createComponent = (options) => {
    wrapper = shallowMount(GoodsRow, options);
  };
  beforeEach(() => {
    actions = {
      Goods: {
        changeGoodsCount: jest.fn(),
      },
    };
    store = generateMockStore({ actions });
  });
  afterEach(() => {
    wrapper.destroy();
  });

  it("Отображается правильные параметры", () => {
    createComponent({ store, stubs, propsData });
    const image = wrapper.find('[data-test="image"');
    expect(image.attributes("src")).toEqual("image");
    expect(image.attributes("alt")).toEqual("name");
    const nameSpan = wrapper.find('[data-test="name"');
    expect(nameSpan.text()).toEqual("name");
    const counter = wrapper.find('[data-test="counter"');
    expect(counter.attributes("title")).toEqual("name");
    expect(counter.attributes("item-id")).toEqual("1");
    expect(counter.attributes("itemcount")).toEqual("2");

    expect(wrapper.find('[data-test="price"').text()).toEqual("200 ₽");
  });

  // it("В метод changeGoodsCount передаются правильные параметры", async () => {
  //   createComponent({ store, stubs, propsData });
  //   const counter = wrapper.find('[data-test="counter"');
  //   await counter.trigger("countChanged");
  //   expect(actions.Goods.changeGoodsCount).toHaveBeenCalledWith({
  //     itemId: 1,
  //     newCount: 2,
  //   });
  // });
});
