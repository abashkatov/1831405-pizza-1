<template>
  <div>
    <form action="#" method="post" class="layout-form" @submit.prevent>
      <main class="content cart">
        <div class="container">
          <div class="cart__title">
            <h1 class="title title--big">Корзина</h1>
          </div>

          <ul class="cart-list sheet">
            <PizzaRow
              v-for="(pizza, index) in pizzas"
              :key="index"
              :pizza="pizza"
              :item-id="index"
            />
          </ul>

          <div class="cart__additional">
            <ul class="additional-list">
              <GoodsRow
                v-for="(good, index) in goods"
                :key="index"
                :good="good"
              />
            </ul>
          </div>

          <div class="cart__form">
            <div class="cart-form">
              <label class="cart-form__select">
                <span class="cart-form__label">Получение заказа:</span>

                <select name="test" class="select">
                  <option value="1">Заберу сам</option>
                  <option value="2">Новый адрес</option>
                  <option value="3">Дом</option>
                </select>
              </label>

              <label class="input input--big-label">
                <span>Контактный телефон:</span>
                <input type="text" name="tel" placeholder="+7 999-999-99-99" />
              </label>

              <div class="cart-form__address">
                <span class="cart-form__label">Новый адрес:</span>

                <div class="cart-form__input">
                  <label class="input">
                    <span>Улица*</span>
                    <input type="text" name="street" />
                  </label>
                </div>

                <div class="cart-form__input cart-form__input--small">
                  <label class="input">
                    <span>Дом*</span>
                    <input type="text" name="house" />
                  </label>
                </div>

                <div class="cart-form__input cart-form__input--small">
                  <label class="input">
                    <span>Квартира</span>
                    <input type="text" name="apartment" />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
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
          <b>Итого: 2 228 ₽</b>
        </div>

        <div class="footer__submit">
          <button class="button" @click.stop="showModal = true">
            Оформить заказ
          </button>
        </div>
      </section>
      <OrderThanks v-if="showModal" @closePopup="showModal = false" />
    </form>
  </div>
</template>

<script>
import { mapState } from "vuex";
import PizzaRow from "../../modules/cart/components/PizzaRow";
import GoodsRow from "../../modules/cart/components/GoodsRow";
import OrderThanks from "../../modules/cart/components/OrderThanks";

export default {
  name: "CartWithPizzas",
  components: { OrderThanks, GoodsRow, PizzaRow },
  data() {
    return {
      showModal: false,
    };
  },
  computed: {
    ...mapState("Cart", [
      "pizzas",
      "goods",
      "deliveryType",
      "phone",
      "address",
    ]),
    ...mapState("Goods", ["goods"]),
  },
};
</script>

<style scoped></style>
