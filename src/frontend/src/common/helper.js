import resources from "@/common/enums/resources";
import {
  AuthApiService,
  ReadOnlyApiService,
  CrudApiService,
} from "@/services/api.service";

export const capitalize = (string) =>
  `${string.charAt(0).toUpperCase()}${string.slice(1)}`;

export const setAuth = (store) => {
  store.$api.auth.setAuthHeader();
  store.dispatch("Auth/fetchUser");
};
export const createResources = (notifier) => {
  return {
    [resources.AUTH]: new AuthApiService(notifier),
    [resources.DOUGH]: new ReadOnlyApiService(resources.DOUGH, notifier),
    [resources.SAUCE]: new ReadOnlyApiService(resources.SAUCE, notifier),
    [resources.SIZES]: new ReadOnlyApiService(resources.SIZES, notifier),
    [resources.INGREDIENTS]: new ReadOnlyApiService(
      resources.INGREDIENTS,
      notifier
    ),
    [resources.MISC]: new ReadOnlyApiService(resources.MISC, notifier),
    [resources.ORDERS]: new CrudApiService(resources.ORDERS, notifier),
  };
};
