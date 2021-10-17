<template>
  <header class="header">
    <div class="header__logo">
      <router-link to="/" class="logo">
        <img
          src="/public/img/logo.svg"
          alt="V!U!E! Pizza logo"
          width="90"
          height="40"
        />
      </router-link>
    </div>
    <div class="header__cart">
      <router-link to="/cart">0 ₽</router-link>
    </div>
    <div v-if="isAuthenticated" class="header__user">
      <router-link to="/profile">
        <picture>
          <source
            type="image/webp"
            :srcset="`${user.avatar}.webp 1x, ${user.avatar}@2x.webp 2x`"
          />
          <img
            :src="`${user.avatar}.jpg`"
            :srcset="`${user.avatar}@2x.jpg`"
            :alt="user.name"
            width="32"
            height="32"
          />
        </picture>
        <span>{{ user.name }}</span>
      </router-link>
      <router-link to="/logout" class="header__logout"
        ><span>Выйти</span></router-link
      >
    </div>
    <div v-else class="header__user">
      <router-link to="/login" class="header__login"
        ><span>Войти</span></router-link
      >
    </div>
  </header>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "AppLayoutHeader",
  computed: {
    ...mapState("Auth", ["user"]),
    isAuthenticated: function () {
      return this.user !== null;
    },
  },
};
</script>

<style scoped></style>
