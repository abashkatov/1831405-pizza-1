<template>
  <div>
    <span :class="classes">
      {{ title }}
    </span>
    <div class="counter counter--orange" :class="counterClass">
      <button
        type="button"
        class="counter__button counter__button--minus"
        :class="{ 'counter__button--disabled': isMinusDisabled }"
        :disabled="isMinusDisabled"
        @click="minusItem"
      >
        <span class="visually-hidden">Меньше</span>
      </button>
      <input
        type="text"
        name="counter"
        class="counter__input"
        :value="itemCount"
      />
      <button
        type="button"
        class="counter__button counter__button--plus"
        :class="{ 'counter__button--disabled': isPlusDisabled }"
        :disabled="isPlusDisabled"
        @click="plusItem"
      >
        <span class="visually-hidden">Больше</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ItemCounter",
  props: {
    classes: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    counterClass: {
      type: String,
      required: true,
    },
    itemCount: {
      type: Number,
      required: true,
    },
  },
  computed: {
    isMinusDisabled() {
      return this.itemCount <= 0;
    },
    isPlusDisabled() {
      return this.itemCount >= 3;
    },
  },
  methods: {
    plusItem() {
      if (this.itemCount < 3) {
        this.$emit("countChanged", this.itemCount + 1);
      }
    },
    minusItem() {
      if (this.itemCount > 0) {
        this.$emit("countChanged", this.itemCount - 1);
      }
    },
  },
};
</script>

<style scoped></style>
