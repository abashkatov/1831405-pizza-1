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
      "id",
      "count",
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
    ...mapActions("Cart", ["addPizza", "updatePizza"]),
    addPizzaToCart() {
      const pizza = {
        ingredients: this.ingredients,
        dough: this.selectedDough,
        size: this.selectedSize,
        sauce: this.selectedSauce,
        name: this.name,
        count: this.count,
        price: this.totalPrice,
        id: this.id,
      };
      this.resetSelectedPizza();
      pizza.id === null ? this.addPizza(pizza) : this.updatePizza(pizza);
    },
  },
};
</script>

<style scoped></style>
