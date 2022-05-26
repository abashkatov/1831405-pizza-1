import { shallowMount } from "@vue/test-utils";
import AppLayoutProfile from "@/layouts/AppLayoutProfile";

describe("AppLayoutProfile", () => {
  const slots = { default: "content" };
  const stubs = ["router-link"];

  let wrapper;
  const createComponent = (options) => {
    wrapper = shallowMount(AppLayoutProfile, options);
  };
  afterEach(() => {
    wrapper.destroy();
  });

  it("Слот отображает верные данные", () => {
    createComponent({ slots, stubs });
    expect(wrapper.html()).toContain(slots.default);
  });
});
