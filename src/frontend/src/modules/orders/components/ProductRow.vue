<template>
  <li>
    <img :src="product.image" width="20" height="30" :alt="product.name" />
    <p>
      <span>{{ product.name }}</span>
      <b>{{ productCount }}{{ productPrice }} ₽</b>
    </p>
  </li>
</template>

<script>
export default {
  name: "ProductRow",
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  computed: {
    productCount() {
      return this.product.count > 1 ? `${this.product.count}x` : "";
    },
    productPrice() {
      return this.product.price.toLocaleString();
    },
  },
};
</script>

<style scoped></style>
