import { DELIVERY_TYPE_SELF } from "@/common/constants.js";

export default {
  namespaced: true,
  state: {
    pizzas: [],
    goods: [],
    deliveryType: DELIVERY_TYPE_SELF,
    phone: "",
    address: {
      street: "",
      house: "",
      flat: "",
    },
  },
};
