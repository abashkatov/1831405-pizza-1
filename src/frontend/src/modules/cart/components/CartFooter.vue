<template>
  <section class="footer">
    <div class="footer__more">
      <router-link to="/" class="button button--border button--arrow"
        >Хочу еще одну</router-link
      >
    </div>
    <p class="footer__text">
      Перейти к конструктору<br />чтоб собрать ещё одну пиццу
    </p>
    <div class="footer__price">
      <b>Итого: {{ getPizzasCost + getProductsCost }} ₽</b>
    </div>

    <div class="footer__submit">
      <button class="button" @click.stop="showModal = true">
        Оформить заказ
      </button>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "CartFooter",
  computed: {
    ...mapGetters("Cart", ["getPizzasCost"]),
    ...mapGetters("Goods", ["getProductsCost"]),
  },
};
</script>

<style scoped></style>
