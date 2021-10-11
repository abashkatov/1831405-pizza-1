<template>
  <div>
    <AppLayoutHeader :user="user" />
    <main class="layout">
      <div class="layout__sidebar sidebar">
        <router-link to="/" class="logo layout__logo">
          <img
            src="/public/img/logo.svg"
            alt="V!U!E! Pizza logo"
            width="90"
            height="40"
          />
        </router-link>
        <router-link
          class="layout__link"
          active-class="layout__link--active"
          to="/orders"
          exact
          >История заказов</router-link
        >
        <router-link
          class="layout__link"
          active-class="layout__link--active"
          to="/profile"
          exact
          >Мои данные</router-link
        >
      </div>
      <slot />
    </main>
  </div>
</template>

<script>
import AppLayoutHeader from "./AppLayoutHeader";

export default {
  name: "AppLayoutProfile",
  components: { AppLayoutHeader },
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped></style>
