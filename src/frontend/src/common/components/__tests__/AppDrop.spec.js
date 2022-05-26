import { shallowMount } from "@vue/test-utils";
import AppDrag from "@/common/components/AppDrag";

describe("AppDrop", () => {
  const slots = { default: "content" };

  let wrapper;
  const createComponent = (options) => {
    wrapper = shallowMount(AppDrag, options);
  };
  afterEach(() => {
    wrapper.destroy();
  });

  it("Слот отображает верные данные", () => {
    createComponent({ slots });
    expect(wrapper.html()).toContain(slots.default);
  });
});
