<template>
  <div class="sign-form">
    <router-link to="/" class="close close--white">
      <span class="visually-hidden">Закрыть форму авторизации</span>
    </router-link>
    <div class="sign-form__title">
      <h1 class="title title--small">Авторизуйтесь на сайте</h1>
    </div>
    <form
      data-test="loginForm"
      action="/"
      method="post"
      @submit.prevent="signIn"
    >
      <div class="sign-form__input">
        <label class="input">
          <span>E-mail</span>
          <input
            data-test="emailInput"
            type="email"
            name="email"
            placeholder="example@mail.ru"
            v-model="email"
            required
          />
        </label>
      </div>

      <div class="sign-form__input">
        <label class="input">
          <span>Пароль</span>
          <input
            data-test="passwordInput"
            type="password"
            name="pass"
            placeholder="***********"
            v-model="password"
            required
          />
        </label>
      </div>
      <button data-test="submitButton" type="submit" class="button">
        Авторизоваться
      </button>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { isLoggedIn } from "@/middlewares";

export default {
  name: "Login",
  layout: "AppLayoutBlank",
  middlewares: [isLoggedIn],
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    ...mapActions("Auth", ["login"]),
    async signIn() {
      await this.login({ email: this.email, password: this.password });
      await this.$router.push("/");
    },
  },
};
</script>

<style scoped></style>
