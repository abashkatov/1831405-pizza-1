import { shallowMount } from "@vue/test-utils";
import Profile from "@/views/Profile";
import { generateMockStore } from "@/store/mock";
import { SET_ENTITY } from "@/store/mutation-types";

const loadUser = (store) => {
  store.commit(SET_ENTITY, {
    module: "Auth",
    entity: "user",
    value: {
      avatar: "avatar",
      name: "User Name",
      phone: "777-77-77",
    },
  });
};

const loadAddresses = (store) => {
  store.commit(SET_ENTITY, {
    module: "Auth",
    entity: "addresses",
    value: [{ id: 1 }, { id: 2 }],
  });
};

describe("Profile", () => {
  let store;
  let wrapper;

  const createComponent = (options) => {
    wrapper = shallowMount(Profile, options);
  };

  beforeEach(() => {
    store = generateMockStore({});
  });
  afterEach(() => {
    wrapper.destroy();
  });

  it("Правильно отображаются данные пользователя", async () => {
    loadUser(store);
    createComponent({ store });
    expect(wrapper.find('[data-test="userData"]').exists()).toBeTruthy();
    expect(
      wrapper.find('[data-test="userSource"]').attributes("srcset")
    ).toEqual("avatar@2x.webp 1x,avatar@4x.webp 2x");
    const userImage = wrapper.find('[data-test="userImage"]');
    expect(userImage.attributes("src")).toEqual("avatar@2x.jpg");
    expect(userImage.attributes("srcset")).toEqual("avatar@4x.jpg");
    expect(userImage.attributes("alt")).toEqual("User Name");
    expect(wrapper.find('[data-test="userName"]').text()).toEqual("User Name");
    expect(wrapper.find('[data-test="userPhone"]').text()).toEqual("777-77-77");
  });

  it("Отображается правильное количество адресов", () => {
    loadAddresses(store);
    createComponent({ store });
    expect(wrapper.findAll('[data-test="addressRow"]')).toHaveLength(2);
  });
});
