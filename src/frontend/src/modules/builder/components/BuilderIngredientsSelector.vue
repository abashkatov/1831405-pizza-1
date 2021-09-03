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
              <ItemCounter
                :classes="`filling filling--${ingredient.alias}`"
                :title="ingredient.name"
                counterClass="ingridients__counter"
                :item-id="ingredient.id"
                :itemCount="ingredient.count"
                @countChanged="ingridientsChanged"
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RadioButton from "../../../common/components/RadioButton";
import ItemCounter from "../../../common/components/ItemCounter";
export default {
  name: "BuilderIngredientsSelector",
  components: { ItemCounter, RadioButton },
  props: {
    sauces: {
      type: Array,
      required: true,
    },
    ingredients: {
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
  },
  methods: {
    changeSauce(id) {
      this.$emit("changeSauce", id);
    },
    ingridientsChanged(id, newCount) {
      console.log("ingridientsChanged " + id + " " + newCount);
      this.$emit("ingridientsChanged", id, newCount);
    },
  },
};
</script>

<style scoped></style>
