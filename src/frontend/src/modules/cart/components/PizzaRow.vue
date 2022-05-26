<template>
  <li class="cart-list__item">
    <div class="product cart-list__product">
      <img
        data-test="pizzaImage"
        src="/public/img/product.svg"
        class="product__img"
        width="56"
        height="56"
        :alt="pizza.name"
      />
      <div class="product__text">
        <h2 data-test="pizzaTitle">{{ pizza.name }}</h2>
        <ul>
          <li data-test="pizzaName">
            {{ pizza.size.name }}, на {{ pizza.dough.prepositional }} тесте
          </li>
          <li data-test="pizzaSauce">
            Соус: {{ pizza.sauce.name.toLowerCase() }}
          </li>
          <li data-test="pizzaIngredients">Начинка: {{ ingredients }}</li>
        </ul>
      </div>
    </div>

    <ItemCounter
      data-test="pizzaCounter"
      :title="pizza.name"
      counterClass="cart-list__counter"
      :item-id="pizza.id"
      :itemCount="pizza.count"
      :max-count="0"
      :button-color="`orange`"
      @countChanged="
        changePizzasCount({
          itemId: pizza.id,
          newCount: $event,
        })
      "
    />

    <div class="cart-list__price">
      <b data-test="pizzaPrice">{{ pizza.count * pizza.price }} ₽</b>
    </div>

    <div class="cart-list__button">
      <button type="button" class="cart-list__edit" @click="changePizza">
        Изменить
      </button>
    </div>
  </li>
</template>

<script>
import { mapActions } from "vuex";
import ItemCounter from "@/common/components/ItemCounter";

export default {
  name: "PizzaRow",
  components: { ItemCounter },
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
  },
  methods: {
    ...mapActions("Cart", ["changePizzasCount"]),
    ...mapActions("Builder", ["setPizza"]),
    changePizza() {
      this.setPizza(this.pizza);
      this.$router.push({ name: "Constructor" });
    },
  },
};
</script>

<style scoped></style>
