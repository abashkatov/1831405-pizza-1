<template>
  <div id="app">
    <component :is="layout">
      <AppNotifications />
      <transition name="slide" mode="out-in" appear>
        <router-view :key="$route.path"></router-view>
      </transition>
    </component>
  </div>
</template>

<script>
import AppNotifications from "@/common/components/AppNotifications";
import { setAuth } from "@/common/helper";

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
    if (this.$jwt.getToken()) {
      setAuth(this.$store);
    }
    this.$store.dispatch("init");
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
.slide-enter-active {
  transition: all 0.2s;
}
.slide-enter {
  opacity: 0;
  margin-left: 190px;
}
.slide-leave-active {
  transition: all 0.2s;
  opacity: 0;
  margin-left: -200px;
}
</style>
