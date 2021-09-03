<template>
  <div class="content__ingridients">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите ингридиенты</h2>
      <div class="sheet__content ingridients">
        <div class="ingridients__sauce">
          <p>Основной соус:</p>
          <RadioButton
            name="sauce"
            :items="sauceRadioButtons"
            labelClass="ingridients__input"
            @changeItem="changeSauce"
          />
        </div>
        <div class="ingridients__filling">
          <p>Начинка:</p>
          <ul class="ingridients__list">
            <li
              v-for="ingredient in ingredients"
              :key="ingredient.id"
              class="ingridients__item"
            >
              <span class="filling" :class="`filling--${ingredient.alias}`">
                {{ ingredient.title }}
              </span>
              <div class="counter counter--orange ingridients__counter">
                <button
                  type="button"
                  class="
                    counter__button
                    counter__button--disabled
                    counter__button--minus
                  "
                >
                  <span class="visually-hidden">Меньше</span>
                </button>
                <input
                  type="text"
                  name="counter"
                  class="counter__input"
                  value="0"
                />
                <button
                  type="button"
                  class="counter__button counter__button--plus"
                >
                  <span class="visually-hidden">Больше</span>
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RadioButton from "../../../common/components/RadioButton";
export default {
  name: "BuilderIngredientsSelector",
  components: { RadioButton },
  props: {
    sauces: {
      type: Array,
      required: true,
    },
    ingredients: {
      type: Array,
      required: true,
    },
    selectedIngredients: {
      type: Array,
      required: true,
    },
  },
  computed: {
    sauceRadioButtons: function () {
      return this.sauces.map(function (sauce) {
        return {
          id: sauce.id,
          alias: sauce.alias,
          name: sauce.name,
        };
      });
    },
    canUp: function () {
      return this.selectedIngredients.length < 3;
    },
    canDown: function () {
      return this.selectedIngredients.length > 0;
    },
  },
  methods: {
    changeSauce(id) {
      this.$emit("changeSauce", id);
    },
  },
};
</script>

<style scoped></style>
