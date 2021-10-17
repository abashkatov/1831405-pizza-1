<template>
  <div>
    <AppLayoutHeader />
    <slot />
  </div>
</template>

<script>
import AppLayoutHeader from "./AppLayoutHeader";

export default {
  name: "AppLayoutDefault",
  components: { AppLayoutHeader },
};
</script>

<style scoped></style>
