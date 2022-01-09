import { shallowMount } from "@vue/test-utils";
import AppLayoutDefault from "@/layouts/AppLayoutDefault";

describe("AppLayoutDefault", () => {
  const slots = { default: "content" };

  let wrapper;
  const createComponent = (options) => {
    wrapper = shallowMount(AppLayoutDefault, options);
  };
  afterEach(() => {
    wrapper.destroy();
  });

  it("Слот отображает верные данные", () => {
    createComponent({ slots });
    expect(wrapper.html()).toContain(slots.default);
  });
});
