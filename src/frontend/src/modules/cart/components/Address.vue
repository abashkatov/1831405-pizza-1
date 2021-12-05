<template>
  <div class="cart-form__address">
    <span class="cart-form__label">{{ address.name }}:</span>

    <div class="cart-form__input">
      <label class="input">
        <span>Улица*</span>
        <input
          :disabled="!isEditable"
          type="text"
          name="street"
          :value="address.street"
          @change="changeStreet"
        />
      </label>
    </div>

    <div class="cart-form__input cart-form__input--small">
      <label class="input">
        <span>Дом*</span>
        <input
          :disabled="!isEditable"
          type="text"
          name="house"
          :value="address.house"
          @change="changeHouse"
        />
      </label>
    </div>

    <div class="cart-form__input cart-form__input--small">
      <label class="input">
        <span>Квартира</span>
        <input
          :disabled="!isEditable"
          type="text"
          name="apartment"
          :value="address.apartment"
          @change="changeApartment"
        />
      </label>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "Address",
  props: {
    isEditable: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    ...mapState("Cart", ["address"]),
  },
  methods: {
    ...mapActions("Cart", ["setAddress"]),
    changeStreet(event) {
      this.setAddress({
        ...this.address,
        street: event.target.value,
      });
    },
    changeHouse(event) {
      this.setAddress({
        ...this.address,
        house: event.target.value,
      });
    },
    changeApartment(event) {
      this.setAddress({
        ...this.address,
        apartment: event.target.value,
      });
    },
  },
};
</script>

<style scoped></style>
