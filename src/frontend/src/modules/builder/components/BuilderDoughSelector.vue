<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>
      <div class="sheet__content dough">
        <label
          v-for="dough in doughs"
          :key="dough.id"
          class="dough__input"
          :class="`dough__input--${dough.alias}`"
        >
          <input
            type="radio"
            name="dought"
            :value="dough.value"
            class="visually-hidden"
            :checked="dough.id === selectedDough.id"
            @click="setDough(dough)"
          />
          <b>{{ dough.name }}</b>
          <span>{{ dough.description }}}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "BuilderDoughSelector",
  computed: {
    ...mapState("Builder", ["doughs", "selectedDough"]),
  },
  methods: {
    ...mapActions("Builder", ["setDough"]),
  },
};
</script>

<style scoped></style>
