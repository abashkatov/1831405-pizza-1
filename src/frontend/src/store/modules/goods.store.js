import goods from "@/static/misc.json";
import { SET_ENTITY } from "@/store/mutation-types";

const module = "Goods";

const entityGoods = "goods";
const namespaceGoods = { entity: entityGoods, module };

export default {
  namespaced: true,
  state: {
    goods: [],
  },
  actions: {
    fetch({ dispatch }) {
      const dataGoods = goods.map((good) => {
        return {
          ...good,
          count: 0,
        };
      });
      dispatch("setGoods", dataGoods);
    },
    setGoods({ commit }, newGoods) {
      commit(
        SET_ENTITY,
        {
          ...namespaceGoods,
          value: newGoods,
        },
        { root: true }
      );
    },
    changeGoodsCount({ state, dispatch }, { itemId, newCount }) {
      const updatedGoods = state.goods.map((good) => {
        const newGood = { ...good };
        if (itemId === good.id) {
          newGood.count = newCount;
        }
        return newGood;
      });
      dispatch("setGoods", updatedGoods);
    },
  },
  getters: {
    getProductsCost(state) {
      return state.goods.reduce((prevCost, product) => {
        return prevCost + product.price * product.count;
      }, 0);
    },
  },
};
