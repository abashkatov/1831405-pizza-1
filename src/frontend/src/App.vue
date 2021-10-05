<template>
  <div id="app">
    <component :is="layout" :user="user">
      <router-view />
    </component>
  </div>
</template>

<script>
import AppLayout from "./layouts/AppLayout";
import AppLayoutAnonymous from "./layouts/AppLayoutAnonymous";

export default {
  name: "App",
  components: { AppLayout },
  data: function () {
    return {
      user: null,
    };
  },
  computed: {
    layout: function () {
      return this.user === null ? AppLayoutAnonymous : AppLayout;
    },
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>
