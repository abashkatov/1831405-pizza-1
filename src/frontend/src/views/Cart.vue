<template>
  <component :is="layout" />
</template>

<script>
import { mapState } from "vuex";

const CartWithPizzas = "CartWithPizzas";
const EmptyCart = "EmptyCart";

export default {
  name: "Cart",
  computed: {
    ...mapState("Cart", ["pizzas"]),
    layout: function () {
      const layout = this.pizzas.length > 0 ? CartWithPizzas : EmptyCart;
      return () => import(`@/modules/cart/${layout}.vue`);
    },
  },
};
</script>

<style scoped></style>
