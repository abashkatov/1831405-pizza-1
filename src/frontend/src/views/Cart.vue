<template>
  <div>
    <form
      v-if="hasPizzas"
      action="#"
      method="post"
      class="layout-form"
      @submit.prevent
    >
      <main class="content cart">
        <div class="container">
          <div class="cart__title">
            <h1 class="title title--big">Корзина</h1>
          </div>

          <ul class="cart-list sheet">
            <PizzaRow v-for="pizza in pizzas" :key="pizza.id" :pizza="pizza" />
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

                <select name="test" class="select" @change="setDeliveryType">
                  <option value="self">Заберу сам</option>
                  <option value="new">Новый адрес</option>
                  <option
                    v-for="address in getAddresses"
                    :value="address.id"
                    :key="address.id"
                  >
                    {{ address.name }}
                  </option>
                </select>
              </label>

              <label class="input input--big-label">
                <span>Контактный телефон:</span>
                <input
                  type="text"
                  name="tel"
                  placeholder="+7 999-999-99-99"
                  :value="phone"
                  @change="changePhone"
                />
              </label>
              <Address
                v-if="isAddressVisible"
                :is-editable="isAddressEditable"
              />
              <br v-else />
            </div>
          </div>
        </div>
      </main>
      <CartFooter @makeOrder="makeOrderAndShowModal" />
      <OrderThanks v-if="showModal" @closePopup="closePopup" />
    </form>
    <form v-else action="#" method="post" class="layout-form">
      <main class="content cart">
        <div class="container">
          <div class="cart__title">
            <h1 class="title title--big">Корзина</h1>
          </div>
          <div class="sheet cart__empty">
            <p>В корзине нет ни одного товара</p>
          </div>
        </div>
      </main>
    </form>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import PizzaRow from "../modules/cart/components/PizzaRow";
import GoodsRow from "../modules/cart/components/GoodsRow";
import OrderThanks from "../modules/cart/components/OrderThanks";
import CartFooter from "../modules/cart/components/CartFooter";
import Address from "../modules/cart/components/Address";
import {
  DELIVERY_TYPE_SELF,
  DELIVERY_TYPE_NEW_ADDRESS,
} from "@/common/constants.js";

export default {
  name: "Cart",
  components: { Address, CartFooter, OrderThanks, GoodsRow, PizzaRow },
  data() {
    return {
      showModal: false,
      selectedDeliveryType: DELIVERY_TYPE_SELF,
    };
  },
  computed: {
    ...mapState("Cart", [
      "pizzas",
      "goods",
      "phone",
      "address",
      "deliveryType",
    ]),
    ...mapState("Goods", ["goods"]),
    ...mapState("Auth", ["user", "addresses"]),
    hasPizzas: function () {
      return this.pizzas.length > 0;
    },
    getAddresses() {
      return this.user === null ? [] : this.addresses;
    },
    isAddressVisible() {
      return this.selectedDeliveryType !== DELIVERY_TYPE_SELF;
    },
    isAddressEditable() {
      return this.selectedDeliveryType === DELIVERY_TYPE_NEW_ADDRESS;
    },
  },
  methods: {
    ...mapActions("Cart", [
      "setAddress",
      "resetAddress",
      "setPhone",
      "makeOrder",
    ]),
    setDeliveryType(event) {
      const deliveryType = event.target.value;
      this.selectedDeliveryType = deliveryType;
      if (deliveryType === DELIVERY_TYPE_NEW_ADDRESS) {
        this.resetAddress();
      } else if (deliveryType !== DELIVERY_TYPE_SELF) {
        const addressId = Number(deliveryType);
        const address = this.addresses.find((curAddress) => {
          return curAddress.id === addressId;
        });
        if (typeof address !== "undefined") {
          this.setAddress(address);
        }
      }
    },
    changePhone(event) {
      this.setPhone(event.target.value);
    },
    async closePopup() {
      this.showModal = false;
      this.user === null
        ? await this.$router.push({ name: "Constructor" }).catch()
        : await this.$router.push({ name: "Orders" }).catch();
    },
    async makeOrderAndShowModal() {
      this.showModal = true;
      await this.makeOrder({
        userId: this.user?.id ?? null,
        deliveryType: this.deliveryType,
      });
    },
  },
};
</script>

<style scoped></style>
