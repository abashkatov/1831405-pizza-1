<template>
  <div class="content__ingridients">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите ингридиенты</h2>
      <div class="sheet__content ingridients">
        <div class="ingridients__sauce">
          <p>Основной соус:</p>
          <label
            v-for="sauce in sauces"
            :key="sauce.id"
            class="radio ingridients__input"
          >
            <input
              type="radio"
              name="sauce"
              :value="sauce.alias"
              :checked="sauce.id === 1"
            />
            <span>{{ sauce.name }}</span>
          </label>
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
export default {
  name: "BuilderIngredientsSelector",
  props: {
    sauces: {
      type: Object,
      required: true,
    },
    ingredients: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped></style>
