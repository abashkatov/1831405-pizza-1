<template>
  <div>
    <header class="header">
      <div class="header__logo">
        <a href="/" class="logo">
          <img
            src="/public/img/logo.svg"
            alt="V!U!E! Pizza logo"
            width="90"
            height="40"
          />
        </a>
      </div>
      <div class="header__cart">
        <a href="/cart">0 ₽</a>
      </div>
      <div class="header__user">
        <a href="/login" class="header__login"><span>Войти</span></a>
      </div>
    </header>
    <slot />
  </div>
</template>

<script>
export default {
  name: "AppLayout",
};
</script>

<style scoped></style>
