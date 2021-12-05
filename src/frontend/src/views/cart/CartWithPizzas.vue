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
      <CartFooter />
      <OrderThanks v-if="showModal" @closePopup="showModal = false" />
    </form>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import PizzaRow from "../../modules/cart/components/PizzaRow";
import GoodsRow from "../../modules/cart/components/GoodsRow";
import OrderThanks from "../../modules/cart/components/OrderThanks";
import CartFooter from "../../modules/cart/components/CartFooter";
import Address from "../../modules/cart/components/Address";
import {
  DELIVERY_TYPE_SELF,
  DELIVERY_TYPE_NEW_ADDRESS,
} from "@/common/constants.js";

export default {
  name: "CartWithPizzas",
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
    ...mapActions("Cart", ["setAddress", "resetAddress", "setPhone"]),
    setDeliveryType(event) {
      const deliveryType = event.target.value.toString();
      this.selectedDeliveryType = deliveryType;
      if (deliveryType === DELIVERY_TYPE_NEW_ADDRESS) {
        this.resetAddress();
      } else if (deliveryType !== DELIVERY_TYPE_SELF) {
        let address = null;
        this.addresses.every((curAddress) => {
          if (curAddress.id === deliveryType) {
            address = curAddress;
            return false;
          }
          return true;
        });
        if (address !== null) {
          this.setAddress(address);
        }
      }
    },
    changePhone(event) {
      this.setPhone(event.target.value);
    },
  },
};
</script>

<style scoped></style>
