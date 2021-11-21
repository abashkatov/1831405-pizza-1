<template>
  <div class="content__result">
    <p>Итого: {{ totalPrice }} ₽</p>
    <button
      type="button"
      class="button"
      :class="{ 'button--disabled': name.length < 3 }"
      :disabled="name.length < 3"
      @click="addPizzaToCart"
    >
      Готовьте!
    </button>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "BuilderPriceCounter",
  computed: {
    ...mapState("Builder", [
      "ingredients",
      "selectedDough",
      "selectedSize",
      "selectedSauce",
      "name",
    ]),
    totalPrice: function () {
      const ingredientsPrice = this.ingredients.reduce(
        (prev, cur) => prev + cur.price * cur.count,
        0
      );

      return (
        this.selectedSize.multiplier *
        (this.selectedDough.price + this.selectedSauce.price + ingredientsPrice)
      );
    },
  },
  methods: {
    ...mapActions("Builder", ["resetSelectedPizza"]),
    ...mapActions("Cart", ["addPizza"]),
    addPizzaToCart() {
      const pizza = {
        ingredients: this.ingredients,
        dough: this.selectedDough,
        size: this.selectedSize,
        sauce: this.selectedSauce,
        name: this.name,
        count: 1,
        price: this.totalPrice,
      };
      this.resetSelectedPizza();
      this.addPizza(pizza);
    },
  },
};
</script>

<style scoped></style>
