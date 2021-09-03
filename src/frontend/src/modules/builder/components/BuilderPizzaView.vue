<template>
  <div class="content__constructor">
    <div :class="`pizza pizza--foundation--${doughsSize}-${sauce.alias}`">
      <div class="pizza__wrapper">
        <div
          v-for="(ingridient, key) in selectedIngridients"
          class="pizza__filling"
          :key="key"
          :class="ingridient"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BuilderPizzaView",
  props: {
    doughs: {
      type: Object,
      required: true,
    },
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
    doughsSize: function () {
      return this.doughs.alias === "light" ? "small" : "big";
    },
    selectedIngridients: function () {
      const selectedIngridients = [];
      this.ingredients.forEach((ingridient) => {
        const baseClass = "pizza__filling--" + ingridient.alias,
          secondClass = "pizza__filling--second",
          thirdClass = "pizza__filling--third";

        if (ingridient.count > 0) {
          selectedIngridients.push([baseClass]);
        }
        if (ingridient.count > 1) {
          selectedIngridients.push([baseClass, secondClass]);
        }
        if (ingridient.count > 2) {
          selectedIngridients.push([baseClass, thirdClass]);
        }
      });
      return selectedIngridients;
    },
  },
};
</script>

<style scoped></style>
