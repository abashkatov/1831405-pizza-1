<template>
  <div id="app">
    <component :is="layout" :user="user">
      <router-view :user="user" />
    </component>
  </div>
</template>

<script>
import user from "@/static/user.json";
const defaultLayout = "AppLayoutDefault";

export default {
  name: "App",
  data: function () {
    return {
      user: user,
    };
  },
  computed: {
    layout: function () {
      const layout = this.$route.meta.layout || defaultLayout;
      return () => import(`@/layouts/${layout}.vue`);
    },
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>
