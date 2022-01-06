<template>
  <div class="layout__content">
    <div class="layout__title">
      <h1 class="title title--big">Мои данные</h1>
    </div>

    <div class="user" v-if="user">
      <picture>
        <source
          type="image/webp"
          :srcset="`${user.avatar}@2x.webp 1x,${user.avatar}@4x.webp 2x`"
        />
        <img
          :src="`${user.avatar}@2x.jpg`"
          :srcset="`${user.avatar}@4x.jpg`"
          :alt="user.name"
          width="72"
          height="72"
        />
      </picture>
      <div class="user__name">
        <span>{{ user.name }}</span>
      </div>
      <p class="user__phone">
        Контактный телефон: <span>{{ user.phone }}</span>
      </p>
    </div>

    <AddressRow
      v-for="address in addresses"
      :key="address.id"
      :address="address"
    />
    <div class="layout__address" v-if="isShowAddressForm">
      <AddressForm
        :address="addressForm"
        @closeForm="isShowAddressForm = false"
      />
    </div>
    <div class="layout__button">
      <button
        type="button"
        class="button button--border"
        @click="isShowAddressForm = !isShowAddressForm"
      >
        Добавить новый адрес
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import AddressRow from "../modules/profile/AddressRow";
import AddressForm from "../modules/profile/AddressForm";

export default {
  name: "Profile",
  data() {
    return {
      isShowAddressForm: false,
    };
  },
  components: { AddressForm, AddressRow },
  computed: {
    ...mapState("Auth", ["user", "addresses"]),
    addressForm() {
      return {
        id: null,
        name: "Новый адрес",
        street: "",
        building: "",
        flat: "",
        comment: "",
      };
    },
  },
};
</script>

<style scoped></style>
