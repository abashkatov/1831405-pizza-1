import { SET_ENTITY } from "@/store/mutation-types";
import resources from "@/common/enums/resources";

const module = "Orders";

const entityOrders = "orders";
const namespaceOrders = { entity: entityOrders, module };

export default {
  namespaced: true,
  state: {
    orders: [],
  },
  actions: {
    async fetchOrders({ dispatch }) {
      const data = await this.$api[resources.ORDERS].query();
      dispatch("setOrders", data);
    },
    setOrders({ commit }, orders) {
      commit(
        SET_ENTITY,
        {
          ...namespaceOrders,
          value: orders,
        },
        { root: true }
      );
    },
  },
};
