<template>
  <div class="layout__content">
    <div class="layout__title">
      <h1 class="title title--big">История заказов</h1>
    </div>
    <OrderRow v-for="order in orders" :key="order.id" :order="order" />
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import OrderRow from "@/modules/orders/components/OrderRow";

export default {
  name: "Orders",
  components: { OrderRow },
  computed: {
    ...mapState("Orders", ["orders"]),
  },
  mounted() {
    this.fetchOrders();
  },
  methods: {
    ...mapActions("Orders", ["fetchOrders"]),
  },
};
</script>

<style scoped></style>
