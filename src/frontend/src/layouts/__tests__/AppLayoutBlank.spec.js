import { shallowMount } from "@vue/test-utils";
import AppLayoutBlank from "@/layouts/AppLayoutBlank";

describe("AppLayoutBlank", () => {
  const slots = { default: "content" };

  let wrapper;
  const createComponent = (options) => {
    wrapper = shallowMount(AppLayoutBlank, options);
  };
  afterEach(() => {
    wrapper.destroy();
  });

  it("Слот отображает верные данные", () => {
    createComponent({ slots });
    expect(wrapper.html()).toContain(slots.default);
  });
});
