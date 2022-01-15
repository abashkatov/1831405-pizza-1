<template>
  <div class="content__ingridients">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите ингридиенты</h2>
      <div class="sheet__content ingridients">
        <div class="ingridients__sauce">
          <p>Основной соус:</p>
          <RadioButton
            name="sauce"
            :items="sauces"
            labelClass="ingridients__input"
            @changeItem="changeSauce"
            :selected-id="selectedSauce.id ? selectedSauce.id : -1"
            data-test="sauce-radio-button"
          />
        </div>
        <div class="ingridients__filling">
          <p>Начинка:</p>
          <ul class="ingridients__list">
            <li
              v-for="ingredient in ingredients"
              :key="ingredient.id"
              class="ingridients__item"
              data-test="ingredient-li"
            >
              <AppDrag
                :transfer-data="ingredient"
                :is-draggable="ingredient.count < 3"
              >
                <span :class="`filling filling--${ingredient.alias}`">
                  {{ ingredient.name }}
                </span>
                <ItemCounter
                  :title="ingredient.name"
                  counterClass="counter--orange ingridients__counter"
                  :item-id="ingredient.id"
                  :itemCount="ingredient.count"
                  @countChanged="
                    changeIngredientCount({
                      itemId: ingredient.id,
                      newCount: $event,
                    })
                  "
                  data-test="ingredient-counter"
                />
              </AppDrag>
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
import AppDrag from "../../../common/components/AppDrag";
import { mapActions, mapState } from "vuex";
export default {
  name: "BuilderIngredientsSelector",
  components: { AppDrag, ItemCounter, RadioButton },
  computed: {
    ...mapState("Builder", ["sauces", "selectedSauce", "ingredients"]),
  },
  methods: {
    ...mapActions("Builder", ["setSauce", "changeIngredientCount"]),
    changeSauce(id) {
      const sauce = this.sauces.reduce(
        (prev, cur) => (cur.id === id ? cur : prev),
        null
      );
      sauce && this.setSauce(sauce);
    },
  },
};
</script>

<style scoped></style>
