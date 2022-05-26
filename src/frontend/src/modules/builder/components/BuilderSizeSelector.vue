<template>
  <div class="content__diameter">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите размер</h2>
      <div class="sheet__content diameter">
        <label
          data-test="sizeElement"
          v-for="size in sizes"
          :key="size.id"
          class="diameter__input"
          :class="`diameter__input--${size.alias}`"
        >
          <input
            data-test="sizeRadio"
            type="radio"
            name="diameter"
            :value="size.alias"
            :checked="size.id === selectedSize.id"
            class="visually-hidden"
            @click="setSize(size)"
          />
          <span data-test="sizeName">{{ size.name }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "BuilderSizeSelector",
  computed: {
    ...mapState("Builder", ["sizes", "selectedSize"]),
  },
  methods: {
    ...mapActions("Builder", ["setSize"]),
  },
};
</script>

<style scoped></style>
