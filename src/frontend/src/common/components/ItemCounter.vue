<template>
  <div>
    <div class="counter" :class="counterClass">
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
        :class="[
          { 'counter__button--disabled': isPlusDisabled },
          buttonColorClass,
        ]"
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
    maxCount: {
      type: Number,
      default: 3,
    },
    buttonColor: {
      type: String,
      default: "",
    },
  },
  computed: {
    isMinusDisabled() {
      return this.itemCount <= 0;
    },
    isPlusDisabled() {
      return this.itemCount >= this.maxCount && this.maxCount > 0;
    },
    buttonColorClass() {
      return this.buttonColor.length > 0
        ? `counter__button--${this.buttonColor}`
        : false;
    },
  },
  methods: {
    plusItem() {
      if (!this.isPlusDisabled) {
        this.$emit("countChanged", this.itemCount + 1);
      }
    },
    minusItem() {
      if (!this.isMinusDisabled) {
        this.$emit("countChanged", this.itemCount - 1);
      }
    },
  },
};
</script>

<style scoped></style>
