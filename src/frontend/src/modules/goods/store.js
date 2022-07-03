import { SET_ENTITY } from "@/store/mutation-types";
import resources from "@/common/enums/resources";

const module = "Goods";

const entityGoods = "goods";
const namespaceGoods = { entity: entityGoods, module };

export default {
  namespaced: true,
  state: {
    goods: [],
  },
  actions: {
    async fetch({ dispatch }) {
      const dataGoods = await this.$api[resources.MISC].query();
      const goods = dataGoods.map((product) => {
        return {
          ...product,
          count: 0,
        };
      });
      dispatch("setGoods", goods);
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
