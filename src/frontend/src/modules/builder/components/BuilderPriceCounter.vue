<template>
  <div class="content__result">
    <p>Итого: {{ totalPrice }} ₽</p>
    <button type="button" class="button button--disabled" disabled>
      Готовьте!
    </button>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "BuilderPriceCounter",
  computed: {
    ...mapState("Builder", [
      "ingredients",
      "selectedDough",
      "selectedSize",
      "selectedSauce",
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
};
</script>

<style scoped></style>
