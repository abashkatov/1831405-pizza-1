import { setAuth } from "@/common/helper";

export default function auth({ next, store, nextMiddleware }) {
  if (!store.getters["Auth/isAuthenticated"]) {
    const token = store.$jwt.getToken();
    if (token) {
      setAuth(store);
    } else {
      next("/");
    }
  }
  return nextMiddleware();
}
