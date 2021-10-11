<template>
  <div>
    <AppLayoutHeader :user="user" />
    <slot />
  </div>
</template>

<script>
import AppLayoutHeader from "./AppLayoutHeader";

export default {
  name: "AppLayoutDefault",
  components: { AppLayoutHeader },
  props: {
    user: {
      type: Object,
      required: false,
    },
  },
};
</script>

<style scoped></style>
