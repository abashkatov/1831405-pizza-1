<template>
  <div id="app">
    <component :is="layout">
      <AppNotifications />
      <router-view />
    </component>
  </div>
</template>

<script>
import AppNotifications from "@/common/components/AppNotifications";

const defaultLayout = "AppLayoutDefault";

export default {
  components: { AppNotifications },
  name: "App",
  computed: {
    layout: function () {
      const layout = this.$route.meta.layout || defaultLayout;
      return () => import(`@/layouts/${layout}.vue`);
    },
  },
  created() {
    this.$store.dispatch("init");
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>
