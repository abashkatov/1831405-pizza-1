<template>
  <li class="additional-list__item sheet">
    <p class="additional-list__description">
      <img :src="good.image" width="39" height="60" :alt="good.name" />
      <span>{{ good.name }}</span>
    </p>

    <div class="additional-list__wrapper">
      <ItemCounter
        :title="good.name"
        counterClass="additional-list__counter"
        :item-id="good.id"
        :itemCount="good.count"
        :max-count="0"
        :button-color="`orange`"
        @countChanged="
          changeGoodsCount({
            itemId: good.id,
            newCount: $event,
          })
        "
      >
        <div class="additional-list__price">
          <b>{{ totalPrice }} ₽</b>
        </div>
      </ItemCounter>
    </div>
  </li>
</template>

<script>
import { mapActions } from "vuex";
import ItemCounter from "../../../common/components/ItemCounter";

export default {
  name: "GoodsRow",
  components: { ItemCounter },
  props: {
    good: {
      type: Object,
      required: true,
    },
  },
  computed: {
    totalPrice() {
      return this.good.price * this.good.count;
    },
  },
  methods: {
    ...mapActions("Goods", ["changeGoodsCount"]),
  },
};
</script>

<style scoped>
.additional-list__wrapper > div {
  display: flex;
  width: 100%;
}
</style>
