<template>
  <div>
    <label
      v-for="item in items"
      :key="item.id"
      class="radio"
      :class="labelClass"
    >
      <input
        type="radio"
        :name="name"
        :value="item.alias"
        :checked="item.id === selectedId"
        @click="$emit('changeItem', item.id)"
        data-test="input"
      />
      <span>{{ item.name }}</span>
    </label>
  </div>
</template>

<script>
export default {
  name: "RadioButton",
  props: {
    items: {
      type: Array,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    labelClass: {
      type: String,
      required: true,
    },
    selectedId: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style scoped></style>
