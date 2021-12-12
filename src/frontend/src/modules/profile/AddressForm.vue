<template>
  <form
    action="/"
    method="post"
    class="address-form address-form--opened sheet"
    @submit.prevent="saveAddress"
  >
    <div class="address-form__header">
      <b v-if="address.id">Адрес №{{ address.id }}</b>
      <b v-else>Новый адрес</b>
    </div>

    <div class="address-form__wrapper">
      <div class="address-form__input">
        <label class="input">
          <span>Название адреса*</span>
          <input
            type="text"
            name="addr-name"
            placeholder="Введите название адреса"
            required
            v-model="name"
          />
        </label>
      </div>
      <div class="address-form__input address-form__input--size--normal">
        <label class="input">
          <span>Улица*</span>
          <input
            type="text"
            name="addr-street"
            placeholder="Введите название улицы"
            required
            v-model="street"
          />
        </label>
      </div>
      <div class="address-form__input address-form__input--size--small">
        <label class="input">
          <span>Дом*</span>
          <input
            type="text"
            name="addr-house"
            placeholder="Введите номер дома"
            required
            v-model="building"
          />
        </label>
      </div>
      <div class="address-form__input address-form__input--size--small">
        <label class="input">
          <span>Квартира</span>
          <input
            type="text"
            name="addr-apartment"
            placeholder="Введите № квартиры"
            v-model="flat"
          />
        </label>
      </div>
      <div class="address-form__input">
        <label class="input">
          <span>Комментарий</span>
          <input
            type="text"
            name="addr-comment"
            placeholder="Введите комментарий"
            v-model="comment"
          />
        </label>
      </div>
    </div>

    <div class="address-form__buttons">
      <button
        type="button"
        class="button button--transparent"
        @click="removeAddress"
      >
        Удалить
      </button>
      <button type="submit" class="button">Сохранить</button>
    </div>
  </form>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "AddressForm",
  date() {
    return {
      name: "",
      street: "",
      building: "",
      flat: "",
      comment: "",
    };
  },
  props: {
    address: {
      type: Object,
      required: true,
    },
  },
  methods: {
    ...mapActions("Auth", ["deleteAddress", "addAddress", "updateAddress"]),
    async saveAddress() {
      const address = {
        id: this.address.id,
        name: this.name,
        street: this.street,
        building: this.building,
        flat: this.flat,
        comment: this.comment,
      };
      this.address.id
        ? await this.updateAddress(address)
        : await this.addAddress(address);
      this.resetData();
      this.$emit("closeForm");
    },
    async removeAddress() {
      if (this.address.id) {
        await this.deleteAddress(this.address.id);
      }
      this.resetData();
      this.$emit("closeForm");
    },
    resetData() {
      this.name = this.address.name;
      this.street = this.address.street;
      this.building = this.address.building;
      this.flat = this.address.flat;
      this.comment = this.address.comment;
    },
  },
  async created() {
    this.resetData();
  },
};
</script>

<style scoped></style>
