<template>
  <div class="content__constructor">
    <div :class="`pizza pizza--foundation--${doughsSize}-${sauce.alias}`">
      <div class="pizza__wrapper">
        <div class="pizza__filling pizza__filling--ananas"></div>
        <div class="pizza__filling pizza__filling--bacon"></div>
        <div class="pizza__filling pizza__filling--cheddar"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BuilderPizzaView",
  props: {
    doughs: Object,
    // size: Object,
    sauce: Object,
    // ingredients: Array,
  },
  computed: {
    doughsSize: function () {
      return this.doughs.alias === "light" ? "small" : "big";
    },
  },
};
</script>

<style scoped></style>
