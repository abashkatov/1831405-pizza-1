<template>
  <AppDrop class="content__constructor" @drop="addIngredient">
    <div :class="`pizza pizza--foundation--${doughsSize}-${sauce.alias}`">
      <div class="pizza__wrapper">
        <div
          v-for="(ingridient, key) in selectedIngredients"
          class="pizza__filling"
          :key="key"
          :class="ingridient"
        />
      </div>
    </div>
  </AppDrop>
</template>

<script>
import AppDrop from "../../../common/components/AppDrop";
import { mapActions, mapState } from "vuex";

export default {
  name: "BuilderPizzaView",
  components: { AppDrop },
  computed: {
    ...mapState("Builder", {
      doughs: "selectedDough",
      sauce: "selectedSauce",
      ingredients: "ingredients",
    }),
    doughsSize: function () {
      return this.doughs.alias === "light" ? "small" : "big";
    },
    selectedIngredients: function () {
      const selectedIngredients = [];
      this.ingredients.forEach((ingredient) => {
        const baseClass = "pizza__filling--" + ingredient.alias,
          secondClass = "pizza__filling--second",
          thirdClass = "pizza__filling--third";

        if (ingredient.count > 0) {
          selectedIngredients.push([baseClass]);
        }
        if (ingredient.count > 1) {
          selectedIngredients.push([baseClass, secondClass]);
        }
        if (ingredient.count > 2) {
          selectedIngredients.push([baseClass, thirdClass]);
        }
      });
      return selectedIngredients;
    },
  },
  methods: {
    ...mapActions("Builder", ["addIngredient"]),
  },
};
</script>

<style scoped></style>
