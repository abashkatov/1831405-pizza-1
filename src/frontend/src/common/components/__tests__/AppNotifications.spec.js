import { shallowMount } from "@vue/test-utils";
import AppNotifications from "@/common/components/AppNotifications";

describe("AppNotifications", () => {
  const mocks = {
    $store: {
      state: {
        notifications: [],
      },
    },
  };

  let wrapper;
  const createComponent = (options) => {
    wrapper = shallowMount(AppNotifications, options);
  };

  afterEach(() => {
    wrapper.destroy();
    mocks.$store.state.notifications = [];
  });

  it("Не отрисовывается, если нет сообщений", () => {
    createComponent({ mocks });
    expect(wrapper.html()).toBeFalsy();
  });

  it("Отрисовывется, если есть сообщения", () => {
    mocks.$store.state.notifications = [{ text: "text", type: "warning" }];
    createComponent({ mocks });
    expect(wrapper.html()).toBeTruthy();
    expect(wrapper.html()).toContain("notification--warning");
    expect(wrapper.html()).toContain("text");
  });
});
