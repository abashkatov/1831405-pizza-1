<template>
  <div
    :draggable="isDraggable ? true : false"
    @dragstart.self="onDrag"
    @dragover.prevent
    @dragenter.prevent
  >
    <slot />
  </div>
</template>

<script>
import { DATA_TRANSFER_PAYLOAD, MOVE } from "@/common/constants";

export default {
  name: "AppDrag",
  props: {
    transferData: {
      type: Object,
      required: true,
    },
    isDraggableProp: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    isDraggable() {
      return this.isDraggableProp ? true : false;
    },
  },
  methods: {
    onDrag({ dataTransfer }) {
      dataTransfer.effectAllowed = MOVE;
      dataTransfer.dropEffect = MOVE;
      dataTransfer.setData(
        DATA_TRANSFER_PAYLOAD,
        JSON.stringify(this.transferData)
      );
    },
  },
};
</script>

<style scoped></style>
