<template>
  <div class="layout__address">
    <div v-if="!isEdit" class="sheet address-form">
      <div class="address-form__header">
        <b>Адрес №{{ address.id }}. {{ address.name }}</b>
        <div class="address-form__edit">
          <button type="button" class="icon" @click="isEdit = !isEdit">
            <span class="visually-hidden">Изменить адрес</span>
          </button>
        </div>
      </div>
      <p>
        {{ address.street }}, д. {{ address.building }}, кв. {{ address.flat }}
      </p>
      <small>{{ address.comment }}</small>
    </div>
    <AddressForm v-else :address="address" @closeForm="isEdit = false" />
  </div>
</template>

<script>
import AddressForm from "./AddressForm";
export default {
  name: "AddressRow",
  components: { AddressForm },
  data() {
    return {
      isEdit: false,
    };
  },
  props: {
    address: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped></style>
