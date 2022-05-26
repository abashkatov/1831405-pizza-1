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
    <div class="header__cart" data-test="cart">
      <router-link to="/cart"
        >{{ getPizzasCost + getProductsCost }} ₽</router-link
      >
    </div>
    <div v-if="isAuthenticated" class="header__user" data-test="header">
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
        <span data-test="user-name">{{ user.name }}</span>
      </router-link>
      <a href="#" class="header__logout" @click="$logout"><span>Выйти</span></a>
    </div>
    <div v-else class="header__user" data-test="header">
      <router-link to="/login" class="header__login"
        ><span>Войти</span></router-link
      >
    </div>
  </header>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { logout } from "@/common/mixins";

export default {
  name: "AppLayoutHeader",
  mixins: [logout],
  computed: {
    ...mapState("Auth", ["user"]),
    ...mapGetters("Cart", ["getPizzasCost"]),
    ...mapGetters("Goods", ["getProductsCost"]),
    isAuthenticated: function () {
      return this.user !== null;
    },
  },
};
</script>

<style scoped></style>
