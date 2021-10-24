<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>
        <BuilderDoughSelector />
        <BuilderSizeSelector />
        <BuilderIngredientsSelector
          :ingredients="ingredients"
          @ingredientsChanged="changeIngredients"
        />
        <div class="content__pizza">
          <label class="input">
            <span class="visually-hidden">Название пиццы</span>
            <input
              type="text"
              name="pizza_name"
              placeholder="Введите название пиццы"
            />
          </label>
          <BuilderPizzaView
            :ingredients="ingredients"
            @ingredientsChanged="changeIngredients"
          />
          <BuilderPriceCounter />
        </div>
      </div>
    </form>
  </main>
</template>

<script>
import { ingredients } from "@/static/pizza.json";
import BuilderDoughSelector from "@/modules/builder/components/BuilderDoughSelector";
import BuilderIngredientsSelector from "@/modules/builder/components/BuilderIngredientsSelector";
import BuilderSizeSelector from "@/modules/builder/components/BuilderSizeSelector";
import BuilderPizzaView from "../modules/builder/components/BuilderPizzaView";
import BuilderPriceCounter from "../modules/builder/components/BuilderPriceCounter";

export default {
  name: "Index",
  components: {
    BuilderPriceCounter,
    BuilderPizzaView,
    BuilderDoughSelector,
    BuilderIngredientsSelector,
    BuilderSizeSelector,
  },
  data() {
    return {
      ingredients: ingredients.map(function (ingridient) {
        ingridient.count = 0;
        return ingridient;
      }),
    };
  },
  methods: {
    changeIngredients: function (itemId, newCount) {
      this.ingredients.forEach(function (ingridient) {
        if (ingridient.id === itemId) {
          ingridient.count = newCount;
        }
      });
    },
  },
};
</script>

<style scoped></style>
