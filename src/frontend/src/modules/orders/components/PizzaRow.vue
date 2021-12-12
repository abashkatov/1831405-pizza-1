<template>
  <li class="order__item">
    <div class="product">
      <img
        src="/public/img/product.svg"
        class="product__img"
        width="56"
        height="56"
        :alt="pizza.name"
      />
      <div class="product__text">
        <h2>{{ pizza.name }}</h2>
        <p>
          {{ pizza.size.name }}, на {{ pizza.dough.prepositional }} тесте<br />
          Соус: {{ pizza.sauce.name.toLowerCase() }}<br />
          Начинка: {{ ingredients }}
        </p>
      </div>
    </div>

    <p class="order__price">{{ pizzaCount }}{{ pizzaPrice }} ₽</p>
  </li>
</template>

<script>
import { pizzaCost } from "@/common/helper";

export default {
  name: "PizzaRow",
  props: {
    pizza: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ingredients() {
      return this.pizza.ingredients
        .filter((ingredient) => ingredient.count > 0)
        .map((ingredient) => ingredient.name.toLowerCase())
        .join(", ");
    },
    pizzaCount() {
      return this.pizza.count > 1 ? `${this.pizza.count}x` : "";
    },
    pizzaPrice() {
      return pizzaCost(this.pizza).toLocaleString();
    },
  },
};
</script>

<style scoped></style>
