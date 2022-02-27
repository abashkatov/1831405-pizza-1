import { mount, createLocalVue } from "@vue/test-utils";
import Login from "@/views/Login";
import { generateMockStore } from "@/store/mock";

const localVue = createLocalVue();

describe("Login", () => {
  let store;
  let actions;
  let wrapper;
  let mocks;
  let push;
  const stubs = ["router-link"];

  const createComponent = (options) => {
    wrapper = mount(Login, options);
  };

  beforeEach(() => {
    push = jest.fn();
    mocks = {
      $router: { push },
    };
    actions = {
      Auth: {
        login: jest.fn(),
      },
    };
    store = generateMockStore({ actions });
  });
  afterEach(() => {
    wrapper.destroy();
  });

  it("Правильно работает кнопка авторизации", async () => {
    const email = "наш email";
    const password = "наш пароль";
    createComponent({ store, stubs, mocks, localVue });
    wrapper.find('[data-test="emailInput"]').setValue(email);
    wrapper.find('[data-test="passwordInput"]').setValue(password);
    await wrapper.find('[data-test="loginForm"]').trigger("submit");
    await localVue.nextTick();
    expect(actions.Auth.login).toBeCalledWith(expect.anything(), {
      email,
      password,
    });
    expect(push).toBeCalledWith("/");
  });
});
