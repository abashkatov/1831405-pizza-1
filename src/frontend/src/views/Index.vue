<template>
  <div>
    <AppLayout />
    <main class="content">
      <form action="#" method="post">
        <div class="content__wrapper">
          <h1 class="title title--big">Конструктор пиццы</h1>
          <BuilderDoughSelector :doughs="doughs" @changeDough="changeDough" />
          <BuilderSizeSelector :sizes="sizes" @changeSize="changeSize" />
          <BuilderIngredientsSelector
            :sauces="sauces"
            :ingredients="ingredients"
            :selectedIngredients="selectedIngredients"
            @changeSauce="changeSauce"
            @changeIngredients="changeIngredients"
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
            <BuilderPizzaView :doughs="selectedDough" :sauce="selectedSauce" />
            <BuilderPriceCounter />
          </div>
        </div>
      </form>
    </main>
  </div>
</template>

<script>
import { dough, ingredients, sauces, sizes } from "@/static/pizza.json";
import BuilderDoughSelector from "@/modules/builder/components/BuilderDoughSelector";
import BuilderIngredientsSelector from "@/modules/builder/components/BuilderIngredientsSelector";
import BuilderSizeSelector from "@/modules/builder/components/BuilderSizeSelector";
import BuilderPizzaView from "../modules/builder/components/BuilderPizzaView";
import BuilderPriceCounter from "../modules/builder/components/BuilderPriceCounter";
import AppLayout from "../layouts/AppLayout";
export default {
  name: "Index",
  components: {
    AppLayout,
    BuilderPriceCounter,
    BuilderPizzaView,
    BuilderDoughSelector,
    BuilderIngredientsSelector,
    BuilderSizeSelector,
  },
  data() {
    return {
      doughs: dough,
      sizes: sizes,
      sauces: sauces,
      ingredients: ingredients,
      selectedDough: dough[0],
      selectedSize: sizes[0],
      selectedSauce: sauces[0],
      selectedIngredients: [],
    };
  },
  methods: {
    changeDough: function (dough) {
      this.selectedDough = dough;
    },
    changeSize: function (size) {
      this.selectedSize = size;
    },
    changeSauce: function (id) {
      const sauces = this.sauces.filter((sauce) => sauce.id === id);
      this.selectedSauce = sauces.pop();
    },
    changeIngredients: function (ingredients) {
      this.selectedIngredients = ingredients;
    },
  },
};
</script>

<style scoped></style>
