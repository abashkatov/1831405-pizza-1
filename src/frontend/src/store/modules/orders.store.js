import { SET_ENTITY } from "@/store/mutation-types";
import resources from "@/common/enums/resources";
import { uniqueId } from "lodash";

const module = "Orders";

const entityOrders = "orders";
const namespaceOrders = { entity: entityOrders, module };

export default {
  namespaced: true,
  state: {
    orders: [],
  },
  actions: {
    fetchOrders: async function ({ dispatch, rootState }) {
      const data = await this.$api[resources.ORDERS].query();
      const orders = data.map((order) => {
        // eslint-disable-next-line no-unused-vars
        const { userId, ...address } = order.orderAddress;
        return {
          id: order.id,
          address,
          products: order.orderMisc.map((misc) => {
            const product = rootState.Goods.goods.find(
              (good) => good.id === misc.id
            );
            return {
              ...product,
              count: misc.quantity,
            };
          }),
          pizzas: order.orderPizzas.map((pizza) => {
            return {
              id: uniqueId(),
              dough: rootState.Builder.doughs.find(
                (dh) => dh.id === pizza.doughId
              ),
              size: rootState.Builder.sizes.find(
                (sz) => sz.id === pizza.sizeId
              ),
              sauce: rootState.Builder.sauces.find(
                (sc) => sc.id === pizza.sauceId
              ),
              count: pizza.quantity,
              name: pizza.name,
              ingredients: pizza.ingredients.map((ingredientLink) => {
                const ingredient = rootState.Builder.ingredients.find(
                  (item) => ingredientLink.ingredientId === item.id
                );
                return {
                  ...ingredient,
                  count: ingredientLink.quantity,
                };
              }),
            };
          }),
        };
      });
      dispatch("setOrders", orders);
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
