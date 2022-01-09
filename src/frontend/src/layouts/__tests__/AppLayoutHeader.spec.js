import { mount, createLocalVue } from "@vue/test-utils";
import AppLayoutHeader from "@/layouts/AppLayoutHeader";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mock";
import { SET_ENTITY, ADD_ENTITY } from "../../store/mutation-types";
import user from "@/static/user";

const localVue = createLocalVue();
localVue.use(Vuex);
const logoutMixin = {
  methods: {
    $logout: jest.fn(),
  },
};
const authenticateUser = (store) => {
  store.commit(SET_ENTITY, {
    module: "Auth",
    entity: "user",
    value: user,
  });
};

const addProduct = (store, { price, count }) => {
  store.commit(ADD_ENTITY, {
    module: "Goods",
    entity: "goods",
    value: { price, count },
  });
};

describe("AppLayoutHeader", () => {
  const slots = { default: "content" };
  const stubs = ["router-link"];
  let mixins;
  let store;
  let wrapper;
  let getters;

  const createComponent = (options) => {
    wrapper = mount(AppLayoutHeader, options);
  };
  beforeEach(() => {
    mixins = [logoutMixin];
    getters = {
      Cart: {
        getPizzasCost: () => 1,
      },
    };
    store = generateMockStore({ getters });
  });
  afterEach(() => {
    wrapper.destroy();
  });

  it("Неавторизованному пользователю показывается шапка с кнопкой входа", () => {
    createComponent({ localVue, store, mixins, slots, stubs });
    expect(wrapper.findAll('[data-test="header"]')).toHaveLength(1);
    const userHeader = wrapper.find('[data-test="header"]');
    expect(userHeader.exists()).toBeTruthy();
    expect(userHeader.text()).toEqual("Войти");
    expect(userHeader.html()).toContain('to="/login"');
  });

  it("Авторизованному пользователю показывается шапка с кнопкой выхода и данными пользователя", () => {
    authenticateUser(store);
    createComponent({ localVue, store, mixins, slots, stubs });
    const headers = wrapper.findAll('[data-test="header"]');
    expect(headers).toHaveLength(1);
    const userHeader = headers.wrappers.shift();
    expect(userHeader.html()).toContain('to="/profile"');
    expect(userHeader.text()).toContain("Выйти");

    const source = userHeader.find("source");
    expect(source.exists()).toBeTruthy();
    expect(source.attributes("srcset")).toEqual(
      `${user.avatar}.webp 1x, ${user.avatar}@2x.webp 2x`
    );
    const img = userHeader.find("img");
    expect(img.exists()).toBeTruthy();
    expect(img.attributes("src")).toEqual(`${user.avatar}.jpg`);
    expect(img.attributes("srcset")).toEqual(`${user.avatar}@2x.jpg`);
    expect(img.attributes("alt")).toEqual(user.name);

    const userName = userHeader.find('[data-test="user-name"]');
    expect(userName.exists()).toBeTruthy();
    expect(userName.text()).toEqual(user.name);
  });

  it("Выводится правильная стоимость корзины", () => {
    addProduct(store, { price: 100, count: 3 });
    createComponent({ localVue, store, mixins, slots, stubs });
    const cart = wrapper.find('[data-test="cart"]');
    expect(cart.exists()).toBeTruthy();
    expect(cart.text()).toEqual("301 ₽");
  });
});
