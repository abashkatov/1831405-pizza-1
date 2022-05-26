import { cloneDeep } from "lodash";

import { mutations } from "@/store";
import modules from "@/store/modules";
import Vuex from "vuex";

import VuexPlugins from "@/plugins/vuexPlugins";

const state = () => ({
  notifications: [],
});

export const generateMockStore = ({ actions, getters }) => {
  const modulesCopy = cloneDeep(modules);
  if (actions) {
    Object.entries(actions).forEach(([module, actions]) => {
      modulesCopy[module] = { ...modulesCopy[module], actions };
    });
  }
  if (getters) {
    Object.entries(getters).forEach(([module, getters]) => {
      modulesCopy[module] = { ...modulesCopy[module], getters };
    });
  }

  return new Vuex.Store({
    state,
    mutations,
    modules: modulesCopy,
    plugins: [VuexPlugins],
  });
};
