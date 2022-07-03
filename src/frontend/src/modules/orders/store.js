import { SET_ENTITY, DELETE_ENTITY } from "@/store/mutation-types";
import resources from "@/common/enums/resources";
import { uniqueId } from "lodash";
import { pizzaCost } from "@/common/helper";

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
      const orders = data.map((orderData) => {
        const order = {
          id: orderData.id,
          address: null,
          products: orderData.orderMisc.map((misc) => {
            const product = rootState.Goods.goods.find(
              (good) => good.id === misc.miscId
            );
            return {
              ...product,
              count: misc.quantity,
            };
          }),
          pizzas: orderData.orderPizzas.map((pizza) => {
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
              ingredients: rootState.Builder.ingredients.map(
                (ingredientSource) => {
                  const ingredientLink = pizza.ingredients.find(
                    (item) => item.ingredientId === ingredientSource.id
                  );
                  return {
                    ...ingredientSource,
                    count: ingredientLink?.quantity ?? 0,
                  };
                }
              ),
            };
          }),
        };
        if (orderData.orderAddress) {
          // eslint-disable-next-line no-unused-vars
          const { userId, ...address } = orderData.orderAddress;
          order.address = address;
        }
        return order;
      });
      dispatch("setOrders", orders);
    },
    addOrderToCart({ dispatch }, { pizzas, products }) {
      const pizzasWithPrice = pizzas.map((pizza) => {
        return {
          ...pizza,
          price: pizzaCost(pizza),
        };
      });
      dispatch("Cart/setPizzas", pizzasWithPrice, { root: true });
      products.forEach((product) =>
        dispatch(
          "Goods/changeGoodsCount",
          { itemId: product.id, newCount: product.count },
          { root: true }
        )
      );
    },
    async deleteOrder({ commit }, orderId) {
      await this.$api[resources.ORDERS].delete(orderId);
      commit(
        DELETE_ENTITY,
        {
          ...namespaceOrders,
          id: orderId,
        },
        { root: true }
      );
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
