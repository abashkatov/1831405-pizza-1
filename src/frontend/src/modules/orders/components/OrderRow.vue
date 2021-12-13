<template>
  <section class="sheet order">
    <div class="order__wrapper">
      <div class="order__number">
        <b>Заказ #{{ order.id }}</b>
      </div>

      <div class="order__sum">
        <span>Сумма заказа: {{ totalCost }} ₽</span>
      </div>

      <div class="order__button">
        <button
          type="button"
          class="button button--border"
          @click="deleteOrder(order.id)"
        >
          Удалить
        </button>
      </div>
      <div class="order__button">
        <button type="button" class="button">Повторить</button>
      </div>
    </div>

    <ul class="order__list">
      <PizzaRow v-for="pizza in order.pizzas" :pizza="pizza" :key="pizza.id" />
    </ul>

    <ul class="order__additional">
      <ProductRow
        v-for="product in order.products"
        :key="product.id"
        :product="product"
      />
    </ul>

    <p v-if="order.address" class="order__address">
      Адрес доставки: {{ address }}
    </p>
    <p v-else class="order__address">Самовывоз</p>
  </section>
</template>

<script>
import { pizzaCost } from "@/common/helper";
import PizzaRow from "./PizzaRow";
import ProductRow from "./ProductRow";
import { mapActions } from "vuex";

export default {
  name: "OrderRow",
  components: { ProductRow, PizzaRow },
  props: {
    order: {
      type: Object,
      required: true,
    },
  },
  computed: {
    totalCost() {
      return (
        this.order.pizzas.reduce(
          (prevCost, pizza) => prevCost + pizzaCost(pizza) * pizza.count,
          0
        ) +
        +this.order.products.reduce(
          (prevCost, product) => prevCost + product.count * product.price,
          0
        )
      ).toLocaleString();
    },
    address() {
      return this.order.address.name !== "Новый адрес"
        ? this.order.address.name
        : `${this.order.address.street}, дом ${this.order.address.building}, квартира ${this.order.address.flat}`;
    },
  },
  methods: {
    ...mapActions("Orders", ["deleteOrder"]),
  },
};
</script>

<style scoped></style>
