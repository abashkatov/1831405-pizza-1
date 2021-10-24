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
import { mapState } from "vuex";

export default {
  name: "BuilderPizzaView",
  components: { AppDrop },
  props: {
    sauce: {
      type: Object,
      required: true,
    },
    ingredients: {
      type: Array,
      required: true,
    },
  },
  computed: {
    ...mapState("Builder", { doughs: "selectedDough" }),
    doughsSize: function () {
      return this.doughs.alias === "light" ? "small" : "big";
    },
    selectedIngredients: function () {
      const selectedIngredients = [];
      this.ingredients.forEach((ingridient) => {
        const baseClass = "pizza__filling--" + ingridient.alias,
          secondClass = "pizza__filling--second",
          thirdClass = "pizza__filling--third";

        if (ingridient.count > 0) {
          selectedIngredients.push([baseClass]);
        }
        if (ingridient.count > 1) {
          selectedIngredients.push([baseClass, secondClass]);
        }
        if (ingridient.count > 2) {
          selectedIngredients.push([baseClass, thirdClass]);
        }
      });
      return selectedIngredients;
    },
  },
  methods: {
    addIngredient(ingredient) {
      this.$emit("ingredientsChanged", ingredient.id, ingredient.count + 1);
    },
  },
};
</script>

<style scoped></style>
