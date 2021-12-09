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
      const dataGoods = goods.map((product) => {
        return {
          ...product,
          count: 0,
        };
      });
      dispatch("setGoods", dataGoods);
    },
    setGoods({ commit }, updatedProducts) {
      commit(
        SET_ENTITY,
        {
          ...namespaceGoods,
          value: updatedProducts,
        },
        { root: true }
      );
    },
    changeGoodsCount({ state, dispatch }, { itemId, newCount }) {
      const updatedProducts = state.goods.map((product) => {
        const newProduct = { ...product };
        if (itemId === product.id) {
          newProduct.count = newCount;
        }
        return newProduct;
      });
      dispatch("setGoods", updatedProducts);
    },
    resetProducts({ state, dispatch }) {
      const updatedProducts = state.goods.map((product) => {
        return {
          ...product,
          count: 0,
        };
      });
      dispatch("setGoods", updatedProducts);
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
